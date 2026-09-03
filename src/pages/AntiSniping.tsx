import { useState, useEffect } from "react";
import Layout from "../components/Layout";

type TimelineEvent = { time: string; label: string; type: "original" | "bid" | "extension" | "new" };

export default function AntiSniping() {
  const [simulating, setSimulating] = useState(false);
  const [step, setStep] = useState(0);
  const [auctionEndTime, setAuctionEndTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 45);
    return d;
  });
  const [extensionCount, setExtensionCount] = useState(0);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    { time: "Day 30, 23:00", label: "Original Auction End Time", type: "original" },
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 45, seconds: 0 });

  useEffect(() => {
    if (!simulating) return;
    const id = setInterval(() => {
      const diff = auctionEndTime.getTime() - Date.now();
      if (diff <= 0) { setSimulating(false); clearInterval(id); return; }
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(id);
  }, [simulating, auctionEndTime]);

  const simulateFinal60 = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 55);
    setAuctionEndTime(d);
    setStep(1);
    setSimulating(true);
    setTimeLeft({ hours: 0, minutes: 55, seconds: 0 });
    setTimeline([{ time: "Day 30, 23:00", label: "Original Auction End Time", type: "original" }]);
    setExtensionCount(0);
  };

  const simulateValidBid = () => {
    setShowAlert(true);
    const ext = extensionCount + 1;
    setExtensionCount(ext);
    const d = new Date(auctionEndTime.getTime() + 15 * 60 * 1000);
    setAuctionEndTime(d);
    setStep(2);
    const now = new Date();
    setTimeline(prev => [
      ...prev,
      { time: now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }), label: `Valid Bid Received (Extension #${ext})`, type: "bid" },
      { time: "+15 min", label: `Auction Extended by 15 Minutes`, type: "extension" },
      { time: new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }), label: `New End Time`, type: "new" },
    ]);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono" style={{ background: "rgba(26,86,219,0.15)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.3)" }}>
              DEMONSTRATION MODULE
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Anti-Sniping System</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Interactive demonstration of the bid extension logic</p>
        </div>

        {/* Alert */}
        {showAlert && (
          <div className="mb-6 p-5 rounded-2xl animate-pulse" style={{ background: "rgba(234,179,8,0.12)", border: "2px solid rgba(234,179,8,0.5)" }}>
            <div className="flex items-center gap-3 mb-2">
              <span style={{ fontSize: 24 }}>⚡</span>
              <span style={{ color: "#eab308", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-mono)" }}>ANTI-SNIPING ACTIVATED</span>
            </div>
            <p style={{ color: "#d4a017", fontSize: 14, marginBottom: 4 }}>Valid bid received during the final 60 minutes.</p>
            <p style={{ color: "#eab308", fontSize: 14, fontWeight: 600 }}>Auction extended by 15 minutes. Extension #{extensionCount}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rules */}
          <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 16 }}>Business Rules</h3>
            <div className="space-y-4">
              {[
                ["Auction Duration", "30 days / 720 hours"],
                ["Anti-Snipe Window", "Final 60 minutes"],
                ["Extension Duration", "15 minutes per trigger"],
                ["Max Extensions", "Unlimited (stacks)"],
                ["Trigger Condition", "Valid bid received in window"],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>{label}</span>
                  <span style={{ color: "#e8edf5", fontSize: 13, fontFamily: "var(--font-mono)", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.2)" }}>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                This mechanism prevents last-second "sniping" — the practice of placing a winning bid in the final seconds, giving other bidders no time to respond.
              </p>
            </div>
          </div>

          {/* Demo Controls */}
          <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 6 }}>Live Demonstration</h3>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>Use the controls below to simulate the anti-sniping system in real time.</p>

            {simulating && (
              <div className="mb-6 p-4 rounded-xl text-center" style={{ background: "rgba(4,13,31,0.6)", border: "1px solid rgba(26,86,219,0.2)" }}>
                <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)", marginBottom: 8 }}>TIME REMAINING</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 36, fontWeight: 700, color: timeLeft.minutes < 60 ? "#eab308" : "#e8edf5" }}>
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </div>
                {timeLeft.hours === 0 && timeLeft.minutes < 60 && (
                  <div className="mt-2 text-xs font-mono" style={{ color: "#eab308" }}>⚡ WITHIN ANTI-SNIPE WINDOW</div>
                )}
                <div className="mt-2 text-xs" style={{ color: "#64748b" }}>Extensions triggered: {extensionCount}</div>
              </div>
            )}

            <div className="space-y-3">
              <button onClick={simulateFinal60}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "rgba(26,86,219,0.2)", border: "1px solid rgba(26,86,219,0.35)", color: "#3b82f6" }}>
                ⏱ Simulate Final 60 Minutes
              </button>
              <button onClick={simulateValidBid} disabled={step < 1}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: step >= 1 ? "rgba(234,179,8,0.18)" : "rgba(255,255,255,0.04)", border: `1px solid ${step >= 1 ? "rgba(234,179,8,0.4)" : "rgba(255,255,255,0.08)"}`, color: step >= 1 ? "#eab308" : "#64748b" }}>
                ⚡ Simulate Valid Bid → Trigger Extension
              </button>
            </div>
          </div>

          {/* Visual Timeline */}
          <div className="lg:col-span-2 p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 20 }}>Extension Timeline</h3>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <div className="space-y-4">
                {timeline.map((event, i) => {
                  const colors = {
                    original: { dot: "#64748b", label: "#94a3b8" },
                    bid: { dot: "#eab308", label: "#eab308" },
                    extension: { dot: "#1a56db", label: "#3b82f6" },
                    new: { dot: "#22c55e", label: "#22c55e" },
                  }[event.type];
                  return (
                    <div key={i} className="flex items-center gap-4 relative pl-12">
                      <div className="absolute left-5 w-3 h-3 rounded-full border-2 -translate-x-1/2"
                        style={{ background: "#0d1e3d", borderColor: colors.dot, boxShadow: `0 0 8px ${colors.dot}40` }} />
                      <div className="flex-1 flex items-center justify-between p-3 rounded-xl"
                        style={{ background: "rgba(4,13,31,0.4)", border: `1px solid rgba(255,255,255,0.04)` }}>
                        <span style={{ color: colors.label, fontSize: 13, fontWeight: 600 }}>{event.label}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#64748b" }}>{event.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {timeline.length === 1 && (
              <p style={{ color: "#64748b", fontSize: 13, marginTop: 16, textAlign: "center" }}>
                Run the simulation to see the timeline populate in real time.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
