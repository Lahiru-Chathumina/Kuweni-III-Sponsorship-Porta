import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your corporate email and password."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setMfaStep(true);
  };

  const handleMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const isAdmin = email.toLowerCase().includes("admin");
    login(email, password, isAdmin);
    setLoading(false);
    navigate(isAdmin ? "/admin" : "/dashboard");
  };

  const handleDemoLogin = (asAdmin = false) => {
    login(asAdmin ? "admin@kuweni3.lk" : "priya@techcorp.lk", "demo", asAdmin);
    navigate(asAdmin ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #040d1f 0%, #071227 60%, #0d1e3d 100%)", fontFamily: "var(--font-sans)" }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)" }} />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#d4a017" }}>K3</div>
          </Link>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "#e8edf5", marginBottom: 8 }}>Corporate Sign In</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>Access the Kuweni III Sponsorship Portal</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(13,30,61,0.8)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
          {!mfaStep ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 8 }}>CORPORATE EMAIL</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.lk"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5", fontFamily: "var(--font-sans)" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.15)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#94a3b8", fontSize: 12, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 8 }}>PASSWORD</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.15)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded" style={{ accentColor: "#1a56db" }} />
                  <span style={{ color: "#64748b", fontSize: 13 }}>Remember me</span>
                </label>
                <button type="button" style={{ color: "#1a56db", fontSize: 13 }}>Forgot password?</button>
              </div>
              {error && <div className="px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff", boxShadow: "0 4px 16px rgba(26,86,219,0.3)" }}>
                {loading ? "Verifying..." : "Sign In →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMfa} className="space-y-5">
              <div className="text-center mb-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(26,86,219,0.15)", border: "1px solid rgba(26,86,219,0.3)" }}>
                  <span style={{ fontSize: 24 }}>🔐</span>
                </div>
                <h3 style={{ fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>MFA Verification</h3>
                <p style={{ color: "#64748b", fontSize: 13 }}>Enter the 6-digit code from your authenticator app</p>
              </div>
              <input type="text" value={mfaCode} onChange={e => setMfaCode(e.target.value)}
                placeholder="000000" maxLength={6}
                className="w-full px-4 py-4 rounded-xl text-center text-2xl tracking-widest font-mono outline-none"
                style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(26,86,219,0.3)", color: "#e8edf5", letterSpacing: "0.5em" }} />
              <p style={{ color: "#64748b", fontSize: 12, textAlign: "center" }}>Demo: enter any 6 digits or leave blank</p>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>
              <button type="button" onClick={() => setMfaStep(false)} style={{ color: "#64748b", fontSize: 13, width: "100%", textAlign: "center" }}>
                ← Back
              </button>
            </form>
          )}

          {!mfaStep && (
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "#64748b", fontSize: 12, textAlign: "center", marginBottom: 12, fontFamily: "var(--font-mono)" }}>DEMO ACCESS</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleDemoLogin(false)}
                  className="py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                  style={{ background: "rgba(26,86,219,0.12)", border: "1px solid rgba(26,86,219,0.2)", color: "#3b82f6" }}>
                  Buyer Demo
                </button>
                <button onClick={() => handleDemoLogin(true)}
                  className="py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                  style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.25)", color: "#d4a017" }}>
                  Admin Demo
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center mt-6" style={{ color: "#64748b", fontSize: 13 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#1a56db", fontWeight: 600 }}>Register your company →</Link>
        </p>
      </div>
    </div>
  );
}
