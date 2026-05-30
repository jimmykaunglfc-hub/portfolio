import './globals.css';
import Navbar from '../components/Navbar'; // Fixed path to go up one folder level

export const metadata = {
  title: 'Kaung Htet Nyein Chan Oo | Portfolio',
  description: 'Project & Channel Management Leader Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-50 antialiased selection:bg-blue-500/30">
        <Navbar />
        {children}
      </body>
    </html>
  );
}