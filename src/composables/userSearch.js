import { ref } from "vue";
import { useApi } from "./useApi";

export const useSearch = () => {
  const api = useApi();

  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  //Funció que busca per ID
  const searchId = async () => {
    loading.value = true;
    error.value = null;
    results.value = [];

    try {
      const response = await api.get(`/products/${query.value}`);

      if (response.data) {
        results.value = [response.data];
      } else {
        throw "Error carregant dades (ID no vàlid).";
      }
    } catch (e) {
      error.value = e;
    }

    loading.value = false;
  };
  //Funcio que busca per categoria
  const searchByCategory = async (category) => {
    loading.value = true;
    error.value = null;
    results.value = [];

    try {
      const response = await api.get(`/products/category/${category}`);

      results.value = response.data;
    } catch (e) {
      error.value = "Error carregant la categoria.";
    }

    loading.value = false;
  };
  const searchAll = async () => {
    loading.value = true;
    error.value = null;
    results.value = [];

    try {
      //Truquem a la api per obtenir tots els productes
      const response = await api.get("/products");
      results.value = response.data;
    } catch (e) {
      error.value = "Error carregant tots els productes.";
    }
    loading.value = false;
  };

  return {
    query,
    results,
    loading,
    error,
    searchId,
    searchByCategory,
    searchAll,
  };
};
