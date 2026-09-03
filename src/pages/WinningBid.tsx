import { Link } from "react-router-dom";
import { MOCK_LOTS } from "../data/mock";
import { formatCurrency } from "../data/mock";
import Layout from "../components/Layout";

const STEPS = [
  { num: 1, label: "Winning Bid Confirmation", done: true },
  { num: 2, label: "Generate Term Sheet", done: false },
  { num: 3, label: "Legal Agreement", done: false },
  { num: 4, label: "Exclusivity Clauses", done: false },
  { num: 5, label: "Deliverables Schedule", done: false },
  { num: 6, label: "Contract Approval", done: false },
];

export default function WinningBid() {
  const lot = MOCK_LOTS[0];
  const winningAmount = 12500000;

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Winning Banner */}
        <div className="rounded-3xl p-8 sm:p-12 text-center mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(26,86,219,0.15) 100%)", border: "2px solid rgba(212,160,23,0.4)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)" }} />
          </div>
          <div className="text-5xl mb-6">🏆</div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.4)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "#d4a017" }} />
            <span style={{ color: "#d4a017", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>WINNING BID CONFIRMED</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#e8edf5", marginBottom: 8 }}>
            Congratulations!
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 24 }}>Your company has won the auction for:</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(20px, 3vw, 30px)", color: "#d4a017", marginBottom: 8 }}>{lot.name}</h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>
            {formatCurrency(winningAmount)}
          </p>
          <p style={{ color: "#64748b", fontSize: 13 }}>Final Winning Amount</p>
        </div>

        {/* Contract Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 16 }}>Next Steps</h3>
            <div className="space-y-3">
              {STEPS.map((step) => (
                <div key={step.num} className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ background: step.done ? "rgba(212,160,23,0.08)" : "rgba(4,13,31,0.4)", border: `1px solid ${step.done ? "rgba(212,160,23,0.25)" : "rgba(255,255,255,0.04)"}` }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: step.done ? "#d4a017" : "rgba(255,255,255,0.06)", color: step.done ? "#040d1f" : "#64748b" }}>
                    {step.done ? "✓" : step.num}
                  </div>
                  <span style={{ color: step.done ? "#e8edf5" : "#94a3b8", fontSize: 13, fontWeight: step.done ? 600 : 400 }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 12 }}>Winning Details</h3>
              {[
                ["Lot", lot.name],
                ["Category", lot.category],
                ["Winning Amount", formatCurrency(winningAmount)],
                ["Auction Ended", "Oct 3, 2026"],
                ["Status", "Awaiting Term Sheet"],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>{l}</span>
                  <span style={{ color: "#e8edf5", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)", textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </div>

            <Link to="/contracts" className="block w-full text-center py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #d4a017, #b8860b)", color: "#040d1f", boxShadow: "0 4px 16px rgba(212,160,23,0.3)", letterSpacing: "0.05em" }}>
              Generate Term Sheet →
            </Link>
            <button className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
              Download Winning Bid Confirmation
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
