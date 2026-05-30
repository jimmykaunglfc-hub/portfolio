export default function About() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Professional Background</h1>
      
      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          I am a results-driven Project & Channel Management Leader with expertise in digital financial 
          services, strategic planning, and business transformation. {/*[cite: 1] */} I have a proven track record in 
          product development, stakeholder management, and change management. {/*[cite: 1] */}
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Core Competencies</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
          <li className="flex items-center gap-2">✓ Strategic Planning & Execution {/*[cite: 1] */}</li>
          <li className="flex items-center gap-2">✓ Digital Banking & Channel Management {/*[cite: 1] */}</li>
          <li className="flex items-center gap-2">✓ Product Development & Enhancement {/*[cite: 1] */}</li>
          <li className="flex items-center gap-2">✓ Change Management & Process Optimization {/*[cite: 1] */}</li>
          <li className="flex items-center gap-2">✓ Stakeholder & Team Leadership {/*[cite: 1] */}</li>
          <li className="flex items-center gap-2">✓ Regulatory Compliance & Security {/*[cite: 1] */}</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">Education & Certifications</h2>
        <div className="space-y-4 text-base">
          <div>
            <p className="font-bold text-gray-900">Project Management Certification</p>
            <p className="text-gray-600">London Business University | 2021 {/*[cite: 1] */}</p>
          </div>
          <div>
            <p className="font-bold text-gray-900">Bachelor of Arts (Economics)</p>
            <p className="text-gray-600">Dagon University, Yangon | 2012 - 2016 {/*[cite: 1] */}</p>
          </div>
        </div>
      </div>
    </main>
  );
}