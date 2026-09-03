import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../data/mock";
import StatusBadge from "../components/StatusBadge";
import Countdown from "../components/Countdown";
import Layout from "../components/Layout";
import type { LotCategory } from "../types";

const CATEGORIES: (LotCategory | "All")[] = ["All", "Title Sponsor", "Technology", "Experience", "Digital Media", "Beverage", "Brand Partner"];

export default function SponsorshipLots() {
  const { lots } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<LotCategory | "All">("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "upcoming" | "ended">("all");

  const filtered = lots.filter(lot => {
    if (search && !lot.name.toLowerCase().includes(search.toLowerCase()) && !lot.category.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && lot.category !== category) return false;
    if (statusFilter !== "all" && lot.status !== statusFilter) return false;
    if (minPrice && lot.currentBid < Number(minPrice)) return false;
    if (maxPrice && lot.currentBid > Number(maxPrice)) return false;
    return true;
  });

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Sponsorship Lots</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Browse and bid on premium Kuweni III sponsorship opportunities</p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl p-5 mb-6" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col gap-4">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sponsorship opportunities…"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: "rgba(4,13,31,0.8)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8edf5" }}
              onFocus={e => { e.currentTarget.style.borderColor = "rgba(26,86,219,0.5)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }} />

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ background: category === c ? "rgba(26,86,219,0.25)" : "rgba(255,255,255,0.04)", color: category === c ? "#3b82f6" : "#64748b", border: `1px solid ${category === c ? "rgba(26,86,219,0.4)" : "rgba(255,255,255,0.08)"}` }}>
                  {c}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {[["all", "All Status"], ["active", "Active"], ["upcoming", "Upcoming"], ["ended", "Ended"]].map(([v, l]) => (
                <button key={v} onClick={() => setStatusFilter(v as typeof statusFilter)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{ background: statusFilter === v ? "rgba(26,86,219,0.2)" : "transparent", color: statusFilter === v ? "#3b82f6" : "#64748b", border: `1px solid ${statusFilter === v ? "rgba(26,86,219,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                  {l}
                </button>
              ))}
              <div className="flex items-center gap-2 ml-auto">
                <span style={{ color: "#64748b", fontSize: 12 }}>Rs.</span>
                <input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="w-24 px-3 py-1.5 rounded-lg text-xs outline-none"
                  style={{ background: "rgba(4,13,31,0.6)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8edf5" }} />
                <span style={{ color: "#64748b" }}>–</span>
                <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="w-24 px-3 py-1.5 rounded-lg text-xs outline-none"
                  style={{ background: "rgba(4,13,31,0.6)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8edf5" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4" style={{ color: "#64748b", fontSize: 13 }}>
          Showing {filtered.length} of {lots.length} lots
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(lot => (
            <div key={lot.id} className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              <div className="relative h-48 overflow-hidden" style={{ background: "#142752" }}>
                <img src={lot.image} alt={lot.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style={{ filter: "brightness(0.75)" }} />
                <div className="absolute top-3 left-3"><StatusBadge status={lot.status} pulse={lot.status === "active"} /></div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="px-2 py-1 rounded text-xs font-mono" style={{ background: "rgba(4,13,31,0.85)", color: "#94a3b8" }}>{lot.category}</span>
                  <span className="px-2 py-1 rounded text-xs font-mono" style={{ background: "rgba(4,13,31,0.85)", color: "#64748b" }}>{lot.bidCount} bids</span>
                </div>
              </div>
              <div className="p-5">
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#e8edf5", marginBottom: 8 }}>{lot.name}</h3>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{lot.description.slice(0, 80)}…</p>

                <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl" style={{ background: "rgba(4,13,31,0.5)" }}>
                  <div>
                    <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)", marginBottom: 2 }}>CURRENT BID</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 700, color: "#d4a017" }}>{formatCurrency(lot.currentBid)}</div>
                  </div>
                  <div>
                    <div style={{ color: "#64748b", fontSize: 10, fontFamily: "var(--font-mono)", marginBottom: 2 }}>RESERVE</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#94a3b8" }}>{formatCurrency(lot.reservePrice)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)" }}>TIME REMAINING</div>
                  <Countdown endDate={lot.auctionEnd} />
                </div>

                <Link to={`/lots/${lot.id}`} className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, rgba(26,86,219,0.2), rgba(26,86,219,0.12))", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.3)" }}>
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div style={{ color: "#64748b", fontSize: 40, marginBottom: 12 }}>◎</div>
            <p style={{ color: "#64748b" }}>No lots match your filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
