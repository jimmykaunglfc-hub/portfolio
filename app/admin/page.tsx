'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Gamepad2, 
  User, 
  Lock, 
  Trash2, 
  Plus, 
  Eye, 
  Edit3, 
  Bold, 
  Heading, 
  Code, 
  List, 
  ExternalLink,
  LogOut,
  Search,
  FileText
} from 'lucide-react';

export default function AdvancedAdminConsole() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Live Database States
  const [aboutContent, setAboutContent] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);

  // Form Management States
  const [newBlog, setNewBlog] = useState({ title: '', summary: '', content: '' });
  const [newGame, setNewGame] = useState({ name: '', description: '', hint: '' });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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
      setTimeout(() => setError(''), 4000);
      return null;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiRequest({ action: 'fetch', table: 'about_me' });
    if (res) {
      setIsAuthorized(true);
      fetchDashboardData();
    }
  };

  const fetchDashboardData = async () => {
    const aboutRes = await apiRequest({ action: 'fetch', table: 'about_me' });
    if (aboutRes && aboutRes.data?.length > 0) {
      const latestAbout = [...aboutRes.data].sort((a: any, b: any) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )[0];
      setAboutContent(latestAbout?.content || '');
    }

    const blogsRes = await apiRequest({ action: 'fetch', table: 'blog_posts' });
    if (blogsRes) setBlogs(blogsRes.data || []);

    const gamesRes = await apiRequest({ action: 'fetch', table: 'games_data' });
    if (gamesRes) setGames(gamesRes.data || []);
  };

  const handleUpdateAbout = async () => {
    const res = await apiRequest({ action: 'insert', table: 'about_me', record: { content: aboutContent } });
    if (res) showSuccess('Biography record updated.');
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) return;
    
    // Generate programmatic URL slug out of the post title automatically
    const generatedSlug = newBlog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const res = await apiRequest({ 
      action: 'insert', 
      table: 'blog_posts', 
      record: { ...newBlog, slug: generatedSlug } 
    });
    
    if (res) {
      setNewBlog({ title: '', summary: '', content: '' });
      setIsPreviewMode(false);
      fetchDashboardData();
      showSuccess('Dynamic rich-text article successfully indexed to Supabase.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Drop this article row permanently from database?')) return;
    const res = await apiRequest({ action: 'delete', table: 'blog_posts', id });
    if (res) {
      fetchDashboardData();
      showSuccess('Article entity deleted.');
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGame.name || !newGame.description || !newGame.hint) return;
    const res = await apiRequest({ action: 'insert', table: 'games_data', record: newGame });
    if (res) {
      setNewGame({ name: '', description: '', hint: '' });
      fetchDashboardData();
      showSuccess('New game manifest compiled.');
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm('Drop this game profile from database?')) return;
    const res = await apiRequest({ action: 'delete', table: 'games_data', id });
    if (res) {
      fetchDashboardData();
      showSuccess('Game row dropped.');
    }
  };

  const injectMarkdownSyntax = (syntax: string) => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    let replacement = "";
    if (syntax === 'bold') replacement = `**${selectedText || 'bold text'}**`;
    if (syntax === 'heading') replacement = `\n## ${selectedText || 'Heading'}\n`;
    if (syntax === 'code') replacement = `\n\`\`\`typescript\n${selectedText || '// code here'}\n\`\`\`\n`;
    if (syntax === 'list') replacement = `\n- ${selectedText || 'List item'}\n`;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setNewBlog({ ...newBlog, content: newContent });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 10);
  };

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  const filteredBlogs = blogs.filter(b => b.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredGames = games.filter(g => g.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  // ---------------- AUTH LOCK SCREEN ----------------
  if (!isAuthorized) {
    return (
      <main className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 font-sans antialiased">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        <div className="relative w-full max-w-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Administrative Node Validation</h1>
          <p className="text-xs text-zinc-400 mb-6">Enter secure ecosystem password credentials to authorize direct write pipelines.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="System Master Key"
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
              required
            />
            {error && <p className="text-xs font-semibold text-red-400">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20">
              Unlock Console Core
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ---------------- FULL SAAS PANEL LAYOUT ----------------
  return (
    <main className="fixed inset-0 z-[100] w-screen h-screen flex bg-[#09090b] text-zinc-200 font-sans antialiased overflow-hidden select-none">
      
      {/* SIDE NAVIGATION BAR */}
      <section className="w-64 border-r border-zinc-800 bg-[#0d0d11] flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs text-white tracking-tighter">PM</div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-none">Control Center</h2>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wide flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Node Connected
              </span>
            </div>
          </div>
          
          <nav className="p-4 space-y-1.5">
            {[
              { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
              { id: 'about', label: 'Biography Core', icon: User },
              { id: 'blogs', label: 'Blog Engine', icon: BookOpen },
              { id: 'games', label: 'Games Drawer', icon: Gamepad2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsPreviewMode(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/50' 
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-950/40">
          <button onClick={() => setIsAuthorized(false)} className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" /> Exit Session
          </button>
        </div>
      </section>

      {/* SYSTEM MAIN WORKSPACE PANEL */}
      <section className="flex-1 flex flex-col bg-[#09090b] overflow-hidden">
        
        {/* TOP STATUS HEADER ROW */}
        <header className="h-16 border-b border-zinc-800 bg-[#0d0d11]/50 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                placeholder="Query database clusters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {message && <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium rounded-lg">{message}</span>}
            {error && <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-medium rounded-lg">{error}</span>}
            <span className="text-zinc-500">v2.1.0-prod</span>
          </div>
        </header>

        {/* COMPONENT MODULE INJECTION PANEL */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* TAB: SYSTEM OVERVIEW (ANALYTICS SUMMARY METER) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { label: 'Active Insights Indexed', value: blogs.length, desc: 'Live dynamic articles cataloged', icon: BookOpen, color: 'text-blue-400' },
                  { label: 'Custom App Environments', value: games.length, desc: 'Interactive systems online', icon: Gamepad2, color: 'text-cyan-400' },
                  { label: 'Operational Schema Pools', value: '1 Default', desc: 'Secure Postgres instances running', icon: FileText, color: 'text-purple-400' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">{stat.label}</p>
                          <h3 className="text-3xl font-black text-white tracking-tight mt-2">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 ${stat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 mt-4 leading-none">{stat.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-2">Supabase Cluster Status</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                  Your platform architecture is fully optimized. Direct structural queries utilize highly optimized indexing pools passing through secure Row Level Security configurations. Content delivery pipeline latency remains minimized.
                </p>
              </div>
            </div>
          )}

          {/* TAB: BIOGRAPHY CORE */}
          {activeTab === 'about' && (
            <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-md max-w-4xl">
              <div className="mb-4">
                <h2 className="text-base font-bold text-white">Modify Portfolio Biography Layer</h2>
                <p className="text-xs text-zinc-500 mt-1">This context block updates your AI agent semantic awareness and your primary portfolio overview layout summaries concurrently.</p>
              </div>
              <textarea
                value={aboutContent}
                onChange={(e) => setAboutContent(e.target.value)}
                rows={10}
                className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 text-sm leading-relaxed outline-none focus:border-zinc-700 transition-colors"
              />
              <button onClick={handleUpdateAbout} className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-blue-500/10">
                Commit Changes
              </button>
            </div>
          )}

          {/* TAB: BLOG INSIGHT ENGINE */}
          {activeTab === 'blogs' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
              
              {/* DENSE RICH TEXT AUTHORING PANEL */}
              <form onSubmit={handleAddBlog} className="xl:col-span-2 bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h2 className="text-sm font-bold text-white">Author New Insight Record</h2>
                  <button 
                    type="button" 
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-all"
                  >
                    {isPreviewMode ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {isPreviewMode ? 'Editor View' : 'Rich Layout Preview'}
                  </button>
                </div>

                {!isPreviewMode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Article Headline</label>
                      <input type="text" placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm outline-none focus:border-zinc-700" required />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Card Excerpt Summary (Plain-text)</label>
                      <textarea placeholder="Dynamic card description layer..." value={newBlog.summary} onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })} rows={2} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none focus:border-zinc-700 leading-relaxed resize-none" required />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Rich Text Body Content (Markdown Sync)</label>
                        <div className="flex border border-zinc-800 bg-zinc-950 rounded-lg p-0.5 gap-0.5">
                          {[
                            { icon: Heading, action: 'heading', tip: 'H2 Header' },
                            { icon: Bold, action: 'bold', tip: 'Bold Element' },
                            { icon: Code, action: 'code', tip: 'Code Injector' },
                            { icon: List, action: 'list', tip: 'Bullet Layer' }
                          ].map((tool, tIdx) => {
                            const ToolIcon = tool.icon;
                            return (
                              <button key={tIdx} type="button" onClick={() => injectMarkdownSyntax(tool.action)} title={tool.tip} className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                <ToolIcon className="w-3 h-3" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <textarea 
                        id="markdown-editor"
                        placeholder="# Use markdown structures to formulate high-fidelity technical writeups..." 
                        value={newBlog.content} 
                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} 
                        rows={12} 
                        className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 text-xs font-mono outline-none focus:border-zinc-700 leading-relaxed" 
                      />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Push Article Registry Live
                    </button>
                  </div>
                ) : (
                  /* LIVE RICH TEXT COMPILING VIEW PREVIEW */
                  <div className="space-y-4">
                    <h1 className="text-2xl font-black text-white">{newBlog.title || 'Untitled Article Output'}</h1>
                    <p className="text-xs text-zinc-400 border-l-2 border-zinc-700 pl-3 italic">{newBlog.summary || 'Excerpt overview paragraph placeholder.'}</p>
                    <hr className="border-zinc-800" />
                    <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line font-normal font-sans space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {newBlog.content || 'No text structures processed. Switch to Editor View to register text blocks.'}
                    </div>
                  </div>
                )}
              </form>

              {/* INDUSTRIAL CONTENT MANAGEMENT LIST */}
              <div className="xl:col-span-3 space-y-3">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Indexed Entries ({filteredBlogs.length})</span>
                </div>
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="bg-[#0d0d11] border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex justify-between items-center gap-4 transition-all shadow-sm">
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2.5">
                        <h4 className="font-bold text-sm text-white truncate max-w-md">{blog.title}</h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wide">
                          Synced
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-1 max-w-xl">{blog.summary}</p>
                      <div className="flex items-center gap-4 text-[10px] text-zinc-600 pt-1 font-medium font-mono">
                        <span>Slug: /{blog.slug || 'autogen'}</span>
                        <span>Date: {new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors" title="Review Target Live Endpoint">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors" title="Drop Matrix Row">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredBlogs.length === 0 && <p className="text-center text-xs text-zinc-600 py-12">No database matching records resolved.</p>}
              </div>
            </div>
          )}

          {/* TAB: GAMES CATALOG */}
          {activeTab === 'games' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
              <form onSubmit={handleAddGame} className="xl:col-span-2 bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-sm">
                <h2 className="text-sm font-bold text-white border-b border-zinc-800 pb-3">Deploy New Application Instance</h2>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">App Framework Title</label>
                  <input type="text" placeholder="Instance System Identity" value={newGame.name} onChange={(e) => setNewGame({ ...newGame, name: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm outline-none focus:border-zinc-700" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Operational Canvas Description</label>
                  <textarea placeholder="Architecture specifications..." value={newGame.description} onChange={(e) => setNewGame({ ...newGame, description: e.target.value })} rows={3} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none focus:border-zinc-700 leading-relaxed" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Context Model Prompt Hint</label>
                  <input type="text" placeholder="AI Core optimization prompt guidelines..." value={newGame.hint} onChange={(e) => setNewGame({ ...newGame, hint: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none focus:border-zinc-700" required />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Commit Game Node
                </button>
              </form>

              <div className="xl:col-span-3 space-y-3">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Compiled Catalogs ({filteredGames.length})</span>
                </div>
                {filteredGames.map((game) => (
                  <div key={game.id} className="bg-[#0d0d11] border border-zinc-800 rounded-xl p-4 flex justify-between items-center gap-4 shadow-sm">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">{game.name}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">{game.description}</p>
                      <p className="text-[10px] font-semibold font-mono text-cyan-400 pt-1 leading-none">AI Guideline: {game.hint}</p>
                    </div>
                    <button onClick={() => handleDeleteGame(game.id)} className="p-2 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {filteredGames.length === 0 && <p className="text-center text-xs text-zinc-600 py-12">No active application profiles loaded.</p>}
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}