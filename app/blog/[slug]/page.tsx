export const dynamic = 'force-dynamic';

import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const richTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full h-[240px] md:h-[400px] my-10 rounded-2xl overflow-hidden border border-slate-900 shadow-2xl">
          <Image 
            src={urlFor(value).url()} 
            alt={value.alt || 'Portfolio Graphic'} 
            fill 
            className="object-cover"
          />
        </div>
      );
    },
    callout: ({ value }: any) => (
      <div className="my-8 p-6 rounded-xl bg-slate-900/30 border-l-2 border-cyan-500 shadow-inner">
        <p className="text-slate-200 italic font-medium text-base md:text-lg leading-relaxed">
          "{value.text}"
        </p>
      </div>
    ),
    comparison: ({ value }: any) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-900/80 backdrop-blur-sm">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            {value.leftTitle}
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line font-light">
            {value.leftBody}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-b from-blue-950/20 to-slate-950/60 border border-blue-900/30 shadow-2xl relative overflow-hidden">
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
  block: {
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-white mt-12 mb-4 tracking-tight">
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
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-3 text-slate-400 font-light text-base mb-6 pl-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-4 text-slate-300 font-medium text-base mb-6 pl-2">{children}</ol>
  }
};

interface PageProps {
  params: any;
}

export default async function BlogPostPage({ params }: PageProps) {
  // Await the params object to ensure compatibility across Next.js updates
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

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
    <main className="min-h-screen bg-[#030303] text-slate-200 font-sans pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        
        <Link href="/blog" className="inline-flex items-center text-xs text-slate-500 hover:text-slate-300 transition-colors mb-10 tracking-wider uppercase gap-1">
          ← Back to Insights
        </Link>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.15] mb-10">
          {post.title}
        </h1>

        {post.coverImage && (
          <div className="relative w-full h-[260px] md:h-[420px] rounded-2xl overflow-hidden border border-slate-900/60 shadow-2xl mb-12">
            <Image src={urlFor(post.coverImage).url()} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          <PortableText value={post.body} components={richTextComponents} />
        </div>

      </div>
    </main>
  );
}