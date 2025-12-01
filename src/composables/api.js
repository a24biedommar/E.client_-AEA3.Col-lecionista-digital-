import axios from "axios";

// 1. Configuración de la instancia base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 2. Definición del Composable
export const useApi = () => {
  const get = (url, config = {}) => apiClient.get(url, config);

  const post = (url, body) => apiClient.post(url, body);

  return { get, post };
};
