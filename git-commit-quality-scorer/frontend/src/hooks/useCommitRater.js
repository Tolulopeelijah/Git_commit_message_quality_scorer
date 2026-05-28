import { useState, useCallback } from "react";
import { analyzeCommit } from "../services/mockApi";

const HISTORY_KEY = "gcr_history";
const MAX_HISTORY = 10;

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
  }
}

export function useCommitRater() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  const analyze = useCallback(async (repoUrl, commitSha) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeCommit(repoUrl, commitSha);
      setResult(data);

      setHistory((prev) => {
        const filtered = prev.filter((h) => h.id !== data.id);
        const updated = [data, ...filtered].slice(0, MAX_HISTORY);
        saveHistory(updated);
        return updated;
      });
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  const loadFromHistory = useCallback((item) => {
    setResult(item);
    setError(null);
  }, []);

  return { result, loading, error, history, analyze, clearHistory, loadFromHistory };
}
