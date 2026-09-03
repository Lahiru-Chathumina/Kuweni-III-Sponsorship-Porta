import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../data/mock";
import StatusBadge from "../components/StatusBadge";
import Countdown from "../components/Countdown";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { lots, bids, user } = useApp();
  const activeLots = lots.filter(l => l.status === "active");
  const myBids = bids.filter(b => b.companyId === "cmp-001");
  const winningBids = myBids.filter(b => b.status === "winning");

  const stats = [
    { label: "Active Auctions", value: activeLots.length, icon: "◉", color: "#1a56db", bg: "rgba(26,86,219,0.12)" },
    { label: "My Active Bids", value: myBids.length, icon: "◎", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    { label: "Winning Bids", value: winningBids.length, icon: "◈", color: "#d4a017", bg: "rgba(212,160,23,0.12)" },
    { label: "Saved Lots", value: 3, icon: "⊟", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  ];

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5" }}>
              Welcome back, {user?.name?.split(" ")[0]}
            </h2>
            <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link to="/lots" className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
            Browse Lots →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="p-5 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <span style={{ fontSize: 18, color: s.color }}>{s.icon}</span>
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 700, color: "#e8edf5", lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Active Auctions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontWeight: 700, fontSize: 18, color: "#e8edf5" }}>Active Auctions</h3>
            <Link to="/lots" style={{ color: "#1a56db", fontSize: 13 }}>View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {activeLots.map(lot => {
              const myBid = bids.find(b => b.lotId === lot.id && b.companyId === "cmp-001");
              const isWinning = myBid?.status === "winning";
              return (
                <div key={lot.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
                  style={{ background: "#0d1e3d", border: `1px solid ${isWinning ? "rgba(212,160,23,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                  <div className="relative h-36 overflow-hidden bg-navy-800">
                    <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <StatusBadge status={lot.status} pulse />
                      {isWinning && <StatusBadge status="winning" />}
                    </div>
                    <div className="absolute bottom-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: "rgba(4,13,31,0.85)", color: "#64748b" }}>{lot.category}</div>
                  </div>
                  <div className="p-4">
                    <h4 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 8 }}>{lot.name}</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)" }}>CURRENT BID</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "#d4a017" }}>{formatCurrency(lot.currentBid)}</div>
                      </div>
                      <div>
                        <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)" }}>BIDS</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "#e8edf5" }}>{lot.bidCount}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)" }}>TIME REMAINING</div>
                      <Countdown endDate={lot.auctionEnd} />
                    </div>
                    <Link to={`/lots/${lot.id}`} className="block w-full text-center py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: isWinning ? "rgba(212,160,23,0.18)" : "rgba(26,86,219,0.18)", color: isWinning ? "#d4a017" : "#3b82f6", border: `1px solid ${isWinning ? "rgba(212,160,23,0.3)" : "rgba(26,86,219,0.3)"}` }}>
                      View Auction
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5" }}>Recent Bid Activity</h3>
            <Link to="/audit-log" style={{ color: "#1a56db", fontSize: 13 }}>View Audit Log →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Bid ID", "Lot", "Amount", "Time", "Status"].map(h => (
                    <th key={h} className="px-6 py-3 text-left" style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bids.slice(0, 5).map((bid, i) => (
                  <tr key={bid.id} className="transition-colors hover:bg-white/2" style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-6 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#94a3b8" }}>{bid.id}</td>
                    <td className="px-6 py-3" style={{ color: "#e8edf5", fontSize: 13 }}>Main Partner</td>
                    <td className="px-6 py-3" style={{ fontFamily: "var(--font-mono)", color: "#d4a017", fontWeight: 600 }}>{formatCurrency(bid.amount)}</td>
                    <td className="px-6 py-3" style={{ color: "#64748b", fontSize: 12 }}>
                      {new Date(bid.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-6 py-3"><StatusBadge status={bid.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
