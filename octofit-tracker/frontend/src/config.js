// VITE_CODESPACE_NAME must be defined in .env.local when running in GitHub Codespaces.
// Example .env.local entry:
//   VITE_CODESPACE_NAME=your-codespace-name
// Leave unset (or empty) to use localhost.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Guard against the `https://undefined-8000...` problem: only use the
// Codespaces URL when VITE_CODESPACE_NAME is a non-empty string.
const BASE_URL =
  codespaceName && codespaceName !== 'undefined'
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

export default BASE_URL;
