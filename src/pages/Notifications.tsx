import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "../data/mock";
import Layout from "../components/Layout";

export default function Notifications() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);

  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const icons: Record<string, string> = {
    bid_update: "◎", auction_extended: "⚡", proxy_activated: "🤖", winning: "🏆", verification: "✓", contract: "📄"
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5" }}>Notifications</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{notifs.filter(n => !n.read).length} unread</p>
          </div>
          <button onClick={markAllRead} style={{ color: "#1a56db", fontSize: 13 }}>Mark all read</button>
        </div>

        <div className="space-y-3">
          {notifs.map(n => (
            <div key={n.id} onClick={() => markRead(n.id)} className="p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
              style={{ background: n.read ? "#0d1e3d" : "rgba(26,86,219,0.1)", border: `1px solid ${n.read ? "rgba(255,255,255,0.06)" : "rgba(26,86,219,0.25)"}` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(26,86,219,0.15)", fontSize: 18 }}>
                  {icons[n.type] ?? "◎"}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 style={{ fontWeight: 600, fontSize: 14, color: "#e8edf5" }}>{n.title}</h4>
                    {!n.read && <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: "#1a56db" }} />}
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>{n.message}</p>
                  <p style={{ color: "#64748b", fontSize: 11, marginTop: 6, fontFamily: "var(--font-mono)" }}>
                    {new Date(n.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
