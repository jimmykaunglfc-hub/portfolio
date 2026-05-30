export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <p className="text-lg text-gray-500 mb-4">
          Hello, I'm
        </p>

        <h1 className="text-6xl font-bold mb-6">
          Kaung Htet Nyein Chan Oo
        </h1>

        <h2 className="text-2xl text-blue-600 font-semibold mb-6">
          Digital Transformation Leader
        </h2>

        <p className="text-xl text-gray-600 leading-relaxed">
          Driving Digital Banking Innovation,
          Project Delivery, Customer Experience,
          and Strategic Business Transformation.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Download Resume
          </button>

          <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}