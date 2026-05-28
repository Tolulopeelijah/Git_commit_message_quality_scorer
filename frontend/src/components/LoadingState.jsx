import React from "react";

function SkeletonBlock({ width = "100%", height = "16px", borderRadius = "6px", style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

export default function LoadingState() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="neural-animation">
          <div className="neural-ring neural-ring-1" />
          <div className="neural-ring neural-ring-2" />
          <div className="neural-ring neural-ring-3" />
          <div className="neural-core">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>

        <div className="loading-text">
          <h3>Model is analyzing<span className="typing-dots"><span>.</span><span>.</span><span>.</span></span></h3>
          <p>Running commit through the AI pipeline</p>
        </div>

        <div className="loading-steps">
          {[
            { label: "Fetching commit data", delay: 0 },
            { label: "Parsing diff semantics", delay: 400 },
            { label: "Running ML inference", delay: 800 },
            { label: "Scoring metrics", delay: 1200 },
          ].map((step, i) => (
            <div key={i} className="loading-step" style={{ animationDelay: `${step.delay}ms` }}>
              <div className="step-indicator" />
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="skeleton-results">
        <div className="skeleton-score-area">
          <SkeletonBlock width="180px" height="180px" borderRadius="50%" />
        </div>
        <div className="skeleton-metrics">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-metric-card">
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "12px" }}>
                <SkeletonBlock width="28px" height="28px" borderRadius="8px" />
                <SkeletonBlock width="100px" height="14px" />
              </div>
              <SkeletonBlock width="60px" height="28px" style={{ marginBottom: "10px" }} />
              <SkeletonBlock width="100%" height="6px" borderRadius="3px" />
              <SkeletonBlock width="80%" height="12px" style={{ marginTop: "10px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
