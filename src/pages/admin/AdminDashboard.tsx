import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { MOCK_COMPANIES, MOCK_AUDIT_LOGS, formatCurrency } from "../../data/mock";
import Layout from "../../components/Layout";
import StatusBadge from "../../components/StatusBadge";
import Countdown from "../../components/Countdown";

export default function AdminDashboard() {
  const { lots, bids } = useApp();
  const activeLots = lots.filter(l => l.status === "active");
  const pendingCompanies = MOCK_COMPANIES.filter(c => c.status === "pending");
  const totalBids = bids.length;

  const stats = [
    { label: "Active Auctions", value: activeLots.length, icon: "◉", color: "#1a56db", bg: "rgba(26,86,219,0.12)", link: "/admin/auctions" },
    { label: "Registered Companies", value: MOCK_COMPANIES.length, icon: "◈", color: "#22c55e", bg: "rgba(34,197,94,0.1)", link: "/admin/companies" },
    { label: "Pending Verification", value: pendingCompanies.length, icon: "◎", color: "#eab308", bg: "rgba(234,179,8,0.1)", link: "/admin/verification" },
    { label: "Total Bids", value: totalBids, icon: "⊟", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", link: "/admin/bids" },
    { label: "Winning Bids", value: 1, icon: "◉", color: "#d4a017", bg: "rgba(212,160,23,0.12)", link: "/admin/bids" },
    { label: "Contracts", value: 1, icon: "≡", color: "#94a3b8", bg: "rgba(148,163,184,0.1)", link: "/admin/contracts" },
  ];

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5" }}>Admin Dashboard</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Kuweni III — System Overview</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/lots" className="px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
              + Create Lot
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map(s => (
            <Link key={s.label} to={s.link} className="p-4 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                <span style={{ fontSize: 16, color: s.color }}>{s.icon}</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "#e8edf5", lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>{s.label}</div>
            </Link>
          ))}
        </div>

        {/* Active Auction Monitoring */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5" }}>Active Auction Monitoring</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span style={{ color: "#22c55e", fontSize: 11, fontFamily: "var(--font-mono)" }}>LIVE</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Lot", "Current Bid", "Bidders", "Time Remaining", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left" style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeLots.map((lot, i) => (
                  <tr key={lot.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: i < activeLots.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-5 py-3">
                      <div style={{ color: "#e8edf5", fontSize: 13, fontWeight: 600 }}>{lot.name}</div>
                      <div style={{ color: "#64748b", fontSize: 11 }}>{lot.category}</div>
                    </td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", color: "#d4a017", fontWeight: 700 }}>{formatCurrency(lot.currentBid)}</td>
                    <td className="px-5 py-3" style={{ color: "#e8edf5", fontFamily: "var(--font-mono)" }}>{lot.participantCount}</td>
                    <td className="px-5 py-3"><Countdown endDate={lot.auctionEnd} /></td>
                    <td className="px-5 py-3"><StatusBadge status={lot.status} pulse /></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/lots/${lot.id}`} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                          style={{ background: "rgba(26,86,219,0.15)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.2)" }}>
                          View
                        </Link>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(234,179,8,0.1)", color: "#eab308", border: "1px solid rgba(234,179,8,0.2)" }}>
                          Pause
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Audit Events */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: "#e8edf5" }}>Recent Audit Events</h3>
            <Link to="/admin/audit" style={{ color: "#1a56db", fontSize: 13 }}>View All →</Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {MOCK_AUDIT_LOGS.slice(0, 5).map(log => (
              <div key={log.id} className="flex items-center justify-between px-6 py-3 hover:bg-white/2 transition-colors">
                <div>
                  <div style={{ color: "#e8edf5", fontSize: 12, fontWeight: 500 }}>{log.action}</div>
                  <div style={{ color: "#64748b", fontSize: 11, marginTop: 1 }}>{log.company} · {new Date(log.timestamp).toLocaleString()}</div>
                </div>
                <StatusBadge status={log.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
