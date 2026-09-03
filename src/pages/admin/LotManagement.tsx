import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../data/mock";
import Layout from "../../components/Layout";
import StatusBadge from "../../components/StatusBadge";

const EMPTY_LOT = {
  name: "", description: "", category: "Title Sponsor", reservePrice: "", startingBid: "",
  auctionDuration: "30", startDate: "", endDate: "", benefits: "", deliverables: "",
};

export default function LotManagement() {
  const { lots } = useApp();
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_LOT);
  const [saved, setSaved] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setCreating(false); setForm(EMPTY_LOT); }, 2000);
  };

  const Field = ({ label, id, value, placeholder, type = "text", onChange, as }: {
    label: string; id: string; value: string; placeholder: string; type?: string; onChange: (v: string) => void; as?: "textarea";
  }) => (
    <div>
      <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</label>
      {as === "textarea" ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }}
          onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }}
          onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; }}
          onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} />
      )}
    </div>
  );

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Lot Management</h2>
            <p style={{ color: "#64748b", fontSize: 14 }}>Create and manage sponsorship lots</p>
          </div>
          {!creating && (
            <button onClick={() => setCreating(true)} className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
              + Create Lot
            </button>
          )}
        </div>

        {saved && (
          <div className="mb-4 px-5 py-3 rounded-xl text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            ✓ Lot saved successfully
          </div>
        )}

        {creating && (
          <div className="rounded-2xl p-6 mb-8" style={{ background: "#0d1e3d", border: "1px solid rgba(26,86,219,0.3)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontWeight: 700, fontSize: 18, color: "#e8edf5" }}>Create New Lot</h3>
              <button onClick={() => setCreating(false)} style={{ color: "#64748b", fontSize: 20 }}>×</button>
            </div>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="LOT NAME" id="name" value={form.name} placeholder="e.g. Main Event Partner" onChange={v => update("name", v)} />
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", marginBottom: 6 }}>CATEGORY</label>
                  <select value={form.category} onChange={e => update("category", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }}>
                    {["Title Sponsor", "Technology", "Experience", "Digital Media", "Beverage", "Brand Partner"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <Field label="DESCRIPTION" id="desc" value={form.description} placeholder="Describe the sponsorship opportunity…" onChange={v => update("description", v)} as="textarea" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Field label="RESERVE PRICE (Rs.)" id="reserve" value={form.reservePrice} placeholder="5,000,000" onChange={v => update("reservePrice", v)} />
                <Field label="STARTING BID (Rs.)" id="start" value={form.startingBid} placeholder="2,000,000" onChange={v => update("startingBid", v)} />
                <Field label="DURATION (DAYS)" id="duration" value={form.auctionDuration} placeholder="30" onChange={v => update("auctionDuration", v)} />
                <Field label="START DATE" id="startDate" type="date" value={form.startDate} placeholder="" onChange={v => update("startDate", v)} />
              </div>
              <Field label="SPONSORSHIP BENEFITS (one per line)" id="benefits" value={form.benefits} placeholder="Enter benefits…" onChange={v => update("benefits", v)} as="textarea" />
              <Field label="DELIVERABLES (one per line)" id="deliverables" value={form.deliverables} placeholder="Enter deliverables…" onChange={v => update("deliverables", v)} as="textarea" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
                  Publish Lot
                </button>
                <button type="button" className="px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
                  Save Draft
                </button>
                <button type="button" onClick={() => setCreating(false)} className="px-6 py-3 rounded-xl text-sm" style={{ color: "#64748b" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lots table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: "#e8edf5" }}>All Sponsorship Lots</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Lot Name", "Category", "Reserve Price", "Current Bid", "Bids", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left" style={{ color: "#64748b", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map((lot, i) => (
                  <tr key={lot.id} className="hover:bg-white/2 transition-colors" style={{ borderBottom: i < lots.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td className="px-5 py-3">
                      <div style={{ color: "#e8edf5", fontWeight: 600, fontSize: 13 }}>{lot.name}</div>
                    </td>
                    <td className="px-5 py-3" style={{ color: "#94a3b8", fontSize: 12 }}>{lot.category}</td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", color: "#64748b", fontSize: 12 }}>{formatCurrency(lot.reservePrice)}</td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", color: "#d4a017", fontWeight: 700, fontSize: 13 }}>{formatCurrency(lot.currentBid)}</td>
                    <td className="px-5 py-3" style={{ fontFamily: "var(--font-mono)", color: "#e8edf5" }}>{lot.bidCount}</td>
                    <td className="px-5 py-3"><StatusBadge status={lot.status} pulse={lot.status === "active"} /></td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(26,86,219,0.12)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.2)" }}>Edit</button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.06)" }}>Bids</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
