import { useApp } from "../context/AppContext";
import { formatCurrency } from "../data/mock";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";

export default function BidHistory() {
  const { bids } = useApp();

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Full Bid History</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Complete record of all bids — identities masked for confidentiality</p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
            <span style={{ color: "#e8edf5", fontWeight: 700 }}>{bids.length} bids recorded</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span style={{ color: "#22c55e", fontSize: 11, fontFamily: "var(--font-mono)" }}>AUDITED</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Bidder ID", "Company", "Bid Amount", "Timestamp", "Type", "Status"].map(h => (
                    <th key={h} className="px-6 py-3 text-left" style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, i) => (
                  <tr key={bid.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: i < bids.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-6 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#94a3b8" }}>{bid.id}</td>
                    <td className="px-6 py-3" style={{ color: "#e8edf5", fontSize: 13 }}>{bid.companyMasked}</td>
                    <td className="px-6 py-3" style={{ fontFamily: "var(--font-mono)", color: "#d4a017", fontWeight: 700 }}>{formatCurrency(bid.amount)}</td>
                    <td className="px-6 py-3" style={{ color: "#64748b", fontSize: 12, fontFamily: "var(--font-mono)" }}>
                      {new Date(bid.timestamp).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: bid.proxyBid ? "rgba(26,86,219,0.12)" : "rgba(255,255,255,0.04)", color: bid.proxyBid ? "#3b82f6" : "#64748b" }}>
                        {bid.proxyBid ? "PROXY" : "MANUAL"}
                      </span>
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
