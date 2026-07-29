import { useEffect, useState } from "react";
import { getSettings } from "../services/settingsApi";
import { formatBytes } from "../utils/formatters";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setError("Could not load settings from the backend."));
  }, []);

  if (error) return <p className="page-section form-error">{error}</p>;
  if (!settings) return <p className="page-section">Loading settings...</p>;

  const rows = [
    ["Embedding model", settings.embedding_model],
    ["Chat model", settings.chat_model],
    ["Chunk size", `${settings.chunk_size} characters`],
    ["Chunk overlap", `${settings.chunk_overlap} characters`],
    ["Chunks retrieved per question (top_k)", settings.top_k],
    ["Generation temperature", settings.temperature],
    ["Max upload size", formatBytes(settings.max_upload_size)],
    ["Supported file types", settings.supported_extensions.join(", ")],
  ];

  return (
    <div className="page-section">
      <h2>Settings</h2>
      <p className="settings-note">
        These values are configured on the backend via environment variables and shown here
        read-only.
      </p>
      <table className="settings-table">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <th>{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
