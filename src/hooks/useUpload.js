import { useCallback, useState } from "react";
import { uploadDocument } from "../services/documentsApi";

export function useUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(async (file) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      const document = await uploadDocument(file, (event) => {
        if (event.total) {
          setProgress(Math.round((event.loaded * 100) / event.total));
        }
      });
      return document;
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed.");
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, progress, uploading, error };
}
