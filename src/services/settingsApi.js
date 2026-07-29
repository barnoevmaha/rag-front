import api from "./api";

export async function getSettings() {
  const response = await api.get("/settings");
  return response.data;
}
