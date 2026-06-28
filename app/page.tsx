'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import DataNexus from '../components/DataNexus';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const visualTrajectoryMap = [
    { year: "2025 - Present", company: "digit7s", executiveSummary: "Head of Digital Operations & Product Development", context: "Orchestrating multi-tiered product workflows, agile scaling configurations, and cross-functional engineering management inside major tech hubs across Thailand." },
    { year: "2018 - 2025", company: "KBZ Bank", executiveSummary: "Manager - Digital Channels (KBZPay Ecosystem)", context: "Directing foundational user growth arrays and security matrices for key regional mobile banking channels." },
    { year: "2014 - 2022", company: "Media & Professional Advisory", executiveSummary: "Communications Consultant & Localization Lead", context: "Anchoring cross-border media translation networks, language localized pipelines, and communications architecture frameworks." },
    { year: "2013 - 2016", company: "Institutional Frameworks", executiveSummary: "State Liaison Officer & Executive Coordinator", context: "Facilitating international stakeholder relations, diplomatic logistics configurations, and inter-departmental operations syncs." }
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4 relative z-20 animate-in fade-in duration-500 ease-in-out">
      
      {/* Interactive Hero Section with DataNexus Background */}
      <div className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden mb-16 rounded-3xl bg-gray-50 dark:bg-[#09090b] border border-gray-200 dark:border-white/5">
        <DataNexus />
        <div className="relative z-10 w-full pointer-events-none">
          <div className="pointer-events-auto">
            <Hero />
          </div>
        </div>
      </div>

      {/* Native Application Download Matrix */}
      <section id="download" className="py-8 relative z-20 pointer-events-auto">
        <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-200/50 dark:border-white/5 bg-gradient-to-r from-[#4d8eff]/5 to-transparent dark:from-[#adc6ff]/5 dark:to-transparent">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#4d8eff] dark:text-[#adc6ff] flex items-center justify-center md:justify-start gap-2">
              <span className="material-symbols-outlined text-base">system_update</span> Native Ecosystem
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Access the Mobile App.</h3>
            <p className="text-zinc-600 dark:text-zinc-300 font-light text-sm leading-relaxed">
              Experience this portfolio as a fully native application. Android users can install the APK directly, while iOS users can access the beta build instantly via Apple TestFlight.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <a 
              href="/khnco.apk" 
              download="KHNCO_App.apk"
              className="group flex items-center justify-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <span className="material-symbols-outlined text-xl text-[#3DDC84] group-hover:animate-bounce">android</span>
              <span>Download APK</span>
            </a>
            <a 
              href="https://testflight.apple.com/join/BzAg9XQ2" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-xl text-zinc-900 dark:text-white">phone_iphone</span>
              <span>iOS TestFlight</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Panel Call to Action */}
      <section id="contact" className="py-8 relative z-20 pointer-events-auto">
        <div className="glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-zinc-50 to-transparent dark:from-white/[0.02] dark:to-transparent">
          <h4 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Let's Orchestrate What's Next.</h4>
          <p className="text-zinc-600 dark:text-zinc-300 font-light text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            I am open to strategic technology partnerships, digital banking ecosystem consulting, and senior enterprise operations leadership roles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-30">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="cursor-pointer bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-white dark:text-[#002e6a]">rocket_launch</span> 
              Initiate Consultation
            </button>
            <button 
              onClick={() => setIsMapOpen(true)}
              className="cursor-pointer bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg text-zinc-900 dark:text-white">route</span> 
              Review Trajectory Map
            </button>
          </div>
        </div>
      </section>

      {/* SHARED SYSTEM MODALS */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xl">
          <div className="bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 w-full max-w-lg rounded-2xl p-8 relative shadow-2xl space-y-6 text-zinc-900 dark:text-white">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h5 className="text-xl font-bold tracking-tight">Direct Engagement Channels</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Senior Digital Operations Leadership Coordination</p>
              </div>
              <button onClick={() => setIsContactOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer">
                close
              </button>
            </div>

            <div className="space-y-4">
              <a href="mailto:jimmykg.spacex@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#adc6ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#adc6ff] text-2xl">mail</span>
                <div className="text-left">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Secure Email Link</p>
                  <p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff]">jimmykg.spacex@gmail.com</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#c0c1ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#c0c1ff] text-2xl">share</span>
                <div className="text-left">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">LinkedIn Executive Network</p>
                  <p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#c0c1ff]">kaung-htet-nyein-chan-oo</p>
                </div>
              </a>

              <a href="tel:+66620983201" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 hover:border-[#4d8eff] dark:hover:border-[#ddb7ff]/30 hover:bg-zinc-100 dark:hover:bg-white/[0.04] transition-all duration-300 group">
                <span className="material-symbols-outlined text-[#002e6a] dark:text-[#ddb7ff] text-2xl">call</span>
                <div className="text-left">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Direct Communication Link</p>
                  <p className="text-sm font-medium group-hover:text-[#4d8eff] dark:group-hover:text-[#ddb7ff]">+66 62 098 3201</p>
                </div>
              </a>
            </div>

            <button onClick={() => setIsContactOpen(false)} className="w-full py-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-800 dark:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors border border-zinc-200 dark:border-white/5 cursor-pointer">
              Dismiss Gateway
            </button>
          </div>
        </div>
      )}

      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-zinc-950/70 backdrop-blur-xl overflow-y-auto">
          <div className="bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 w-full max-w-3xl rounded-2xl p-6 md:p-10 relative shadow-2xl my-8 space-y-8 text-zinc-900 dark:text-white">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-100 dark:border-white/5">
              <div>
                <h5 className="text-2xl font-bold tracking-tight">Strategic Trajectory Blueprint</h5>
                <p className="text-sm text-[#4d8eff] dark:text-[#adc6ff] font-mono mt-1">Cross-Functional Transition Map</p>
              </div>
              <button onClick={() => setIsMapOpen(false)} className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white material-symbols-outlined p-1 cursor-pointer">
                close
              </button>
            </div>

            <div className="relative pl-6 md:pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] md:before:left-[15px] before:top-2 before:bottom-2 before:width-[2px] before:bg-gradient-to-b before:from-[#4d8eff] before:via-[#c0c1ff] before:to-zinc-200 dark:before:to-zinc-800">
              {visualTrajectoryMap.map((mapItem, mIdx) => (
                <div key={mIdx} className="relative group/map-node space-y-2">
                  <div className="absolute -left-[21px] md:-left-[29px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-[#4d8eff] dark:border-[#adc6ff] transition-colors duration-300 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-950" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-xs font-mono font-semibold text-[#002e6a] dark:text-[#adc6ff] bg-[#4d8eff]/10 dark:bg-[#adc6ff]/10 border border-[#4d8eff]/20 dark:border-[#adc6ff]/20 px-2.5 py-0.5 rounded-full w-max">{mapItem.year}</span>
                    <h6 className="text-lg font-bold tracking-tight">{mapItem.company}</h6>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.01] border border-zinc-100 dark:border-white/5 space-y-1">
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{mapItem.executiveSummary}</p>
                    <p className="text-xs font-light text-zinc-600 dark:text-slate-400 leading-relaxed">{mapItem.context}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setIsMapOpen(false)} className="w-full py-4 bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer">
              Close Blueprint View
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}