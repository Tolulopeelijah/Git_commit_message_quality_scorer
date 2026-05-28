const MOCK_AUTHORS = [
  { name: "Alex Chen", username: "alexchen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexchen" },
  { name: "Sarah Kim", username: "sarahkim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahkim" },
  { name: "Marcus Reid", username: "mreid", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mreid" },
  { name: "Priya Patel", username: "priyap", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priyap" },
  { name: "Jordan Lee", username: "jlee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jlee" },
];

const MOCK_MESSAGES = [
  "feat: implement user authentication with OAuth2 and JWT tokens",
  "fix: resolve race condition in async data fetching pipeline",
  "refactor: extract payment processing into dedicated service module",
  "chore: update dependencies and resolve security vulnerabilities",
  "docs: add comprehensive API documentation with usage examples",
  "test: add unit tests for core utility functions with edge cases",
  "perf: optimize database query performance using proper indexing",
  "style: apply consistent code formatting across all modules",
];

const MOCK_FILES = [
  ["src/auth/oauth.js", "src/middleware/jwt.js", "src/routes/auth.js"],
  ["src/api/fetch.js", "src/hooks/useData.js"],
  ["src/payments/stripe.js", "src/payments/index.js", "src/services/billing.js"],
  ["package.json", "package-lock.json", ".npmrc"],
  ["docs/api.md", "docs/getting-started.md", "README.md"],
  ["src/__tests__/utils.test.js", "src/__tests__/helpers.test.js"],
  ["src/db/queries.js", "src/db/schema.js", "migrations/001_index.sql"],
  [".eslintrc.js", "prettier.config.js", "src/utils/format.js"],
];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMetrics(overallScore) {
  const base = overallScore;
  const variance = () => Math.min(100, Math.max(0, base + randomBetween(-15, 15)));

  return [
    {
      id: "message_clarity",
      label: "Message Clarity",
      score: variance(),
      description: "How well the commit message describes the change",
      icon: "MessageSquare",
    },
    {
      id: "code_quality",
      label: "Code Quality",
      score: variance(),
      description: "Structural quality and readability of the diff",
      icon: "Code2",
    },
    {
      id: "change_scope",
      label: "Change Scope",
      score: variance(),
      description: "Appropriateness of the change size for one commit",
      icon: "GitCommit",
    },
    {
      id: "test_coverage",
      label: "Test Coverage",
      score: variance(),
      description: "Estimated test coverage impact of the change",
      icon: "TestTube",
    },
    {
      id: "breaking_risk",
      label: "Breaking Risk",
      score: variance(),
      description: "Likelihood this commit introduces breaking changes",
      icon: "ShieldAlert",
    },
    {
      id: "documentation",
      label: "Documentation",
      score: variance(),
      description: "Quality and completeness of inline documentation",
      icon: "BookOpen",
    },
  ];
}

function parseRepoInfo(input) {
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/github\.com\/([^/]+)\/([^/\s]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, "") };
  }
  const parts = trimmed.split("/");
  if (parts.length >= 2) {
    return { owner: parts[0], repo: parts[1] };
  }
  return { owner: "unknown", repo: trimmed };
}

export async function analyzeCommit(repoUrl, commitSha = null) {
  await new Promise((resolve) => setTimeout(resolve, 1800 + randomBetween(0, 800)));

  const { owner, repo } = parseRepoInfo(repoUrl);
  const authorIdx = randomBetween(0, MOCK_AUTHORS.length - 1);
  const msgIdx = randomBetween(0, MOCK_MESSAGES.length - 1);
  const filesIdx = randomBetween(0, MOCK_FILES.length - 1);

  const overallScore = randomBetween(38, 97);
  const sha = commitSha || Math.random().toString(16).slice(2, 9);
  const additions = randomBetween(5, 340);
  const deletions = randomBetween(0, Math.floor(additions * 0.7));
  const daysAgo = randomBetween(0, 30);
  const timestamp = new Date(Date.now() - daysAgo * 86400000).toISOString();

  const grade =
    overallScore >= 90 ? "A+" :
    overallScore >= 80 ? "A" :
    overallScore >= 70 ? "B" :
    overallScore >= 60 ? "C" :
    overallScore >= 50 ? "D" : "F";

  return {
    id: crypto.randomUUID(),
    repoUrl,
    owner,
    repo,
    sha,
    shortSha: sha.slice(0, 7),
    author: MOCK_AUTHORS[authorIdx],
    message: MOCK_MESSAGES[msgIdx],
    timestamp,
    additions,
    deletions,
    filesChanged: MOCK_FILES[filesIdx],
    overallScore,
    grade,
    metrics: generateMetrics(overallScore),
    analyzedAt: new Date().toISOString(),
  };
}
