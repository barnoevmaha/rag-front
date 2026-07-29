import api from "./api";

export async function askQuestion(documentId, question) {
  const response = await api.post("/chat", { document_id: documentId, question });
  return response.data;
}
