import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-10 border-b border-gray-200">
      <Link href="/" className="text-xl font-bold text-gray-800 tracking-wide">
        KHNCO.
      </Link>
      <div className="flex gap-8 text-gray-600 font-medium">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
        <Link href="/projects" className="hover:text-blue-600 transition-colors">Case Studies</Link>
        <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
      </div>
    </nav>
  );
}