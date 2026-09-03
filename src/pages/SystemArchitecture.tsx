import { Link } from "react-router-dom";

const LAYERS = [
  {
    label: "CLIENT LAYER",
    color: "#1a56db",
    nodes: ["Corporate Buyers", "Admin Users", "Executives"],
    subtext: "React / Next.js Frontend — TypeScript + Tailwind CSS",
    icon: "⬡",
  },
  {
    label: "API GATEWAY",
    color: "#3b82f6",
    nodes: ["REST API", "WebSocket (Live Bidding)", "Rate Limiting", "JWT Auth"],
    subtext: "Node.js / Express OR Python FastAPI",
    icon: "◈",
  },
  {
    label: "BUSINESS LOGIC",
    color: "#d4a017",
    nodes: ["Bidding Engine", "Proxy Bidding", "Anti-Sniping", "Auction State", "Contract Generator"],
    subtext: "Core domain services and workflow orchestration",
    icon: "◎",
  },
  {
    label: "DATA LAYER",
    color: "#22c55e",
    nodes: ["PostgreSQL (Primary DB)", "Redis (Cache / Locks)", "Audit Log Store"],
    subtext: "ACID-compliant relational storage + caching",
    icon: "⊟",
  },
  {
    label: "STORAGE & CDN",
    color: "#94a3b8",
    nodes: ["AWS S3 (Documents)", "AWS CloudFront (CDN)", "Encrypted at rest (AES-256)"],
    subtext: "Secure file storage with signed URLs",
    icon: "▣",
  },
];

const SERVICES = [
  { name: "Authentication", desc: "JWT + MFA (TOTP)", icon: "🔐", color: "#1a56db" },
  { name: "RBAC", desc: "Role-Based Access Control", icon: "🛡", color: "#3b82f6" },
  { name: "Bidding Engine", desc: "Real-time bid processing", icon: "⚡", color: "#d4a017" },
  { name: "Proxy Bidding", desc: "Auto-bid up to max limit", icon: "🤖", color: "#22c55e" },
  { name: "Anti-Sniping", desc: "15-min auction extension", icon: "⏱", color: "#eab308" },
  { name: "Audit Logging", desc: "Immutable event trail", icon: "📋", color: "#94a3b8" },
  { name: "Contract Gen.", desc: "Term sheet automation", icon: "📄", color: "#d4a017" },
  { name: "Watermarking", desc: "Dynamic user watermarks", icon: "◉", color: "#ef4444" },
];

const SECURITY = [
  { name: "TLS 1.3", desc: "Transport encryption" },
  { name: "AES-256", desc: "Storage encryption" },
  { name: "RBAC", desc: "Access control" },
  { name: "MFA", desc: "Multi-factor auth" },
  { name: "Audit Trail", desc: "Full event logging" },
  { name: "WAF", desc: "Web app firewall" },
];

export default function SystemArchitecture() {
  return (
    <div className="min-h-screen" style={{ background: "#040d1f", fontFamily: "var(--font-sans)", color: "#e8edf5" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(4,13,31,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#d4a017" }}>K3</div>
          <span style={{ fontWeight: 700, fontFamily: "var(--font-serif)" }}>System Architecture</span>
        </div>
        <div className="flex gap-3">
          <Link to="/" style={{ color: "#64748b", fontSize: 13 }}>← Home</Link>
          <Link to="/roadmap" style={{ color: "#1a56db", fontSize: 13 }}>Roadmap →</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-mono"
            style={{ background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017" }}>
            PROPOSED SYSTEM ARCHITECTURE — FOR TECHNICAL REVIEW
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, marginBottom: 16 }}>
            Technical Architecture
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            The proposed system architecture for the Kuweni III Sponsorship Bidding Platform.
            Designed for security, scalability, and auditability.
          </p>
        </div>

        {/* Architecture Stack */}
        <div className="mb-16">
          <h2 style={{ fontWeight: 700, fontSize: 18, color: "#e8edf5", marginBottom: 20, fontFamily: "var(--font-serif)" }}>System Layers</h2>
          <div className="relative space-y-2">
            {LAYERS.map((layer, i) => (
              <div key={layer.label} className="relative">
                <div className="rounded-2xl p-6 transition-all hover:-translate-y-0.5"
                  style={{ background: "#0d1e3d", border: `1px solid ${layer.color}30` }}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="shrink-0 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${layer.color}18`, border: `1px solid ${layer.color}30` }}>
                        <span style={{ color: layer.color, fontSize: 18 }}>{layer.icon}</span>
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: layer.color, letterSpacing: "0.1em", minWidth: 130 }}>{layer.label}</div>
                    </div>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {layer.nodes.map(node => (
                        <span key={node} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: `${layer.color}12`, border: `1px solid ${layer.color}25`, color: "#e8edf5" }}>
                          {node}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 ml-0 sm:ml-14 pl-0 sm:pl-7">
                    <p style={{ color: "#64748b", fontSize: 12 }}>{layer.subtext}</p>
                  </div>
                </div>
                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="flex flex-col items-center" style={{ color: "#1a56db" }}>
                      <div className="w-px h-3" style={{ background: "rgba(26,86,219,0.4)" }} />
                      <span style={{ fontSize: 14 }}>↓</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-16">
          <h2 style={{ fontWeight: 700, fontSize: 18, color: "#e8edf5", marginBottom: 20, fontFamily: "var(--font-serif)" }}>Core Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <div key={s.name} className="p-5 rounded-2xl text-center transition-all hover:-translate-y-1"
                style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#e8edf5", marginBottom: 4 }}>{s.name}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-3xl p-8 sm:p-12" style={{ background: "linear-gradient(135deg, rgba(26,86,219,0.12) 0%, rgba(13,30,61,0.8) 100%)", border: "1px solid rgba(26,86,219,0.3)" }}>
          <h2 style={{ fontWeight: 700, fontSize: 18, color: "#e8edf5", marginBottom: 16, fontFamily: "var(--font-serif)" }}>Security Architecture</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECURITY.map(s => (
              <div key={s.name} className="p-4 rounded-xl text-center" style={{ background: "rgba(4,13,31,0.5)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 14, color: "#1a56db", marginBottom: 4 }}>{s.name}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)" }}>
            <p style={{ color: "#d4a017", fontSize: 12, fontFamily: "var(--font-mono)", textAlign: "center" }}>
              PROPOSED SYSTEM — Security controls to be implemented during development phases 1–4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
