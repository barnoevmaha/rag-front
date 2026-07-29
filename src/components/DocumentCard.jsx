import Button from "./Button.jsx";
import StatusBadge from "./StatusBadge.jsx";
import { formatBytes, formatDate } from "../utils/formatters";

export default function DocumentCard({ document, onDelete }) {
  return (
    <div className="document-card">
      <div className="document-card-main">
        <span className="document-card-name">{document.filename}</span>
        <span className="document-card-meta">
          {formatBytes(document.size_bytes)} &middot; {document.chunk_count} chunks &middot;{" "}
          {formatDate(document.uploaded_at)}
        </span>
        {document.status === "failed" && document.error_message && (
          <span className="document-card-error">{document.error_message}</span>
        )}
      </div>
      <div className="document-card-actions">
        <StatusBadge status={document.status} />
        <Button variant="danger" onClick={() => onDelete(document.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
