'use client';

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronRight,
  Code2, Copy, FileText, Gamepad2, Heading2, ImagePlus, LayoutDashboard,
  List, Loader2, LockKeyhole, LogOut, Menu, MessageSquare, MonitorCog,
  PencilLine, Plus, Quote, RefreshCw, Search, Send, Settings, ShieldCheck, Sparkles,
  Trash2, UserRound, Users, X,
} from 'lucide-react';
import './admin.css';
import { GAME_CATALOG } from '@/lib/gameCatalog';

type ChatRow = { id: string; session_id: string; user_message: string; ai_response: string; requires_human: boolean; created_at: string };
type Ticket = ChatRow & { status: 'open' | 'resolved'; resolved_at?: string; admin_response?: string };
type Blog = { id?: string; title: string; summary: string; content: string; slug?: string; cover_image?: string; created_at?: string };
type Game = { id: string; name: string; description: string; hint?: string; created_at?: string };
type Payload = {
  metrics: { queries: number; openRth: number; resolvedRth: number; sessions: number; articles: number; gameRecords: number };
  chatLogs: ChatRow[];
  tickets: { open: Ticket[]; resolved: Ticket[] };
  blogs: Blog[];
  games: Game[];
  about: string;
  settings: Record<string, unknown> | null;
};

const EMPTY_BLOG: Blog = { title: '', summary: '', content: '', slug: '', cover_image: '' };
const NAV = [
  ['overview', 'Overview', LayoutDashboard], ['rth', 'RTH Inbox', AlertCircle], ['chats', 'AI Conversations', MessageSquare],
  ['blog', 'Blog Engine', BookOpen], ['games', 'Games Drawer', Gamepad2], ['settings', 'Settings', Settings],
] as const;

function timeLabel(value?: string) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}

function shortSession(id = '') { return id.replace('session-', '').slice(-10) || 'unknown'; }

function MarkdownPreview({ content }: { content: string }) {
  if (!content.trim()) return <div className="editor-empty">Your formatted preview will appear here.</div>;
  return <div className="article-preview">{content.split('\n').map((line, index) => {
    if (line.startsWith('### ')) return <h3 key={index}>{line.slice(4)}</h3>;
    if (line.startsWith('## ')) return <h2 key={index}>{line.slice(3)}</h2>;
    if (line.startsWith('> ')) return <blockquote key={index}>{line.slice(2)}</blockquote>;
    if (line.startsWith('- ')) return <div className="preview-list" key={index}>• {line.slice(2)}</div>;
    const image = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    // Uploaded article assets can come from any configured Supabase project URL.
    // eslint-disable-next-line @next/next/no-img-element
    if (image) return <figure key={index}><img src={image[2]} alt={image[1]} /><figcaption>{image[1]}</figcaption></figure>;
    if (!line.trim()) return <div className="preview-space" key={index} />;
    return <p key={index}>{line}</p>;
  })}</div>;
}

