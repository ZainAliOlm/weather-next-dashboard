import React from 'react';

// Utils
import { saveFavorite, removeFavorite, getFavorites } from '../utils/storage';

// Icons
import { FaStar, FaRegStar } from 'react-icons/fa';

const WeatherCard = ({ city, weather, onDetails, favorites, setFavorites }) => {
    const isFavorite = getFavorites().includes(city);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(city);
            const updateCities = favorites.filter((item) => item !== city);
            setFavorites(updateCities);
        } else {
            saveFavorite(city);
            setFavorites((prev) => [...prev, city]);
        }
    };

    return (
        <>
            <div className="bg-white shadow rounded p-4 relative">
                <h2 className="text-xl font-bold">{city}</h2>
                <p>{weather?.weather[0]?.description}</p>
                <img
                    src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                    alt={weather?.weather[0]?.description}
                    className="w-16 h-16"
                />
                <p className="text-2xl font-bold">{Math.round(weather?.main?.temp)}°C</p>
                <p>Humidity: {weather?.main?.humidity}%</p>
                <p>Wind: {weather?.wind?.speed} m/s</p>
                <button
                    onClick={toggleFavorite}
                    className="absolute top-2 right-2 text-yellow-500"
                >
                    {isFavorite ? <FaStar /> : <FaRegStar />}
                </button>
                <button
                    onClick={() => onDetails(city)}
                    className="mt-2 bg-blue-500 text-white p-2 rounded-lg text-sm hover:bg-[#4285F4]/90"
                >
                    View Details
                </button>
            </div>
        </>
    );
};

export default WeatherCard;
