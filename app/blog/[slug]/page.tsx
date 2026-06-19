export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';

interface PageProps {
  params: any;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body
    }`,
    { slug },
    { cache: 'no-store' }
  );

  if (!post) {
    notFound();
  }

  // Custom styling block layout parser
  const renderContent = (rawText: string) => {
    if (!rawText) return null;
    
    const blocks = rawText.split('\n\n');

    return blocks.map((block, index) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('###')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-white mt-12 mb-4 tracking-tight border-b border-slate-900 pb-2">
            {trimmed.replace('###', '').trim()}
          </h3>
        );
      }

      if (trimmed.startsWith('>')) {
        return (
          <div key={index} className="my-8 p-6 rounded-xl bg-slate-900/30 border-l-2 border-cyan-500 shadow-inner">
            <p className="text-slate-200 italic font-medium text-base md:text-lg leading-relaxed">
              {trimmed.replace('>', '').replace(/"/g, '').trim()}
            </p>
          </div>
        );
      }

      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const items = trimmed.split('\n');
        return (
          <ul key={index} className="list-disc list-inside space-y-3 text-slate-400 font-light text-base mb-6 pl-2">
            {items.map((item, i) => (
              <li key={i} className="marker:text-slate-600 pl-1">
                {item.replace(/^[* -]/, '').trim()}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="text-slate-400 text-base leading-relaxed mb-6 font-light tracking-wide whitespace-pre-line">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#030303] text-slate-200 font-sans pt-32 pb-24 selection:bg-blue-500/20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        
        <Link href="/blog" className="inline-flex items-center text-xs text-slate-500 hover:text-slate-300 transition-colors mb-10 tracking-wider uppercase gap-1 group">
          <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span> Back to Insights
        </Link>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.15] mb-12">
          {post.title.split('—')[0]}
          {post.title.includes('—') && (
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              — {post.title.split('—')[1]}
            </span>
          )}
        </h1>

        <div className="article-content">
          {renderContent(post.body)}
        </div>

      </div>
    </main>
  );
}