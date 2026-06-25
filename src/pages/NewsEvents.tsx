/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Search, Calendar, Award, Volume2, Newspaper, ArrowRight } from "lucide-react";

interface NewsEventsProps {
  onNavigate: (path: string) => void;
}

export default function NewsEvents({ onNavigate }: NewsEventsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All News");

  const newsItems = [
    {
      id: "40058291",
      title: "FTC to Host Public Workshop on the Security Risks of Generative AI Voice Cloning Technology",
      category: "Public Events",
      date: "June 26, 2026",
      summary: "The Commission announced it will convene cyber security experts, consumer advocates, and industry researchers in October to discuss consumer protection standards for voice synthesis tools.",
      details: "As voice-cloning fraud escalates, this workshop will explore the capability of technology to replicate individuals' voices, the methods used to deceive consumers in family emergency scams, and standard authentication protocols to detect synthetically cloned audio."
    },
    {
      id: "40058292",
      title: "FTC Announces Proposed Rule Banning Fake Reviews and Social Media Indicators",
      category: "Press Releases",
      date: "June 15, 2026",
      summary: "In a sweeping press conference, FTC commissioners announced a new regulatory crackdown targeting illicit digital marketing brokers who trade in artificial reputation boosters.",
      details: "The proposed trade regulation rule targets companies that buy or sell fake product reviews, fabricate social media followers, or intimidate consumers who post honest negative feedback online. The rule proposes fines up to $50,000 per violation."
    },
    {
      id: "40058293",
      title: "Prepared Remarks of Commissioner Martinez at the Cybersecurity Summit",
      category: "Speeches",
      date: "June 02, 2026",
      summary: "Commissioner Martinez delivered a speech outlining the FTC's enforcement strategy regarding corporate data privacy, secure software pipelines, and cloud database breaches.",
      details: "Martinez highlighted that companies collecting customer telemetry data have a fiduciary duty to defend that information. The FTC will use its Section 5 authority to hold companies accountable for security deficiencies in their infrastructure."
    },
    {
      id: "40058294",
      title: "FTC Settlement Returns $12M to Victims of Illegal Billing Schemes",
      category: "Press Releases",
      date: "May 20, 2026",
      summary: "The agency began mailing refund checks to over 140,000 consumers who were enrolled in unauthorized credit monitoring services by direct response marketing firms.",
      details: "The FTC's settlement orders restitution from several corporate defendants who used 'dark patterns' online to trick consumers into registering for monthly subscriptions under the guise of an identity verification check."
    }
  ];

  const filteredNews = newsItems.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.summary.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All News" || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#f8fafc] pb-16 font-sans">
      
      {/* Page Header */}
      <section className="w-full bg-[#1b365d] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-200">Media Center</span>
              <h1 className="text-3xl md:text-3.5xl font-serif font-bold mt-1">News, Press Releases, & Speeches</h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                Stay updated with the latest announcements, public notices, workshops, and speeches from the Federal Trade Commission commissioners and staff.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded border border-white/10">
              <Calendar className="text-blue-300 w-10 h-10" />
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase">Upcoming Workshop</div>
                <div className="text-lg font-bold font-serif text-white">Voice Cloning Security</div>
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
              Filter Announcements
            </h3>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block" htmlFor="news-search">Search News</label>
              <div className="relative">
                <input
                  id="news-search"
                  type="text"
                  placeholder="e.g. AI, reviews, remarks"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c]"
                />
                <Search size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">Category</label>
              <div className="flex flex-col gap-1.5">
                {["All News", "Press Releases", "Speeches", "Public Events"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#005a9c] text-white"
                        : "text-gray-700 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(searchTerm || selectedCategory !== "All News") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All News");
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* Timeline Feed */}
          <section className="flex-grow w-full space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between text-xs text-slate-600">
              <span>Showing <strong>{filteredNews.length}</strong> media announcements</span>
              <span className="flex items-center gap-1 font-semibold text-[#005a9c]">Press & Media Contact: (202) 326-2180</span>
            </div>

            <div className="relative border-l border-slate-200 ml-4 space-y-8 py-2">
              {filteredNews.map((item) => {
                const getIcon = (cat: string) => {
                  switch (cat) {
                    case "Speeches":
                      return <Volume2 size={16} />;
                    case "Public Events":
                      return <Award size={16} />;
                    case "Press Releases":
                    default:
                      return <Newspaper size={16} />;
                  }
                };

                return (
                  <div key={item.id} className="relative pl-8 group">
                    {/* Circle Bullet Icon */}
                    <div className="absolute -left-3.5 top-1.5 w-7 h-7 bg-white border-2 border-[#1b365d] rounded-full flex items-center justify-center text-[#1b365d] shadow-sm z-10 group-hover:bg-[#1b365d] group-hover:text-white transition-colors duration-200">
                      {getIcon(item.category)}
                    </div>

                    <article className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        {item.category} • {item.date}
                      </span>
                      <h2 className="text-lg font-serif font-bold text-[#1b365d] hover:text-[#005a9c] hover:underline cursor-pointer leading-tight mb-2.5">
                        {item.title}
                      </h2>
                      <p className="text-sm text-slate-600 font-semibold bg-slate-50 p-4 border-l-2 border-slate-300 rounded-r mb-3">
                        {item.summary}
                      </p>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                        {item.details}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-bold">Release ID: #{item.id}</span>
                        <button
                          onClick={() => alert(`Full release ${item.id} requested.`)}
                          className="text-[#005a9c] hover:text-[#00487c] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          Read Full Release <ArrowRight size={12} />
                        </button>
                      </div>
                    </article>
                  </div>
                );
              })}

              {filteredNews.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500 ml-4">
                  <Newspaper className="mx-auto w-12 h-12 text-slate-300 mb-3" />
                  <p className="font-bold text-lg">No announcements match your search</p>
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
