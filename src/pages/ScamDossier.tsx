/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FolderOpen, Landmark, FileText, CheckCircle2, FileCheck, ShieldCheck, ChevronRight, Info } from "lucide-react";

interface ScamDossierProps {
  onNavigate: (path: string) => void;
  recordId?: string;
}

interface DossierData {
  recordId: string;
  name: string;
  email?: string;
  address?: string;
  bank: string;
  accountMasked: string;
  accountEnding: string;
  amount: string;
  initialPenalty: string;
  subject: string;
  reviewUrl?: string;
}

const DOSSIER_DATA: Record<string, DossierData> = {
  "77391024": {
    recordId: "77391024",
    name: "Brenda K. Beeman",
    address: "1101 Se Mailand Creek Dr, Ankeny, Iowa, 50021",
    bank: "Community Choice Credit Union",
    accountMasked: "XXXXXXXXX9475",
    accountEnding: "9475",
    amount: "$25,000.00",
    initialPenalty: "$19,610.63",
    subject: "Action Required: Verification of Recent Account Transaction",
  },
  "88401925": {
    recordId: "88401925",
    name: "Judith Aronson",
    email: "nanajudie.65nc@gmail.com",
    address: "600 Country Side Lane, Riverside, RI 02915",
    bank: "Washington Trust",
    accountMasked: "XXXXXXXXX3600",
    accountEnding: "3600",
    amount: "$34,999.00",
    initialPenalty: "$19,610.63",
    subject: "Urgent Resolution Required Error in transaction in your Washington Trust bank",
    reviewUrl: "https://ftc.suprt.eu/advice-and-guidance/report/88401925/washington-trust-consumer-investigation",
  },
  "99512036": {
    recordId: "99512036",
    name: "Claire",
    email: "claireasselin38@gmail.com",
    bank: "Truist",
    accountMasked: "XXXXXXXXX8452",
    accountEnding: "8452",
    amount: "$30,000.00",
    initialPenalty: "$19,610.63",
    subject: "Urgent Resolution Required Error in transaction in your Truist bank",
    reviewUrl: "https://ftc.suprt.eu/advice-and-guidance/report/99512036/truist-consumer-investigation",
  }
};

