import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_SERVER_URL}`;
axios.defaults.baseURL = BASE_URL;

const apiClient = axios.create({});

export default apiClient;
