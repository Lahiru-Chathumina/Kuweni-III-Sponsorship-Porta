import { useState } from "react";
import { MOCK_CONTRACT, MOCK_COMPANIES, MOCK_LOTS } from "../data/mock";
import { formatCurrency } from "../data/mock";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";

const WORKFLOW_STEPS = ["Winning Bid", "Term Sheet", "Legal Agreement", "Approval", "Contract"];

export default function TermSheet() {
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");
  const [contractStatus, setContractStatus] = useState(MOCK_CONTRACT.status);
  const company = MOCK_COMPANIES[0];
  const lot = MOCK_LOTS[0];
  const contract = MOCK_CONTRACT;

  const currentStep = ["winning_bid", "term_sheet", "legal_review", "approved", "signed"].indexOf(contractStatus === "term_sheet" ? "term_sheet" : contractStatus === "legal_review" ? "legal_review" : contractStatus === "approved" ? "approved" : contractStatus === "signed" ? "signed" : "winning_bid");

  const generate = async (type: "term_sheet" | "contract") => {
    setStatus("generating");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("done");
    if (type === "term_sheet") setContractStatus("legal_review");
    if (type === "contract") setContractStatus("approved");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Term Sheet & Contract Generator</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Post-auction contract workflow for Main Partner</p>
        </div>

        {/* Workflow Progress */}
        <div className="p-6 rounded-2xl mb-6" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 16 }}>Contract Workflow</h3>
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {WORKFLOW_STEPS.map((step, i) => {
              const done = i <= currentStep;
              const active = i === currentStep + 1;
              return (
                <div key={step} className="flex items-center" style={{ minWidth: 0 }}>
                  <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 shrink-0"
                      style={{ background: done ? "#d4a017" : active ? "rgba(26,86,219,0.2)" : "rgba(255,255,255,0.05)", color: done ? "#040d1f" : active ? "#3b82f6" : "#64748b", border: active ? "2px solid rgba(26,86,219,0.5)" : "none" }}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span style={{ color: done ? "#d4a017" : active ? "#3b82f6" : "#64748b", fontSize: 11, textAlign: "center", whiteSpace: "nowrap" }}>{step}</span>
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 shrink-0" style={{ background: i < currentStep ? "#d4a017" : "rgba(255,255,255,0.08)", minWidth: 20 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {status === "generating" && (
          <div className="mb-4 px-5 py-4 rounded-xl" style={{ background: "rgba(26,86,219,0.1)", border: "1px solid rgba(26,86,219,0.3)", color: "#3b82f6" }}>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Generating document…
            </div>
          </div>
        )}
        {status === "done" && (
          <div className="mb-4 px-5 py-4 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            ✓ Document generated successfully
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Details */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 12 }}>Winner Information</h3>
              {[["Company", company.name], ["Contact", company.contactPerson], ["Email", company.email], ["Reg. Number", company.registrationNumber]].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>{l}</span>
                  <span style={{ color: "#e8edf5", fontSize: 12, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 12 }}>Sponsorship Details</h3>
              {[
                ["Lot", lot.name],
                ["Category", lot.category],
                ["Winning Amount", formatCurrency(contract.winningAmount)],
                ["Contract Type", "Standard Sponsorship Agreement"],
                ["Exclusivity", "Category exclusive"],
                ["Status", <StatusBadge key="status" status={contractStatus} />],
              ].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "#64748b", fontSize: 12 }}>{l}</span>
                  <span style={{ color: "#e8edf5", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-mono)", textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Milestones */}
            <div className="p-6 rounded-2xl" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 12 }}>Payment Milestones</h3>
              {contract.milestones.map(ms => (
                <div key={ms.id} className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <div style={{ color: "#e8edf5", fontSize: 12, fontWeight: 600 }}>{ms.title}</div>
                    <div style={{ color: "#64748b", fontSize: 11, marginTop: 1 }}>{ms.dueDate}</div>
                  </div>
                  <div className="text-right">
                    {ms.amount > 0 && <div style={{ fontFamily: "var(--font-mono)", color: "#d4a017", fontSize: 12, fontWeight: 700 }}>{formatCurrency(ms.amount)}</div>}
                    <StatusBadge status={ms.status} />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-6 rounded-2xl space-y-3" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: "#e8edf5", marginBottom: 4 }}>Actions</h3>
              <button onClick={() => generate("term_sheet")} disabled={status === "generating"}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #1a56db, #0d3a9e)", color: "#fff" }}>
                Generate Term Sheet
              </button>
              <button onClick={() => generate("contract")} disabled={status === "generating"}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: "rgba(212,160,23,0.18)", border: "1px solid rgba(212,160,23,0.3)", color: "#d4a017" }}>
                Generate Contract
              </button>
              <button className="w-full py-3 rounded-xl text-sm font-medium"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8" }}>
                ↓ Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
