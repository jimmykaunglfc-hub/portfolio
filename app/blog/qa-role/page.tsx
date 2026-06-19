import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Custom tailwind components matching your layout goals
const richTextComponents = {
  types: {
    // 1. Renders the crisp mid-paragraph banner layouts
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full h-[240px] md:h-[400px] my-10 rounded-2xl overflow-hidden border border-slate-900 shadow-2xl">
          <Image 
            src={urlFor(value).url()} 
            alt={value.alt || 'Portfolio Graphic'} 
            fill 
            className="object-cover"
            priority={false}
          />
        </div>
      );
    },
    
    // 2. Renders the sleek glowing callout quote blocks
    callout: ({ value }: any) => (
      <div className="my-8 p-6 rounded-xl bg-slate-900/30 border-l-2 border-cyan-500 shadow-inner">
        <p className="text-slate-200 italic font-medium text-base md:text-lg leading-relaxed">
          "{value.text}"
        </p>
      </div>
    ),

    // 3. Renders the stunning side-by-side Paradigm comparison grids
    comparison: ({ value }: any) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {/* Left Card - Classic/Old State */}
        <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-900/80 backdrop-blur-sm">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            {value.leftTitle}
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line font-light">
            {value.leftBody}
          </p>
        </div>
        
        {/* Right Card - Premium Highlighted Future State */}
        <div className="p-6 rounded-xl bg-gradient-to-b from-blue-950/20 to-slate-950/60 border border-blue-900/30 shadow-2xl shadow-blue-950/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl transition-opacity group-hover:opacity-100" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {value.rightTitle}
          </h4>
          <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-light">
            {value.rightBody}
          </p>
        </div>
      </div>
    )
  },
  
  // Custom baseline HTML tags formatting
  block: {
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-white mt-12 mb-4 tracking-tight flex items-center gap-2">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-slate-400 text-base leading-relaxed mb-6 font-light tracking-wide">
        {children}
      </p>
    )
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-3 text-slate-400 font-light text-base mb-6 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-4 text-slate-300 font-medium text-base mb-6 pl-2">
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }: any) => <li className="marker:text-slate-600 pl-1">{children}</li>,
    number: ({ children }: any) => <li className="marker:text-blue-500/70 pl-1 font-light text-slate-400">{children}</li>
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // Real-time bypass fetch query matching schemas perfectly
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      coverImage,
      body
    }`,
    { slug },
    { cache: 'no-store' }
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030303] text-slate-200 font-sans selection:bg-blue-500/20 selection:text-blue-200">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-24">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-xs text-slate-500 hover:text-slate-300 transition-colors mb-10 tracking-wider uppercase gap-1 group"
        >
          <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span> Back to Insights
        </Link>

        {/* Dynamic Gradient Header Title */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.15] mb-10">
          {post.title.split('—')[0]}
          {post.title.includes('—') && (
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              — {post.title.split('—')[1]}
            </span>
          )}
        </h1>

        {/* Cover Hero Banner Graphic */}
        {post.coverImage && (
          <div className="relative w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden border border-slate-900/60 shadow-2xl mb-12">
            <Image 
              src={urlFor(post.coverImage).url()} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Portable Text Node Compiler Output */}
        <div className="prose prose-invert max-w-none">
          <PortableText value={post.body} components={richTextComponents} />
        </div>

      </div>
    </main>
  );
}