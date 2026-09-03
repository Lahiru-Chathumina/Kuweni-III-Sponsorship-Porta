import { useState } from "react";
import { useApp } from "../context/AppContext";
import { MOCK_DOCUMENTS } from "../data/mock";
import Layout from "../components/Layout";
import type { Document } from "../types";

const DOC_ICONS: Record<string, string> = {
  pitch_deck: "📊", financial_model: "📈", documentary: "🎬", sponsorship_proposal: "📋", contract: "📄", video: "▶",
};

export default function ExecutivePreviewRoom() {
  const { user } = useApp();
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [downloadNotif, setDownloadNotif] = useState("");

  const userIp = "203.94.xx.xx";
  const watermark = `${user?.name ?? "Authorized User"} | TechCorp Lanka | ${userIp}`;

  const handleDownload = (doc: Document) => {
    setDownloadNotif(`Downloading "${doc.name}" — access logged.`);
    setTimeout(() => setDownloadNotif(""), 3000);
  };

  return (
    <Layout>
      <div className="p-6 sm:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 700, color: "#e8edf5", marginBottom: 4 }}>Executive Preview Room</h2>
            <p style={{ color: "#64748b", fontSize: 14 }}>Confidential sponsorship materials — Main Event Partner</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <span style={{ color: "#ef4444", fontSize: 12 }}>🔒</span>
            <span style={{ color: "#ef4444", fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 600 }}>CONFIDENTIAL — AUTHORIZED ACCESS ONLY</span>
          </div>
        </div>

        {/* Session info */}
        <div className="mb-6 p-4 rounded-xl flex flex-wrap items-center gap-4" style={{ background: "rgba(13,30,61,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            <span style={{ color: "#22c55e", fontSize: 12, fontFamily: "var(--font-mono)" }}>SESSION ACTIVE</span>
          </div>
          <span style={{ color: "#64748b", fontSize: 12 }}>|</span>
          <span style={{ color: "#94a3b8", fontSize: 12, fontFamily: "var(--font-mono)" }}>User: {user?.name}</span>
          <span style={{ color: "#64748b", fontSize: 12 }}>|</span>
          <span style={{ color: "#94a3b8", fontSize: 12, fontFamily: "var(--font-mono)" }}>IP: {userIp}</span>
          <span style={{ color: "#64748b", fontSize: 12 }}>|</span>
          <span style={{ color: "#94a3b8", fontSize: 12, fontFamily: "var(--font-mono)" }}>All access logged & audited</span>
        </div>

        {downloadNotif && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            ✓ {downloadNotif}
          </div>
        )}

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
          {MOCK_DOCUMENTS.map(doc => (
            <div key={doc.id} className="p-5 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ background: "#0d1e3d", border: `1px solid ${doc.confidential ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.06)"}` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: "rgba(26,86,219,0.12)", border: "1px solid rgba(26,86,219,0.2)" }}>
                  {DOC_ICONS[doc.type]}
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono"
                  style={{ background: doc.confidential ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.04)", color: doc.confidential ? "#ef4444" : "#64748b" }}>
                  {doc.confidential ? "🔒 CONFIDENTIAL" : "◎ GENERAL"}
                </div>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 13, color: "#e8edf5", marginBottom: 4, lineHeight: 1.4 }}>{doc.name}</h3>
              <p style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>
                {doc.type.replace("_", " ").toUpperCase()} · {doc.size}
              </p>
              <p style={{ color: "#64748b", fontSize: 11, marginBottom: 12 }}>
                {doc.accessHistory.length} access{doc.accessHistory.length !== 1 ? "es" : ""} logged
              </p>
              <div className="flex gap-2">
                <button onClick={() => setPreviewDoc(doc)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: "rgba(26,86,219,0.18)", color: "#3b82f6", border: "1px solid rgba(26,86,219,0.3)" }}>
                  Preview
                </button>
                <button onClick={() => handleDownload(doc)}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setPreviewDoc(null)}>
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden" style={{ background: "#0d1e3d", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
              <div>
                <div style={{ color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)", marginBottom: 2 }}>DOCUMENT PREVIEW</div>
                <div style={{ color: "#e8edf5", fontWeight: 700, fontSize: 15 }}>{previewDoc.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded text-xs font-mono" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>🔒 CONFIDENTIAL</span>
                <button onClick={() => setPreviewDoc(null)} style={{ color: "#64748b", fontSize: 20, lineHeight: 1 }}>×</button>
              </div>
            </div>

            {/* Preview Content with Watermark */}
            <div className="relative" style={{ minHeight: 400 }}>
              {/* Watermark overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
                <div style={{ transform: "rotate(-35deg)", opacity: 0.08, fontSize: 16, fontFamily: "var(--font-mono)", color: "#e8edf5", whiteSpace: "nowrap", userSelect: "none", letterSpacing: "0.05em" }}>
                  {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ marginBottom: 40 }}>{watermark}</div>)}
                </div>
              </div>

              {/* Mock document preview */}
              <div className="p-8" style={{ background: "rgba(4,13,31,0.5)" }}>
                {previewDoc.type === "video" || previewDoc.type === "documentary" ? (
                  <div className="flex flex-col items-center justify-center h-64 rounded-2xl" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>▶</div>
                    <p style={{ color: "#94a3b8", fontSize: 14 }}>{previewDoc.name}</p>
                    <p style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Video preview — {previewDoc.size}</p>
                    <p style={{ color: "#64748b", fontSize: 11, marginTop: 8, fontFamily: "var(--font-mono)" }}>ACCESS LOGGED — {new Date().toLocaleString()}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="h-8 rounded-lg" style={{ background: "rgba(26,86,219,0.15)", width: "60%" }} />
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "90%" }} />
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "80%" }} />
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "95%" }} />
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "70%" }} />
                    <div className="h-32 rounded-xl mt-4" style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.15)" }} />
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "85%" }} />
                    <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.04)", width: "75%" }} />
                  </div>
                )}
                <div className="mt-4 p-3 rounded-lg text-center" style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)" }}>
                  <p style={{ color: "#d4a017", fontSize: 11, fontFamily: "var(--font-mono)" }}>
                    CONFIDENTIAL MATERIAL — {watermark} — {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Access History */}
            <div className="px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#071227" }}>
              <div style={{ color: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)", marginBottom: 8 }}>ACCESS HISTORY</div>
              {previewDoc.accessHistory.length === 0 ? (
                <p style={{ color: "#64748b", fontSize: 12 }}>No previous access recorded.</p>
              ) : (
                <div className="space-y-1">
                  {previewDoc.accessHistory.map((a, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs" style={{ color: "#64748b" }}>
                      <span style={{ fontFamily: "var(--font-mono)" }}>{new Date(a.timestamp).toLocaleString()}</span>
                      <span>{a.user}</span>
                      <span>{a.company}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
