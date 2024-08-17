export const getFavorites = () => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
};

export const saveFavorite = (city) => {
    const favorites = getFavorites();
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

export const removeFavorite = (city) => {
    const favorites = getFavorites().filter((fav) => fav !== city);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
