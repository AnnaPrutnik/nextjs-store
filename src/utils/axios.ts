import axios from 'axios';

const BASE_URL = process.env.SERVER_URL;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;

// baseURL: 'http://localhost:3000/',
