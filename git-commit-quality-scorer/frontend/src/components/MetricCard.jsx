import React from "react";

const ICONS = {
  MessageSquare: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  Code2: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  GitCommit: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="1.05" y1="12" x2="7" y2="12" />
      <line x1="17.01" y1="12" x2="22.96" y2="12" />
    </svg>
  ),
  TestTube: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0l-2 5h10l-2-5M9 14h6" />
    </svg>
  ),
  ShieldAlert: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  BookOpen: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
};

function getScoreColor(score) {
  if (score >= 85) return { color: "#10b981", bg: "#10b98112", label: "excellent" };
  if (score >= 70) return { color: "#6366f1", bg: "#6366f112", label: "good" };
  if (score >= 50) return { color: "#f59e0b", bg: "#f59e0b12", label: "fair" };
  return { color: "#ef4444", bg: "#ef444412", label: "poor" };
}

export default function MetricCard({ metric, index }) {
  const { score, label, description, icon } = metric;
  const { color, bg, label: qualityLabel } = getScoreColor(score);

  return (
    <div
      className="metric-card"
      style={{
        "--accent": color,
        "--accent-bg": bg,
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="metric-card-header">
        <div className="metric-icon" style={{ color }}>
          {ICONS[icon]}
        </div>
        <span className="metric-label">{label}</span>
        <span className={`metric-quality-badge quality-${qualityLabel}`} style={{ color, background: bg }}>
          {qualityLabel}
        </span>
      </div>

      <div className="metric-score-row">
        <span className="metric-score-number" style={{ color }}>{score}</span>
        <span className="metric-score-max">/100</span>
      </div>

      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>

      <p className="metric-description">{description}</p>
    </div>
  );
}
