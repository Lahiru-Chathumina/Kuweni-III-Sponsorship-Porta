import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../data/mock";
import StatusBadge from "../components/StatusBadge";
import Countdown from "../components/Countdown";
import Layout from "../components/Layout";

export default function LiveBidding() {
  const { id } = useParams<{ id: string }>();
  const { lots, bids, placeBid, user } = useApp();
  const lot = lots.find(l => l.id === id) ?? lots[0];
  const lotBids = bids.filter(b => b.lotId === lot.id);
  const myCurrentBid = lotBids.find(b => b.companyId === "cmp-001" && b.status === "winning")?.amount ?? 0;

  const [bidAmount, setBidAmount] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [proxyActive, setProxyActive] = useState(false);
  const [proxyMax, setProxyMax] = useState("");

  const minNext = lot.currentBid + 100000;

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(bidAmount.replace(/,/g, ""));
    const result = placeBid(lot.id, amount);
    setNotification({ type: result.success ? "success" : "error", message: result.message });
    if (result.success) setBidAmount("");
    setTimeout(() => setNotification(null), 4000);
  };

  const formatInput = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? Number(num).toLocaleString() : "";
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2" style={{ color: "#64748b", fontSize: 13 }}>
              <Link to="/lots" style={{ color: "#1a56db" }}>Lots</Link>
              <span>/</span>
              <Link to={`/lots/${lot.id}`} style={{ color: "#1a56db" }}>{lot.name}</Link>
              <span>/</span>
              <span>Live Bidding</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 700, color: "#e8edf5" }}>Live Auction — {lot.name}</h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ef4444" }} />
            <span style={{ color: "#ef4444", fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 600 }}>LIVE AUCTION</span>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="mb-6 px-5 py-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-all"
            style={{ background: notification.type === "success" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", border: `1px solid ${notification.type === "success" ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`, color: notification.type === "success" ? "#22c55e" : "#ef4444" }}>
            <span style={{ fontSize: 18 }}>{notification.type === "success" ? "✓" : "✕"}</span>
            {notification.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main bidding */}
          <div className="lg:col-span-2 space-y-5">
            {/* Current state cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "CURRENT HIGHEST BID", value: formatCurrency(lot.currentBid), color: "#d4a017", bg: "rgba(212,160,23,0.1)", border: "rgba(212,160,23,0.3)" },
                { label: "YOUR CURRENT BID", value: myCurrentBid ? formatCurrency(myCurrentBid) : "No bid yet", color: "#3b82f6", bg: "rgba(26,86,219,0.1)", border: "rgba(26,86,219,0.25)" },
                { label: "MINIMUM NEXT BID", value: formatCurrency(minNext), color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)" },
              ].map(item => (
                <div key={item.label} className="p-5 rounded-2xl" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                  <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 700, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Countdown */}
            <div className="p-6 rounded-2xl text-center" style={{ background: "#0d1e3d", border: "1px solid rgba(26,86,219,0.3)" }}>
              <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.12em", marginBottom: 16 }}>AUCTION COUNTDOWN</div>
              <div className="flex justify-center mb-4">
                <Countdown endDate={lot.auctionEnd} large />
              </div>
              <StatusBadge status={lot.status} pulse />
            </div>

            {/* Bid Form */}
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 16 }}>Place Your Bid</h3>
              <form onSubmit={handleBid} className="space-y-4">
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 8 }}>
                    ENTER YOUR BID AMOUNT (Rs.)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm" style={{ color: "#64748b" }}>Rs.</span>
                    <input
                      type="text"
                      value={bidAmount}
                      onChange={e => setBidAmount(formatInput(e.target.value))}
                      placeholder={minNext.toLocaleString()}
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-xl font-mono outline-none transition-all"
                      style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(26,86,219,0.3)", color: "#e8edf5", letterSpacing: "0.05em" }}
                      onFocus={e => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.2)"; }}
                      onBlur={e => { e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  <p style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>
                    Minimum bid: <span style={{ fontFamily: "var(--font-mono)", color: "#94a3b8" }}>{formatCurrency(minNext)}</span>
                    {" "} (increment: Rs. 100,000)
                  </p>
                </div>

                {/* Quick amounts */}
                <div className="flex flex-wrap gap-2">
                  {[minNext, minNext + 500000, minNext + 1000000, minNext + 2000000].map(amt => (
                    <button key={amt} type="button" onClick={() => setBidAmount(amt.toLocaleString())}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:opacity-80"
                      style={{ background: "rgba(26,86,219,0.12)", border: "1px solid rgba(26,86,219,0.2)", color: "#3b82f6" }}>
                      {formatCurrency(amt)}
                    </button>
                  ))}
                </div>

                <button type="submit" className="w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff", boxShadow: "0 4px 20px rgba(26,86,219,0.4)", letterSpacing: "0.1em" }}>
                  PLACE BID
                </button>
              </form>
            </div>

            {/* Proxy Bid */}
            <div className="p-5 rounded-2xl" style={{ background: proxyActive ? "rgba(212,160,23,0.08)" : "#0d1e3d", border: `1px solid ${proxyActive ? "rgba(212,160,23,0.3)" : "rgba(255,255,255,0.06)"}` }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5" }}>Proxy Bidding</h3>
                  <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Auto-bid up to your max limit</p>
                </div>
                {proxyActive && <StatusBadge status="active" pulse />}
              </div>
              {!proxyActive ? (
                <div className="flex gap-3">
                  <input type="text" value={proxyMax} onChange={e => setProxyMax(formatInput(e.target.value))} placeholder="Max bid (e.g. 15,000,000)"
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-mono outline-none"
                    style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }} />
                  <button onClick={() => { if (proxyMax) setProxyActive(true); }}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={{ background: "rgba(212,160,23,0.18)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017" }}>
                    Activate
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span style={{ color: "#d4a017", fontSize: 13 }}>✓ Proxy active — Max: Rs. {proxyMax}</span>
                  <button onClick={() => setProxyActive(false)} style={{ color: "#64748b", fontSize: 12 }}>Deactivate</button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Bid History */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)", height: "fit-content" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5" }}>Bid History</h3>
              <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{lotBids.length} bids placed</p>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              {lotBids.slice(0, 10).map((bid, i) => (
                <div key={bid.id} className="px-5 py-3.5 flex items-center gap-3 transition-colors hover:bg-white/2">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#64748b" }}>{bid.id}</span>
                      <StatusBadge status={bid.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>{bid.companyMasked}{bid.proxyBid ? " (Proxy)" : ""}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: i === 0 ? "#d4a017" : "#e8edf5" }}>{formatCurrency(bid.amount)}</span>
                    </div>
                    <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>
                      {new Date(bid.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Link to="/bid-history" style={{ color: "#1a56db", fontSize: 12 }}>View full bid history →</Link>
            </div>
          </div>
        </div>

        {/* Anti-sniping demo link */}
        <div className="mt-6 p-4 rounded-xl flex items-center justify-between flex-wrap gap-3" style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.2)" }}>
          <div>
            <span style={{ color: "#3b82f6", fontSize: 13, fontWeight: 600 }}>⚡ Anti-Sniping System Active</span>
            <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Valid bids in the final 60 minutes extend the auction by 15 minutes.</p>
          </div>
          <Link to="/anti-sniping" className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ background: "rgba(26,86,219,0.2)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.3)", whiteSpace: "nowrap" }}>
            View Demo →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
