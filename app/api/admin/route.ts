import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Privileged server client configuration
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const { action, table, id, record, password } = await req.json();

    // Enforce console password authentication
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized access credential validation failure.' }, { status: 401 });
    }

    if (action === 'insert') {
      const { data, error } = await supabaseAdmin.from(table).insert(record).select();
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (action === 'delete') {
      const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (action === 'fetch') {
      const { data, error } = await supabaseAdmin.from(table).select('*');
      if (error) throw error;
      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: 'Invalid management operational signature.' }, { status: 400 });
  } catch (err: any) {
    console.error('Admin API operational failure:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}