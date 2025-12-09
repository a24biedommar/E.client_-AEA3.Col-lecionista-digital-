//Fem que la constant useFavoritesStore sigui una botiga de Pinia i exportable
export const useFavoritesStore = defineStore("favorites", () => {
  // 1.Declarem la varaiable favourites com a ref perquè sigui reactiva (inicialment buida)
  const favorites = ref([]);

  // 2. Creem una funció per afegir un favorit
  function addFavorite(item) {
    // Cridem a la funcio isFavorite per comprovar si l'item ja existeix a la llista de favorits
    const exists = isFavorite(item.id);

    //Si no existeix, l'afegim a la llista de favorits (fent un push)
    if (!exists) {
      favorites.value.push(item);
    }
  }

  // 3. Funció per eliminar un favorit
  function removeFavorite(itemId) {
    //Utilizem un filter per crear una nova llista de favorits sense l'item que volem eliminar (filtrant per id)
    favorites.value = favorites.value.filter((fav) => fav.id !== itemId);
  }

  // 4. Funció per comprovar si un item és favorit, ho comprovem amb el mètode some (per comprovar si existeix a la llista)
  function isFavorite(itemId) {
    return favorites.value.some((fav) => fav.id === itemId);
  }

  // Retornem tot el que volem fer accessible des de fora de la botiga
  return { favorites, addFavorite, removeFavorite, isFavorite };
});
