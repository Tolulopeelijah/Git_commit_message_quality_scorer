import React, { useEffect, useRef, useState } from "react";

function getScoreColor(score) {
  if (score >= 85) return { stroke: "#10b981", glow: "#10b98140", grade: "excellent" };
  if (score >= 70) return { stroke: "#6366f1", glow: "#6366f140", grade: "good" };
  if (score >= 50) return { stroke: "#f59e0b", glow: "#f59e0b40", grade: "fair" };
  return { stroke: "#ef4444", glow: "#ef444440", grade: "poor" };
}

export default function ScoreRing({ score, grade, animated = true }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const animRef = useRef(null);

  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const { stroke, glow, grade: gradeLabel } = getScoreColor(score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      setProgress(score / 100);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(eased * score));
      setProgress(eased * (score / 100));
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [score, animated]);

  const dashOffset = circumference * (1 - progress);

  return (
    <div className="score-ring-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="score-ring-svg"
        style={{ filter: `drop-shadow(0 0 20px ${glow})` }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--ring-track)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke 0.3s" }}
        />
      </svg>

      <div className="score-ring-center">
        <span className="score-number" style={{ color: stroke }}>
          {displayScore}
        </span>
        <span className="score-label">/ 100</span>
        <span className={`score-grade grade-${gradeLabel}`} style={{ color: stroke }}>
          {grade}
        </span>
      </div>
    </div>
  );
}
