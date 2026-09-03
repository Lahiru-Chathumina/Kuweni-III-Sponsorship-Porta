import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
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

const HERO_PARTICLES = [
  { x: 7, y: 22, size: 2, delay: 0.2 }, { x: 14, y: 67, size: 3, delay: 1.4 },
  { x: 22, y: 38, size: 2, delay: 2.2 }, { x: 31, y: 77, size: 2, delay: 0.8 },
  { x: 39, y: 18, size: 3, delay: 2.8 }, { x: 48, y: 64, size: 2, delay: 1.1 },
  { x: 57, y: 28, size: 2, delay: 2.4 }, { x: 65, y: 74, size: 3, delay: 0.4 },
  { x: 74, y: 16, size: 2, delay: 1.8 }, { x: 83, y: 51, size: 2, delay: 2.9 },
  { x: 91, y: 30, size: 3, delay: 1.2 }, { x: 95, y: 80, size: 2, delay: 2.1 },
];

const NETWORK_NODES = [
  { x: 8, y: 32 }, { x: 19, y: 58 }, { x: 31, y: 21 }, { x: 42, y: 70 },
  { x: 55, y: 35 }, { x: 67, y: 17 }, { x: 77, y: 62 }, { x: 90, y: 38 },
];

const NETWORK_LINES = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 7], [6, 7]];

function AnimatedStat({ label, value, prefix = "", suffix = "" }: { label: string; value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className="hero-stat">
      <span className="hero-stat-label">{label}</span>
      <span className="hero-stat-value">{prefix}{count.toLocaleString()}{suffix}</span>
    </div>
  );
}

