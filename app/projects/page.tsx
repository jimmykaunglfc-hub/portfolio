export default function Projects() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto pt-32 pb-24 px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#719d12] dark:text-[#c2ff3a] mb-3 text-center">Professional record</p>
      <h1 className="text-4xl md:text-5xl font-bold text-[#0d1020] dark:text-[#dfe2ee] mb-12 text-center tracking-tight">Professional Experience</h1>
      
      <div className="space-y-12">
        {/* Role 1 */}
        <div className="bg-white/70 dark:bg-[#0c1122] border border-[#0d1020]/10 dark:border-white/10 rounded-sm p-8 shadow-sm hover:border-[#c2ff3a]/50 transition">
          <h2 className="text-2xl font-bold text-[#719d12] dark:text-[#c2ff3a] mb-2">Digital Channel Management Lead</h2>
          <p className="text-gray-500 font-medium mb-6">KBZ Bank | Nov 2022 - Jan 2025 {/*[cite: 1] */}</p>
          
          <ul className="space-y-3 text-gray-700 list-disc pl-5">
            <li>Directed end-to-end KBZPay UI/UX relaunch, increasing customer engagement. {/*[cite: 1] */}</li>
            <li>Spearheaded new mobile and internet banking platform migration, ensuring smooth digital transition. {/*[cite: 1] */}</li>
            <li>Developed and implemented loyalty programs and remittance projects with Thai banks. {/*[cite: 1] */}</li>
            <li>Managed cross-functional teams to drive customer-centric innovations and compliance. {/*[cite: 1] */}</li>
          </ul>
        </div>

        {/* Role 2 */}
        <div className="bg-white/70 dark:bg-[#0c1122] border border-[#0d1020]/10 dark:border-white/10 rounded-sm p-8 shadow-sm hover:border-[#c2ff3a]/50 transition">
          <h2 className="text-2xl font-bold text-[#719d12] dark:text-[#c2ff3a] mb-2">Project Manager - CEO Project Office</h2>
          <p className="text-gray-500 font-medium mb-6">KBZ Bank | Sep 2021 - Nov 2022 {/*[cite: 1] */}</p>
          
          <ul className="space-y-3 text-gray-700 list-disc pl-5">
            <li>Led high-impact strategic transformation projects focusing on modernizing banking operations and improving customer experience. {/*[cite: 1] */}</li>
            <li>Implemented Queue Management System at branches, reducing customer wait times. {/*[cite: 1] */}</li>
            <li>Transformed traditional banking processes into automation, enhancing operational efficiency. {/*[cite: 1] */}</li>
            <li>Developed privilege service centers and business bundles to elevate corporate banking services. {/*[cite: 1] */}</li>
          </ul>
        </div>

        {/* Role 3 */}
        <div className="bg-white/70 dark:bg-[#0c1122] border border-[#0d1020]/10 dark:border-white/10 rounded-sm p-8 shadow-sm hover:border-[#c2ff3a]/50 transition">
          <h2 className="text-2xl font-bold text-[#719d12] dark:text-[#c2ff3a] mb-2">Assistant Project Manager - Cash & Logistics</h2>
          <p className="text-gray-500 font-medium mb-6">KBZ Bank | Jan 2020 - Sep 2021 {/*[cite: 1] */}</p>
          
          <ul className="space-y-3 text-gray-700 list-disc pl-5">
            <li>Designed and implemented Hub & Spoke Cash Management Model, streamlining operations. {/*[cite: 1] */}</li>
            <li>Launched Cash Pickup & Delivery Service, enhancing financial accessibility. {/*[cite: 1] */}</li>
            <li>Led the Target Operating Model transformation, improving compliance and risk management. {/*[cite: 1] */}</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
