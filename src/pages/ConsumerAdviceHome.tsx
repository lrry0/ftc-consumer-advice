/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { 
  ShieldCheck, AlertTriangle, CreditCard, MailCheck, Play, Users, 
  CheckCircle, ArrowRight, Building, BookOpen, Gift, AlertCircle, FileText
} from "lucide-react";
import { OTHER_FTC_ARTICLES, CONSUMER_ALERTS_SHORT, SCAMS_ARTICLES } from "../data";
import { Article } from "../types";
import { motion, AnimatePresence } from "motion/react";

import creditReportHeroBg from "@/assets/credit_report_hero_bg.png";
import reportFraudCardImg from "@/assets/report_fraud_card.png";
import passItOnCardImg from "@/assets/pass_it_on_card.png";
import takeItDownCardImg from "@/assets/take_it_down_card.png";
import ftcScamCardImg from "@/assets/ftc_scam_card.png";
import weatherEmergencyCardImg from "@/assets/weather_emergency_card.png";

interface ConsumerAdviceHomeProps {
  onOpenArticle: (article: Article) => void;
  onNavigate: (path: string) => void;
}

export default function ConsumerAdviceHome({ onOpenArticle, onNavigate }: ConsumerAdviceHomeProps) {
  // Subscription form state
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  // Report fraud simulated interactive form modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportForm, setReportForm] = useState({
    name: "",
    email: "",
    scamType: "Impersonator",
    companyName: "",
    details: "",
    amountLost: "",
  });

  // Video presentation modal state
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  // Listen to header/footer clicks for report modal trigger
  useEffect(() => {
    const handleTriggerReport = () => {
      setIsReportModalOpen(true);
    };
    window.addEventListener("trigger-report-modal", handleTriggerReport);
    return () => {
      window.removeEventListener("trigger-report-modal", handleTriggerReport);
    };
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSubscribeError("Please enter a valid email address");
      return;
    }
    setSubscribeError("");
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 4000);
  };

  const handleReportSubmit = (e: FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setIsReportModalOpen(false);
      setReportSuccess(false);
      setReportForm({
        name: "",
        email: "",
        scamType: "Impersonator",
        companyName: "",
        details: "",
        amountLost: "",
      });
    }, 3500);
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === "report") {
      setIsReportModalOpen(true);
    } else if (actionId === "id-theft") {
      const art = OTHER_FTC_ARTICLES.find(a => a.id === "stalkerware-warnings");
      if (art) onOpenArticle(art);
    } else if (actionId === "credit") {
      const art = OTHER_FTC_ARTICLES.find(a => a.id === "free-credit-reports-2026");
      if (art) onOpenArticle(art);
    } else if (actionId === "alerts") {
      const el = document.getElementById("newsletter-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        el.classList.add("ring-4", "ring-[#0b5c9e]/30");
        setTimeout(() => el.classList.remove("ring-4"), 2000);
      }
    }
  };

  return (
    <div className="w-full bg-white pb-16 font-sans">
      
      {/* 1. Hero Section - Fair Credit Reporting Act */}
      <section 
        className="w-full relative bg-slate-900 text-white min-h-[440px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${creditReportHeroBg})` }}
      >
        {/* Left Side Diagonal Blue Gradient Overlay (20% transparency for 60% split, 95% transparency for 40% split) */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,54,93,0.8)_0%,rgba(27,54,93,0.8)_60%,rgba(27,54,93,0.05)_100%)] z-10" />

        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 w-full">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-5.5xl font-serif font-semibold tracking-tight leading-tight">
              Fair Credit Reporting Act
            </h1>
            <p className="text-sm md:text-lg text-gray-100 max-w-2xl leading-relaxed font-normal">
              Do you use credit reports to make eligibility decisions about consumers? Learn about the Fair Credit Reporting Act and how to responsibly use, report and dispose of information in those reports.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  const art = OTHER_FTC_ARTICLES.find(a => a.id === "free-credit-reports-2026") || OTHER_FTC_ARTICLES[0];
                  onOpenArticle(art);
                }}
                className="bg-[#0071bc] hover:bg-[#005a9c] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Warning Alert Card positioned relative to the full-width section (aligned to right edge of viewport and taller) */}
        <div className="hidden lg:flex absolute right-0 bottom-[-220px] bg-[#0b5c9e] text-white py-12 px-8 w-[390px] min-h-[400px] shadow-2xl border-t-4 border-[#ffbe2e] z-30 flex-col justify-between">
          <p className="text-base font-serif font-medium leading-relaxed">
            The FTC will never demand money, make threats, tell you to transfer money, or promise you a prize. If you have been targeted by an illegal business practice or scam, report it.
          </p>
          <div className="pt-4 space-y-2">
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="px-6 py-3 bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-xs w-full text-center"
            >
              Report to the FTC
            </button>
            <button 
              onClick={() => onNavigate("/advice-and-guidance/report/77391024/norton-consumer-investigation")}
              className="text-center text-xs font-bold text-[#ffbe2e] hover:underline cursor-pointer block w-full"
            >
              View Consumer Registry Record #77391024
            </button>
          </div>
        </div>
      </section>

      {/* Mobile view of the alert card (stacked) */}
      <section className="block lg:hidden w-full bg-[#0b5c9e] text-white p-6 border-b-4 border-[#ffbe2e]">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-sm font-serif font-medium leading-relaxed">
            The FTC will never demand money, make threats, tell you to transfer money, or promise you a prize. If you have been targeted by an illegal business practice or scam, report it.
          </p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="px-6 py-2.5 bg-[#111827] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
            >
              Report to the FTC
            </button>
            <button 
              onClick={() => onNavigate("/advice-and-guidance/report/77391024/norton-consumer-investigation")}
              className="text-center text-xs font-bold text-[#ffbe2e] hover:underline cursor-pointer block"
            >
              View Consumer Registry Record #77391024
            </button>
          </div>
        </div>
      </section>

      {/* 2. Take Action Section */}
      <section className="w-full bg-white pt-12 pb-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="lg:w-[65%] space-y-8">
            <h2 className="text-2xl md:text-3.5xl font-serif font-semibold text-[#1b365d]">
              Take Action
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { 
                  label: "Report fraud", 
                  icon: <AlertCircle size={18} className="text-[#005a9c]" />,
                  onClick: () => setIsReportModalOpen(true)
                },
                { 
                  label: "Get your free credit report", 
                  icon: <span className="font-bold text-[#005a9c] text-lg">$</span>,
                  onClick: () => handleActionClick("credit")
                },
                { 
                  label: "Merger/Antitrust Comment", 
                  icon: <FileText size={18} className="text-[#005a9c]" />,
                  onClick: () => onNavigate("/advice-and-guidance/scams-and-alerts/88371947/avoiding-reporting")
                },
                { 
                  label: "Report Take It Down violations", 
                  icon: <FileText size={18} className="text-[#005a9c]" />,
                  onClick: () => handleActionClick("id-theft")
                },
                { 
                  label: "Report identity theft", 
                  icon: <ShieldCheck size={18} className="text-[#005a9c]" />,
                  onClick: () => handleActionClick("id-theft")
                },
                { 
                  label: "Register for Do Not Call", 
                  icon: <MailCheck size={18} className="text-[#005a9c]" />,
                  onClick: () => onNavigate("/advice-and-guidance/scams-and-alerts/88371947/avoiding-reporting")
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="flex items-center gap-3 text-left group cursor-pointer border-b border-gray-100 pb-2.5 hover:bg-slate-50/50 transition-colors w-full"
                >
                  <div className="flex-shrink-0 w-5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm md:text-base font-semibold text-[#005a9c] group-hover:underline group-hover:text-[#00487c]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cards Section */}
      <section className="w-full bg-[#f4f7f9] py-16 border-t border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: "Dealing with Weather Emergencies",
                desc: "Learn how to prepare for extreme weather, recognize disaster-related scams, find reputable charities, and more.",
                image: weatherEmergencyCardImg
              },
              {
                title: "Take It Down Act",
                desc: "The Take It Down Act requires online platforms to establish a process for victims to request the removal of intimate photos or videos shared without their consent. Learn how you can report platforms that are not complying with the law.",
                image: takeItDownCardImg
              },
              {
                title: "Don't Fall for This New 'FTC' Scam",
                desc: "Scammers pretending to be FTC employees are tricking consumers into giving them money, access to financial accounts or personal information. Remember: A real FTC employee won't text you their photo ID to \"verify\" their identity. Learn more about this new scam.",
                image: ftcScamCardImg
              }
            ].map((card, idx) => (
              <article 
                key={idx} 
                className="bg-white border border-gray-200/60 shadow-xs rounded-lg overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300 group"
              >
                <div className="w-full aspect-[3/2] overflow-hidden bg-slate-100 border-b border-gray-100">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-[17px] md:text-[20px] font-serif font-bold text-[#1b365d] group-hover:text-[#005a9c] hover:underline cursor-pointer leading-snug transition-colors">
                    {card.title}
                  </h3>
                  
                  {/* Design System Accent Underline */}
                  <div className="w-16 h-[3px] bg-[#005a9c] mt-4 mb-5" />
                  
                  <p className="text-xs md:text-[13.5px] text-gray-600 leading-relaxed font-sans flex-grow">
                    {card.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Slider Indicator Pill */}
          <div className="flex justify-center mt-12">
            <div className="w-12 h-2 bg-gray-400 rounded-full shadow-inner select-none cursor-default" />
          </div>
        </div>
      </section>

      {/* Interactive Simulated Report Fraud Form Modal */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-lg my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header */}
              <div className="bg-[#005a9c] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-yellow-300" />
                  <h3 className="font-serif font-bold text-lg">Report Fraud to the FTC</h3>
                </div>
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded p-1"
                >
                  ✕
                </button>
              </div>

              {/* Form Body */}
              {reportSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Report Successfully Submitted!</h4>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                    Thank you. Your detailed report has been registered under case ID <strong>#{Math.floor(100000 + Math.random() * 900000)}</strong>. Federal trade safety investigators will analyze your submission.
                  </p>
                  <p className="text-xs text-gray-400">Closing portal window...</p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
                  <p className="text-xs text-gray-500 leading-relaxed border-b border-gray-100 pb-2">
                    Help us catch bad actors. All submissions are processed securely in accordance with US digital privacy standards.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 block">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reportForm.name}
                        onChange={(e) => setReportForm({...reportForm, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 block">Your Email</label>
                      <input
                        type="email"
                        required
                        value={reportForm.email}
                        onChange={(e) => setReportForm({...reportForm, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 block">Scam Category</label>
                      <select
                        value={reportForm.scamType}
                        onChange={(e) => setReportForm({...reportForm, scamType: e.target.value})}
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
                      >
                        <option value="Impersonator">Impersonator (Fake Agent)</option>
                        <option value="Phishing">Phishing (Fake Link)</option>
                        <option value="Job Scam">Job Scam / Recruiter</option>
                        <option value="Unordered Goods">Unordered Goods / Bills</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 block">Approx. Amount Lost (USD)</label>
                      <input
                        type="number"
                        required
                        value={reportForm.amountLost}
                        onChange={(e) => setReportForm({...reportForm, amountLost: e.target.value})}
                        placeholder="$ 500"
                        className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 block">Scammer Company/Identity Name</label>
                    <input
                      type="text"
                      required
                      value={reportForm.companyName}
                      onChange={(e) => setReportForm({...reportForm, companyName: e.target.value})}
                      placeholder="e.g. 'FTC Officer Smith', 'UPS Courier Service'"
                      className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-700 block">Brief Details of Incident</label>
                    <textarea
                      required
                      rows={3}
                      value={reportForm.details}
                      onChange={(e) => setReportForm({...reportForm, details: e.target.value})}
                      placeholder="Explain what the scammer said and what payment method they demanded..."
                      className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsReportModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold bg-[#005a9c] hover:bg-[#00487c] text-white rounded-md transition-colors shadow-xs"
                    >
                      Submit Case Report
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
