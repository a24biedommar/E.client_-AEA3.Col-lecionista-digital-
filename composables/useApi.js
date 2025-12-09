import axios from "axios";
//Configuració de la instància base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

//Definim el composable
export const useApi = () => {
  const get = (url, config = {}) => apiClient.get(url, config);

  const post = (url, body) => apiClient.post(url, body);

  return { get, post };
};
