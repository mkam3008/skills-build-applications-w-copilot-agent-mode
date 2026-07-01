const codespaceName = import.meta.env.VITE_CODESPACE_NAME || '';

const BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default BASE_URL;
