import { useState } from "react";
import { MOCK_AUDIT_LOGS } from "../data/mock";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";

export default function AuditLog() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_AUDIT_LOGS.filter(log =>
    !search || log.action.toLowerCase().includes(search.toLowerCase()) || log.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Audit Log</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Immutable record of all system events and user actions</p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span style={{ color: "#22c55e", fontSize: 12, fontFamily: "var(--font-mono)" }}>REAL-TIME LOGGING ACTIVE</span>
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…"
              className="flex-1 px-4 py-2 rounded-lg text-sm outline-none"
              style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8edf5" }} />
            <span style={{ color: "#64748b", fontSize: 12, fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{filtered.length} events</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Timestamp", "User", "Company", "Action", "IP Address", "Status"].map(h => (
                    <th key={h} className="px-5 py-3 text-left" style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => (
                  <tr key={log.id} className="transition-colors hover:bg-white/2" style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>
                      {new Date(log.timestamp).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </td>
                    <td className="px-5 py-3" style={{ color: "#94a3b8", fontSize: 12 }}>{log.userId}</td>
                    <td className="px-5 py-3" style={{ color: "#e8edf5", fontSize: 12, fontWeight: 500 }}>{log.company}</td>
                    <td className="px-5 py-3" style={{ color: "#94a3b8", fontSize: 12, maxWidth: 300 }}>{log.action}</td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>{log.ipAddress}</td>
                    <td className="px-5 py-3"><StatusBadge status={log.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: "#64748b" }}>No events match your search.</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
