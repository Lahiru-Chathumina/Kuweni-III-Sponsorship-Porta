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
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "linear-gradient(180deg, rgba(37,27,25,0.96) 0%, rgba(14,13,14,0.98) 100%)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>

        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: "linear-gradient(135deg, #8c6cc3, #755c8e)" }}>
            <span style={{ color: "#fbfbfa", fontWeight: 700, fontSize: 14 }}>K3</span>
          </div>
          <div>
            <div style={{ color: "#fbfbfa", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Kuweni III</div>
            <div style={{ color: "rgba(251,251,250,0.62)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Sponsorship Portal</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {nav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
                style={{
                  color: active ? "#fbfbfa" : "rgba(251,251,250,0.68)",
                  background: active ? "rgba(140,108,195,0.16)" : "transparent",
                  borderLeft: active ? "2px solid #8c6cc3" : "2px solid transparent",
                }}>
                <span style={{ fontSize: 13, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                <span style={{ fontWeight: active ? 600 : 400 }}>{item.label}</span>
                {item.path === "/notifications" && notifications > 0 && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                    style={{ background: "#8c6cc3", color: "#fbfbfa" }}>{notifications}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #8c6cc3, #bf5d7b)", color: "#fbfbfa" }}>
              {user?.name[0] ?? "U"}
            </div>
            <div>
              <div style={{ color: "#fbfbfa", fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
              <div style={{ color: "rgba(251,251,250,0.62)", fontSize: 11 }}>{isAdmin ? "Administrator" : "Corporate Buyer"}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 hover:bg-white/5"
            style={{ color: "rgba(251,251,250,0.72)" }}>
            <span>↩</span> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: "rgba(14,13,14,0.82)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setSidebarOpen(true)}
              style={{ color: "#fbfbfa" }}>
              ☰
            </button>
            <h1 style={{ color: "#fbfbfa", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-serif)" }}>
              Kuweni III Sponsorship Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block px-2 py-1 rounded text-xs font-mono"
              style={{ background: "rgba(191,93,123,0.12)", color: "#bf5d7b", border: "1px solid rgba(191,93,123,0.25)" }}>
              PROPOSED SYSTEM — PROTOTYPE
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(140,108,195,0.12)", border: "1px solid rgba(140,108,195,0.25)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#8c6cc3" }} />
              <span style={{ color: "rgba(251,251,250,0.74)", fontSize: 12 }}>Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
