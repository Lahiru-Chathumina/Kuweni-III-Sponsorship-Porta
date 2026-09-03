import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../data/mock";
import StatusBadge from "../components/StatusBadge";
import Countdown from "../components/Countdown";
import Layout from "../components/Layout";

export default function LotDetails() {
  const { id } = useParams<{ id: string }>();
  const { lots } = useApp();
  const navigate = useNavigate();
  const lot = lots.find(l => l.id === id) ?? lots[0];
  const [showProxyModal, setShowProxyModal] = useState(false);

  if (!lot) return <Layout><div className="p-8 text-center" style={{ color: "#64748b" }}>Lot not found.</div></Layout>;

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "#64748b" }}>
          <Link to="/lots" style={{ color: "#1a56db" }}>Lots</Link>
          <span>/</span>
          <span>{lot.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Image + Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96" style={{ background: "#142752" }}>
              <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(4,13,31,0.8) 100%)" }} />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="mb-2"><StatusBadge status={lot.status} pulse /></div>
                  <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#fff" }}>{lot.name}</h1>
                </div>
                <div className="text-right">
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "var(--font-mono)" }}>CATEGORY</div>
                  <div style={{ color: "#e8edf5", fontSize: 13, fontWeight: 600 }}>{lot.category}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 12 }}>Overview</h3>
              <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 14 }}>{lot.description}</p>
            </div>

            {/* Benefits */}
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 12 }}>Sponsorship Benefits</h3>
              <ul className="space-y-2">
                {lot.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: "#d4a017", fontSize: 14, marginTop: 1, flexShrink: 0 }}>◈</span>
                    <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 12 }}>Deliverables</h3>
              <ul className="space-y-2">
                {lot.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: "#1a56db", fontSize: 12, marginTop: 2 }}>→</span>
                    <span style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Bidding Panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(26,86,219,0.3)" }}>
              <div className="mb-6">
                <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)", marginBottom: 4 }}>CURRENT HIGHEST BID</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#d4a017" }}>{formatCurrency(lot.currentBid)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  ["RESERVE PRICE", formatCurrency(lot.reservePrice)],
                  ["NUMBER OF BIDS", String(lot.bidCount)],
                  ["PARTICIPANTS", String(lot.participantCount)],
                  ["AUCTION START", new Date(lot.auctionStart).toLocaleDateString("en-GB")],
                ].map(([label, val]) => (
                  <div key={label} className="p-3 rounded-xl" style={{ background: "rgba(4,13,31,0.6)" }}>
                    <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)", marginBottom: 2 }}>{label}</div>
                    <div style={{ color: "#e8edf5", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-mono)" }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Countdown */}
              <div className="p-4 rounded-2xl mb-6 text-center" style={{ background: "rgba(4,13,31,0.6)", border: "1px solid rgba(26,86,219,0.2)" }}>
                <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)", marginBottom: 12 }}>AUCTION ENDS IN</div>
                <div className="flex justify-center">
                  <Countdown endDate={lot.auctionEnd} large />
                </div>
                <div className="mt-3"><StatusBadge status={lot.status} pulse={lot.status === "active"} /></div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button onClick={() => navigate(`/lots/${lot.id}/bid`)}
                  className="w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff", boxShadow: "0 4px 16px rgba(26,86,219,0.35)", letterSpacing: "0.05em" }}>
                  PLACE BID →
                </button>
                <button onClick={() => setShowProxyModal(true)}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017" }}>
                  Set Proxy Bid
                </button>
                <Link to="/preview-room" className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
                  ▣ Open Executive Preview Room
                </Link>
              </div>
            </div>

            {/* Anti-sniping info */}
            <div className="p-4 rounded-xl" style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.2)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "#1a56db", fontSize: 14 }}>⚡</span>
                <span style={{ color: "#3b82f6", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)" }}>ANTI-SNIPING ACTIVE</span>
              </div>
              <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
                Valid bids in the final 60 minutes automatically extend the auction by 15 minutes.
              </p>
              <Link to="/anti-sniping" style={{ color: "#1a56db", fontSize: 12, display: "block", marginTop: 8 }}>→ Learn more / Demo</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Proxy Bid Modal */}
      {showProxyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowProxyModal(false)}>
          <div className="w-full max-w-md rounded-2xl p-8" style={{ background: "#0d1e3d", border: "1px solid rgba(26,86,219,0.3)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Set Maximum Proxy Bid</h3>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>The system will automatically bid on your behalf up to your maximum limit.</p>
            <div className="space-y-4">
              <div className="flex justify-between p-3 rounded-lg" style={{ background: "rgba(4,13,31,0.5)" }}>
                <span style={{ color: "#64748b", fontSize: 13 }}>Current Bid</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#d4a017", fontWeight: 600 }}>{formatCurrency(lot.currentBid)}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg" style={{ background: "rgba(4,13,31,0.5)" }}>
                <span style={{ color: "#64748b", fontSize: 13 }}>Bid Increment</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#e8edf5" }}>Rs. 100,000</span>
              </div>
              <div>
                <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", marginBottom: 6 }}>MAXIMUM BID AMOUNT</label>
                <input type="text" defaultValue="10,000,000" className="w-full px-4 py-3 rounded-xl text-lg font-mono outline-none"
                  style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(26,86,219,0.3)", color: "#e8edf5", textAlign: "center" }} />
              </div>
              <button onClick={() => setShowProxyModal(false)}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #d4a017, #b8860b)", color: "#040d1f", letterSpacing: "0.08em" }}>
                ACTIVATE PROXY BIDDING
              </button>
            </div>
            <button onClick={() => setShowProxyModal(false)} className="mt-4 w-full py-2 text-sm" style={{ color: "#64748b" }}>Cancel</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
