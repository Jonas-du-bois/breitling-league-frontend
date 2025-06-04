import axios from 'axios';

// Création d'une instance axios avec l'URL de base de l'API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // Important pour Laravel pour identifier les requêtes AJAX
  },
  withCredentials: false // Important: doit être false car nous utilisons des tokens et non des cookies
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
