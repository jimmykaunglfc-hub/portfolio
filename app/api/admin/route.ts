import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GAME_CATALOG } from '@/lib/gameCatalog';

const COOKIE_NAME = 'khnco_admin';
const SESSION_TTL = 60 * 60 * 8;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { persistSession: false, autoRefreshToken: false } }
);

type ChatRow = {
  id: string;
  session_id: string;
  user_message: string;
  ai_response: string;
  requires_human: boolean;
  created_at: string;
};

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(value: string) {
  return createHmac('sha256', ADMIN_PASSWORD).update(value).digest('base64url');
}

function createSessionToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_TTL })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function hasValidSession(req: NextRequest) {
  if (!ADMIN_PASSWORD) return false;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number(data.exp) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function unauthorized() {
  return NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 });
}

function makeTickets(rows: ChatRow[]) {
  const sorted = [...rows].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
  const originals = sorted.filter((row) => !row.user_message.startsWith('SYSTEM_ADMIN_'));
  const markers = sorted.filter((row) => ['SYSTEM_ADMIN_OVERRIDE', 'SYSTEM_ADMIN_RESOLVED'].includes(row.user_message));
  const open = originals.filter((row) => row.requires_human).map((row) => ({ ...row, status: 'open' as const })).reverse();
  const resolved = markers.map((marker) => {
    const source = [...originals].reverse().find((row) => row.session_id === marker.session_id && +new Date(row.created_at) <= +new Date(marker.created_at));
    return {
      id: source?.id || marker.id,
      session_id: marker.session_id,
      user_message: source?.user_message || 'Conversation routed to human support',
      ai_response: source?.ai_response || '',
      created_at: source?.created_at || marker.created_at,
      resolved_at: marker.created_at,
      admin_response: marker.ai_response,
      status: 'resolved' as const,
    };
  }).reverse();
  return { open, resolved };
}

async function dashboardPayload() {
  const [chat, blogs, games, about, settings] = await Promise.all([
    supabaseAdmin.from('chat_history').select('*').order('created_at', { ascending: false }).limit(1000),
    supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('games_data').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('about_me').select('*').order('updated_at', { ascending: false }),
    supabaseAdmin.from('app_settings').select('*').limit(1),
  ]);
  const firstError = [chat.error, blogs.error, games.error, about.error, settings.error].find(Boolean);
  if (firstError) throw firstError;
  const rows = (chat.data || []) as ChatRow[];
  const tickets = makeTickets(rows);
  const queries = rows.filter((row) => !row.user_message.startsWith('SYSTEM_ADMIN_'));
  return {
    metrics: {
      queries: queries.length,
      openRth: tickets.open.length,
      resolvedRth: tickets.resolved.length,
      sessions: new Set(queries.map((row) => row.session_id)).size,
      articles: blogs.data?.length || 0,
      gameRecords: games.data?.length || 0,
    },
    chatLogs: rows,
    tickets,
    blogs: blogs.data || [],
    games: games.data || [],
    about: about.data?.[0]?.content || '',
    settings: settings.data?.[0] || null,
  };
}