export default function AdminControlCenter() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [active, setActive] = useState('overview');
  const [data, setData] = useState<Payload | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');
  const [ticketMode, setTicketMode] = useState<'open' | 'resolved'>('open');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [blog, setBlog] = useState<Blog>(EMPTY_BLOG);
  const [editorView, setEditorView] = useState<'write' | 'preview'>('write');
  const [gameForm, setGameForm] = useState({ name: '', description: '', hint: '' });
  const [about, setAbout] = useState('');
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const alert = (text: string, tone: 'success' | 'error' = 'success') => {
    setNotice({ text, tone });
    window.setTimeout(() => setNotice(null), 4200);
  };

  const request = async (body: Record<string, unknown>) => {
    const response = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const json = await response.json();
    if (!response.ok) {
      if (response.status === 401) setAuthorized(false);
      throw new Error(json.error || 'The requested operation could not be completed.');
    }
    return json;
  };

  const load = async () => {
    setBusy(true);
    try {
      const response = await fetch('/api/admin', { cache: 'no-store' });
      if (response.status === 401) { setAuthorized(false); return; }
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      setData(payload);
      setAuthorized(true);
      setAbout(payload.about || '');
      setSettings(payload.settings || {});
      if (!selectedTicket) setSelectedTicket(payload.tickets.open[0] || payload.tickets.resolved[0] || null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Dashboard data could not be loaded.', 'error');
    } finally { setBusy(false); }
  };

  useEffect(() => {
    document.body.classList.add('admin-route');
    const timer = window.setTimeout(() => void load(), 0);
    return () => { window.clearTimeout(timer); document.body.classList.remove('admin-route'); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true);
    try { await request({ action: 'login', ...credentials }); setCredentials({ username: '', password: '' }); await load(); }
    catch (error) { alert(error instanceof Error ? error.message : 'Sign in failed.', 'error'); }
    finally { setBusy(false); }
  };

  const logout = async () => {
    await request({ action: 'logout' }).catch(() => null);
    setData(null); setAuthorized(false); setActive('overview');
  };

  const mutate = async (body: Record<string, unknown>, success: string) => {
    setBusy(true);
    try { await request(body); alert(success); await load(); return true; }
    catch (error) { alert(error instanceof Error ? error.message : 'Operation failed.', 'error'); return false; }
    finally { setBusy(false); }
  };

  const sessions = useMemo(() => {
    const grouped = new Map<string, ChatRow[]>();
    for (const row of data?.chatLogs || []) {
      const rows = grouped.get(row.session_id) || [];
      rows.push(row); grouped.set(row.session_id, rows);
    }
    return [...grouped.entries()].map(([id, rows]) => ({ id, rows: rows.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at)), latest: rows[rows.length - 1] }))
      .filter((session) => `${session.id} ${session.rows.map((row) => row.user_message).join(' ')}`.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => +new Date(b.latest.created_at) - +new Date(a.latest.created_at));
  }, [data, search]);

  const insertFormat = (before: string, after = before, placeholder = 'text') => {
    const textarea = editorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart; const end = textarea.selectionEnd;
    const selected = blog.content.slice(start, end) || placeholder;
    const value = `${blog.content.slice(0, start)}${before}${selected}${after}${blog.content.slice(end)}`;
    setBlog({ ...blog, content: value });
    requestAnimationFrame(() => { textarea.focus(); textarea.setSelectionRange(start + before.length, start + before.length + selected.length); });
  };

  const uploadImages = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const form = new FormData(); Array.from(files).slice(0, 8).forEach((file) => form.append('files', file));
      const response = await fetch('/api/admin', { method: 'POST', body: form });
      const result = await response.json(); if (!response.ok) throw new Error(result.error);
      const blocks = result.urls.map((url: string, index: number) => `![Article image ${index + 1}](${url})`).join('\n\n');
      setBlog((current) => ({ ...current, content: `${current.content}${current.content ? '\n\n' : ''}${blocks}`, cover_image: current.cover_image || result.urls[0] }));
      alert(`${result.urls.length} image${result.urls.length === 1 ? '' : 's'} uploaded and inserted.`);
    } catch (error) { alert(error instanceof Error ? error.message : 'Image upload failed.', 'error'); }
    finally { setBusy(false); }
  };

  if (authorized === null) return <div className="admin-boot"><div className="admin-mark">KH</div><Loader2 className="spin" /> <span>Securing control center</span></div>;
  if (!authorized) return <Login credentials={credentials} setCredentials={setCredentials} submit={login} busy={busy} notice={notice} />;

  const tickets = data?.tickets[ticketMode] || [];
  const effectiveSession = selectedSession || sessions[0]?.id || '';
  const selectedChat = sessions.find((session) => session.id === effectiveSession);

  return <main className="admin-shell">
    {notice && <div className={`admin-toast ${notice.tone}`}><CheckCircle2 size={17} />{notice.text}</div>}
    <aside className={`admin-sidebar ${mobileNav ? 'open' : ''}`}>
      <div className="admin-brand"><div className="admin-mark">KH</div><div><strong>Control Center</strong><small><i /> Portfolio operations</small></div><button className="icon-button sidebar-close" onClick={() => setMobileNav(false)}><X /></button></div>
      <nav>{NAV.map(([id, label, Icon]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => { setActive(id); setMobileNav(false); }}><Icon /> <span>{label}</span>{id === 'rth' && !!data?.metrics.openRth && <b>{data.metrics.openRth}</b>}</button>)}</nav>
      <div className="sidebar-status"><ShieldCheck /><div><strong>Protected session</strong><span>Server-authorized access</span></div></div>
      <button className="logout" onClick={logout}><LogOut /> End session</button>
    </aside>
    <section className="admin-workspace">
      <header className="admin-topbar"><button className="icon-button mobile-menu" onClick={() => setMobileNav(true)}><Menu /></button><div><span className="eyebrow">Portfolio intelligence</span><h1>{NAV.find(([id]) => id === active)?.[1]}</h1></div><div className="top-actions"><span className="live-pill"><i /> Systems online</span><button className="icon-button" title="Refresh data" onClick={load}><RefreshCw className={busy ? 'spin' : ''} /></button><div className="admin-avatar">JO</div></div></header>
      <div className="admin-content">
        {active === 'overview' && <Overview data={data} setActive={setActive} />}
        {active === 'rth' && <section>
          <SectionHead kicker="Human support operations" title="Route-to-human inbox" copy="Review escalated conversations, answer visitors, and maintain a clear resolution trail." action={<button className="secondary-button" onClick={load}><RefreshCw /> Refresh inbox</button>} />
          <div className="segmented"><button className={ticketMode === 'open' ? 'active' : ''} onClick={() => { setTicketMode('open'); setSelectedTicket(data?.tickets.open[0] || null); }}>Open <b>{data?.metrics.openRth || 0}</b></button><button className={ticketMode === 'resolved' ? 'active' : ''} onClick={() => { setTicketMode('resolved'); setSelectedTicket(data?.tickets.resolved[0] || null); }}>Resolved <b>{data?.metrics.resolvedRth || 0}</b></button></div>
          <div className="inbox-layout">
            <div className="ticket-list">{tickets.length ? tickets.map((ticket) => <button key={`${ticket.id}-${ticket.resolved_at || ''}`} className={selectedTicket?.id === ticket.id ? 'selected' : ''} onClick={() => setSelectedTicket(ticket)}><div className="ticket-row"><span className={`status-dot ${ticket.status}`} /> <code>#{shortSession(ticket.session_id)}</code><time>{timeLabel(ticket.created_at)}</time></div><strong>{ticket.user_message}</strong><span>{ticket.ai_response}</span></button>) : <Empty icon={<CheckCircle2 />} title="Inbox clear" copy="No conversations are waiting for human action." />}</div>
            <div className="ticket-detail">{selectedTicket ? <>
              <div className="detail-head"><div><span className={`status-label ${selectedTicket.status}`}>{selectedTicket.status}</span><h3>Conversation #{shortSession(selectedTicket.session_id)}</h3><span>Created {timeLabel(selectedTicket.created_at)}</span></div><button className="icon-button" title="Copy session ID" onClick={() => { navigator.clipboard.writeText(selectedTicket.session_id); alert('Session ID copied.'); }}><Copy /></button></div>
              <div className="identity-strip"><UserRound /><div><strong>Anonymous portfolio visitor</strong><span>Chat ID: {selectedTicket.session_id}</span></div></div>
              <div className="conversation"><div className="bubble visitor"><span>Visitor</span><p>{selectedTicket.user_message}</p></div><div className="bubble scouse"><span>Scouse</span><p>{selectedTicket.ai_response}</p></div>{selectedTicket.admin_response && <div className="bubble admin"><span>Human response</span><p>{selectedTicket.admin_response}</p></div>}</div>
              {selectedTicket.status === 'open' ? <div className="reply-box"><textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a concise, helpful response…" /><div><span>{reply.length}/800</span><button className="quiet-button" onClick={async () => { if (await mutate({ action: 'resolve-ticket', ticketId: selectedTicket.id, sessionId: selectedTicket.session_id }, 'Ticket marked resolved.')) setSelectedTicket(null); }}><Check /> Resolve only</button><button className="primary-button" disabled={!reply.trim() || busy} onClick={async () => { if (await mutate({ action: 'reply-ticket', ticketId: selectedTicket.id, sessionId: selectedTicket.session_id, reply }, 'Reply delivered and ticket resolved.')) { setReply(''); setSelectedTicket(null); } }}><Send /> Send response</button></div></div> : <div className="resolved-note"><CheckCircle2 /> Resolved {timeLabel(selectedTicket.resolved_at)}</div>}
            </> : <Empty icon={<MessageSquare />} title="Select a request" copy="Choose a conversation to review its full context." />}</div>
          </div>
        </section>}
        {active === 'chats' && <section>
          <SectionHead kicker="Global AI record" title="Conversation intelligence" copy="A session-based record of every Scouse interaction and human handoff." />
          <div className="chat-layout"><div className="session-panel"><div className="search-field"><Search /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations" /></div><div className="session-list">{sessions.map((session) => <button key={session.id} className={effectiveSession === session.id ? 'selected' : ''} onClick={() => setSelectedSession(session.id)}><div><strong>#{shortSession(session.id)}</strong><time>{timeLabel(session.latest.created_at)}</time></div><p>{session.rows.find((row) => !row.user_message.startsWith('SYSTEM_'))?.user_message || 'Administrative update'}</p><span>{session.rows.length} interaction{session.rows.length === 1 ? '' : 's'}{session.rows.some((row) => row.requires_human) && <b>RTH</b>}</span></button>)}</div></div><div className="transcript-panel">{selectedChat ? <><div className="transcript-head"><div><h3>Session #{shortSession(selectedChat.id)}</h3><span>{selectedChat.id}</span></div><span>{selectedChat.rows.length} records</span></div><div className="transcript">{selectedChat.rows.map((row) => row.user_message.startsWith('SYSTEM_ADMIN_') ? <div className="bubble admin" key={row.id}><span>Human operator · {timeLabel(row.created_at)}</span><p>{row.ai_response}</p></div> : <div className="exchange" key={row.id}><div className="bubble visitor"><span>Visitor · {timeLabel(row.created_at)}</span><p>{row.user_message}</p></div><div className="bubble scouse"><span>Scouse</span><p>{row.ai_response}</p></div></div>)}</div></> : <Empty icon={<MessageSquare />} title="No conversation selected" copy="Choose a session to see its transcript." />}</div></div>
        </section>}
        {active === 'blog' && <section>
          <SectionHead kicker="Publishing workspace" title="Blog Engine" copy="Draft, format, preview, and publish long-form thinking from one focused workspace." action={<button className="secondary-button" onClick={() => { setBlog(EMPTY_BLOG); setEditorView('write'); }}><Plus /> New article</button>} />
          <div className="blog-grid"><form className="editor-card" onSubmit={async (e) => { e.preventDefault(); if (await mutate({ action: 'save-blog', record: blog }, blog.id ? 'Article updated.' : 'Article published.')) setBlog(EMPTY_BLOG); }}><div className="editor-meta"><label>Article title<input value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} placeholder="A clear, decisive title" /></label><label>URL slug<input value={blog.slug || ''} onChange={(e) => setBlog({ ...blog, slug: e.target.value })} placeholder="generated-from-title" /></label></div><label>Executive summary<textarea className="summary-input" value={blog.summary} onChange={(e) => setBlog({ ...blog, summary: e.target.value })} placeholder="What will the reader learn?" /></label><div className="editor-tabs"><div><button type="button" className={editorView === 'write' ? 'active' : ''} onClick={() => setEditorView('write')}><PencilLine /> Write</button><button type="button" className={editorView === 'preview' ? 'active' : ''} onClick={() => setEditorView('preview')}><MonitorCog /> Preview</button></div><label className="upload-button"><ImagePlus /> Add images<input type="file" accept="image/*" multiple onChange={(e) => uploadImages(e.target.files)} /></label></div>{editorView === 'write' ? <><div className="format-bar"><button type="button" title="Heading" onClick={() => insertFormat('## ', '', 'Section heading')}><Heading2 /></button><button type="button" title="Bold" onClick={() => insertFormat('**', '**')}><b>B</b></button><button type="button" title="Quote" onClick={() => insertFormat('> ', '', 'Quote')}><Quote /></button><button type="button" title="List" onClick={() => insertFormat('- ', '', 'List item')}><List /></button><button type="button" title="Inline code" onClick={() => insertFormat('`', '`', 'code')}><Code2 /></button></div><textarea ref={editorRef} className="content-editor" value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} placeholder={'Start with the core idea…\n\n## Add a clear section\n\nBuild your argument with evidence.'} /></> : <MarkdownPreview content={blog.content} />}<div className="editor-footer"><span>{blog.content.trim().split(/\s+/).filter(Boolean).length} words</span><button className="primary-button" disabled={busy}><ArrowUpRight /> {blog.id ? 'Update article' : 'Publish article'}</button></div></form><aside className="blog-side"><div className="guide-card"><span className="eyebrow">Formatting guide</span><h3>Editorial syntax</h3><div><code>## Heading</code><span>Section heading</span><code>**Bold**</code><span>Strong emphasis</span><code>&gt; Quote</code><span>Block quote</span><code>- Item</code><span>Bullet list</span><code>![Alt](url)</code><span>Inline image</span><code>`code`</code><span>Technical term</span></div><p>Use “Add images” to upload up to eight assets at once. Image blocks are inserted exactly where you can move them between paragraphs.</p></div><div className="library-card"><div><span className="eyebrow">Published library</span><b>{data?.blogs.length || 0}</b></div>{data?.blogs.map((item) => <button key={item.id} onClick={() => { setBlog(item); setEditorView('write'); }}><div><strong>{item.title}</strong><span>{timeLabel(item.created_at)}</span></div><PencilLine /></button>)}</div></aside></div>
        </section>}
        {active === 'games' && <section>
          <SectionHead kicker="Interactive portfolio" title="Games Drawer" copy="Track the complete live game portfolio and maintain the knowledge records used by Scouse." action={<a className="secondary-button" href="/games" target="_blank"><ArrowUpRight /> Open public arcade</a>} />
          <div className="game-summary"><div><Gamepad2 /><span><b>{GAME_CATALOG.length}</b> published experiences</span></div><div><FileText /><span><b>{data?.games.length || 0}</b> AI knowledge records</span></div></div>
          <div className="game-layout"><div className="catalog-grid">{GAME_CATALOG.map(({ name, path, description }, index) => { const recorded = data?.games.some((game) => game.name.toLowerCase() === name.toLowerCase()); return <article className="game-card" key={path}><div><span>{String(index + 1).padStart(2, '0')}</span><i className={recorded ? 'recorded' : ''}>{recorded ? 'Recorded' : 'Route live'}</i></div><h3>{name}</h3><p>{description}</p><a href={path} target="_blank">Launch game <ArrowUpRight /></a></article>; })}</div><aside className="game-records"><h3>Scouse knowledge records</h3><p>These records supply game descriptions and hints to the AI guide.</p><button className="secondary-button sync-button" onClick={() => mutate({ action: 'sync-games' }, 'Live game catalog synchronized.')}><RefreshCw /> Sync live catalog</button><form onSubmit={async (e) => { e.preventDefault(); if (await mutate({ action: 'add-game', record: gameForm }, 'Game knowledge record added.')) setGameForm({ name: '', description: '', hint: '' }); }}><input value={gameForm.name} onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })} placeholder="Game name" /><textarea value={gameForm.description} onChange={(e) => setGameForm({ ...gameForm, description: e.target.value })} placeholder="Description" /><input value={gameForm.hint} onChange={(e) => setGameForm({ ...gameForm, hint: e.target.value })} placeholder="Player hint (optional)" /><button className="primary-button"><Plus /> Add record</button></form><div className="record-list">{data?.games.map((game) => <div key={game.id}><span><b>{game.name}</b><small>{game.description}</small></span><button className="icon-button danger" onClick={() => mutate({ action: 'delete-game', id: game.id }, 'Game record removed.')}><Trash2 /></button></div>)}</div></aside></div>
        </section>}
        {active === 'settings' && <section>
          <SectionHead kicker="Control center" title="Portfolio settings" copy="Maintain the live biography source and entrance experience without exposing database access." />
          <div className="settings-grid"><div className="settings-card"><UserRound /><h3>Scouse biography source</h3><p>This is the live profile context used by the portfolio assistant.</p><textarea value={about} onChange={(e) => setAbout(e.target.value)} /><button className="primary-button" onClick={() => mutate({ action: 'save-about', content: about }, 'Biography source updated.')}><Check /> Save biography</button></div><div className="settings-card"><Sparkles /><h3>Entrance experience</h3><p>Control the branded loading sequence shown before the portfolio.</p><label>Duration (seconds)<input type="number" min="2" max="12" value={String(settings.duration || 5)} onChange={(e) => setSettings({ ...settings, duration: Number(e.target.value) })} /></label><label>Skip label<input value={String(settings.skip_text || 'Skip')} onChange={(e) => setSettings({ ...settings, skip_text: e.target.value })} /></label><label>Background image URL<input value={String(settings.background_image || '')} onChange={(e) => setSettings({ ...settings, background_image: e.target.value })} /></label><button className="primary-button" onClick={() => mutate({ action: 'save-settings', record: settings }, 'Entrance settings updated.')}><Check /> Save settings</button></div></div>
        </section>}
      </div>
    </section>
  </main>;
}

