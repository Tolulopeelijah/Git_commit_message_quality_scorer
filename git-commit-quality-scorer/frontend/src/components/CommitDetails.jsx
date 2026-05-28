import React, { useState } from "react";

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

export default function CommitDetails({ result }) {
  const { author, message, timestamp, additions, deletions, filesChanged, sha, shortSha, owner, repo } = result;
  const [showAllFiles, setShowAllFiles] = useState(false);

  const displayFiles = showAllFiles ? filesChanged : filesChanged.slice(0, 3);
  const hasMore = filesChanged.length > 3;

  return (
    <div className="commit-details-card">
      <div className="commit-details-header">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <line x1="1.05" y1="12" x2="7" y2="12" />
          <line x1="17.01" y1="12" x2="22.96" y2="12" />
        </svg>
        <span>Commit Details</span>
      </div>

      <div className="commit-author-row">
        <img
          src={author.avatar}
          alt={author.name}
          className="commit-avatar"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=6366f1&color=fff`; }}
        />
        <div className="commit-author-info">
          <span className="commit-author-name">{author.name}</span>
          <span className="commit-author-username">@{author.username}</span>
        </div>
        <span className="commit-timestamp">{timeAgo(timestamp)}</span>
      </div>

      <div className="commit-message-block">
        <p className="commit-message">{message}</p>
        <div className="commit-sha-row">
          <span className="commit-sha-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" /><line x1="1.05" y1="12" x2="7" y2="12" /><line x1="17.01" y1="12" x2="22.96" y2="12" />
            </svg>
            {shortSha}
          </span>
          <span className="commit-repo-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {owner}/{repo}
          </span>
        </div>
      </div>

      <div className="commit-diff-stats">
        <div className="diff-stat additions">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{additions} additions</span>
        </div>
        <div className="diff-stat-divider" />
        <div className="diff-stat deletions">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{deletions} deletions</span>
        </div>
        <div className="diff-stat-divider" />
        <div className="diff-stat files">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span>{filesChanged.length} files</span>
        </div>
      </div>

      <div className="files-changed-section">
        <p className="files-changed-label">Files changed</p>
        <div className="files-list">
          {displayFiles.map((file, i) => (
            <div key={i} className="file-item">
              <span className="file-ext-dot" />
              <span className="file-path">{file}</span>
            </div>
          ))}
          {hasMore && (
            <button
              className="show-more-files"
              onClick={() => setShowAllFiles(!showAllFiles)}
            >
              {showAllFiles ? "Show less" : `+${filesChanged.length - 3} more files`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
