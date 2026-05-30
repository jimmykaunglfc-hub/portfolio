import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'KHNCO. | Executive Portfolio',
  description: 'Architecting Digital Excellence for Global Leaders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#09090b] text-[#e5e1e4] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}