import { Link } from "react-router-dom";

const PHASES = [
  {
    phase: "01", title: "Foundation", status: "complete",
    items: ["JWT Authentication & Session Management", "Corporate Registration Flow", "Admin Verification Portal", "Role-Based Access Control (Buyer / Admin)", "MFA Integration"],
    color: "#22c55e", q: "Q3 2026",
  },
  {
    phase: "02", title: "Lot & Auction Management", status: "complete",
    items: ["Sponsorship Lot Creation & Editing", "Category Management", "Auction Scheduling & Configuration", "Admin Auction Controls", "Lot Preview & Publishing"],
    color: "#22c55e", q: "Q3 2026",
  },
  {
    phase: "03", title: "Bidding Engine", status: "active",
    items: ["Real-time Bid Submission & Validation", "30-Day Auction Countdown", "Live Bid History & Feed", "Proxy Bidding System", "Anti-Sniping Extension Logic", "Bid Increment Enforcement"],
    color: "#1a56db", q: "Q4 2026",
  },
  {
    phase: "04", title: "Secure Data Room", status: "planned",
    items: ["Executive Preview Room", "Dynamic Watermarking (User + IP)", "Role-Gated Document Access", "Immutable Audit Logging", "Document Access History", "Download & View Tracking"],
    color: "#64748b", q: "Q1 2027",
  },
  {
    phase: "05", title: "Winning Bid & Contracts", status: "planned",
    items: ["Winning Bid Confirmation Flow", "Term Sheet Generator", "Legal Agreement Templates", "Exclusivity Clause Management", "Deliverables Schedule", "Contract Approval Workflow"],
    color: "#64748b", q: "Q1 2027",
  },
  {
    phase: "06", title: "Payment & Escrow Integration", status: "future",
    items: ["Payment Gateway Integration", "Escrow Engine", "Milestone-Based Fund Release", "Payment Verification", "Reconciliation Reporting", "Financial Audit Trail"],
    color: "#d4a017", q: "Q2 2027",
  },
];

export default function Roadmap() {
  return (
    <div className="min-h-screen" style={{ background: "#040d1f", fontFamily: "var(--font-sans)", color: "#e8edf5" }}>
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(4,13,31,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#d4a017" }}>K3</div>
          <span style={{ fontWeight: 700, fontFamily: "var(--font-serif)" }}>Development Roadmap</span>
        </div>
        <div className="flex gap-3">
          <Link to="/" style={{ color: "#64748b", fontSize: 13 }}>← Home</Link>
          <Link to="/architecture" style={{ color: "#1a56db", fontSize: 13 }}>Architecture →</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-mono"
            style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017" }}>
            PROPOSED SYSTEM — DEVELOPMENT PROTOTYPE
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Development Roadmap
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Six phased development plan for the Kuweni III Sponsorship Bidding Portal.
            Each phase builds on the previous to deliver a complete enterprise platform.
          </p>
        </div>

        {/* Status legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[{ color: "#22c55e", label: "Complete" }, { color: "#1a56db", label: "In Progress" }, { color: "#64748b", label: "Planned" }, { color: "#d4a017", label: "Future" }].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
              <span style={{ color: "#64748b", fontSize: 13 }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(26,86,219,0.6) 0%, rgba(26,86,219,0.1) 100%)" }} />

          <div className="space-y-8">
            {PHASES.map((phase) => {
              const statusConfig = {
                complete: { label: "COMPLETE", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", dotBg: "#22c55e" },
                active: { label: "IN PROGRESS", bg: "rgba(26,86,219,0.12)", border: "rgba(26,86,219,0.35)", dotBg: "#1a56db" },
                planned: { label: "PLANNED", bg: "rgba(13,30,61,0.8)", border: "rgba(255,255,255,0.08)", dotBg: "#64748b" },
                future: { label: "FUTURE", bg: "rgba(212,160,23,0.08)", border: "rgba(212,160,23,0.25)", dotBg: "#d4a017" },
              }[phase.status];

              return (
                <div key={phase.phase} className="flex gap-6 sm:gap-10 pl-12 sm:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-5 top-6 w-5 h-5 rounded-full -translate-x-1/2 flex items-center justify-center"
                    style={{ background: statusConfig.dotBg, boxShadow: `0 0 12px ${statusConfig.dotBg}50` }}>
                    {phase.status === "complete" && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
                    {phase.status === "active" && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#fff" }} />}
                  </div>

                  <div className="flex-1 p-6 rounded-2xl transition-all hover:-translate-y-0.5"
                    style={{ background: statusConfig.bg, border: `1px solid ${statusConfig.border}` }}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                      <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: phase.color, letterSpacing: "0.1em", marginBottom: 4 }}>
                          PHASE {phase.phase}
                        </div>
                        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: "#e8edf5" }}>{phase.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ color: "#64748b", fontSize: 12, fontFamily: "var(--font-mono)" }}>{phase.q}</span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono"
                          style={{ background: statusConfig.bg, color: phase.color, border: `1px solid ${statusConfig.border}` }}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      {phase.items.map(item => (
                        <div key={item} className="flex items-center gap-2">
                          <span style={{ color: phase.color, fontSize: 12, flexShrink: 0 }}>
                            {phase.status === "complete" ? "✓" : phase.status === "active" ? "◉" : "○"}
                          </span>
                          <span style={{ color: phase.status === "complete" ? "#94a3b8" : "#e8edf5", fontSize: 13 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
            This roadmap represents the proposed development plan. Timelines are estimates and subject to adjustment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/architecture" className="px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(26,86,219,0.15)", border: "1px solid rgba(26,86,219,0.3)", color: "#3b82f6" }}>
              View Architecture
            </Link>
            <Link to="/future-payment" className="px-6 py-3 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}>
              Future Payment & Escrow
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
