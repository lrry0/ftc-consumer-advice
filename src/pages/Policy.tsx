/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, BookOpen, Shield, Download, FileCheck, CheckCircle2 } from "lucide-react";

interface PolicyProps {
  onNavigate: (path: string) => void;
}

export default function Policy({ onNavigate }: PolicyProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Topics");

  const policies = [
    {
      id: "10293847",
      title: "FTC Guides Concerning the Use of Endorsements and Testimonials in Advertising",
      tag: "Endorsements",
      date: "June 20, 2026",
      status: "Final Rule",
      summary: "These guides reflect the Commission's current interpretation of the FTC Act regarding endorsement practices, specifying disclosure requirements for social media influencers and product reviewers.",
      details: "The guidelines address consumer expectations regarding reviews, ratings, and endorsements, making clear that artificial amplification of ratings or reviews (including AI-generated reviews) constitutes a deceptive trade practice. Clear and conspicuous disclosures of material connections are strictly required."
    },
    {
      id: "10293848",
      title: "Rule on the Use of Consumer Reviews and Testimonials",
      tag: "Rules",
      date: "June 10, 2026",
      status: "Proposed Rulemaking",
      summary: "The FTC proposes a trade regulation rule banning marketers from writing, purchasing, or selling fake consumer reviews, fake celebrity endorsements, or buying positive reviews.",
      details: "This rulemaking seeks to address widespread consumer deception online. It outlines specific prohibitions against review hijacking, automated review generation, threat tactics to suppress negative reviews, and the selling of fake social media indicators."
    },
    {
      id: "10293849",
      title: "Advertising Guides for Environmental Marketing Claims ('Green Guides')",
      tag: "Guidelines",
      date: "May 22, 2026",
      status: "Guidance Document",
      summary: "These guides help marketers avoid making environmental marketing claims that are unfair or deceptive under Section 5 of the FTC Act.",
      details: "The Green Guides outline general principles for environmental claims (such as 'recyclable', 'biodegradable', 'carbon neutral') and provide specific examples of acceptable and deceptive messaging formats to protect green consumer interests."
    },
    {
      id: "10293850",
      title: "Policy Statement on Deceptive AI claims in Consumer Products",
      tag: "Policy Statements",
      date: "May 08, 2026",
      status: "Staff Statement",
      summary: "This enforcement policy warns companies against making unsubstantiated claims that their products use artificial intelligence or machine learning technologies.",
      details: "Staff warns that companies claiming products are 'AI-powered' must have rigorous, verifiable scientific testing to substantiate the performance claims. Deceptive buzzwords will trigger immediate civil enforcement actions."
    }
  ];

  const filteredPolicies = policies.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "All Topics" || p.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full bg-[#f8fafc] pb-16 font-sans">
      
      {/* Page Header */}
      <section className="w-full bg-[#1b365d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-200">Legal Framework</span>
              <h1 className="text-3xl md:text-3.5xl font-serif font-bold mt-1">Rules, Regulations, & Guidance</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                The FTC issues rules, guides, and policy statements to outline lawful business practices and establish clear regulatory standards for consumer advertising and antitrust enforcement.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded border border-white/10">
              <Shield className="text-blue-300 w-10 h-10" />
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase">Regulatory Standards</div>
                <div className="text-2xl font-bold font-serif text-white">Active Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-[280px] bg-white border border-slate-200 p-6 rounded-lg shadow-xs space-y-6">
            <h3 className="font-bold text-[#1b365d] text-[13px] uppercase tracking-wider border-b border-slate-100 pb-3">
              Policy Search & Topics
            </h3>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block" htmlFor="policy-search">Search Policy Guides</label>
              <div className="relative">
                <input
                  id="policy-search"
                  type="text"
                  placeholder="e.g. Endorsement, AI, green"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c]"
                />
                <Search size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Topic Tags Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">Filter by Topic</label>
              <div className="flex flex-col gap-1.5">
                {["All Topics", "Endorsements", "Rules", "Guidelines", "Policy Statements"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded transition-colors ${
                      selectedTag === tag
                        ? "bg-[#005a9c] text-white"
                        : "text-gray-700 hover:bg-slate-50"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(searchTerm || selectedTag !== "All Topics") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag("All Topics");
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* Policies List */}
          <section className="flex-grow w-full space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between text-xs text-slate-600">
              <span>Showing <strong>{filteredPolicies.length}</strong> regulatory records</span>
              <span className="flex items-center gap-1"><FileCheck size={12} className="text-green-600" /> Official Registry Source</span>
            </div>

            <div className="space-y-6">
              {filteredPolicies.map((p) => (
                <article
                  key={p.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        {p.tag}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-blue-600" /> {p.status}
                      </span>
                    </div>

                    <h2 className="text-lg md:text-xl font-serif font-bold text-[#1b365d] hover:text-[#005a9c] hover:underline cursor-pointer leading-tight">
                      {p.title}
                    </h2>

                    <div className="text-xs text-slate-500 font-semibold">
                      Published: {p.date} • Reference ID: {p.id}
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-semibold bg-slate-50 p-4 border-l-3 border-[#1b365d] rounded-r">
                      {p.summary}
                    </p>

                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                      {p.details}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-bold">Federal Register Ref #{p.id}</span>
                    <button
                      onClick={() => alert(`Policy document ${p.id} requested for PDF download.`)}
                      className="px-4 py-2 bg-[#005a9c] hover:bg-[#00487c] text-white font-bold text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download size={12} /> Download PDF Version
                    </button>
                  </div>
                </article>
              ))}

              {filteredPolicies.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500">
                  <BookOpen className="mx-auto w-12 h-12 text-slate-300 mb-3" />
                  <p className="font-bold text-lg">No policies match your search</p>
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