function Login({ credentials, setCredentials, submit, busy, notice }: { credentials: { username: string; password: string }; setCredentials: (value: { username: string; password: string }) => void; submit: (e: FormEvent) => void; busy: boolean; notice: { tone: string; text: string } | null }) {
  return <main className="admin-login"><div className="login-atmosphere"><div className="login-orbit one" /><div className="login-orbit two" /></div><section className="login-story"><div className="admin-brand"><div className="admin-mark">KH</div><div><strong>KHNCO.</strong><small>Digital leadership</small></div></div><div><span className="eyebrow">Private operations suite</span><h1>Run the portfolio<br /><em>with clarity.</em></h1><p>One protected workspace for audience intelligence, human support, publishing, and interactive products.</p></div><footer><ShieldCheck /> Encrypted administrative session</footer></section><section className="login-panel"><form onSubmit={submit}><div className="login-icon"><LockKeyhole /></div><span className="eyebrow">Authorized access</span><h2>Welcome back</h2><p>Sign in to the portfolio control center.</p>{notice && <div className="form-error"><AlertCircle />{notice.text}</div>}<label>Username<input autoComplete="username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} placeholder="Administrative username" /></label><label>Password<input type="password" autoComplete="current-password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} placeholder="Administrative password" /></label><button className="login-button" disabled={busy}>{busy ? <Loader2 className="spin" /> : <LockKeyhole />} Secure sign in <ChevronRight /></button><small>Credentials are verified server-side and are never stored in the browser.</small></form></section></main>;
}

