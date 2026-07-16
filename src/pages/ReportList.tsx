/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { FolderOpen, Search, ChevronRight, Building, ShieldCheck } from "lucide-react";
import rawReportData from "../data/reportData.json";

interface ClientReportData {
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

interface ReportListProps {
  onNavigate: (path: string) => void;
}

export default function ReportList({ onNavigate }: ReportListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportData, setReportData] = useState<Record<string, ClientReportData>>(
    rawReportData as Record<string, ClientReportData>
  );

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setReportData(data);
        }
      })
      .catch((err) => console.error("Failed to load reports listing:", err));
  }, []);

  const reports = (Object.values(reportData) as ClientReportData[]).reverse(); // Show newest reports first

  const filteredReports = reports.filter((report) => {
    const query = searchTerm.toLowerCase();
    return (
      report.recordId.toLowerCase().includes(query) ||
      report.name.toLowerCase().includes(query) ||
      report.bank.toLowerCase().includes(query) ||
      (report.email && report.email.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full bg-[#f8fafc] pb-16 font-sans">
      {/* Registry List Header Banner */}
      <section className="w-full bg-[#1b365d] text-white py-12 border-b-4 border-blue-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-blue-200 bg-white/10 px-3 py-1 rounded">
                ADMINISTRATIVE REGISTRY LIST
              </span>
              <h1 className="text-3xl md:text-3.5xl font-serif font-bold mt-3">
                Consumer Registry Records Database
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                Official secure portal containing active administrative audit entries, compliance cases, and transaction verification files.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded border border-white/10">
              <FolderOpen className="text-blue-300 w-10 h-10" />
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase">Total Records</div>
                <div className="text-xl font-bold font-serif text-blue-200">{reports.length} Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Search Panel */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search registry records by Record ID, name, bank, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-700 text-sm focus:outline-none focus:border-[#005a9c] focus:bg-white transition-colors"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider py-2 px-3 border border-slate-200 rounded bg-slate-50"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Database Table Listing */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-serif font-bold text-lg text-[#1b365d]">
              Registry Log Entries
            </h2>
            <div className="text-xs font-semibold text-slate-500">
              Showing {filteredReports.length} of {reports.length} records
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/50 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  <th className="py-4 px-6">Record ID</th>
                  <th className="py-4 px-6">Consumer</th>
                  <th className="py-4 px-6">Financial Institution</th>
                  <th className="py-4 px-6">Account Details</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-semibold">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => {
                    const bankSlug = report.bank
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    const reportPath = `/advice-and-guidance/report/${report.recordId}/${bankSlug}-consumer-investigation`;

                    return (
                      <tr key={report.recordId} className="hover:bg-slate-50/80 transition-colors">
                        {/* Record ID */}
                        <td className="py-4.5 px-6 font-mono text-xs font-bold text-[#005a9c]">
                          #{report.recordId}
                        </td>
                        {/* Consumer Info */}
                        <td className="py-4.5 px-6">
                          <div className="font-bold text-[#1b365d]">{report.name}</div>
                          {report.email && (
                            <div className="text-xs text-slate-400 font-normal mt-0.5">{report.email}</div>
                          )}
                        </td>
                        {/* Financial Institution */}
                        <td className="py-4.5 px-6">
                          <div className="flex items-center gap-2">
                            <Building size={14} className="text-slate-400" />
                            <span>{report.bank}</span>
                          </div>
                        </td>
                        {/* Account Ending */}
                        <td className="py-4.5 px-6 text-xs text-slate-500 font-normal">
                          {report.accountMasked}
                        </td>
                        {/* Amount */}
                        <td className="py-4.5 px-6 font-serif font-bold text-emerald-600">
                          {report.amount.startsWith('$') ? report.amount : `$${Number(report.amount).toLocaleString('en-US')}`}
                        </td>
                        {/* Registry Status */}
                        <td className="py-4.5 px-6 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                            <ShieldCheck size={10} /> Active Record
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="py-4.5 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => onNavigate(reportPath)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-[#1b365d] hover:text-white text-[#1b365d] font-bold text-xs rounded transition-all cursor-pointer"
                          >
                            View Record <ChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 font-normal">
                      No records matching search criteria were found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
