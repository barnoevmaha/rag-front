import { useState } from "react";
import Dropzone from "../components/Dropzone.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useUpload } from "../hooks/useUpload";
import { useDocumentsContext } from "../context/DocumentsContext.jsx";

export default function Upload() {
  const { upload, progress, uploading, error } = useUpload();
  const { documents, loading, refresh, remove } = useDocumentsContext();
  const [localError, setLocalError] = useState(null);

  const handleFileSelected = async (file) => {
    setLocalError(null);
    try {
      await upload(file);
      await refresh();
    } catch {
      setLocalError("Could not upload that file. Check the type and size and try again.");
    }
  };

  const handleDelete = async (documentId) => {
    await remove(documentId);
  };

  return (
    <div className="page-section">
      <h2>Upload a document</h2>
      <Dropzone onFileSelected={handleFileSelected} disabled={uploading} accept=".pdf,.docx,.txt" />

      {uploading && <ProgressBar percent={progress} />}
      {(error || localError) && <p className="form-error">{error || localError}</p>}

      <h3>Your documents</h3>
      {loading ? (
        <p>Loading documents...</p>
      ) : documents.length === 0 ? (
        <EmptyState title="No documents yet" description="Upload a file above to get started." />
      ) : (
        <div className="document-list">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
