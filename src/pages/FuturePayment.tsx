import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const FLOW = [
  { step: "Winning Bid", icon: "🏆", desc: "Auction concludes. Winning bid confirmed and locked in the system." },
  { step: "Contract Signed", icon: "✍", desc: "Both parties digitally sign the sponsorship agreement and term sheet." },
  { step: "Payment Initiated", icon: "💳", desc: "Winner initiates payment via integrated payment gateway." },
  { step: "Escrow", icon: "🔒", desc: "Funds are held securely in a regulated escrow account pending milestones." },
  { step: "Milestone Verification", icon: "✅", desc: "Admins verify event milestones and deliverable completion." },
  { step: "Funds Released", icon: "💰", desc: "Verified milestone amounts are released to the event organizer." },
];

export default function FuturePayment() {
  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        {/* Future badge */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-mono"
              style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017" }}>
              ⏳ FUTURE DEVELOPMENT — PHASE 06
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Future Payment & Escrow Integration</h2>
            <p style={{ color: "#64748b", fontSize: 14 }}>Planned for Phase 06 — this module is not yet implemented.</p>
          </div>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ background: "rgba(212,160,23,0.06)", border: "2px dashed rgba(212,160,23,0.3)" }}>
          <div className="flex items-center gap-3 mb-3">
            <span style={{ fontSize: 24 }}>⚠</span>
            <span style={{ color: "#d4a017", fontWeight: 700, fontFamily: "var(--font-mono)" }}>NOT IMPLEMENTED</span>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
            This page illustrates the proposed Payment & Escrow integration planned for Phase 06 of development.
            No real payment processing is implemented. This is a functional prototype for demonstration and presentation purposes only.
          </p>
        </div>

        {/* Payment Flow */}
        <h3 style={{ fontWeight: 700, fontSize: 18, color: "#e8edf5", marginBottom: 20, fontFamily: "var(--font-serif)" }}>Proposed Payment Flow</h3>
        <div className="relative">
          <div className="absolute left-6 sm:left-7 top-0 bottom-0 w-px" style={{ background: "rgba(212,160,23,0.25)" }} />
          <div className="space-y-4">
            {FLOW.map((item, i) => (
              <div key={item.step} className="flex gap-6 pl-16 relative">
                <div className="absolute left-4 sm:left-5 top-5 w-5 h-5 rounded-full flex items-center justify-center -translate-x-1/2"
                  style={{ background: "rgba(212,160,23,0.2)", border: "2px solid rgba(212,160,23,0.4)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#d4a017", fontWeight: 700 }}>{i + 1}</span>
                </div>
                <div className="flex-1 p-5 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <h4 style={{ fontWeight: 700, fontSize: 15, color: "#e8edf5" }}>{item.step}</h4>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features planned */}
        <div className="mt-8 p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h4 style={{ fontWeight: 700, fontSize: 15, color: "#e8edf5", marginBottom: 12 }}>Planned Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Payment gateway integration (multi-provider)",
              "Regulated escrow account management",
              "Milestone-based fund release",
              "Automated payment verification",
              "Reconciliation & financial reporting",
              "Financial audit trail",
              "Partial payment & instalment support",
              "Multi-currency support",
            ].map(feature => (
              <div key={feature} className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.15)" }}>
                <span style={{ color: "#d4a017", fontSize: 12 }}>○</span>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3 flex-wrap">
          <Link to="/roadmap" className="px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "rgba(26,86,219,0.15)", border: "1px solid rgba(26,86,219,0.3)", color: "#3b82f6" }}>
            ← View Roadmap
          </Link>
        </div>
      </div>
    </Layout>
  );
}
