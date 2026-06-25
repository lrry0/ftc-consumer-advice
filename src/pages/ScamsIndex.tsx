/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Search, ChevronDown, AlertTriangle, ArrowUpRight, HelpCircle } from "lucide-react";
import { SCAMS_ARTICLES } from "../data";
import { Article } from "../types";

interface ScamsIndexProps {
  onOpenArticle: (article: Article) => void;
  onNavigate: (path: string) => void;
}

export default function ScamsIndex({ onOpenArticle, onNavigate }: ScamsIndexProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScamType, setSelectedScamType] = useState("All Scam Types");
  const [selectedArticleType, setSelectedArticleType] = useState("All Article Types");
  
  // Internal filter state applied on clicking "Apply"
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedScamType, setAppliedScamType] = useState("All Scam Types");
  const [appliedArticleType, setAppliedArticleType] = useState("All Article Types");

  // Dynamic pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Watch for global search event triggered from Header
  useEffect(() => {
    const handleGlobalSearch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSearchTerm(customEvent.detail);
      setAppliedSearch(customEvent.detail);
      setCurrentPage(1);
    };

    window.addEventListener("search-scams", handleGlobalSearch);
    return () => {
      window.removeEventListener("search-scams", handleGlobalSearch);
    };
  }, []);

  // Filtering Logic
  const filteredArticles = SCAMS_ARTICLES.filter((article) => {
    // 1. Search term matches title or snippet
    const matchesSearch =
      appliedSearch === "" ||
      article.title.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      article.snippet.toLowerCase().includes(appliedSearch.toLowerCase());

    // 2. Scam Type matches tags
    const matchesScamType =
      appliedScamType === "All Scam Types" ||
      article.tags.includes(appliedScamType);

    // 3. Article Type matches category (or is standard)
    const matchesArticleType =
      appliedArticleType === "All Article Types" ||
      article.category === appliedArticleType;

    return matchesSearch && matchesScamType && matchesArticleType;
  });

  // Pagination calculations
  const totalItems = filteredArticles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleApplyFilters = () => {
    setAppliedSearch(searchTerm);
    setAppliedScamType(selectedScamType);
    setAppliedArticleType(selectedArticleType);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedScamType("All Scam Types");
    setSelectedArticleType("All Article Types");
    setAppliedSearch("");
    setAppliedScamType("All Scam Types");
    setAppliedArticleType("All Article Types");
    setCurrentPage(1);
  };

  const scamTypes = [
    "All Scam Types",
    "Impersonator Scams",
    "Phishing Scams",
    "Jobs and Making Money",
    "Credit, Loans, and Debt",
    "Identity Theft and Online Security",
    "Family and Community",
    "Health and Medicare",
  ];

  const articleTypes = [
    "All Article Types",
    "Consumer Alert",
    "Business Alert",
  ];

  return (
    <div className="w-full bg-[#fcfdfd] pb-16 font-sans">
      {/* 2. Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 mt-8 md:mt-12">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#1b365d] border-b border-[#cbd5e1] pb-4 mb-8">
          Avoiding and Reporting Scams
        </h2>

        {/* 3. Impersonator Banner Warning Box */}
        <div className="w-full bg-[#f3f7fa] border-l-4 border-[#005a9c] rounded-r-lg p-5 mb-10 flex flex-col md:flex-row items-start gap-4 shadow-xs">
          <div className="p-2 bg-blue-100 text-[#005a9c] rounded-full flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-grow space-y-2">
            <h3 className="font-extrabold text-[#1b365d] text-base flex items-center gap-1.5">
              Scammers Are Impersonating the FTC
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
              The FTC will never threaten you, say you must transfer your money to "protect it," or tell you to withdraw cash or buy gold and give it to someone. That's a scam.
            </p>
            <div className="pt-1.5 flex flex-wrap gap-x-6 gap-y-1.5">
              <a
                href="https://reportfraud.ftc.gov"
                target="_blank"
                rel="noreferrer"
                className="text-[#005a9c] font-bold text-sm hover:underline flex items-center gap-1"
              >
                Report it at ReportFraud.ftc.gov <ArrowUpRight size={14} />
              </a>
              <button
                onClick={() => onNavigate("/advice-and-guidance/report/77391024/norton-consumer-investigation")}
                className="text-[#005a9c] hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none font-bold text-sm"
              >
                View Consumer Registry Record #77391024
              </button>
              <button
                onClick={() => onNavigate("/advice-and-guidance/report/88401925/washington-trust-consumer-investigation")}
                className="text-[#005a9c] hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none font-bold text-sm"
              >
                View Consumer Registry Record #88401925
              </button>
            </div>
          </div>
        </div>

        {/* 4. Three Big Link Cards (Replicated from screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "How To Avoid a Scam",
              desc: "Recognizing these common signs of a scam could help you avoid falling for one.",
              color: "border-[#005a9c]",
            },
            {
              title: "What To Do If You Were Scammed",
              desc: "Find out steps you can take if you were scammed. Prompt action saves credit.",
              color: "border-teal-600",
            },
            {
              title: "Report Fraud, Scams, and Bad Business Practices",
              desc: "Your report could help the FTC stop the scammers and protect your community.",
              color: "border-emerald-600",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`bg-white border border-gray-200/60 border-t-4 ${card.color} shadow-xs rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group`}
            >
              <div className="space-y-3">
                <h4 className="text-[17px] font-serif font-bold text-[#1b365d] leading-snug hover:text-[#005a9c] transition-colors cursor-pointer">
                  {card.title}
                </h4>
                
                {/* Design System Accent Underline */}
                <div className="w-12 h-[2.5px] bg-[#005a9c]/60 mt-2 mb-3" />

                <p className="text-xs md:text-[13px] text-gray-600 leading-relaxed font-sans">{card.desc}</p>
              </div>
              <button className="mt-4 text-xs font-bold text-[#005a9c] group-hover:underline flex items-center gap-1.5 text-left cursor-pointer">
                Learn more <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* 5. Main Filter + Article List Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Sidebar Filters (25%) */}
          <aside className="w-full lg:w-[280px] bg-white p-6 border border-gray-200/60 rounded-lg shadow-xs space-y-6">
            <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-[#1b365d] text-[13px] uppercase tracking-wider">
                Filter and Search
              </h3>
              {(appliedSearch !== "" || appliedScamType !== "All Scam Types" || appliedArticleType !== "All Article Types") && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#005a9c] hover:underline font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* A. Search Box */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700" htmlFor="search-input">
                Search for scams
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                  placeholder="Keyword (e.g. pet, check)"
                  className="w-full pl-3 pr-8 py-2.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] transition-all"
                />
                <Search size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* B. Filter Scam Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700" htmlFor="scam-type-dropdown">
                Filter by type of scam
              </label>
              <div className="relative">
                <select
                  id="scam-type-dropdown"
                  value={selectedScamType}
                  onChange={(e) => setSelectedScamType(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 text-xs border border-gray-300 rounded bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] text-gray-700 font-semibold cursor-pointer transition-all"
                >
                  {scamTypes.map((type, sIdx) => (
                    <option key={sIdx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* C. Filter Article Type */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700" htmlFor="article-type-dropdown">
                Article Type
              </label>
              <div className="relative">
                <select
                  id="article-type-dropdown"
                  value={selectedArticleType}
                  onChange={(e) => setSelectedArticleType(e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 text-xs border border-gray-300 rounded bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#005a9c]/20 focus:border-[#005a9c] text-gray-700 font-semibold cursor-pointer transition-all"
                >
                  {articleTypes.map((type, aIdx) => (
                    <option key={aIdx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* D. Apply Button */}
            <button
              onClick={handleApplyFilters}
              className="w-full py-3 bg-[#005a9c] hover:bg-[#00487c] active:bg-[#003d6b] text-white rounded text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-xs hover:shadow-md"
              id="apply-filter-button"
            >
              Apply
            </button>
          </aside>

          {/* Right Content Column (75%) */}
          <section className="flex-grow w-full space-y-6">
            
            {/* Display Stats Row */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs text-[#2d3748]">
              <span className="font-medium">
                Displaying <strong className="font-bold text-[#1b365d]">{totalItems === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)}</strong> of <strong className="font-bold text-[#1b365d]">{totalItems}</strong>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Show:</span>
                <select className="border border-gray-300 rounded bg-white text-xs px-1.5 py-1 focus:outline-none font-semibold text-gray-700" defaultValue="5">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>

            {/* List of articles */}
            {paginatedArticles.length > 0 ? (
              <div className="space-y-8 divide-y divide-gray-100">
                {paginatedArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className={`pt-8 first:pt-0 group flex flex-col space-y-2.5`}
                    id={`article-card-${article.id}`}
                  >
                    {/* Category Label */}
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#005a9c] bg-[#e6f2fc] px-2 py-0.5 rounded-sm self-start select-none">
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3
                      onClick={() => onOpenArticle(article)}
                      className="text-lg sm:text-[20px] font-serif font-bold text-[#1b365d] leading-snug hover:text-[#005a9c] hover:underline cursor-pointer transition-colors"
                    >
                      {article.title}
                    </h3>

                    {/* Author & Date */}
                    <div className="flex items-center gap-2.5 text-xs text-slate-400 font-semibold select-none">
                      <span>{article.author}</span>
                      <span className="text-slate-300">•</span>
                      <span>{article.date}</span>
                    </div>

                    {/* Snippet */}
                    <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-sans">
                      {article.snippet}
                    </p>

                    {/* Tags list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="bg-slate-50 border border-slate-100 text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full font-medium select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <HelpCircle className="mx-auto text-slate-400 mb-3" size={38} />
                <p className="text-sm font-bold text-gray-700">No scams found matching those search criteria.</p>
                <p className="text-xs text-gray-500 mt-1">Try resetting the search terms or choosing a different category.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-xs bg-white border border-gray-300 hover:bg-gray-50 text-[#005a9c] font-bold px-4 py-2 rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Custom Interactive Pagination (Replicating style from Image 1) */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-150 pt-8 mt-10 gap-4 text-xs text-[#2d3748]">
                <span className="font-medium text-gray-500">
                  Displaying <strong className="font-bold text-[#1b365d]">{startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)}</strong> of <strong className="font-bold text-[#1b365d]">{totalItems}</strong>
                </span>
                
                <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    &lt;&lt; first
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    &lt; prev
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded border transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-[#1b365d] border-[#1b365d] text-white font-bold"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    next &gt;
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                  >
                    last &gt;&gt;
                  </button>
                </div>
              </div>
            )}

          </section>
        </div>
      </main>
    </div>
  );
}