function Overview({ data, setActive }: { data: Payload | null; setActive: (id: string) => void }) {
  const cards = [
    ['AI queries', data?.metrics.queries || 0, MessageSquare, 'Total visitor questions'],
    ['Open RTH', data?.metrics.openRth || 0, AlertCircle, 'Needs human action'],
    ['Resolved RTH', data?.metrics.resolvedRth || 0, CheckCircle2, 'Completed interventions'],
    ['Chat sessions', data?.metrics.sessions || 0, Users, 'Unique conversations'],
  ] as const;
  const recent = (data?.chatLogs || []).filter((row) => !row.user_message.startsWith('SYSTEM_')).slice(0, 5);
  return <section><SectionHead kicker="Operational command" title="Portfolio overview" copy="A live view of AI engagement, human support, publishing, and interactive experiences." /><div className="metric-grid">{cards.map(([label, value, Icon, copy], index) => <article className={`metric-card metric-${index}`} key={label}><div><Icon /><span>{label}</span></div><strong>{value.toLocaleString()}</strong><p>{copy}</p></article>)}</div><div className="overview-grid"><div className="panel-card"><div className="panel-head"><div><span className="eyebrow">Latest activity</span><h3>AI query stream</h3></div><button className="text-button" onClick={() => setActive('chats')}>View all <ArrowUpRight /></button></div><div className="activity-list">{recent.map((row) => <div key={row.id}><span className={row.requires_human ? 'activity-icon urgent' : 'activity-icon'}>{row.requires_human ? <AlertCircle /> : <MessageSquare />}</span><div><strong>{row.user_message}</strong><span>Session #{shortSession(row.session_id)}</span></div><time>{timeLabel(row.created_at)}</time></div>)}</div></div><div className="panel-card support-card"><span className="eyebrow">Support health</span><h3>{data?.metrics.openRth ? `${data.metrics.openRth} request${data.metrics.openRth === 1 ? '' : 's'} waiting` : 'Inbox is clear'}</h3><p>{data?.metrics.openRth ? 'Review the queue and respond while visitor context is current.' : 'All routed conversations have been handled.'}</p><button className="primary-button" onClick={() => setActive('rth')}>Open RTH inbox <ArrowUpRight /></button><div className="support-stats"><span><b>{data?.metrics.articles || 0}</b> Articles</span><span><b>{data?.metrics.gameRecords || 0}</b> Game records</span></div></div></div></section>;
}

function SectionHead({ kicker, title, copy, action }: { kicker: string; title: string; copy: string; action?: ReactNode }) { return <div className="section-head"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{copy}</p></div>{action}</div>; }
function Empty({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) { return <div className="empty-state">{icon}<strong>{title}</strong><span>{copy}</span></div>; }
