/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Landmark, FileText, CheckCircle2, RefreshCw } from "lucide-react";

interface EnforcementProps {
  onNavigate: (path: string) => void;
}

export default function Enforcement({ onNavigate }: EnforcementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All Divisions");

  const cases = [
    {
      id: "30056824",
      title: "Consent Agreement and Restitution Order Against Premiere Financial Group",
      division: "Consumer Protection",
      date: "June 25, 2026",
      status: "Settled",
      docketNumber: "FTC-2026-0048",
      summary: "The FTC finalized a consent agreement requiring Premiere Financial Group to pay $45 million in consumer refunds and cease all deceptive credit counseling advertising practices.",
      details: "Premier Financial Group allegedly targeted financially distressed consumers with false promises of eliminating up to 90% of their outstanding debt within 90 days. The settlement bans the company and its principals from debt relief services and establishes a robust monitoring system for all future business activities."
    },
    {
      id: "30056825",
      title: "FTC Challenges Proposed Merger of National Grocery Chains",
      division: "Competition",
      date: "June 18, 2026",
      status: "In Litigation",
      docketNumber: "FTC-2026-0112",
      summary: "The Commission filed an administrative complaint to block the multi-billion dollar acquisition of MegaFoods by SuperMarket Holdings Corp, alleging reduced competition and higher prices.",
      details: "According to the FTC complaint, the acquisition would create a monopoly in regional markets across twelve states, leading to increased food prices, lowered quality of service, and reduced bargaining power for retail grocery workers."
    },
    {
      id: "30056826",
      title: "FTC Action Halts Impersonator Scam Targeting Small Businesses",
      division: "Consumer Protection",
      date: "May 29, 2026",
      status: "Active",
      docketNumber: "FTC-2026-0091",
      summary: "A federal court granted the FTC's request for a temporary restraining order against Apex Registry Service, which masqueraded as a federal agency to charge mandatory registration fees.",
      details: "Apex Registry Service sent deceptive invoices to newly formed businesses, demanding $250 for corporate compliance registration under the guise of an official 'Federal Corporate Bureau'. The court froze the company's assets and appointed a temporary receiver."
    },
    {
      id: "30056827",
      title: "Telecomm Group Fined $12M for Unlawful Robocalls",
      division: "Consumer Protection",
      date: "May 15, 2026",
      status: "Settled",
      docketNumber: "FTC-2026-0023",
      summary: "Global Connect Inc. will pay a civil penalty and implement strict call-verification procedures after facilitating millions of spam calls violating the Do Not Call registry.",
      details: "The FTC investigation revealed Global Connect knowingly allowed shell telemarketing firms to route millions of pre-recorded messages spoofing government caller IDs, violating the Telemarketing Sales Rule."
    }
  ];

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.docketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = selectedDivision === "All Divisions" || c.division === selectedDivision;
    return matchesSearch && matchesDivision;
  });

  return (
    <div className="w-full bg-[#f8fafc] pb-16 font-sans">
      
      {/* Page Header */}
      <section className="w-full bg-[#1b365d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-200">Legal Proceedings</span>
              <h1 className="text-3xl md:text-3.5xl font-serif font-bold mt-1">Enforcement Cases & Consent Decrees</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                The Federal Trade Commission enforces federal consumer protection and antitrust laws to prevent unfair, deceptive, and anticompetitive business practices.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded border border-white/10">
              <Landmark className="text-yellow-400 w-10 h-10" />
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase">Total Restitution (YTD)</div>
                <div className="text-2xl font-bold font-serif text-white">$1.24 Billion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-[280px] bg-white border border-slate-200 p-6 rounded-lg shadow-xs space-y-6">
            <h3 className="font-bold text-[#1b365d] text-[13px] uppercase tracking-wider border-b border-slate-100 pb-3">
              Case Search & Filters
            </h3>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block" htmlFor="case-search">Keyword or Docket</label>
              <div className="relative">
                <input
                  id="case-search"
                  type="text"
                  placeholder="e.g. Premiere, FTC-2026"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c]"
                />
                <Search size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Division Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">FTC Bureau Division</label>
              <div className="flex flex-col gap-1.5">
                {["All Divisions", "Consumer Protection", "Competition"].map((div) => (
                  <button
                    key={div}
                    onClick={() => setSelectedDivision(div)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded transition-colors ${
                      selectedDivision === div
                        ? "bg-[#005a9c] text-white"
                        : "text-gray-700 hover:bg-slate-50"
                    }`}
                  >
                    {div}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(searchTerm || selectedDivision !== "All Divisions") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDivision("All Divisions");
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* Cases List */}
          <section className="flex-grow w-full space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between text-xs text-slate-600">
              <span>Showing <strong>{filteredCases.length}</strong> active enforcement records</span>
              <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-spin opacity-50" /> Updated daily</span>
            </div>

            <div className="space-y-6">
              {filteredCases.map((c) => (
                <article
                  key={c.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        c.division === "Consumer Protection" 
                          ? "bg-blue-50 text-blue-700 border border-blue-100" 
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}>
                        Bureau of {c.division}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        c.status === "Settled"
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : c.status === "In Litigation"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                          : "bg-purple-50 text-purple-700 border border-purple-100"
                      }`}>
                        <CheckCircle2 size={10} /> {c.status}
                      </span>
                    </div>

                    <h2 className="text-lg md:text-xl font-serif font-bold text-[#1b365d] hover:text-[#005a9c] hover:underline cursor-pointer leading-tight">
                      {c.title}
                    </h2>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                      <span>Date: {c.date}</span>
                      <span>•</span>
                      <span>Docket No: {c.docketNumber}</span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-semibold bg-slate-50 p-4 border-l-3 border-[#1b365d] rounded-r">
                      {c.summary}
                    </p>

                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                      {c.details}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-bold">Registry Entry #{c.id}</span>
                    <button
                      onClick={() => alert(`Case dossier ${c.docketNumber} requested.`)}
                      className="px-4 py-2 border border-[#005a9c] hover:bg-[#005a9c] hover:text-white text-[#005a9c] font-bold text-xs rounded transition-colors cursor-pointer"
                    >
                      View Case Dossier
                    </button>
                  </div>
                </article>
              ))}

              {filteredCases.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500">
                  <FileText className="mx-auto w-12 h-12 text-slate-300 mb-3" />
                  <p className="font-bold text-lg">No cases match your search</p>
                  <p className="text-sm mt-1">Try resetting the filters or modifying your query term.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
