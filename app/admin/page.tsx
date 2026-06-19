'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [aboutContent, setAboutContent] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);

  const [newBlog, setNewBlog] = useState({ title: '', summary: '' });
  const [newGame, setNewGame] = useState({ name: '', description: '', hint: '' });

  const apiRequest = async (payload: any) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Console connection error');
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
    const res = await apiRequest({ action: 'insert', table: 'blog_posts', record: newBlog });
    if (res) {
      setNewBlog({ title: '', summary: '' });
      fetchDashboardData();
      showSuccess('Blog insight entry published.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Drop this article row?')) return;
    const res = await apiRequest({ action: 'delete', table: 'blog_posts', id });
    if (res) {
      fetchDashboardData();
      showSuccess('Blog row dropped.');
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGame.name || !newGame.description || !newGame.hint) return;
    const res = await apiRequest({ action: 'insert', table: 'games_data', record: newGame });
    if (res) {
      setNewGame({ name: '', description: '', hint: '' });
      fetchDashboardData();
      showSuccess('Game deployment manifest live.');
    }
  };

  const handleDeleteGame = async (id: string) => {
    if (!confirm('Drop this game structural schema?')) return;
    const res = await apiRequest({ action: 'delete', table: 'games_data', id });
    if (res) {
      fetchDashboardData();
      showSuccess('Game row dropped.');
    }
  };

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0b0c] p-6 font-sans">
        <div className="w-full max-w-md bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-black mb-2 text-gray-900 dark:text-white tracking-tight">System Control Panel</h1>
          <p className="text-sm text-gray-500 mb-6">Validate administrative credentials to access database streaming layers.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-blue-500 transition-colors"
              required
            />
            {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
            <button type="submit" className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">
              Access Dashboard Node
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0b0b0c] pt-28 pb-16 px-6 md:px-12 max-w-6xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-200 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Content Pipeline Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Directly managing real-time data nodes stream-synced via Supabase.</p>
        </div>
        <div className="flex gap-2">
          {['about', 'blogs', 'games'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-[#121214] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              {tab === 'about' ? 'About Me' : tab === 'blogs' ? 'Blog Posts' : 'Games Catalog'}
            </button>
          ))}
        </div>
      </div>

      {message && <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 font-bold text-sm">{message}</div>}
      {error && <div className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10 font-bold text-sm">{error}</div>}

      {activeTab === 'about' && (
        <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Update Biography Node</h2>
          <textarea
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            rows={8}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white outline-none focus:border-blue-500 transition-colors text-sm leading-relaxed"
          />
          <button onClick={handleUpdateAbout} className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors">
            Save Updates
          </button>
        </div>
      )}

      {activeTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleAddBlog} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md h-fit space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Publish New Insight</h2>
            <input type="text" placeholder="Post Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-blue-500" required />
            <textarea placeholder="Summary breakdown..." value={newBlog.summary} onChange={(e) => setNewBlog({ ...newBlog, summary: e.target.value })} rows={4} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-blue-500" required />
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors">Deploy Article Row</button>
          </form>
          <div className="lg:col-span-2 space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex justify-between items-start gap-4">
                <div><h3 className="font-bold text-gray-900 dark:text-white">{blog.title}</h3><p className="text-xs text-gray-500 mt-2 leading-relaxed">{blog.summary}</p></div>
                <button onClick={() => handleDeleteBlog(blog.id)} className="text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors">Drop</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'games' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleAddGame} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md h-fit space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Register Game Entry</h2>
            <input type="text" placeholder="Game Name" value={newGame.name} onChange={(e) => setNewGame({ ...newGame, name: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-blue-500" required />
            <textarea placeholder="System description..." value={newGame.description} onChange={(e) => setNewGame({ ...newGame, description: e.target.value })} rows={3} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-blue-500" required />
            <input type="text" placeholder="Strategic AI Hint" value={newGame.hint} onChange={(e) => setNewGame({ ...newGame, hint: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent dark:text-white text-sm outline-none focus:border-blue-500" required />
            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors">Deploy Game Profile</button>
          </form>
          <div className="lg:col-span-2 space-y-4">
            {games.map((game) => (
              <div key={game.id} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex justify-between items-start gap-4">
                <div><h3 className="font-bold text-gray-900 dark:text-white">{game.name}</h3><p className="text-xs text-gray-500 mt-1">{game.description}</p><p className="text-xs text-blue-500 font-semibold mt-2 italic">Hint: {game.hint}</p></div>
                <button onClick={() => handleDeleteGame(game.id)} className="text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-colors">Drop</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}