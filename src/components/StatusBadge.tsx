type Status = "active" | "upcoming" | "ended" | "awarded" | "valid" | "winning" | "outbid" | "invalid"
  | "verified" | "pending" | "rejected" | "success" | "warning" | "failed" | "term_sheet" | "legal_review" | "approved" | "signed";

const CONFIG: Record<Status, { label: string; bg: string; color: string; dot: string }> = {
  active:       { label: "ACTIVE",        bg: "rgba(34,197,94,0.12)",   color: "#22c55e", dot: "#22c55e" },
  upcoming:     { label: "UPCOMING",      bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", dot: "#3b82f6" },
  ended:        { label: "ENDED",         bg: "rgba(100,116,139,0.12)", color: "#64748b", dot: "#64748b" },
  awarded:      { label: "AWARDED",       bg: "rgba(212,160,23,0.15)",  color: "#d4a017", dot: "#d4a017" },
  valid:        { label: "VALID",         bg: "rgba(34,197,94,0.12)",   color: "#22c55e", dot: "#22c55e" },
  winning:      { label: "WINNING",       bg: "rgba(212,160,23,0.15)",  color: "#d4a017", dot: "#d4a017" },
  outbid:       { label: "OUTBID",        bg: "rgba(239,68,68,0.12)",   color: "#ef4444", dot: "#ef4444" },
  invalid:      { label: "INVALID",       bg: "rgba(239,68,68,0.12)",   color: "#ef4444", dot: "#ef4444" },
  verified:     { label: "VERIFIED",      bg: "rgba(34,197,94,0.12)",   color: "#22c55e", dot: "#22c55e" },
  pending:      { label: "PENDING",       bg: "rgba(234,179,8,0.12)",   color: "#eab308", dot: "#eab308" },
  rejected:     { label: "REJECTED",      bg: "rgba(239,68,68,0.12)",   color: "#ef4444", dot: "#ef4444" },
  success:      { label: "SUCCESS",       bg: "rgba(34,197,94,0.12)",   color: "#22c55e", dot: "#22c55e" },
  warning:      { label: "WARNING",       bg: "rgba(234,179,8,0.12)",   color: "#eab308", dot: "#eab308" },
  failed:       { label: "FAILED",        bg: "rgba(239,68,68,0.12)",   color: "#ef4444", dot: "#ef4444" },
  term_sheet:   { label: "TERM SHEET",    bg: "rgba(59,130,246,0.12)",  color: "#3b82f6", dot: "#3b82f6" },
  legal_review: { label: "LEGAL REVIEW",  bg: "rgba(234,179,8,0.12)",   color: "#eab308", dot: "#eab308" },
  approved:     { label: "APPROVED",      bg: "rgba(34,197,94,0.12)",   color: "#22c55e", dot: "#22c55e" },
  signed:       { label: "SIGNED",        bg: "rgba(212,160,23,0.15)",  color: "#d4a017", dot: "#d4a017" },
};

export default function StatusBadge({ status, pulse = false }: { status: Status; pulse?: boolean }) {
  const cfg = CONFIG[status] ?? CONFIG.pending;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium"
      style={{ background: cfg.bg, color: cfg.color, letterSpacing: "0.06em" }}>
      <span className={`w-1.5 h-1.5 rounded-full ${pulse ? "animate-pulse" : ""}`} style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}
