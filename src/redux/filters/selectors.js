export const selectFavorites = (state) => {
  return Array.isArray(state.favorites) ? state.favorites : [];
};

export const selectIsFavorite = (id) => (state) => {
  const favs = Array.isArray(state.favorites) ? state.favorites : [];
  return favs.some((car) => car.id === id);
};
