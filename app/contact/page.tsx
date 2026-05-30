export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h1>
      <p className="text-lg text-gray-600 mb-12">
        I am currently open to discussions regarding project management, channel strategy, 
        and digital transformation opportunities.
      </p>
      
      <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 shadow-sm">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</h3>
            <a href="mailto:cohortexplorers@gmail.com" className="text-xl text-blue-600 font-medium hover:underline">
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