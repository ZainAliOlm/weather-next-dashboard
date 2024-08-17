import React, { useState } from 'react';

// Actions
import { fetchWeather } from '../services/weather';

const CitySearch = ({ onSearch }) => {
    const [search, setSearchy] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search) {
            const data = await fetchWeather(search);
            onSearch(search, data);
            setSearchy('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center mb-4">
            <input
                type="text"
                className="border p-2 rounded mr-2"
                value={search}
                onChange={(e) => setSearchy(e.target.value)}
                placeholder="Search for a city"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                Search
            </button>
        </form>
    );
};

export default CitySearch;
