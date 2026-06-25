/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Twitter, Linkedin, Youtube, Rss, ArrowUp, Globe } from "lucide-react";
import ftcLogoImg from "@/assets/ftclogo.png";

interface FooterProps {
  onNavigate: (page: "scams" | "home") => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0f1f38] text-white font-sans mt-auto border-t border-slate-800">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row justify-between items-center gap-6 border-b border-[#2c4e7a]/30">
        
        {/* Logo Brand Footer */}
        <div className="flex items-center gap-3 select-none">
          <img 
            src={ftcLogoImg} 
            alt="FTC Seal" 
            className="w-12 h-12 flex-shrink-0 object-contain aspect-square" 
          />
          <div className="flex flex-col border-l border-[#2c4e7a]/60 pl-3">
            <span className="text-[10px] font-bold tracking-widest text-blue-200 leading-none">
              FEDERAL TRADE COMMISSION
            </span>
            <span className="text-sm font-bold text-white tracking-wider leading-tight mt-0.5">
              CONSUMER ADVICE
            </span>
          </div>
        </div>

        {/* Footer Navigation Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-[13px] font-bold">
          <button 
            onClick={() => onNavigate("/policy/rules-and-regulations/10293847/advertising-endorsement-guides")} 
            className="hover:text-blue-300 transition-colors cursor-pointer bg-transparent border-none text-white font-bold"
          >
            Feature Pages
          </button>
          <button 
            onClick={() => onNavigate("/advice-and-guidance/scams-and-alerts/88371947/avoiding-reporting")} 
            className="hover:text-blue-300 transition-colors cursor-pointer bg-transparent border-none text-white font-bold"
          >
            Articles
          </button>
          <button 
            onClick={() => onNavigate("/advice-and-guidance/scams-and-alerts/88371947/avoiding-reporting")} 
            className="hover:text-blue-300 transition-colors cursor-pointer bg-transparent border-none text-white font-bold"
          >
            Consumer Alerts
          </button>
          <button 
            onClick={() => onNavigate("/news-and-events/press-releases/40058291/voice-cloning-workshop-announcement")} 
            className="hover:text-blue-300 transition-colors cursor-pointer bg-transparent border-none text-white font-bold"
          >
            Videos
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent("trigger-report-modal"))} 
            className="hover:text-blue-300 transition-colors cursor-pointer bg-transparent border-none text-white font-bold"
          >
            Report Fraud
          </button>
          <button 
            onClick={() => onNavigate("/advice-and-guidance/consumer-blog/98471029/spotting-scams-2026")} 
            className="hover:text-blue-300 transition-colors cursor-pointer bg-transparent border-none text-white font-bold"
          >
            Get Consumer Alerts
          </button>
        </div>

      </div>

      {/* Lower Sub Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Administrative Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs text-[#a5b4fc]/70 font-semibold">
            <a 
              href="https://www.ftc.gov" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              ftc.gov
            </a>
            <span className="text-[#2c4e7a]/60 select-none">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">About Us</span>
            <span className="text-[#2c4e7a]/60 select-none">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contact Us</span>
            <span className="text-[#2c4e7a]/60 select-none">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy and Notices</span>
            <span className="text-[#2c4e7a]/60 select-none">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">FOIA</span>
            <span className="text-[#2c4e7a]/60 select-none">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Office of Inspector General</span>
          </div>

          {/* Social Icons and Scroll to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-300">
              <span className="hover:text-white cursor-pointer transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </span>
              <span className="hover:text-white cursor-pointer transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </span>
              <span className="hover:text-white cursor-pointer transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </span>
              <span className="hover:text-white cursor-pointer transition-colors" aria-label="YouTube">
                <Youtube size={16} />
              </span>
              <span className="hover:text-white cursor-pointer transition-colors" aria-label="RSS Feed">
                <Rss size={16} />
              </span>
              <span className="hover:text-white cursor-pointer transition-colors border-l border-gray-600 pl-4" aria-label="Globe">
                <Globe size={16} />
              </span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-[#2c4e7a] hover:bg-[#3d679d] text-white rounded-full transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer"
              title="Scroll to Top"
              id="back-to-top-button"
            >
              <ArrowUp size={12} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
