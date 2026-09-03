import { useState, useEffect } from "react";

interface CountdownProps {
  endDate: string;
  large?: boolean;
}

export default function Countdown({ endDate, large = false }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  if (large) {
    return (
      <div className="flex items-center gap-3 sm:gap-5">
        {[
          { value: timeLeft.days, label: "DAYS" },
          { value: timeLeft.hours, label: "HOURS" },
          { value: timeLeft.minutes, label: "MINUTES" },
          { value: timeLeft.seconds, label: "SECONDS" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-start gap-3 sm:gap-5">
            {i > 0 && <span style={{ color: "#8c6cc3", fontSize: 28, fontFamily: "var(--font-mono)", lineHeight: "1", marginTop: 4 }}>:</span>}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-xl px-3 sm:px-5 py-3 sm:py-4"
                style={{ background: "rgba(140,108,195,0.12)", border: "1px solid rgba(140,108,195,0.28)", minWidth: 64 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700, color: "#fbfbfa", lineHeight: 1 }}>
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span style={{ color: "rgba(251,251,250,0.68)", fontSize: 10, letterSpacing: "0.12em", marginTop: 6, fontFamily: "var(--font-mono)" }}>{label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <span style={{ fontFamily: "var(--font-mono)", color: "#fbfbfa", fontSize: 13 }}>
      {String(timeLeft.days).padStart(2, "0")}d {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
    </span>
  );
}
