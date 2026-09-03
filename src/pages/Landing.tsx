import { Link } from "react-router-dom";
import { MOCK_LOTS } from "../data/mock";
import { formatCurrency } from "../data/mock";
import StatusBadge from "../components/StatusBadge";
import Countdown from "../components/Countdown";

const ROADMAP_PHASES = [
  { phase: "01", title: "Foundation", items: ["Authentication", "Corporate Verification", "Role Management"], status: "complete" },
  { phase: "02", title: "Lot Management", items: ["Lot Management", "Auction Management", "Category Filters"], status: "complete" },
  { phase: "03", title: "Bidding Engine", items: ["Bid Validation", "30-Day Countdown", "Proxy Bidding", "Anti-Sniping"], status: "active" },
  { phase: "04", title: "Data Room", items: ["Secure Data Room", "Dynamic Watermarking", "Audit Logging"], status: "planned" },
  { phase: "05", title: "Contract Flow", items: ["Winning Bid Workflow", "Term Sheet Generator", "Contract Approval"], status: "planned" },
  { phase: "06", title: "Payment & Escrow", items: ["Payment Integration", "Escrow Engine", "Milestone Verification", "Funds Release"], status: "future" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Register & Verify", desc: "Submit your corporate credentials. Our admin team verifies your company within 24 hours." },
  { step: "02", title: "Explore Lots", desc: "Browse sponsorship opportunities, review confidential proposals in the Executive Preview Room." },
  { step: "03", title: "Bid Competitively", desc: "Place bids, set proxy limits, and compete in a secure, audited auction environment." },
  { step: "04", title: "Win & Contract", desc: "Winning bidders proceed through a structured term sheet and contract workflow." },
];

export default function Landing() {
  const featuredLots = MOCK_LOTS.slice(0, 3);

  return (
    <div style={{ background: "#040d1f", minHeight: "100vh", fontFamily: "var(--font-sans)", color: "#e8edf5" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4"
        style={{ background: "rgba(4,13,31,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#d4a017" }}>K3</div>
          <span style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-serif)" }}>Kuweni III</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/architecture" className="hidden sm:block px-4 py-2 text-sm transition-colors hover:text-white" style={{ color: "#64748b" }}>Architecture</Link>
          <Link to="/roadmap" className="hidden sm:block px-4 py-2 text-sm transition-colors hover:text-white" style={{ color: "#64748b" }}>Roadmap</Link>
          <Link to="/login" className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
            Corporate Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(26,86,219,0.18) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "60%", right: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)" }} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-mono font-medium"
          style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017", letterSpacing: "0.1em" }}>
          ▲ PROPOSED SYSTEM — FUNCTIONAL PROTOTYPE
        </div>

        <h1 style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 700, fontFamily: "var(--font-serif)", lineHeight: 1.05, marginBottom: 8, letterSpacing: "-0.02em" }}>
          Kuweni III
        </h1>
        <h2 style={{ fontSize: "clamp(20px, 4vw, 40px)", fontWeight: 400, fontFamily: "var(--font-serif)", color: "#3b82f6", marginBottom: 24, lineHeight: 1.2 }}>
          Sponsorship Bidding Portal
        </h2>

        <p className="max-w-2xl mx-auto mb-12" style={{ color: "#94a3b8", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7 }}>
          A secure digital platform for corporate sponsorship opportunities and competitive bidding.
          Built for transparency, auditability, and executive-level deal-making.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/lots" className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff", boxShadow: "0 8px 32px rgba(26,86,219,0.35)" }}>
            Explore Sponsorships
          </Link>
          <Link to="/login" className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#e8edf5" }}>
            Corporate Login
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-20 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", width: "100%", maxWidth: 700 }}>
          {[["6", "Sponsorship Lots"], ["30", "Day Auction Window"], ["Rs. 37M+", "Total Bid Value"], ["100%", "Audited & Secure"]].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "#e8edf5" }}>{val}</span>
              <span style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 sm:px-12 py-24" style={{ background: "#071227" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 12 }}>PROCESS OVERVIEW</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 700, color: "rgba(26,86,219,0.25)", marginBottom: 12, lineHeight: 1 }}>{item.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#e8edf5" }}>{item.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lots */}
      <section className="px-6 sm:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 8 }}>LIVE AUCTIONS</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>Featured Sponsorship Lots</h2>
            </div>
            <Link to="/lots" style={{ color: "#1a56db", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>View All Lots →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLots.map((lot) => (
              <div key={lot.id} className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
                style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                <div className="relative h-44 overflow-hidden bg-navy-800">
                  <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
                  <div className="absolute top-3 left-3"><StatusBadge status={lot.status} pulse /></div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-mono"
                    style={{ background: "rgba(4,13,31,0.8)", color: "#94a3b8" }}>{lot.category}</div>
                </div>
                <div className="p-5">
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 4 }}>{lot.name}</h3>
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <div>
                      <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)" }}>CURRENT BID</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "#d4a017" }}>{formatCurrency(lot.currentBid)}</div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)" }}>TIME LEFT</div>
                      <Countdown endDate={lot.auctionEnd} />
                    </div>
                  </div>
                  <Link to={`/lots/${lot.id}`} className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                    style={{ background: "rgba(26,86,219,0.18)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.3)" }}>
                    View Auction
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="px-6 sm:px-12 py-20" style={{ background: "#071227" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, rgba(26,86,219,0.15) 0%, rgba(13,30,61,0.8) 100%)", border: "1px solid rgba(26,86,219,0.3)" }}>
            <p style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 16 }}>ENTERPRISE SECURITY</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: 16 }}>Secure & Auditable</h2>
            <p className="max-w-2xl mx-auto mb-8" style={{ color: "#94a3b8", lineHeight: 1.7 }}>
              Every bid, document access, and system action is recorded in an immutable audit trail.
              Role-based access, MFA, and dynamic watermarking protect sensitive corporate data.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["TLS 1.3 Encryption", "AES-256 Storage", "MFA Authentication", "RBAC Controls", "Full Audit Trail", "Dynamic Watermarking"].map(item => (
                <div key={item} className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#22c55e", fontSize: 12 }}>✓</span>
                  <span style={{ color: "#94a3b8", fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="px-6 sm:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 12 }}>DEVELOPMENT PHASES</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>Development Roadmap</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ROADMAP_PHASES.map((phase) => {
              const colors = {
                complete: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.3)", tag: "#22c55e", tagBg: "rgba(34,197,94,0.12)" },
                active:   { bg: "rgba(26,86,219,0.12)", border: "rgba(26,86,219,0.3)", tag: "#3b82f6", tagBg: "rgba(26,86,219,0.15)" },
                planned:  { bg: "rgba(13,30,61,0.8)", border: "rgba(255,255,255,0.08)", tag: "#64748b", tagBg: "rgba(100,116,139,0.1)" },
                future:   { bg: "rgba(212,160,23,0.08)", border: "rgba(212,160,23,0.2)", tag: "#d4a017", tagBg: "rgba(212,160,23,0.1)" },
              }[phase.status];
              return (
                <div key={phase.phase} className="p-4 rounded-2xl" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: colors.tag, marginBottom: 4, letterSpacing: "0.1em" }}>PHASE {phase.phase}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#e8edf5", marginBottom: 8 }}>{phase.title}</div>
                  {phase.items.map(item => (
                    <div key={item} style={{ color: "#64748b", fontSize: 11, lineHeight: 1.8 }}>{item}</div>
                  ))}
                  <div className="mt-3 px-2 py-0.5 rounded-full text-center inline-block text-xs font-mono"
                    style={{ background: colors.tagBg, color: colors.tag }}>
                    {phase.status === "complete" ? "✓ Done" : phase.status === "active" ? "⚡ Active" : phase.status === "future" ? "Future" : "Planned"}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/roadmap" className="px-6 py-3 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90"
              style={{ background: "rgba(26,86,219,0.15)", border: "1px solid rgba(26,86,219,0.3)", color: "#3b82f6" }}>
              View Full Roadmap
            </Link>
            <Link to="/architecture" className="px-6 py-3 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
              System Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-12" style={{ background: "#040d1f", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#d4a017" }}>K3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-serif)" }}>Kuweni III Sponsorship Portal</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Proposed System — Functional Prototype</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/roadmap" style={{ color: "#64748b", fontSize: 13 }}>Roadmap</Link>
              <Link to="/architecture" style={{ color: "#64748b", fontSize: 13 }}>Architecture</Link>
              <Link to="/login" style={{ color: "#64748b", fontSize: 13 }}>Corporate Login</Link>
              <Link to="/register" style={{ color: "#64748b", fontSize: 13 }}>Register</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ color: "#64748b", fontSize: 12 }}>
              © 2026 Kuweni III Sponsorship Bidding Portal — PROPOSED SYSTEM. This is a functional prototype for demonstration and presentation purposes.
              Not production-ready. No real transactions or authentication are implemented.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
