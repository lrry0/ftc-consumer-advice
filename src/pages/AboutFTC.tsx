/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Landmark, Award, Shield, FileText } from "lucide-react";

interface AboutFTCProps {
  onNavigate: (path: string) => void;
}

export default function AboutFTC({ onNavigate }: AboutFTCProps) {
  const commissioners = [
    {
      name: "Lina M. Khan",
      title: "Chair",
      appointed: "June 2021",
      bio: "Lina M. Khan was sworn in as Chair of the Federal Trade Commission in June 2021. Prior to joining the FTC, Khan was an Associate Professor of Law at Columbia Law School and served as counsel to the House Judiciary Committee's Subcommittee on Antitrust, Commercial, and Administrative Law."
    },
    {
      name: "Rebecca Kelly Slaughter",
      title: "Commissioner",
      appointed: "May 2018",
      bio: "Rebecca Kelly Slaughter was sworn in as a Commissioner of the Federal Trade Commission in May 2018. Before joining the Commission, Slaughter served as Chief Counsel to Senator Charles E. Schumer of New York, focusing on consumer protection and antitrust policy."
    },
    {
      name: "Alvaro M. Bedoya",
      title: "Commissioner",
      appointed: "May 2022",
      bio: "Alvaro M. Bedoya was sworn in as a Commissioner of the Federal Trade Commission in May 2022. Bedoya was previously the founding director of the Center on Privacy & Technology at Georgetown Law and served as Chief Counsel to the Senate Judiciary Subcommittee on Privacy, Technology and the Law."
    },
    {
      name: "Melissa Holyoak",
      title: "Commissioner",
      appointed: "March 2024",
      bio: "Melissa Holyoak was sworn in as a Commissioner of the Federal Trade Commission in March 2024. Prior to her appointment, Holyoak served as Solicitor General of Utah, where she led the state's appellate division, and practiced as a consumer protection attorney for several public interest organizations."
    },
    {
      name: "Andrew N. Ferguson",
      title: "Commissioner",
      appointed: "April 2024",
      bio: "Andrew N. Ferguson was sworn in as a Commissioner of the Federal Trade Commission in April 2024. Before joining the Commission, Ferguson served as Solicitor General of Virginia, handling constitutional litigation and appellate proceedings on behalf of the Commonwealth."
    }
  ];

  const bureaus = [
    {
      name: "Bureau of Consumer Protection",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      desc: "Protects consumers against unfair, deceptive, or fraudulent practices in the marketplace. The Bureau conducts investigations, sues offending companies, and develops rules to maintain a fair marketplace."
    },
    {
      name: "Bureau of Competition",
      icon: <Landmark className="w-8 h-8 text-emerald-600" />,
      desc: "Enforces the nation's antitrust laws to prevent anticompetitive mergers and business practices, promoting a competitive marketplace that yields lower prices, higher quality, and more innovation."
    },
    {
      name: "Bureau of Economics",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      desc: "Provides economic analysis and support to FTC investigations and rulemaking. Economists evaluate the economic impact of Commission actions, advising on consumer choice and competitive dynamics."
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] pb-16 font-sans">
      
      {/* Page Header */}
      <section className="w-full bg-[#1b365d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-200">About Us</span>
              <h1 className="text-3xl md:text-3.5xl font-serif font-bold mt-1">Federal Trade Commission Leadership</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                The FTC is a bipartisan federal agency with a unique dual mission to protect consumers and promote competition, led by five Commissioners appointed by the President.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded border border-white/10">
              <Award className="text-yellow-400 w-10 h-10" />
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase">Agency Mandate</div>
                <div className="text-lg font-bold font-serif text-white">Protecting Consumers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 mt-12 space-y-12">
        
        {/* Bureaus Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1b365d] border-b border-slate-200 pb-3">
            Bureaus of the Commission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bureaus.map((b, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-lg shadow-xs hover:shadow-md transition-shadow">
                <div className="mb-4">{b.icon}</div>
                <h3 className="text-base font-bold text-[#1b365d] mb-2">{b.name}</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Commissioner Directory */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1b365d] border-b border-slate-200 pb-3">
            Commissioners Directory
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {commissioners.map((c, idx) => (
              <article 
                key={idx} 
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Mock avatar */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center text-[#1b365d] border-2 border-slate-200 shadow-inner font-serif text-2xl font-bold select-none">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-lg font-serif font-bold text-[#1b365d]">{c.name}</h3>
                    <span className="text-xs uppercase font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{c.title}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">Sworn in: {c.appointed}</div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">{c.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* General Agency Contacts */}
        <section className="bg-[#1b365d] text-white p-8 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border-l-4 border-yellow-400">
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold">Have a complaint about a company?</h3>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
              Reports from consumers are key to identifying and bringing enforcement actions. Submit your complaint online or dial the FTC Help Center for official phone support.
            </p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("trigger-report-modal"))}
            className="bg-white hover:bg-slate-100 text-[#1b365d] font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded shadow-sm hover:shadow transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <FileText size={14} /> Submit a Complaint
          </button>
        </section>

      </main>

    </div>
  );
}