export default function Landing() {
  const featuredLots = MOCK_LOTS.slice(0, 3);
  const backgroundImage = "url('https://static.wixstatic.com/media/9ee70e_d1c9e99ef4f84ac98bf794f2bfb47c7a~mv2.jpg/v1/fill/w_1880,h_1058,enc_auto/file.jpeg')";
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 40, damping: 20 });

  const handleHeroPointer = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(10,10,10,0.88), rgba(10,10,10,0.88)), ${backgroundImage}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        fontFamily: "var(--font-sans)",
        color: "#fbfbfa",
      }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4"
        style={{ background: "rgba(12,12,13,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #8c6cc3, #755c8e)", color: "#fbfbfa" }}>K3</div>
          <span style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-serif)" }}>Kuweni III</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/architecture" className="hidden sm:block px-4 py-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(251,251,250,0.7)" }}>Architecture</Link>
          <Link to="/roadmap" className="hidden sm:block px-4 py-2 text-sm transition-colors hover:text-white" style={{ color: "rgba(251,251,250,0.7)" }}>Roadmap</Link>
          <Link to="/login" className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #8c6cc3, #755c8e)", color: "#fbfbfa", boxShadow: "0 10px 26px rgba(140,108,195,0.35)" }}>
            Corporate Login
          </Link>
        </div>
      </nav>

      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden hero-section" onPointerMove={handleHeroPointer} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(140,108,195,0.18) 0%, rgba(14,13,14,0.1) 35%, rgba(14,13,14,0.9) 100%)" }} />
          <div style={{ position: "absolute", top: "16%", left: "50%", transform: "translateX(-50%)", width: "780px", height: "780px", background: "radial-gradient(circle, rgba(140,108,195,0.18) 0%, rgba(140,108,195,0.05) 32%, transparent 72%)" }} />
          <div style={{ position: "absolute", top: "60%", right: "8%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(191,93,123,0.12) 0%, transparent 72%)" }} />
          <div style={{ position: "absolute", bottom: "12%", left: "12%", width: "180px", height: "180px", background: "radial-gradient(circle, rgba(126,82,57,0.12) 0%, transparent 70%)" }} />
          <motion.div className="hero-aurora" style={{ x: smoothX, y: smoothY }} animate={{ rotate: [0, 4, -3, 0], scale: [1, 1.06, 0.98, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="hero-network" style={{ x: smoothX, y: smoothY }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {NETWORK_LINES.map(([from, to]) => <line key={`${from}-${to}`} x1={NETWORK_NODES[from].x} y1={NETWORK_NODES[from].y} x2={NETWORK_NODES[to].x} y2={NETWORK_NODES[to].y} />)}
              {NETWORK_NODES.map((node, index) => <circle key={index} cx={node.x} cy={node.y} r="0.7" />)}
            </svg>
          </motion.div>
          {HERO_PARTICLES.map((particle, index) => (
            <motion.span key={index} className="hero-particle" style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size, height: particle.size, x: smoothX, y: smoothY }} animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -12, 0] }} transition={{ duration: 6 + particle.delay, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }} />
          ))}
          <div className="hero-activity hero-activity-one"><span>Bid Received</span><strong>+ Rs. 2.5M</strong></div>
          <div className="hero-activity hero-activity-two"><span>New Sponsor</span><strong>Verified</strong></div>
          <div className="hero-activity hero-activity-three"><span>Funding Increased</span><strong>+18.4%</strong></div>
          <div className="hero-scan-line" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-mono font-medium"
            style={{ background: "rgba(191,93,123,0.08)", border: "1px solid rgba(191,93,123,0.26)", color: "#bf5d7b", letterSpacing: "0.1em" }}>
            ▲ PROPOSED SYSTEM — FUNCTIONAL PROTOTYPE
          </div>

          <h1 style={{ fontSize: "clamp(72px, 8vw, 160px)", fontWeight: 700, fontFamily: "var(--font-serif)", lineHeight: 0.9, marginBottom: 12, letterSpacing: "-0.04em" }}>
            Kuweni III
          </h1>

          <h2 style={{ fontSize: "clamp(28px, 3vw, 54px)", fontWeight: 400, fontFamily: "var(--font-serif)", color: "#8c6cc3", marginBottom: 28, lineHeight: 1.1 }}>
            Sponsorship Bidding Portal
          </h2>

          <p className="max-w-3xl mx-auto mb-12" style={{ color: "rgba(251,251,250,0.8)", fontSize: "clamp(18px, 2vw, 28px)", lineHeight: 1.5, maxWidth: 820 }}>
            A secure digital platform for corporate sponsorship opportunities and competitive bidding.
            Built for transparency, auditability, and executive-level deal-making.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/lots" className="hero-action px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #8c6cc3, #755c8e)", color: "#fbfbfa", boxShadow: "0 10px 32px rgba(140,108,195,0.4)", minWidth: 250 }}>
              Explore Sponsorships
            </Link>
            <Link to="/login" className="hero-action px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(12,12,13,0.4)", color: "#fbfbfa", minWidth: 220 }}>
              Corporate Login
            </Link>
          </div>
        </div>
      </section>

      <section className="hero-stat-band" aria-label="Platform statistics">
        <AnimatedStat label="Active Sponsors" value={5} />
        <AnimatedStat label="Open Opportunities" value={6} />
        <AnimatedStat label="Total Bid Value" value={37350000} prefix="Rs. " />
      </section>

      <section className="px-6 sm:px-12 py-24" style={{ background: "rgba(37,27,25,0.9)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p style={{ color: "#8c6cc3", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 12 }}>PROCESS OVERVIEW</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                style={{ background: "rgba(14,13,14,0.92)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 18px 40px rgba(0,0,0,0.25)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 700, color: "rgba(140,108,195,0.28)", marginBottom: 12, lineHeight: 1 }}>{item.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#fbfbfa" }}>{item.title}</h3>
                <p style={{ color: "rgba(251,251,250,0.72)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p style={{ color: "#8c6cc3", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 8 }}>LIVE AUCTIONS</p>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>Featured Sponsorship Lots</h2>
            </div>
            <Link to="/lots" style={{ color: "#8c6cc3", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>View All Lots →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLots.map((lot) => (
              <div key={lot.id} className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
                style={{ background: "rgba(14,13,14,0.9)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 18px 38px rgba(0,0,0,0.28)" }}>
                <div className="relative h-44 overflow-hidden bg-[#251b19]">
                  <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.82) saturate(0.9)" }} />
                  <div className="absolute top-3 left-3"><StatusBadge status={lot.status} pulse /></div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-mono"
                    style={{ background: "rgba(14,13,14,0.76)", color: "rgba(251,251,250,0.8)" }}>{lot.category}</div>
                </div>
                <div className="p-5">
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: "#fbfbfa", marginBottom: 4 }}>{lot.name}</h3>
                  <div className="flex items-center justify-between mt-4 mb-4">
                    <div>
                      <div style={{ color: "rgba(251,251,250,0.66)", fontSize: 11, fontFamily: "var(--font-mono)" }}>CURRENT BID</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "#bf5d7b" }}>{formatCurrency(lot.currentBid)}</div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: "rgba(251,251,250,0.66)", fontSize: 11, fontFamily: "var(--font-mono)" }}>TIME LEFT</div>
                      <Countdown endDate={lot.auctionEnd} />
                    </div>
                  </div>
                  <Link to={`/lots/${lot.id}`} className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                    style={{ background: "rgba(140,108,195,0.14)", color: "#8c6cc3", border: "1px solid rgba(140,108,195,0.28)" }}>
                    View Auction
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 py-20" style={{ background: "rgba(37,27,25,0.9)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl p-8 sm:p-12 text-center" style={{ background: "linear-gradient(135deg, rgba(140,108,195,0.14) 0%, rgba(14,13,14,0.9) 100%)", border: "1px solid rgba(140,108,195,0.3)" }}>
            <p style={{ color: "#8c6cc3", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 16 }}>ENTERPRISE SECURITY</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: 16 }}>Secure & Auditable</h2>
            <p className="max-w-2xl mx-auto mb-8" style={{ color: "rgba(251,251,250,0.7)", lineHeight: 1.7 }}>
              Every bid, document access, and system action is recorded in an immutable audit trail.
              Role-based access, MFA, and dynamic watermarking protect sensitive corporate data.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["TLS 1.3 Encryption", "AES-256 Storage", "MFA Authentication", "RBAC Controls", "Full Audit Trail", "Dynamic Watermarking"].map(item => (
                <div key={item} className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "#8c6cc3", fontSize: 12 }}>✓</span>
                  <span style={{ color: "rgba(251,251,250,0.72)", fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p style={{ color: "#8c6cc3", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 12 }}>DEVELOPMENT PHASES</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700 }}>Development Roadmap</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ROADMAP_PHASES.map((phase) => {
              const colors = {
                complete: { bg: "rgba(140,108,195,0.12)", border: "rgba(140,108,195,0.32)", tag: "#8c6cc3", tagBg: "rgba(140,108,195,0.12)" },
                active:   { bg: "rgba(117,92,142,0.12)", border: "rgba(117,92,142,0.28)", tag: "#755c8e", tagBg: "rgba(117,92,142,0.14)" },
                planned:  { bg: "rgba(14,13,14,0.9)", border: "rgba(255,255,255,0.08)", tag: "rgba(251,251,250,0.7)", tagBg: "rgba(255,255,255,0.04)" },
                future:   { bg: "rgba(191,93,123,0.08)", border: "rgba(191,93,123,0.2)", tag: "#bf5d7b", tagBg: "rgba(191,93,123,0.08)" },
              }[phase.status];
              return (
                <div key={phase.phase} className="p-4 rounded-2xl" style={{ background: colors.bg, border: `1px solid ${colors.border}` }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: colors.tag, marginBottom: 4, letterSpacing: "0.1em" }}>PHASE {phase.phase}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#fbfbfa", marginBottom: 8 }}>{phase.title}</div>
                  {phase.items.map(item => (
                    <div key={item} style={{ color: "rgba(251,251,250,0.68)", fontSize: 11, lineHeight: 1.8 }}>{item}</div>
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
              style={{ background: "rgba(140,108,195,0.12)", border: "1px solid rgba(140,108,195,0.28)", color: "#8c6cc3" }}>
              View Full Roadmap
            </Link>
            <Link to="/architecture" className="px-6 py-3 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(251,251,250,0.75)" }}>
              System Architecture
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 sm:px-12 py-12" style={{ background: "#0e0d0e", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #8c6cc3, #755c8e)", color: "#fbfbfa" }}>K3</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "var(--font-serif)" }}>Kuweni III Sponsorship Portal</div>
                <div style={{ color: "rgba(251,251,250,0.64)", fontSize: 11 }}>Proposed System — Functional Prototype</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/roadmap" style={{ color: "rgba(251,251,250,0.7)", fontSize: 13 }}>Roadmap</Link>
              <Link to="/architecture" style={{ color: "rgba(251,251,250,0.7)", fontSize: 13 }}>Architecture</Link>
              <Link to="/login" style={{ color: "rgba(251,251,250,0.7)", fontSize: 13 }}>Corporate Login</Link>
              <Link to="/register" style={{ color: "rgba(251,251,250,0.7)", fontSize: 13 }}>Register</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p style={{ color: "rgba(251,251,250,0.66)", fontSize: 12 }}>
              © 2026 Kuweni III Sponsorship Bidding Portal — PROPOSED SYSTEM. This is a functional prototype for demonstration and presentation purposes.
              Not production-ready. No real transactions or authentication are implemented.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
