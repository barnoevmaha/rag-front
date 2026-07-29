import { useEffect, useRef, useState } from "react";
import Button from "../components/Button.jsx";
import EmptyState from "../components/EmptyState.jsx";
import MessageBubble from "../components/MessageBubble.jsx";
import TypingIndicator from "../components/TypingIndicator.jsx";
import { useChat } from "../hooks/useChat";
import { useDocumentsContext } from "../context/DocumentsContext.jsx";

export default function Chat() {
  const { documents, loading } = useDocumentsContext();
  const readyDocuments = documents.filter((doc) => doc.status === "ready");

  const [documentId, setDocumentId] = useState("");
  const [input, setInput] = useState("");
  const { messages, send, asking, clear } = useChat(documentId);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!documentId && readyDocuments.length > 0) {
      setDocumentId(readyDocuments[0].id);
    }
  }, [readyDocuments, documentId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, asking]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim() || asking) return;
    send(input);
    setInput("");
  };

  if (loading) return <p className="page-section">Loading documents...</p>;

  if (readyDocuments.length === 0) {
    return (
      <div className="page-section">
        <EmptyState
          title="No documents ready to chat with"
          description="Upload a document and wait for it to finish indexing first."
        />
      </div>
    );
  }

  return (
    <div className="chat-page">
      <div className="chat-toolbar">
        <select value={documentId} onChange={(e) => setDocumentId(e.target.value)}>
          {readyDocuments.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.filename}
            </option>
          ))}
        </select>
        <Button variant="secondary" onClick={clear} disabled={messages.length === 0}>
          Clear chat
        </Button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <EmptyState title="Ask a question" description="Answers come only from the selected document." />
        )}
        {messages.map((message, idx) => (
          <MessageBubble key={idx} message={message} />
        ))}
        {asking && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>

      <form className="chat-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this document..."
          disabled={asking}
        />
        <Button type="submit" disabled={asking || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
