import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CommitInput from "./components/CommitInput";
import ScoreRing from "./components/ScoreRing";
import MetricCard from "./components/MetricCard";
import CommitDetails from "./components/CommitDetails";
import HistorySidebar from "./components/HistorySidebar";
import LoadingState from "./components/LoadingState";
import { useCommitRater } from "./hooks/useCommitRater";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("gcr_theme") || "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { result, loading, error, history, analyze, clearHistory, loadFromHistory } = useCommitRater();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gcr_theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  const summaryText = result
    ? result.overallScore >= 85
      ? "Excellent commit — well-structured and clear."
      : result.overallScore >= 70
      ? "Good commit with minor improvements possible."
      : result.overallScore >= 50
      ? "Needs improvement in several areas."
      : "Poor commit quality — significant issues detected."
    : null;

  return (
    <div className="app">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <button
        id="history-btn"
        className="history-fab"
        onClick={() => setSidebarOpen(true)}
        aria-label="View history"
        title="View recent analyses"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {history.length > 0 && (
          <span className="history-fab-badge">{history.length}</span>
        )}
      </button>

      <HistorySidebar
        history={history}
        onSelect={loadFromHistory}
        onClear={clearHistory}
        currentId={result?.id}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-content">
        <CommitInput onAnalyze={analyze} loading={loading} />

        {loading && <LoadingState />}

        {error && !loading && (
          <div className="error-banner" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {result && !loading && (
          <div className="results-section animate-in">
            <div className="results-hero">
              <div className="results-hero-left">
                <ScoreRing score={result.overallScore} grade={result.grade} />
                <div className="score-summary">
                  <h2 className="score-title">Overall Score</h2>
                  <p className="score-summary-text">{summaryText}</p>
                  <div className="score-meta">
                    <span className="score-meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Analyzed {new Date(result.analyzedAt).toLocaleTimeString()}
                    </span>
                    <span className="score-meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="4" />
                        <line x1="1.05" y1="12" x2="7" y2="12" />
                        <line x1="17.01" y1="12" x2="22.96" y2="12" />
                      </svg>
                      {result.shortSha}
                    </span>
                  </div>
                </div>
              </div>

              <CommitDetails result={result} />
            </div>

            <div className="metrics-section">
              <h3 className="section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Metric Breakdown
              </h3>
              <div className="metrics-grid">
                {result.metrics.map((metric, i) => (
                  <MetricCard key={metric.id} metric={metric} index={i} />
                ))}
              </div>
            </div>

            <div className="results-footer">
              <button
                className="reanalyze-btn"
                onClick={() => analyze(result.repoUrl, null)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                </svg>
                Re-analyze
              </button>
            </div>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="empty-state">
            <div className="empty-state-visual">
              <div className="empty-orb" />
              <svg className="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
            </div>
            <h2 className="empty-title">Ready to Rate</h2>
            <p className="empty-subtitle">
              Enter a GitHub repository above to get an AI-powered quality score for its latest commit.
            </p>
            <div className="empty-features">
              {[
                { icon: "⚡", text: "Instant ML analysis" },
                { icon: "📊", text: "6 quality metrics" },
                { icon: "📝", text: "Detailed breakdown" },
                { icon: "🕐", text: "Analysis history" },
              ].map((f) => (
                <div key={f.text} className="empty-feature-chip">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
