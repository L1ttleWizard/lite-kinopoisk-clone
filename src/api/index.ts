import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;

if (!API_KEY) {
    throw new Error('VITE_KINOPOISK_API_KEY не найден в .env файле!');
}

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'X-API-KEY': API_KEY,
    },
});