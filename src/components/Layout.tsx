import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const BUYER_NAV = [
  { path: "/dashboard", label: "Dashboard", icon: "⬡" },
  { path: "/lots", label: "Sponsorship Lots", icon: "◈" },
  { path: "/my-bids", label: "My Bids", icon: "◎" },
  { path: "/preview-room", label: "Executive Preview Room", icon: "▣" },
  { path: "/winning-bids", label: "Winning Bids", icon: "◉" },
  { path: "/contracts", label: "Contracts", icon: "⊟" },
  { path: "/audit-log", label: "Audit Log", icon: "≡" },
  { path: "/notifications", label: "Notifications", icon: "◐" },
];

const ADMIN_NAV = [
  { path: "/admin", label: "Dashboard", icon: "⬡" },
  { path: "/admin/companies", label: "Companies", icon: "◈" },
  { path: "/admin/verification", label: "Corporate Verification", icon: "◎" },
  { path: "/admin/lots", label: "Sponsorship Lots", icon: "▣" },
  { path: "/admin/auctions", label: "Auctions", icon: "◉" },
  { path: "/admin/bids", label: "Bids", icon: "⊟" },
  { path: "/admin/preview-room", label: "Executive Preview Room", icon: "▣" },
  { path: "/admin/contracts", label: "Contracts", icon: "≡" },
  { path: "/admin/audit", label: "Audit Logs", icon: "◐" },
  { path: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, logout, notifications } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = isAdmin ? ADMIN_NAV : BUYER_NAV;

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)", fontFamily: "var(--font-sans)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "linear-gradient(180deg, #071227 0%, #040d1f 100%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)" }}>
            <span style={{ color: "#d4a017", fontWeight: 700, fontSize: 14 }}>K3</span>
          </div>
          <div>
            <div style={{ color: "#e8edf5", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Kuweni III</div>
            <div style={{ color: "#64748b", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Sponsorship Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {nav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
                style={{
                  color: active ? "#e8edf5" : "#64748b",
                  background: active ? "rgba(26,86,219,0.18)" : "transparent",
                  borderLeft: active ? "2px solid #1a56db" : "2px solid transparent",
                }}>
                <span style={{ fontSize: 13, opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                <span style={{ fontWeight: active ? 600 : 400 }}>{item.label}</span>
                {item.path === "/notifications" && notifications > 0 && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                    style={{ background: "#1a56db", color: "#fff" }}>{notifications}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #1a56db, #d4a017)", color: "#fff" }}>
              {user?.name[0] ?? "U"}
            </div>
            <div>
              <div style={{ color: "#e8edf5", fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{isAdmin ? "Administrator" : "Corporate Buyer"}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 hover:bg-white/5"
            style={{ color: "#64748b" }}>
            <span>↩</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: "#071227", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setSidebarOpen(true)}
              style={{ color: "#e8edf5" }}>
              ☰
            </button>
            <h1 style={{ color: "#e8edf5", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-serif)" }}>
              Kuweni III Sponsorship Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block px-2 py-1 rounded text-xs font-mono"
              style={{ background: "rgba(212,160,23,0.15)", color: "#d4a017", border: "1px solid rgba(212,160,23,0.3)" }}>
              PROPOSED SYSTEM — PROTOTYPE
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(26,86,219,0.12)", border: "1px solid rgba(26,86,219,0.2)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              <span style={{ color: "#94a3b8", fontSize: 12 }}>Live</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
