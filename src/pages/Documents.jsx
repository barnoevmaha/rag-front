import DocumentCard from "../components/DocumentCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useDocumentsContext } from "../context/DocumentsContext.jsx";

export default function Documents() {
  const { documents, loading, error, remove } = useDocumentsContext();

  return (
    <div className="page-section">
      <h2>Documents</h2>
      {loading && <p>Loading documents...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && documents.length === 0 && (
        <EmptyState title="No documents yet" description="Upload a file to see it here." />
      )}
      <div className="document-list">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}