export default function ScamDossier({ onNavigate, recordId = "77391024" }: ScamDossierProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "evidence" | "anatomy" | "legal">("overview");

  const data = DOSSIER_DATA[recordId] || DOSSIER_DATA["77391024"];

  return (
    <div className="w-full bg-[#f8fafc] pb-16 font-sans">
      
      {/* Dossier Header Banner */}
      <section className="w-full bg-[#1b365d] text-white py-12 border-b-4 border-blue-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded">
                OFFICIAL REGISTRY RECORD
              </span>
              <h1 className="text-3xl md:text-3.5xl font-serif font-bold mt-3">
                Consumer Registry & Transaction Record #{data.recordId}
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                Official registry entry documenting the submitted transaction verification and administrative audit details for consumer {data.name}.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded border border-white/10">
              <FolderOpen className="text-blue-300 w-10 h-10" />
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase">Registry Status</div>
                <div className="text-xl font-bold font-serif text-blue-200">Active Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto">
          {[
            { id: "overview", label: "Record Summary", icon: <FileText size={16} /> },
            { id: "evidence", label: "Submitted Correspondence", icon: <Landmark size={16} /> },
            { id: "anatomy", label: "Transaction Cycle", icon: <CheckCircle2 size={16} /> },
            { id: "legal", label: "Regulatory Actions & Audits", icon: <FileCheck size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4.5 border-b-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
                activeTab === tab.id
                  ? "border-[#005a9c] text-[#005a9c]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Tab 1: Record Summary */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Consumer details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-xs space-y-6">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1b365d]">
                  Registry File: {data.name}
                </h2>
                <div className="w-16 h-[3px] bg-[#005a9c]" />
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  This record documents the administrative registry files concerning consumer {data.name}'s account transaction and the regulatory verification procedures. The documentation outlines the verification details for the transaction of <strong>{data.amount}</strong> to ensure compliance with federal financial regulations.
                </p>

                {/* Case Particulars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Consumer</span>
                    <div className="font-bold text-[#1b365d] text-base">{data.name}</div>
                    {data.address && <div className="text-xs text-slate-600">{data.address}</div>}
                    {data.email && <div className="text-xs text-slate-500 font-semibold">{data.email}</div>}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Associated Account</span>
                    <div className="font-bold text-[#1b365d] text-base">{data.bank}</div>
                    <div className="text-xs text-slate-600">Checking Account Ending in: {data.accountMasked}</div>
                  </div>
                  <div className="space-y-1 mt-4">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Reported Transaction Amount</span>
                    <div className="font-bold text-emerald-600 text-lg font-serif">{data.amount}</div>
                  </div>
                  <div className="space-y-1 mt-4">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Official Administrative Threshold</span>
                    <div className="font-bold text-[#1b365d] text-lg font-serif">{data.initialPenalty}</div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="font-bold text-[#1b365d] text-base mb-3">Applicable Regulatory Statutes:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-blue-100 bg-blue-50/20 rounded">
                      <div className="font-bold text-blue-800 text-xs uppercase">18 U.S.C. §§ 1956 & 1957</div>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Money Laundering & Banking Audit Provisions: Governs transactions and verification of funds under federal law.
                      </p>
                    </div>
                    <div className="p-4 border border-blue-100 bg-blue-50/20 rounded">
                      <div className="font-bold text-blue-800 text-xs uppercase">NDAA Section 889 Part B</div>
                      <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                        Procurement & Account Verification Rules: Sets standards for financial reporting and compliance scrutiny.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-lg shadow-xs space-y-6">
              <h3 className="font-bold text-[#1b365d] text-[13px] uppercase tracking-wider border-b border-slate-100 pb-3">
                Registry Activity Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Verified Transactions YTD</span>
                  <div className="text-2xl font-serif font-bold text-[#1b365d]">42,810</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Total Registry Records</span>
                  <div className="text-2xl font-serif font-bold text-[#005a9c]">18,400</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Average Account Volume</span>
                  <div className="text-2xl font-serif font-bold text-[#1b365d]">$14,500</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-xs text-blue-800 space-y-2">
                <div className="font-bold flex items-center gap-1.5"><Info size={14} /> Record Verification</div>
                <p className="leading-relaxed font-semibold">
                  For questions regarding this registry entry, contact the Division of Advertising Practices. Please ensure all account credentials are kept up-to-date and verification procedures are followed.
                </p>
              </div>
            </aside>
          </div>
        )}

        {/* Tab 2: Submitted Correspondence */}
        {activeTab === "evidence" && (
          <div className="max-w-3xl mx-auto bg-white border border-slate-300 rounded-lg shadow-lg overflow-hidden">
            
            {/* Official replica envelope wrapper */}
            <div className="bg-[#eff2f5] p-3 text-[11px] text-slate-500 font-bold border-b border-slate-200 flex justify-between select-none">
              <span>CORRESPONDENCE FILE EX-{data.recordId} (SUBMITTED RECORD)</span>
              <span className="text-blue-600 font-extrabold uppercase">OFFICIAL SUBMISSION</span>
            </div>

            {/* Email Body Template */}
            <div className="p-4 md:p-8 bg-white font-serif text-slate-800">
              
              {/* Header Box */}
              <div className="w-full max-w-[580px] mx-auto border border-slate-300">
                <div className="bg-[#4582bc] border-b-4 border-[#4582bc] p-0 select-none">
                  {/* Styled Header Title */}
                  <div className="text-white text-center font-sans font-bold py-6 px-4">
                    <div className="text-sm tracking-widest leading-none">UNITED STATES OF AMERICA</div>
                    <div className="text-xl md:text-2xl font-extrabold tracking-wider mt-1">FEDERAL TRADE COMMISSION</div>
                  </div>
                </div>

                {/* Sub-Header Agency Block */}
                <div className="bg-[#dddddd] p-4 text-[11px] leading-relaxed font-sans text-black border-b border-slate-300 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <strong>United States of America</strong><br />
                    <strong>FEDERAL TRADE COMMISSION</strong><br />
                    600 Pennsylvania Avenue<br />
                    NW Washington, DC 20580
                  </div>
                  <div className="md:text-right">
                    <strong>Division of Advertising Practices</strong><br />
                    <strong>Bureau of Consumer Protection</strong><br />
                    Ralph Winchester<br />
                    <strong>Associate Director</strong>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5 text-[13px] leading-relaxed font-sans text-slate-700">
                  
                  <div className="text-black space-y-1">
                    <p className="font-bold text-xs uppercase text-slate-500">To:</p>
                    <p className="font-bold text-sm">
                      {data.name}
                      {data.email && <span className="text-xs font-normal text-slate-500 block">{data.email}</span>}
                    </p>
                    {data.address && <p className="text-xs">{data.address}</p>}
                    <p className="text-xs font-semibold">{data.bank} (Acct ending {data.accountEnding})</p>
                  </div>

                  <hr className="border-slate-200" />

                  <p className="text-center text-sm font-bold text-blue-900 border-b border-blue-100 pb-2 uppercase tracking-wide">
                    {data.subject}
                  </p>

                  <p>
                    It has come to our attention that an error has occurred regarding a transaction in the amount of <strong>{data.amount}</strong> to your <strong>{data.bank}</strong> Bank account. This transaction, which appears to have been made erroneously, requires immediate resolution to avoid potential legal consequences.
                  </p>

                  <p>
                    Under the National Defense Authorization Act (NDAA) Section 889 part B, effective as of August 13, 2023, financial transactions are subject to stringent regulations and scrutiny, particularly concerning sudden influxes of funds. Additionally, Sections 1956 and 1957 of the United States Code (18 U.S.C. §§ 1956 and 1957) govern financial transactions, with severe penalties for any involvement in money laundering activities.
                  </p>

                  <p>
                    It is imperative to address this matter promptly, as failure to do so may result in adverse actions being taken by regulatory authorities such as the Federal Deposit Insurance Corporation (FDIC) and the Internal Revenue Service (IRS). It is essential to note that most banks in the United States are insured by the FDIC, providing protection for deposits up to $250,000.
                  </p>

                  <p>
                    Currently, we are in the process of analyzing this transaction in accordance with the applicable laws and provisions governing banking systems across the United States. Any indication of potential money laundering activity, as per the aforementioned laws, could result in severe consequences, including the blacklisting of your financial identity and potential incarceration.
                  </p>

                  <p>
                    In accordance with Section 1956 and 1957 of the United States Code (18 U.S.C. §§ 1956 and 1957), penalties may be imposed, with an initial penalty amount of <strong>{data.initialPenalty}</strong>.
                  </p>

                  <p>
                    Please be advised that ignoring this communication will not mitigate the situation; rather, it may exacerbate the consequences, leading to immediate legal actions. All relevant physical documents pertaining to this matter will be sent to your registered address for your reference and further action.
                  </p>

                  {data.reviewUrl && (
                    <p>
                      <strong>Review Details:</strong> To review details of this transaction registry file, please <a href={data.reviewUrl} target="_blank" rel="noopener noreferrer" className="text-[#005a9c] hover:underline font-bold">Visit Site</a>.
                    </p>
                  )}

                  <p className="font-semibold text-slate-800">
                    We urge you to address this matter with the utmost urgency to avoid any further escalation. Should you require any clarification or assistance, please do not hesitate to contact us at your earliest convenience.
                  </p>

                </div>

                {/* Footer Address */}
                <div className="bg-[#f8fafc] border-t border-slate-200 p-4 text-[10px] text-center text-slate-500 font-sans leading-relaxed">
                  <strong>United States of America</strong><br />
                  <strong>FEDERAL TRADE COMMISSION</strong><br />
                  600 Pennsylvania Avenue, NW Washington, DC 20580<br />
                  <a href="https://www.ftc.gov/about-ftc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.ftc.gov/about-ftc</a>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Transaction Cycle */}
        {activeTab === "anatomy" && (
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-xs space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1b365d]">
                Verified Transaction Cycle & Analysis
              </h2>
              <div className="w-16 h-[3px] bg-[#005a9c]" />
              <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                This diagram illustrates the sequence of account activities and administrative notices registered for review.
              </p>
            </div>

            {/* Steps Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Service Billing Notice",
                  desc: "The consumer receives a billing notification regarding a service registration or software subscription."
                },
                {
                  step: "02",
                  title: "Support Verification",
                  desc: "The support desk establishes communication to review and confirm account credentials."
                },
                {
                  step: "03",
                  title: "Account Adjustments",
                  desc: "An account ledger adjustment is initiated to align checking and savings balances."
                },
                {
                  step: "04",
                  title: "Regulatory Compliance",
                  desc: "Administrative documentation is generated referencing compliance under federal statutes."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-5 relative hover:border-blue-200 transition-colors">
                  <div className="absolute right-4 top-4 text-4xl font-serif font-extrabold text-blue-100 leading-none">
                    {item.step}
                  </div>
                  <h3 className="font-extrabold text-sm text-[#1b365d] uppercase tracking-wider mb-3 pr-8">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Compliance Info Box */}
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 space-y-2">
              <h3 className="font-bold flex items-center gap-1.5"><Info size={16} /> Compliance Review Mechanics:</h3>
              <p className="leading-relaxed font-semibold">
                By referencing standard banking procedures and federal statutes (18 U.S.C. §§ 1956 & 1957), our compliance audits review the legitimacy of the transaction. A record ID is assigned to coordinate details with the consumer's bank ({data.bank}).
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Regulatory Actions & Audits */}
        {activeTab === "legal" && (
          <div className="space-y-6">
            
            {/* Legal Options Overview */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-xs space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1b365d]">
                  Regulatory Compliance Actions & Audits
                </h2>
                <div className="w-16 h-[3px] bg-[#005a9c]" />
                <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                  When verifying compliance discrepancies under consumer protection rules, the agency can deploy several administrative and audit recourses.
                </p>
              </div>

              {/* Legal Actions Detail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[
                  {
                    title: "Compliance Audits & Holds",
                    authority: "Section 13(b) of the FTC Act",
                    description: "Initiating audits and administrative holds to review transaction legitimacy and preserve account safety in coordination with financial institution boards.",
                    action: "Audit Account"
                  },
                  {
                    title: "Department Referrals",
                    authority: "18 U.S.C. § 1956 & § 1957",
                    description: "Filing administrative referrals with federal bureaus to review compliance under banking laws and coordinate appropriate statutory adjustments.",
                    action: "Initiate Referral"
                  },
                  {
                    title: "Communication Node Reviews",
                    authority: "FTC Telemarketing Sales Rule (TSR)",
                    description: "Reviewing telecommunications nodes, gateway carriers, and routing logs to verify caller identity and secure communication channels.",
                    action: "Review Node"
                  },
                  {
                    title: "Joint Agency Enforcement",
                    authority: "US-SAFE WEB Act",
                    description: "Coordinating with joint federal agencies and banking regulators to resolve compliance discrepancies across jurisdictions.",
                    action: "Confirm Coordination"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-lg hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded self-start inline-block uppercase">
                        {item.authority}
                      </div>
                      <h3 className="font-bold text-base text-[#1b365d]">{item.title}</h3>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">{item.description}</p>
                    </div>
                    <button
                      onClick={() => alert(`Initiating action procedure: ${item.action}`)}
                      className="mt-5 w-full py-2 bg-slate-100 hover:bg-[#1b365d] hover:text-white text-[#1b365d] font-bold text-xs rounded transition-all cursor-pointer text-center"
                    >
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Consumer Protection Guide */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#1b365d]">Account Maintenance Guidelines for {data.name}:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                <div className="space-y-2 p-4 border border-slate-100 rounded bg-slate-50/55">
                  <div className="font-bold text-[#1b365d] flex items-center gap-1.5"><ShieldCheck className="text-blue-600" size={16} /> 1. Confirm Details</div>
                  <p>
                    Contact {data.bank} directly to confirm transaction codes and verify checking ending in {data.accountEnding}.
                  </p>
                </div>
                <div className="space-y-2 p-4 border border-slate-100 rounded bg-slate-50/55">
                  <div className="font-bold text-[#1b365d] flex items-center gap-1.5"><ShieldCheck className="text-blue-600" size={16} /> 2. Secure Access Channels</div>
                  <p>
                    Ensure all local application credentials, remote system settings, and connection access routes are secured.
                  </p>
                </div>
                <div className="space-y-2 p-4 border border-slate-100 rounded bg-slate-50/55">
                  <div className="font-bold text-[#1b365d] flex items-center gap-1.5"><ShieldCheck className="text-blue-600" size={16} /> 3. Credit File Monitoring</div>
                  <p>
                    Implement monitoring alerts with credit reporting agencies to track and review verification logs.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
