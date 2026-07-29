import axios from "axios";

// Every request goes through /api, which vite.config.js proxies to the
// backend in dev. This is the only file that knows that detail - callers
// just import from documentsApi.js / chatApi.js / settingsApi.js.
const api = axios.create({
  baseURL: "/api",
  timeout: 60000,
});

export default api;
