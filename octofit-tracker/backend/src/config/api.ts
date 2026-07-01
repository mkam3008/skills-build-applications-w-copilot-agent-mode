/**
 * API configuration — resolves base URL for Codespaces and localhost.
 *
 * When CODESPACE_NAME is set (GitHub Codespaces), the public forwarded URL is used.
 * Otherwise falls back to http://localhost:8000.
 */
export const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;

export const BASE_URL = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;
