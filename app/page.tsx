export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-20 pb-10 px-4">
      {/* Hero Section */}
      <section className="max-w-4xl text-center">
        <p className="text-lg text-gray-500 mb-4">Hello, I'm</p>
        <h1 className="text-6xl font-bold mb-6 text-gray-900">
          Kaung Htet Nyein Chan Oo {/*[cite: 1] */}
        </h1>
        <h2 className="text-2xl text-blue-600 font-semibold mb-6">
          Project & Channel Management Leader {/*[cite: 1] */}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-10">
          Leading high-impact initiatives to optimize financial operations, drive customer engagement, 
          and streamline banking processes in digital financial services. {/*[cite: 1] */}
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            Let's Talk
          </a>
          <a href="/projects" className="border border-gray-400 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition">
            View Experience
          </a>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-center">
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">Platform</h3>
          <p className="text-gray-600 font-medium">Migration & UI/UX Strategy {/*[cite: 1] */}</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">FinTech</h3>
          <p className="text-gray-600 font-medium">Product Development {/*[cite: 1] */}</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">Process</h3>
          <p className="text-gray-600 font-medium">Automation & Optimization {/*[cite: 1] */}</p>
        </div>
      </section>
    </main>
  );
}