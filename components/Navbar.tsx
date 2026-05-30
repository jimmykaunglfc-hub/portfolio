import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand/Logo */}
        <Link href="/" className="text-xl font-bold tracking-wider text-white">
          KHNCO<span className="text-blue-500">.</span>
        </Link>
        
        {/* Desktop Links (Scrollable on small mobile screens without breaking lines) */}
        <div className="flex items-center gap-1 overflow-x-auto sm:gap-6 no-scrollbar">
          <Link href="/" className="whitespace-nowrap px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/about" className="whitespace-nowrap px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            About
          </Link>
          <Link href="/projects" className="whitespace-nowrap px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Projects
          </Link>
          <Link href="/contact" className="whitespace-nowrap px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}