export async function GET(req: NextRequest) {
  if (!hasValidSession(req)) return unauthorized();
  try {
    return NextResponse.json(await dashboardPayload());
  } catch (error) {
    console.error('Admin dashboard load failed:', error);
    return NextResponse.json({ error: 'The control center could not load its data.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      if (!hasValidSession(req)) return unauthorized();
      const form = await req.formData();
      const files = form.getAll('files').filter((value): value is File => value instanceof File);
      if (!files.length || files.length > 8) return NextResponse.json({ error: 'Choose between 1 and 8 images.' }, { status: 400 });
      const urls: string[] = [];
      for (const file of files) {
        if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
          return NextResponse.json({ error: `${file.name} must be an image smaller than 5 MB.` }, { status: 400 });
        }
        const cleanedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
        const path = `public/${Date.now()}-${crypto.randomUUID()}-${cleanedName}`;
        const { error } = await supabaseAdmin.storage.from('blog-assets').upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false });
        if (error) throw error;
        urls.push(supabaseAdmin.storage.from('blog-assets').getPublicUrl(path).data.publicUrl);
      }
      return NextResponse.json({ urls });
    }

    const body = await req.json();
    const { action } = body;
    if (action === 'login') {
      if (!ADMIN_PASSWORD || !safeEqual(String(body.username || ''), ADMIN_USERNAME) || !safeEqual(String(body.password || ''), ADMIN_PASSWORD)) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        return NextResponse.json({ error: 'The username or password is incorrect.' }, { status: 401 });
      }
      const response = NextResponse.json({ success: true });
      response.cookies.set(COOKIE_NAME, createSessionToken(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: SESSION_TTL });
      return response;
    }
    if (action === 'logout') {
      const response = NextResponse.json({ success: true });
      response.cookies.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
      return response;
    }
    if (action === 'session') return NextResponse.json({ authenticated: hasValidSession(req) }, { status: hasValidSession(req) ? 200 : 401 });
    if (!hasValidSession(req)) return unauthorized();

    if (action === 'reply-ticket') {
      const reply = String(body.reply || '').trim();
      const sessionId = String(body.sessionId || '');
      const ticketId = String(body.ticketId || '');
      if (!reply || !sessionId || !ticketId) return NextResponse.json({ error: 'Reply, session, and ticket are required.' }, { status: 400 });
      const { error: replyError } = await supabaseAdmin.from('chat_history').insert({ session_id: sessionId, user_message: 'SYSTEM_ADMIN_OVERRIDE', ai_response: reply, requires_human: false });
      if (replyError) throw replyError;
      const { error } = await supabaseAdmin.from('chat_history').update({ requires_human: false }).eq('id', ticketId);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    if (action === 'resolve-ticket') {
      const { error: markerError } = await supabaseAdmin.from('chat_history').insert({ session_id: body.sessionId, user_message: 'SYSTEM_ADMIN_RESOLVED', ai_response: 'Resolved by administrator without an outbound reply.', requires_human: false });
      if (markerError) throw markerError;
      const { error } = await supabaseAdmin.from('chat_history').update({ requires_human: false }).eq('id', body.ticketId);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    if (action === 'save-blog') {
      const title = String(body.record?.title || '').trim();
      const summary = String(body.record?.summary || '').trim();
      const content = String(body.record?.content || '').trim();
      if (!title || !summary || !content) return NextResponse.json({ error: 'Title, summary, and article content are required.' }, { status: 400 });
      const slug = String(body.record?.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const record = { title, summary, content, slug, cover_image: body.record?.cover_image || null };
      const query = body.record?.id ? supabaseAdmin.from('blog_posts').update(record).eq('id', body.record.id).select() : supabaseAdmin.from('blog_posts').insert(record).select();
      const { data, error } = await query;
      if (error) throw error;
      return NextResponse.json({ data });
    }
    if (action === 'delete-blog' || action === 'delete-game') {
      const table = action === 'delete-blog' ? 'blog_posts' : 'games_data';
      const { error } = await supabaseAdmin.from(table).delete().eq('id', body.id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    if (action === 'add-game') {
      const record = { name: String(body.record?.name || '').trim(), description: String(body.record?.description || '').trim(), hint: String(body.record?.hint || '').trim() };
      if (!record.name || !record.description) return NextResponse.json({ error: 'Game name and description are required.' }, { status: 400 });
      const { data, error } = await supabaseAdmin.from('games_data').insert(record).select();
      if (error) throw error;
      return NextResponse.json({ data });
    }
    if (action === 'sync-games') {
      const { data: existing, error: readError } = await supabaseAdmin.from('games_data').select('name');
      if (readError) throw readError;
      const names = new Set((existing || []).map((game) => game.name.toLowerCase()));
      const missing = GAME_CATALOG
        .filter((game) => !names.has(game.name.toLowerCase()))
        .map(({ name, description, hint }) => ({ name, description, hint }));
      if (missing.length) {
        const { error } = await supabaseAdmin.from('games_data').insert(missing);
        if (error) throw error;
      }
      return NextResponse.json({ success: true, inserted: missing.length });
    }
    if (action === 'save-about') {
      const content = String(body.content || '').trim();
      if (!content) return NextResponse.json({ error: 'Biography content cannot be empty.' }, { status: 400 });
      const { error } = await supabaseAdmin.from('about_me').insert({ content });
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    if (action === 'save-settings') {
      const safeSettings = { ...(body.record || {}) };
      delete safeSettings.id;
      delete safeSettings.created_at;
      const record = { ...safeSettings, updated_at: new Date().toISOString() };
      const { data: existing } = await supabaseAdmin.from('app_settings').select('id').limit(1);
      const query = existing?.[0] ? supabaseAdmin.from('app_settings').update(record).eq('id', existing[0].id) : supabaseAdmin.from('app_settings').insert(record);
      const { error } = await query;
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Unknown admin action.' }, { status: 400 });
  } catch (error) {
    console.error('Admin API operational failure:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Admin operation failed.' }, { status: 500 });
  }
}
