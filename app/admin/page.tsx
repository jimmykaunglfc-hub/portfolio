'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, BookOpen, Gamepad2, User, Lock, Trash2, Plus, Eye, Edit3, 
  Bold, Heading, Code, List, ExternalLink, LogOut, Search, FileText, Image, CheckCircle,
  MessageSquare, Clock, ShieldAlert, LogIn
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase for fetching chat logs
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
  
  // New AI Chat Logs State
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Form Management States
  const [newBlog, setNewBlog] = useState({ title: '', summary: '', content: '', cover_image: '' });
  const [newGame, setNewGame] = useState({ name: '', description: '', hint: '' });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Image Asset Gallery States
  const [uploadedGallery, setUploadedGallery] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Clean Reference Core to prevent erratic double-trigger label behavior
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    
    // 1. Verify Username locally via Environment Variables
    const expectedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
    if (username !== expectedUsername) {
      setError('Invalid Administrative Username.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    // 2. Verify Password securely via your backend API
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

    // Fetch AI Chat Logs
    fetchLogs();
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    if (supabaseUrl && supabaseKey) {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (data) setChatLogs(data);
      if (error) console.error("Failed to fetch logs:", error);
    }
    setLoadingLogs(false);
  };

  const handleUpdateAbout = async () => {
    const res = await apiRequest({ action: 'insert', table: 'about_me', record: { content: aboutContent } });
    if (res) showSuccess('Biography record updated successfully.');
  };

  // Robust, Protected Multi-File Binary Asset Processing Pipeline
  const handleImageFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError('');
    const urlsLoaded: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Safeguard to intercept files exceeding 4.5MB Vercel serverless limits early
        if (file.size > 4.5 * 1024 * 1024) {
          throw new Error(`"${file.name}" is too large. Please use a compressed JPG or keep assets under 4.5MB.`);
        }
        
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1]);
            } else {
              reject(new Error('Failed parsing image file binary matrix stream.'));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });

        const res = await apiRequest({
          action: 'upload-image',
          fileName: file.name,
          fileType: file.type,
          fileBase64: base64String
        });

        if (res && res.url) {
          urlsLoaded.push(res.url);
        } else {
          throw new Error('Server cluster rejected image processing storage operations.');
        }
      }

      if (urlsLoaded.length > 0) {
        setUploadedGallery((prev) => [...prev, ...urlsLoaded]);
        showSuccess(`Successfully cataloged ${urlsLoaded.length} high-fidelity assets.`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Asset loading processing anomaly encountered.');
      setTimeout(() => setError(''), 6000);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Flush DOM file selection state clean
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.summary) return;
    
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
      setNewBlog({ title: '', summary: '', content: '', cover_image: '' });
      setUploadedGallery([]);
      setIsPreviewMode(false);
      fetchDashboardData();
      showSuccess('Dynamic rich-text article with integrated asset matrices successfully indexed.');
    }
  };

  const injectInlineImage = (url: string) => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    const imgMarkdown = `\n![Image Illustration](${url})\n`;
    const newContent = text.substring(0, start) + imgMarkdown + text.substring(end);
    
    setNewBlog({ ...newBlog, content: newContent });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imgMarkdown.length, start + imgMarkdown.length);
    }, 10);
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
  const filteredChats = chatLogs.filter(c => c.user_message?.toLowerCase().includes(searchQuery.toLowerCase()) || c.ai_response?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isAuthorized) {
    return (
      <main className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 font-sans antialiased">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="relative w-full max-w-md border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Administrative Node Validation</h1>
          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <div className="relative">
              <User className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin Username"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-sm outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="System Master Key"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-sm outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            {error && <p className="text-xs font-semibold text-red-400 text-center">{error}</p>}
            <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg flex justify-center items-center gap-2">
              <LogIn className="w-4 h-4" /> Unlock Console Core
            </button>
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
              { id: 'chat', label: 'AI Telemetry', icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsPreviewMode(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id ? 'bg-zinc-800 text-white border border-zinc-700/50' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
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
            <span className="text-zinc-500">v2.3.0-prod</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[{ label: 'Active Insights', value: blogs.length, desc: 'Dynamic articles cataloged', icon: BookOpen, color: 'text-blue-400' },
                  { label: 'App Environments', value: games.length, desc: 'Interactive systems online', icon: Gamepad2, color: 'text-cyan-400' },
                  { label: 'AI Interactions', value: chatLogs.length, desc: 'Total tracked AI queries', icon: MessageSquare, color: 'text-emerald-400' },
                  { label: 'Operational Schemas', value: '1', desc: 'Secure Postgres maps', icon: FileText, color: 'text-purple-400' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-semibold text-zinc-500 tracking-wide uppercase">{stat.label}</p>
                          <h3 className="text-3xl font-black text-white tracking-tight mt-2">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 ${stat.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-xs text-zinc-600 mt-4">{stat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl p-6 shadow-md max-w-4xl">
              <h2 className="text-base font-bold text-white mb-4">Modify Portfolio Biography Layer</h2>
              <textarea value={aboutContent} onChange={(e) => setAboutContent(e.target.value)} rows={10} className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 text-sm leading-relaxed outline-none custom-scrollbar" />
              <button onClick={handleUpdateAbout} className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors">Commit Changes</button>
            </div>
          )}

          {/* TAB: BLOG INSIGHT ENGINE */}
          {activeTab === 'blogs' && (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
              
              {/* AUTHORING FORM WITH DECOUPLED INPUT REF */}
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
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Article Headline</label>
                      <input type="text" placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm outline-none" required />
                    </div>

                    {/* UPGRADED: SECURE programmatic TRIGGER DRAWER */}
                    <div className="border border-zinc-800 bg-zinc-950/40 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                          <Image className="w-3.5 h-3.5 text-blue-400" /> Multi-Image Pipeline Locker
                        </label>
                        <button 
                          type="button"
                          disabled={isUploading} 
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[10px] bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white disabled:text-zinc-500 px-2.5 py-1 rounded font-bold uppercase transition-colors"
                        >
                          {isUploading ? 'Uploading Assets...' : 'Upload Media Bundle'}
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          multiple 
                          accept="image/*" 
                          onChange={handleImageFilesUpload} 
                          className="hidden" 
                        />
                      </div>

                      {uploadedGallery.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 pt-2 max-h-36 overflow-y-auto pr-1">
                          {uploadedGallery.map((url, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-zinc-800 h-14 bg-zinc-950">
                              <img src={url} className="w-full h-full object-cover" alt="Thumb" />
                              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-1 transition-all p-0.5">
                                <button type="button" onClick={() => setNewBlog({ ...newBlog, cover_image: url })} className="text-[8px] font-bold text-orange-400 uppercase w-full text-center hover:underline">
                                  {newBlog.cover_image === url ? '★ Banner' : 'Set Cover'}
                                </button>
                                <button type="button" onClick={() => injectInlineImage(url)} className="text-[8px] font-bold text-cyan-400 uppercase w-full text-center hover:underline">
                                  + Inline
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {newBlog.cover_image && (
                        <div className="text-[9px] text-orange-400 font-semibold flex items-center gap-1 bg-orange-500/5 p-2 rounded-lg border border-orange-500/10 truncate">
                          <CheckCircle className="w-3 h-3 flex-shrink-0" /> Selected Banner: {newBlog.cover_image}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Card Excerpt Summary</label>
                      <textarea placeholder="Dynamic card description layer..." value={newBlog.summary} onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })} rows={2} className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs outline-none resize-none custom-scrollbar" required />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Rich Text Body Content (Markdown Sync)</label>
                        <div className="flex border border-zinc-800 bg-zinc-950 rounded-lg p-0.5 gap-0.5">
                          {[{ icon: Heading, action: 'heading' }, { icon: Bold, action: 'bold' }, { icon: Code, action: 'code' }, { icon: List, action: 'list' }].map((tool, tIdx) => {
                            const ToolIcon = tool.icon;
                            return (
                              <button key={tIdx} type="button" onClick={() => injectMarkdownSyntax(tool.action)} className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white">
                                <ToolIcon className="w-3 h-3" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <textarea id="markdown-editor" placeholder="# Layout body markdown texts..." value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} rows={10} className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 text-xs font-mono outline-none custom-scrollbar" />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Push Article Registry Live
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {newBlog.cover_image && <img src={newBlog.cover_image} className="w-full h-32 object-cover rounded-xl border border-zinc-800 shadow-sm" alt="Cover Preview" />}
                    <h1 className="text-2xl font-black text-white">{newBlog.title || 'Untitled Article'}</h1>
                    <p className="text-xs text-zinc-400 border-l-2 border-zinc-700 pl-3 italic">{newBlog.summary}</p>
                    <hr className="border-zinc-800" />
                    <div className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line font-sans space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar">{newBlog.content}</div>
                  </div>
                )}
              </form>

              {/* INDUSTRIAL CONTENT LIST */}
              <div className="xl:col-span-3 space-y-3">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="bg-[#0d0d11] border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 flex justify-between items-center gap-4 transition-all shadow-sm">
                    <div className="flex items-center gap-4 overflow-hidden">
                      {blog.cover_image && <img src={blog.cover_image} className="w-12 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0" alt="Cover" />}
                      <div className="space-y-0.5 truncate">
                        <h4 className="font-bold text-sm text-white truncate max-w-sm">{blog.title}</h4>
                        <p className="text-xs text-zinc-500 truncate max-w-md">{blog.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"><ExternalLink className="w-4 h-4" /></a>
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

          {/* TAB: AI CHAT TELEMETRY */}
          {activeTab === 'chat' && (
            <div className="bg-[#0d0d11] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/40">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" /> AI Interaction Logs
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Real-time monitoring of all global AI queries.</p>
                </div>
                <button 
                  onClick={fetchLogs} 
                  disabled={loadingLogs}
                  className="text-xs font-semibold px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                  {loadingLogs ? "Syncing..." : "Refresh Telemetry"}
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                    <tr>
                      <th className="px-6 py-4">Timestamp (UTC)</th>
                      <th className="px-6 py-4 w-1/3">User Query</th>
                      <th className="px-6 py-4 w-1/2">AI Response</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {filteredChats.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-zinc-600 italic">
                          No interaction data found matching query.
                        </td>
                      </tr>
                    ) : (
                      filteredChats.map((log) => (
                        <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-zinc-500 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-zinc-300 font-medium align-top">
                            {log.user_message}
                          </td>
                          <td className="px-6 py-4 text-zinc-400 leading-relaxed align-top">
                            <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                              {log.ai_response}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}