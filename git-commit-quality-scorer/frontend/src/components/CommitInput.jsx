import React, { useState } from "react";

function isValidInput(value) {
  const v = value.trim();
  if (!v) return false;
  return (
    v.includes("github.com") ||
    /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/.test(v)
  );
}

export default function CommitInput({ onAnalyze, loading }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [commitSha, setCommitSha] = useState("");
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const valid = isValidInput(repoUrl);
  const showError = touched && !valid && repoUrl.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!valid || loading) return;
    onAnalyze(repoUrl.trim(), commitSha.trim() || null);
  }

  const placeholders = [
    "https://github.com/owner/repo",
    "owner/repository",
    "https://github.com/vercel/next.js",
  ];
  const [placeholderIdx] = useState(() => Math.floor(Math.random() * placeholders.length));

  return (
    <div className="input-section">
      <div className="input-section-header">
        <h1 className="hero-title">
          Rate Any GitHub <span className="gradient-text">Commit</span>
        </h1>
        <p className="hero-subtitle">
          Powered by ML — get instant quality scores, metrics, and insights for any commit.
        </p>
      </div>

      <form className="commit-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="repo-url-input">
            Repository URL or Owner/Repo
          </label>
          <div className={`input-wrapper ${focused ? "focused" : ""} ${showError ? "error" : ""}`}>
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </span>
            <input
              id="repo-url-input"
              type="text"
              className="form-input"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => { setFocused(false); setTouched(true); }}
              placeholder={placeholders[placeholderIdx]}
              disabled={loading}
              autoComplete="off"
              spellCheck="false"
            />
            {valid && (
              <span className="input-valid-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </div>
          {showError && (
            <p className="form-error">
              Enter a valid GitHub URL (e.g. github.com/owner/repo) or owner/repo format.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label optional" htmlFor="commit-sha-input">
            Commit SHA <span className="optional-tag">optional</span>
          </label>
          <div className={`input-wrapper mono`}>
            <span className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <line x1="3" y1="12" x2="9" y2="12" />
                <line x1="15" y1="12" x2="21" y2="12" />
              </svg>
            </span>
            <input
              id="commit-sha-input"
              type="text"
              className="form-input mono-input"
              value={commitSha}
              onChange={(e) => setCommitSha(e.target.value)}
              placeholder="e.g. a1b2c3d (leave blank for latest)"
              disabled={loading}
              maxLength={40}
              spellCheck="false"
            />
          </div>
        </div>

        <button
          id="analyze-btn"
          type="submit"
          className={`analyze-btn ${loading ? "loading" : ""} ${valid ? "ready" : ""}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Analyzing with AI…
            </>
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Analyze Commit
            </>
          )}
        </button>
      </form>

      <div className="example-repos">
        <span className="examples-label">Try an example:</span>
        {[
          { label: "facebook/react", url: "https://github.com/facebook/react" },
          { label: "vercel/next.js", url: "https://github.com/vercel/next.js" },
          { label: "microsoft/vscode", url: "https://github.com/microsoft/vscode" },
        ].map((ex) => (
          <button
            key={ex.label}
            className="example-chip"
            onClick={() => setRepoUrl(ex.url)}
            disabled={loading}
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
