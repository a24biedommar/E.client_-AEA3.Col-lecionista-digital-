import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//1. FUNCIO QUE RETORNA ELS PRODUCTES PER ID
export function getProductByID(id) {
  return api.get(`/products/${id}`);
}
//2. FUNCIO QUE RETORNA TOTS ELS PRODUCTES
export function getAllProducts() {
  return api.get("/products");
}

//3. FUNCIO QUE RETORNA ELS PRODUCTES PER CATEGORIA
export function getProductsByCategory(category) {
  return api.get(`/products/category/${category}`);
}
