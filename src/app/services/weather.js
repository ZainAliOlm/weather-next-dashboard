// Third Party Library
import axios from 'axios';

// Utils
import { API_KEY, BASE_URL } from '../utils/constant';


export const fetchWeather = async (city) => {
    const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
        },
    });
    return response.data;
};

export const fetchForecast = async (city) => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
        },
    });
    return response.data;
};
