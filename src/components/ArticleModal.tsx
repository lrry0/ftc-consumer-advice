/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Calendar, User, Printer, Share2, Check } from "lucide-react";
import { useState } from "react";
import { Article } from "../types";
import { motion } from "motion/react";

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Convert content double newlines to paragraphs for basic rich rendering
  const paragraphs = article.content
    ? article.content.split("\n\n").map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        id="article-detail-modal"
      >
        {/* Modal Header Actions */}
        <div className="flex justify-between items-center bg-[#1b365d] text-white px-6 py-4.5">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-200">
            {article.category}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
              title="Print Article"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Copy link"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
              {copied ? "Copied!" : "Share"}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
              title="Close modal"
              id="close-modal-button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto leading-relaxed text-gray-800">
          {/* Article Category Badge */}
          <span className="inline-block bg-[#e6f0fa] text-[#1b365d] text-xs font-bold px-2.5 py-1 rounded-sm mb-4">
            {article.category}
          </span>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1b365d] tracking-tight leading-tight mb-4">
            {article.title}
          </h2>

          {/* Author, Date Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-gray-400" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Body Content Paragraphs */}
          <div className="space-y-4 text-sm md:text-base leading-relaxed font-sans">
            {paragraphs.map((p, idx) => {
              if (p.startsWith("###")) {
                // Section Heading
                return (
                  <h3 key={idx} className="text-lg font-bold text-[#1b365d] pt-3 pb-1 border-b border-slate-100">
                    {p.replace("###", "").trim()}
                  </h3>
                );
              }
              if (p.startsWith("* ") || p.startsWith("- ")) {
                // List items
                const items = p.split("\n").map(li => li.replace(/^[\*\-]\s+/, "").trim());
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1 text-gray-700">
                    {items.map((li, liIdx) => {
                      if (li.startsWith("**")) {
                        const parts = li.split("**");
                        return (
                          <li key={liIdx}>
                            <strong>{parts[1]}</strong>
                            {parts.slice(2).join("")}
                          </li>
                        );
                      }
                      return <li key={liIdx}>{li}</li>;
                    })}
                  </ul>
                );
              }
              if (p.match(/^\d+\./)) {
                // Numbered lists
                const items = p.split("\n").map(li => li.replace(/^\d+\.\s+/, "").trim());
                return (
                  <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    {items.map((li, liIdx) => {
                      if (li.startsWith("**")) {
                        const parts = li.split("**");
                        return (
                          <li key={liIdx}>
                            <strong>{parts[1]}</strong>
                            {parts.slice(2).join("")}
                          </li>
                        );
                      }
                      return <li key={liIdx}>{li}</li>;
                    })}
                  </ol>
                );
              }
              // Normal Paragraph
              return <p key={idx} className="text-gray-700">{p}</p>;
            })}
          </div>

          {/* Tag list */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">
                Tagged Under
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / CTA */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Done Reading
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-[#1b365d] text-white hover:bg-[#122744] rounded-md transition-colors shadow-sm"
          >
            Print Copy
          </button>
        </div>
      </motion.div>
    </div>
  );
}
