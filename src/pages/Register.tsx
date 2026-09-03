import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ company: "", email: "", domain: "", regNumber: "", contact: "", phone: "", password: "", confirm: "" });
  const [domainVerified, setDomainVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const verifyDomain = async () => {
    if (!form.domain) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setDomainVerified(true);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const Field = ({ label, id, type = "text", value, placeholder, onChange }: {
    label: string; id: string; type?: string; value: string; placeholder: string; onChange: (v: string) => void;
  }) => (
    <div>
      <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }}
        onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }} />
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #040d1f 0%, #071227 100%)", fontFamily: "var(--font-sans)" }}>
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)" }}>
            <span style={{ fontSize: 36 }}>✓</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "#e8edf5", marginBottom: 12 }}>Application Submitted</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
            Your corporate account has been submitted for verification.
          </p>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 32 }}>
            Our admin team will review your registration and company documents within 24 business hours.
            You will receive an email confirmation once your account is verified.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate("/login")} className="px-8 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
              Return to Login
            </button>
            <Link to="/" className="px-8 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #040d1f 0%, #071227 60%, #0d1e3d 100%)", fontFamily: "var(--font-sans)" }}>
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold"
              style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#d4a017" }}>K3</div>
          </Link>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 700, color: "#e8edf5", marginBottom: 8 }}>Corporate Registration</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>Register your company to participate in Kuweni III sponsorship bidding</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(13,30,61,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="COMPANY NAME" id="company" value={form.company} placeholder="TechCorp Lanka Pvt Ltd" onChange={v => update("company", v)} />
              <Field label="CORPORATE EMAIL" id="email" type="email" value={form.email} placeholder="procurement@company.lk" onChange={v => update("email", v)} />
            </div>

            {/* Domain field with verify */}
            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 6 }}>CORPORATE DOMAIN</label>
              <div className="flex gap-2">
                <input type="text" value={form.domain} onChange={e => update("domain", e.target.value)} placeholder="company.lk"
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(4,13,31,0.8)", border: `1px solid ${domainVerified ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.1)"}`, color: "#e8edf5" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = domainVerified ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.1)"; }} />
                <button type="button" onClick={verifyDomain} disabled={loading || domainVerified}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
                  style={{ background: domainVerified ? "rgba(34,197,94,0.15)" : "rgba(26,86,219,0.2)", border: `1px solid ${domainVerified ? "rgba(34,197,94,0.4)" : "rgba(26,86,219,0.3)"}`, color: domainVerified ? "#22c55e" : "#3b82f6" }}>
                  {loading ? "Checking..." : domainVerified ? "✓ Verified" : "Verify Domain"}
                </button>
              </div>
              {domainVerified && <p style={{ color: "#22c55e", fontSize: 12, marginTop: 4 }}>✓ Corporate domain verified successfully</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="COMPANY REGISTRATION NUMBER" id="regNumber" value={form.regNumber} placeholder="PV/00000/2020" onChange={v => update("regNumber", v)} />
              <Field label="CONTACT PERSON" id="contact" value={form.contact} placeholder="Full Name" onChange={v => update("contact", v)} />
            </div>

            <Field label="PHONE NUMBER" id="phone" type="tel" value={form.phone} placeholder="+94 77 000 0000" onChange={v => update("phone", v)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="PASSWORD" id="password" type="password" value={form.password} placeholder="••••••••" onChange={v => update("password", v)} />
              <Field label="CONFIRM PASSWORD" id="confirm" type="password" value={form.confirm} placeholder="••••••••" onChange={v => update("confirm", v)} />
            </div>

            {/* Document Upload */}
            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 6 }}>COMPANY REGISTRATION DOCUMENT</label>
              <div className="flex items-center justify-center w-full h-24 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-blue-500/50"
                style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(4,13,31,0.4)" }}>
                <div className="text-center">
                  <div style={{ color: "#64748b", fontSize: 24, marginBottom: 4 }}>↑</div>
                  <p style={{ color: "#64748b", fontSize: 13 }}>Upload PDF or image of registration document</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff", boxShadow: "0 4px 16px rgba(26,86,219,0.3)" }}>
                {loading ? "Submitting Application..." : "Submit Corporate Registration"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-6" style={{ color: "#64748b", fontSize: 13 }}>
          Already registered? <Link to="/login" style={{ color: "#1a56db", fontWeight: 600 }}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
