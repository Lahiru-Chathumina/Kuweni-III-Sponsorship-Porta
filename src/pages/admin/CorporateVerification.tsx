import { useState } from "react";
import { MOCK_COMPANIES } from "../../data/mock";
import Layout from "../../components/Layout";
import StatusBadge from "../../components/StatusBadge";
import type { Company } from "../../types";

export default function CorporateVerification() {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [notification, setNotification] = useState("");

  const updateStatus = (id: string, status: "verified" | "rejected") => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setNotification(`Company ${status === "verified" ? "verified" : "rejected"} successfully.`);
    setSelectedCompany(null);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Corporate Verification</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Review and approve corporate registration applications</p>
        </div>

        {notification && (
          <div className="mb-4 px-5 py-3 rounded-xl text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            ✓ {notification}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Pending", count: companies.filter(c => c.status === "pending").length, color: "#eab308" },
            { label: "Verified", count: companies.filter(c => c.status === "verified").length, color: "#22c55e" },
            { label: "Rejected", count: companies.filter(c => c.status === "rejected").length, color: "#ef4444" },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 36, fontWeight: 700, color: s.color }}>{s.count}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
                  {["Company", "Corporate Email", "Domain", "Reg. Number", "Submitted", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left" style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companies.map((co, i) => (
                  <tr key={co.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: i < companies.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-5 py-3">
                      <div style={{ color: "#e8edf5", fontWeight: 600, fontSize: 13 }}>{co.name}</div>
                      <div style={{ color: "#64748b", fontSize: 11 }}>{co.contactPerson}</div>
                    </td>
                    <td className="px-5 py-3" style={{ color: "#94a3b8", fontSize: 12 }}>{co.email}</td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", color: "#64748b", fontSize: 12 }}>{co.domain}</td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", color: "#94a3b8", fontSize: 12 }}>{co.registrationNumber}</td>
                    <td className="px-5 py-3" style={{ color: "#64748b", fontSize: 12 }}>{co.submittedAt}</td>
                    <td className="px-5 py-3"><StatusBadge status={co.status} /></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedCompany(co)} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(26,86,219,0.15)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.2)" }}>
                          Review
                        </button>
                        {co.status === "pending" && (
                          <>
                            <button onClick={() => updateStatus(co.id, "verified")} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                              style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
                              Approve
                            </button>
                            <button onClick={() => updateStatus(co.id, "rejected")} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                              style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedCompany(null)}>
          <div className="w-full max-w-lg rounded-2xl p-8" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "#e8edf5", marginBottom: 20 }}>Review Application</h3>
            {[
              ["Company Name", selectedCompany.name],
              ["Registration Number", selectedCompany.registrationNumber],
              ["Domain", selectedCompany.domain],
              ["Contact", selectedCompany.contactPerson],
              ["Phone", selectedCompany.phone],
              ["Email", selectedCompany.email],
              ["Submitted", selectedCompany.submittedAt],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#64748b", fontSize: 13 }}>{l}</span>
                <span style={{ color: "#e8edf5", fontSize: 13, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div className="mt-4 p-3 rounded-lg flex items-center gap-3" style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.15)" }}>
              <span style={{ fontSize: 20 }}>📄</span>
              <span style={{ color: "#3b82f6", fontSize: 13 }}>Company Registration Document — reg_doc.pdf</span>
            </div>
            {selectedCompany.status === "pending" && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => updateStatus(selectedCompany.id, "verified")}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
                  ✓ Approve
                </button>
                <button onClick={() => updateStatus(selectedCompany.id, "rejected")}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#ef4444" }}>
                  ✕ Reject
                </button>
              </div>
            )}
            <button onClick={() => setSelectedCompany(null)} className="mt-3 w-full py-2 text-sm" style={{ color: "#64748b" }}>Close</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
