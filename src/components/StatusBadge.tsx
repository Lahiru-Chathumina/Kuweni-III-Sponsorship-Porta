type Status = "active" | "upcoming" | "ended" | "awarded" | "valid" | "winning" | "outbid" | "invalid"
  | "verified" | "pending" | "rejected" | "success" | "warning" | "failed" | "term_sheet" | "legal_review" | "approved" | "signed";

const CONFIG: Record<Status, { label: string; bg: string; color: string; dot: string }> = {
  active:       { label: "ACTIVE",        bg: "rgba(140,108,195,0.12)", color: "#8c6cc3", dot: "#8c6cc3" },
  upcoming:     { label: "UPCOMING",      bg: "rgba(117,92,142,0.12)", color: "#755c8e", dot: "#755c8e" },
  ended:        { label: "ENDED",         bg: "rgba(251,251,250,0.08)", color: "rgba(251,251,250,0.7)", dot: "rgba(251,251,250,0.7)" },
  awarded:      { label: "AWARDED",       bg: "rgba(191,93,123,0.12)", color: "#bf5d7b", dot: "#bf5d7b" },
  valid:        { label: "VALID",         bg: "rgba(140,108,195,0.12)", color: "#8c6cc3", dot: "#8c6cc3" },
  winning:      { label: "WINNING",       bg: "rgba(191,93,123,0.12)", color: "#bf5d7b", dot: "#bf5d7b" },
  outbid:       { label: "OUTBID",        bg: "rgba(126,82,57,0.12)", color: "#7e5239", dot: "#7e5239" },
  invalid:      { label: "INVALID",       bg: "rgba(126,82,57,0.12)", color: "#7e5239", dot: "#7e5239" },
  verified:     { label: "VERIFIED",      bg: "rgba(140,108,195,0.12)", color: "#8c6cc3", dot: "#8c6cc3" },
  pending:      { label: "PENDING",       bg: "rgba(191,93,123,0.12)", color: "#bf5d7b", dot: "#bf5d7b" },
  rejected:     { label: "REJECTED",      bg: "rgba(126,82,57,0.12)", color: "#7e5239", dot: "#7e5239" },
  success:      { label: "SUCCESS",       bg: "rgba(140,108,195,0.12)", color: "#8c6cc3", dot: "#8c6cc3" },
  warning:      { label: "WARNING",       bg: "rgba(191,93,123,0.12)", color: "#bf5d7b", dot: "#bf5d7b" },
  failed:       { label: "FAILED",        bg: "rgba(126,82,57,0.12)", color: "#7e5239", dot: "#7e5239" },
  term_sheet:   { label: "TERM SHEET",    bg: "rgba(117,92,142,0.12)", color: "#755c8e", dot: "#755c8e" },
  legal_review: { label: "LEGAL REVIEW",  bg: "rgba(191,93,123,0.12)", color: "#bf5d7b", dot: "#bf5d7b" },
  approved:     { label: "APPROVED",      bg: "rgba(140,108,195,0.12)", color: "#8c6cc3", dot: "#8c6cc3" },
  signed:       { label: "SIGNED",        bg: "rgba(191,93,123,0.12)", color: "#bf5d7b", dot: "#bf5d7b" },
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
