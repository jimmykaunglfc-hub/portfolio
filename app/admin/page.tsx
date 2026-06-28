'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, BookOpen, Gamepad2, User, Lock, Trash2, Plus, Eye, Edit3, 
  Bold, Heading, Code, List, ExternalLink, LogOut, Search, FileText, Image, CheckCircle,
  MessageSquare, Clock, ShieldAlert, LogIn, Send, AlertTriangle, Settings, Smartphone
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdvancedAdminConsole() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Live Database States
  const [aboutContent, setAboutContent] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [rthTickets, setRthTickets] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Splash Screen Config States
  const [splashConfig, setSplashConfig] = useState({ id: null, background_image: '', duration: 5, skip_text: 'Skip', active: true });

  // Form Management States
  const [newBlog, setNewBlog] = useState({ title: '', summary: '', content: '', cover_image: '' });
  const [newGame, setNewGame] = useState({ name: '', description: '', hint: '' });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  
  const [uploadedGallery, setUploadedGallery] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const splashInputRef = useRef<HTMLInputElement>(null);

  const apiRequest = async (payload: any) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Dashboard execution anomaly detected.');
      return json;
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
      return null;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const expectedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
    if (username !== expectedUsername) {
      setError('Invalid Administrative Username.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const res = await apiRequest({ action: 'fetch', table: 'about_me' });
    if (res) {
      setIsAuthorized(true);
      fetchDashboardData();
    }
  };

  const fetchDashboardData = async () => {
    const aboutRes = await apiRequest({ action: 'fetch', table: 'about_me' });
    if (aboutRes && aboutRes.data?.length > 0) {
      const latestAbout = [...aboutRes.data].sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())[0];
      setAboutContent(latestAbout?.content || '');
    }

    const blogsRes = await apiRequest({ action: 'fetch', table: 'blog_posts' });
    if (blogsRes) setBlogs(blogsRes.data || []);

    const gamesRes = await apiRequest({ action: 'fetch', table: 'games_data' });
    if (gamesRes) setGames(gamesRes.data || []);

    fetchLogs();
    fetchSplashConfig();
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    if (supabaseUrl && supabaseKey) {
      // Fetch general chat logs
      const { data: logs, error: logsError } = await supabase
        .from('chat_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (logs) setChatLogs(logs);

      // Fetch RTH (Route to Human) Tickets
      const { data: tickets, error: ticketsError } = await supabase
        .from('chat_history')
        .select('*')
        .eq('requires_human', true)
        .order('created_at', { ascending: false });
      if (tickets) setRthTickets(tickets);
    }
    setLoadingLogs(false);
  };

  const fetchSplashConfig = async () => {
    if (supabaseUrl && supabaseKey) {
      const { data } = await supabase.from('app_settings').select('*').single();
      if (data) setSplashConfig(data);
    }
  };

  const handleUpdateAbout = async () => {
    const res = await apiRequest({ action: 'insert', table: 'about_me', record: { content: aboutContent } });
    if (res) showSuccess('Biography record updated successfully.');
  };

  const handleUpdateSplashConfig = async () => {
    if (!supabaseUrl) return;
    const { error } = await supabase.from('app_settings').upsert({ ...splashConfig, updated_at: new Date() });
    if (error) setError(error.message);
    else showSuccess('Mobile App Splash Screen configuration synced.');
  };

  // Human Admin Reply to AI Chat
  const handleSendAdminReply = async (ticketId: string, sessionId: string) => {
    if (!replyText) return;
    if (!supabaseUrl) return;

    // Insert the admin's reply into the chat history for that user session
    const { error } = await supabase.from('chat_history').insert({
      session_id: sessionId,
      user_message: "SYSTEM_ADMIN_OVERRIDE",
      ai_response: replyText,
      requires_human: false
    });

    // Mark the original ticket as resolved
    await supabase.from('chat_history').update({ requires_human: false }).eq('id', ticketId);

    if (!error) {
      showSuccess('Human response transmitted to user session.');
      setReplyText('');
      setActiveTicketId(null);
      fetchLogs();
    } else {
      setError('Failed to transmit message.');
    }
  };

  const handleImageFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>, isSplash = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError('');
    try {
      const file = files[0];
      if (file.size > 4.5 * 1024 * 1024) throw new Error(`File is too large.`);
      
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') resolve(reader.result.split(',')[1]);
          else reject(new Error('Failed parsing image file.'));
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      const res = await apiRequest({ action: 'upload-image', fileName: file.name, fileType: file.type, fileBase64: base64String });

      if (res && res.url) {
        if (isSplash) {
          setSplashConfig({ ...splashConfig, background_image: res.url });
          showSuccess(`Splash background updated.`);
        } else {
          setUploadedGallery((prev) => [...prev, res.url]);
          showSuccess(`Asset uploaded.`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (splashInputRef.current) splashInputRef.current.value = '';
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) return;
    const generatedSlug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const res = await apiRequest({ action: 'insert', table: 'blog_posts', record: { ...newBlog, slug: generatedSlug } });
    if (res) {
      setNewBlog({ title: '', summary: '', content: '', cover_image: '' });
      setUploadedGallery([]);
      setIsPreviewMode(false);
      fetchDashboardData();
      showSuccess('Article indexed.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Drop this article?')) return;
    const res = await apiRequest({ action: 'delete', table: 'blog_posts', id });
    if (res) { fetchDashboardData(); showSuccess('Article deleted.'); }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiRequest({ action: 'insert', table: 'games_data', record: newGame });
    if (res) { setNewGame({ name: '', description: '', hint: '' }); fetchDashboardData(); showSuccess('Game compiled.'); }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm('Drop game?')) return;
    const res = await apiRequest({ action: 'delete', table: 'games_data', id });
    if (res) { fetchDashboardData(); showSuccess('Game dropped.'); }
  };

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  const filteredBlogs = blogs.filter(b => b.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGames = games.filter(g => g.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredChats = chatLogs.filter(c => c.user_message?.toLowerCase().includes(searchQuery.toLowerCase()) || c.ai_response?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isAuthorized) {
    return (
      <main className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 font-sans antialiased">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="relative w-full max-w-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Administrative Node</h1>
          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-white outline-none" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Master Key" className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-white outline-none" required />
            {error && <p className="text-xs font-semibold text-red-400 text-center">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg">Unlock Console</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="fixed inset-0 z-[100] w-screen h-screen flex bg-[#09090b] text-zinc-200 font-sans antialiased overflow-hidden select-none">
      
      {/* SIDE NAVIGATION BAR */}
      <section className="w-64 border-r border-zinc-800 bg-[#0d0d11] flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs text-white">PM</div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Control Center</h2>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live</span>
            </div>
          </div>
          <nav className="p-4 space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'tickets', label: 'RTH Inbox', icon: AlertTriangle, badge: rthTickets.length },
              { id: 'chat', label: 'AI Telemetry', icon: MessageSquare },
              { id: 'blogs', label: 'Blog Engine', icon: BookOpen },
              { id: 'games', label: 'Games Drawer', icon: Gamepad2 },
              { id: 'appconfig', label: 'App Settings', icon: Smartphone },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsPreviewMode(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id ? 'bg-zinc-800 text-white border border-zinc-700/50' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}`}
                >
                  <div className="flex items-center gap-3"><Icon className="w-4 h-4" /> {tab.label}</div>
                  {(tab.badge ?? 0) > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px]">{tab.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-zinc-800"><button onClick={() => setIsAuthorized(false)} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10"><LogOut className="w-4 h-4" /> Exit Session</button></div>
      </section>

      {/* SYSTEM MAIN WORKSPACE PANEL */}
      <section className="flex-1 flex flex-col bg-[#09090b] overflow-hidden">
        <header className="h-16 border-b border-zinc-800 bg-[#0d0d11]/50 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="relative w-96"><Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" /><input type="text" placeholder="Search logs and data..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none" /></div>
          <div className="flex items-center gap-3 text-xs">
            {message && <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium rounded-lg">{message}</span>}
            {error && <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-medium rounded-lg">{error}</span>}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-sm"><p className="text-[10px] text-zinc-500 uppercase">Active Tickets</p><h3 className="text-3xl font-black text-red-400 mt-2">{rthTickets.length}</h3></div>
              <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-sm"><p className="text-[10px] text-zinc-500 uppercase">Total AI Queries</p><h3 className="text-3xl font-black text-white mt-2">{chatLogs.length}</h3></div>
              <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-sm"><p className="text-[10px] text-zinc-500 uppercase">Articles</p><h3 className="text-3xl font-black text-white mt-2">{blogs.length}</h3></div>
              <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-sm"><p className="text-[10px] text-zinc-500 uppercase">Simulations</p><h3 className="text-3xl font-black text-white mt-2">{games.length}</h3></div>
            </div>
          )}

          {/* TAB: RTH INBOX (NEW!) */}
          {activeTab === 'tickets' && (
            <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
                <h2 className="text-base font-bold text-white flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" /> Human Override Requests</h2>
                <button onClick={fetchLogs} className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg">Refresh</button>
              </div>
              <div className="divide-y divide-zinc-800">
                {rthTickets.length === 0 ? (
                  <p className="p-10 text-center text-zinc-500 text-sm">Inbox Zero. No human intervention required.</p>
                ) : (
                  rthTickets.map((ticket) => (
                    <div key={ticket.id} className="p-6 hover:bg-zinc-900/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Session ID: {ticket.session_id.substring(0,8)}</span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(ticket.created_at).toLocaleString()}</span>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-sm text-blue-200 mb-4 font-medium">
                        User Query: "{ticket.user_message}"
                      </div>
                      
                      {activeTicketId === ticket.id ? (
                        <div className="mt-4 flex gap-2">
                          <input type="text" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type your direct human reply to the user..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-sm text-white outline-none" />
                          <button onClick={() => handleSendAdminReply(ticket.id, ticket.session_id)} className="bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl text-xs font-bold flex items-center gap-2"><Send className="w-4 h-4"/> Send</button>
                          <button onClick={() => setActiveTicketId(null)} className="bg-zinc-800 text-zinc-300 px-4 rounded-xl text-xs font-bold hover:bg-zinc-700">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setActiveTicketId(ticket.id)} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Reply as Admin</button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: AI CHAT TELEMETRY */}
          {activeTab === 'chat' && (
            <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-zinc-800 flex justify-between items-center"><h2 className="text-base font-bold text-white flex items-center gap-2"><MessageSquare className="w-4 h-4 text-emerald-500" /> Global Chat Telemetry</h2><button onClick={fetchLogs} className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg">Refresh</button></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr><th className="px-6 py-4">Time</th><th className="px-6 py-4 w-1/3">User Query</th><th className="px-6 py-4">AI / Admin Response</th></tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredChats.map((log) => (
                      <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">{new Date(log.created_at).toLocaleTimeString()}</td>
                        <td className="px-6 py-4 text-zinc-300 font-medium align-top">{log.user_message}</td>
                        <td className="px-6 py-4 text-zinc-400 align-top"><div className="max-h-32 overflow-y-auto custom-scrollbar">{log.ai_response}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: APP SPLASH SCREEN CONFIG (NEW!) */}
          {activeTab === 'appconfig' && (
            <div className="max-w-2xl bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Smartphone className="w-5 h-5 text-purple-500"/> Mobile App Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Splash Screen Background</label>
                  <div className="flex items-end gap-4">
                    {splashConfig.background_image ? (
                      <img src={splashConfig.background_image} className="w-32 h-64 object-cover rounded-xl border border-zinc-700" alt="Splash Preview" />
                    ) : (
                      <div className="w-32 h-64 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-xs">No Image</div>
                    )}
                    <div className="flex-1 space-y-2">
                      <button onClick={() => splashInputRef.current?.click()} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold w-full">{isUploading ? 'Uploading...' : 'Upload New Background'}</button>
                      <input type="file" ref={splashInputRef} accept="image/*" onChange={(e) => handleImageFilesUpload(e, true)} className="hidden" />
                      <p className="text-[10px] text-zinc-500">For best results, upload a 9:16 vertical ratio image under 2MB.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Countdown Duration (Seconds)</label>
                    <input type="number" min="1" max="15" value={splashConfig.duration} onChange={(e) => setSplashConfig({...splashConfig, duration: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Skip Button Text</label>
                    <input type="text" value={splashConfig.skip_text} onChange={(e) => setSplashConfig({...splashConfig, skip_text: e.target.value})} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none" />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <button onClick={handleUpdateSplashConfig} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm w-full transition-colors shadow-lg shadow-blue-500/20">Sync App Configuration</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BLOG INSIGHT ENGINE */}
          {activeTab === 'blogs' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
              <form onSubmit={handleAddBlog} className="xl:col-span-2 bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h2 className="text-sm font-bold text-white">Author New Insight Record</h2>
                  <button type="button" onClick={() => setIsPreviewMode(!isPreviewMode)} className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300">
                    {isPreviewMode ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {isPreviewMode ? 'Editor View' : 'Rich Layout Preview'}
                  </button>
                </div>
                {!isPreviewMode ? (
                  <div className="space-y-4">
                    <input type="text" placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm outline-none" required />
                    
                    <div className="border border-zinc-800 bg-zinc-950/40 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2"><Image className="w-3.5 h-3.5 text-blue-400" /> Media Pipeline</label>
                        <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="text-[10px] bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white px-2.5 py-1 rounded font-bold uppercase">{isUploading ? 'Uploading...' : 'Upload'}</button>
                        <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={(e) => handleImageFilesUpload(e, false)} className="hidden" />
                      </div>
                      {uploadedGallery.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 pt-2">
                          {uploadedGallery.map((url, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-zinc-800 h-14 bg-zinc-950 cursor-pointer" onClick={() => setNewBlog({ ...newBlog, cover_image: url })}>
                              <img src={url} className="w-full h-full object-cover" alt="Thumb" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <textarea placeholder="Summary excerpt..." value={newBlog.summary} onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })} rows={2} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none resize-none custom-scrollbar" required />
                    <textarea id="markdown-editor" placeholder="Body markdown..." value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} rows={10} className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 text-xs font-mono outline-none custom-scrollbar" />
                    <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-bold text-xs uppercase tracking-wider">Push Article Live</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {newBlog.cover_image && <img src={newBlog.cover_image} className="w-full h-32 object-cover rounded-xl" alt="Cover Preview" />}
                    <h1 className="text-2xl font-black text-white">{newBlog.title || 'Untitled Article'}</h1>
                    <p className="text-xs text-zinc-400 italic">{newBlog.summary}</p>
                    <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line font-sans space-y-4">{newBlog.content}</div>
                  </div>
                )}
              </form>

              <div className="xl:col-span-3 space-y-3">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4 overflow-hidden">
                      {blog.cover_image && <img src={blog.cover_image} className="w-12 h-12 rounded-lg object-cover" alt="Cover" />}
                      <div className="truncate"><h4 className="font-bold text-sm text-white truncate max-w-sm">{blog.title}</h4></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GAMES CATALOG */}
          {activeTab === 'games' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
              <form onSubmit={handleAddGame} className="xl:col-span-2 bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-sm font-bold text-white border-b border-zinc-800 pb-3">Deploy New Application Instance</h2>
                <input type="text" placeholder="Instance Identity" value={newGame.name} onChange={(e) => setNewGame({ ...newGame, name: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm outline-none" required />
                <textarea placeholder="Specifications..." value={newGame.description} onChange={(e) => setNewGame({ ...newGame, description: e.target.value })} rows={3} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none custom-scrollbar" required />
                <input type="text" placeholder="AI optimization path..." value={newGame.hint} onChange={(e) => setNewGame({ ...newGame, hint: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none" required />
                <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-bold text-xs uppercase tracking-wider">Commit Game Node</button>
              </form>
              <div className="xl:col-span-3 space-y-3">
                {filteredGames.map((game) => (
                  <div key={game.id} className="bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 flex justify-between items-center gap-4">
                    <div><h4 className="font-bold text-sm text-white">{game.name}</h4><p className="text-xs text-zinc-500">{game.description}</p></div>
                    <button onClick={() => handleDeleteGame(game.id)} className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}