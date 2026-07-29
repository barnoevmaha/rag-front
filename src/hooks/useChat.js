import { useCallback, useState } from "react";
import { askQuestion } from "../services/chatApi";

export function useChat(documentId) {
  const [messages, setMessages] = useState([]);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(
    async (question) => {
      if (!documentId || !question.trim()) return;
      setError(null);
      setMessages((prev) => [...prev, { role: "user", text: question }]);
      setAsking(true);
      try {
        const result = await askQuestion(documentId, question);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: result.answer, sources: result.sources },
        ]);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong.");
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Sorry, something went wrong answering that.", isError: true },
        ]);
      } finally {
        setAsking(false);
      }
    },
    [documentId]
  );

  const clear = useCallback(() => setMessages([]), []);

  return { messages, send, asking, error, clear };
}
