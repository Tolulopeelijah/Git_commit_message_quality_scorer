import React from "react";

function timeAgo(isoString) {
  const now = new Date();
  const then = new Date(isoString);
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return then.toLocaleDateString();
}

function scoreColor(score) {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#6366f1";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function HistorySidebar({ history, onSelect, onClear, currentId, open, onClose }) {
  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`history-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Recent Analyses</span>
          </div>
          <div className="sidebar-actions">
            {history.length > 0 && (
              <button className="clear-history-btn" onClick={onClear} title="Clear history">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            )}
            <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sidebar-body">
          {history.length === 0 ? (
            <div className="sidebar-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p>No analyses yet.</p>
              <span>Analyzed commits will appear here.</span>
            </div>
          ) : (
            <ul className="history-list">
              {history.map((item) => {
                const color = scoreColor(item.overallScore);
                const isActive = item.id === currentId;
                return (
                  <li key={item.id}>
                    <button
                      className={`history-item ${isActive ? "active" : ""}`}
                      onClick={() => { onSelect(item); onClose(); }}
                    >
                      <div className="history-item-score" style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                        {item.overallScore}
                      </div>
                      <div className="history-item-info">
                        <span className="history-item-repo">{item.owner}/{item.repo}</span>
                        <span className="history-item-sha">{item.shortSha}</span>
                        <span className="history-item-time">{timeAgo(item.analyzedAt)}</span>
                      </div>
                      <div className="history-item-grade" style={{ color }}>
                        {item.grade}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
