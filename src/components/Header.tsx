/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ChevronDown, Search, Menu, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ftcLogoImg from "@/assets/ftclogo.png";
import titleImg from "@/assets/title.png";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { label: "Enforcement", path: "/enforcement/cases-and-proceedings/30056824/consent-agreement-restitution" },
    { label: "Policy", path: "/policy/rules-and-regulations/10293847/advertising-endorsement-guides" },
    { label: "Advice and Guidance", path: "/advice-and-guidance/consumer-blog/98471029/spotting-scams-2026" },
    { label: "News and Events", path: "/news-and-events/press-releases/40058291/voice-cloning-workshop-announcement" },
    { label: "About the FTC", path: "/about-the-ftc/commissioners/50067219/bureau-consumer-protection-structure" },
  ];

  return (
    <header className="w-full flex flex-col font-sans relative z-50">
      
      {/* Main Branding & Primary Navigation */}
      <div className="w-full bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Logo Brand Panel */}
          <div 
            onClick={() => onNavigate("/")} 
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo"
          >
            <img 
              src={ftcLogoImg} 
              alt="FTC Seal" 
              className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 object-contain aspect-square transition-transform duration-200 group-hover:scale-102" 
            />
            <img 
              src={titleImg} 
              alt="Federal Trade Commission - Protecting America's Consumers" 
              className="h-12 md:h-16 object-contain max-w-[280px] md:max-w-xs" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navItems.map((item, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.path)}
                  className="text-xs xl:text-[14px] font-bold text-[#1b365d] hover:text-[#005a9c] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {item.label}
                  <ChevronDown size={14} className="opacity-70" />
                </button>
              );
            })}

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-[#1b365d] hover:text-[#005a9c] cursor-pointer transition-colors"
              aria-label="Search site"
            >
              <Search size={18} />
            </button>
          </nav>

          {/* Hamburger Menu & Search (Mobile/Tablet) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 text-[#1b365d]"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 text-[#1b365d]"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Global Interactive Search Dropdown Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full bg-[#1b365d] text-white py-4 shadow-inner"
          >
            <div className="max-w-3xl mx-auto px-4 flex items-center gap-3">
              <Search size={20} className="text-blue-200" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onNavigate("/advice-and-guidance/scams-and-alerts/88371947/avoiding-reporting");
                    setIsSearchOpen(false);
                    window.dispatchEvent(new CustomEvent("search-scams", { detail: searchQuery }));
                  }
                }}
                placeholder="Search scams, credit reports, identity theft, or advice... (Press Enter)"
                className="w-full bg-transparent border-b-2 border-blue-400 text-white placeholder-blue-200 focus:outline-none focus:border-white py-1.5 text-base"
                autoFocus
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-xs bg-[#12243f] hover:bg-[#234270] px-3 py-1.5 rounded-md font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col justify-between lg:hidden border-l border-gray-100"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="font-bold text-gray-400 text-xs tracking-wider uppercase">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items list */}
              <div className="flex flex-col gap-3">
                {navItems.map((item, idx) => {
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        onNavigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-2 px-3 text-sm font-semibold rounded-md transition-all flex items-center justify-between ${
                        isActive
                          ? "bg-[#1b365d] text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#1b365d]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} className="opacity-60" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links Footer in Drawer */}
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6">
              <button
                onClick={() => {
                  onNavigate("/");
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("trigger-report-modal"));
                }}
                className="w-full py-2.5 bg-[#005a9c] text-white rounded-md text-xs font-bold text-center hover:bg-[#00487c] shadow-sm flex items-center justify-center gap-2"
              >
                <AlertTriangle size={14} /> Report Fraud
              </button>
              <div className="text-[11px] text-gray-400 text-center">
                Official resource provided by the FTC BCP Staff.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
