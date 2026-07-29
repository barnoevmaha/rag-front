import { createContext, useContext } from "react";
import { useDocuments } from "../hooks/useDocuments";

// Shared document list so the Upload, Documents, and Chat pages don't each
// fetch and cache their own copy - one source of truth, refreshed via
// context.refresh() after an upload or delete.
const DocumentsContext = createContext(null);

export function DocumentsProvider({ children }) {
  const value = useDocuments();
  return <DocumentsContext.Provider value={value}>{children}</DocumentsContext.Provider>;
}

export function useDocumentsContext() {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocumentsContext must be used within a DocumentsProvider");
  }
  return context;
}
