import { useCallback, useEffect, useState } from "react";
import { deleteDocument, listDocuments } from "../services/documentsApi";

export function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const docs = await listDocuments();
      setDocuments(docs);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const remove = useCallback(async (documentId) => {
    await deleteDocument(documentId);
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  }, []);

  return { documents, loading, error, refresh, remove };
}
