export default function Contact() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto pt-32 pb-24 px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#719d12] dark:text-[#c2ff3a] mb-3">Open channel</p>
      <h1 className="text-4xl md:text-5xl font-bold text-[#0d1020] dark:text-[#dfe2ee] mb-6 tracking-tight">Get In Touch</h1>
      <p className="text-lg text-gray-600 dark:text-[#8891ae] mb-12">
        I am currently open to discussions regarding project management, channel strategy, 
        and digital transformation opportunities.
      </p>
      
      <div className="bg-white/70 dark:bg-[#0c1122] p-10 rounded-sm border border-[#0d1020]/10 dark:border-white/10 shadow-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</h3>
            <a href="mailto:cohortexplorers@gmail.com" className="text-xl text-[#719d12] dark:text-[#c2ff3a] font-medium hover:underline">
              cohortexplorers@gmail.com {/*[cite: 1] */}
            </a>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone</h3>
            <p className="text-xl text-gray-900 font-medium">
              +66 (0) 620983201 / (0) 924702900 {/*[cite: 1] */}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</h3>
            <p className="text-lg text-gray-900">
              Soi Ramkhamhaeng 50, Hua Mak, Bang Kapi District<br />
              Bangkok 10240, Thailand {/*[cite: 1] */}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
