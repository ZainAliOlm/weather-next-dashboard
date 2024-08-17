"use client";
import React, { useState, useEffect } from 'react';

// Components
import CitySearch from './components/CitySearch';
import WeatherCard from './components/WeatherCard';
import WeatherDetailsModal from './components/WeatherDetailsModal';

// Actions
import { fetchWeather, fetchForecast } from './services/weather';

// Utils
import { getFavorites } from './utils/storage';

const predefinedCities = ['Dubai', 'New York', 'London', 'Tokyo', 'Sydney'];

const Home = () => {
    const [weatherData, setWeatherData] = useState({});
    const [favorites, setFavorites] = useState(getFavorites());
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        const normalizeCities = favorites.filter((city) => !predefinedCities.includes(city));
        normalizeCities ? predefinedCities.push(...normalizeCities) : undefined;
        predefinedCities.forEach(async (city) => {
            const data = await fetchWeather(city);
            setWeatherData((prevState) => ({ ...prevState, [city]: data }));
        });

    }, []);

    const handleSearch = (city, data) => {
        predefinedCities.unshift(city);
        setWeatherData((prevState) => ({ ...prevState, [city]: data }));
    };


    const handleDetails = async (city) => {
        const data = await fetchForecast(city);
        setModalData({ city, data });
    };

    const closeDetails = () => {
        setModalData(null);
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Weather Dashboard</h1>
            <CitySearch onSearch={handleSearch} />

            <section className="my-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Favorite Cities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites?.map((city) => (
                        <WeatherCard
                            key={city}
                            city={city}
                            weather={weatherData[city]}
                            onDetails={handleDetails}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    ))}
                </div>
            </section>

            <section className="my-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Other Cities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {predefinedCities?.filter((city) => !favorites.includes(city)).map((city) => (
                        <WeatherCard
                            key={city}
                            city={city}
                            weather={weatherData[city]}
                            onDetails={handleDetails}
                            favorites={favorites}
                            setFavorites={setFavorites}
                        />
                    ))}
                </div>
            </section>

            {modalData && (
                <WeatherDetailsModal
                    city={modalData.city}
                    forecast={modalData.data}
                    onClose={closeDetails}
                />
            )}
        </div>
    )
}

export default Home;