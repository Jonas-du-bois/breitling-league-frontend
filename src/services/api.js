import axios from 'axios';

// Création d'une instance axios avec l'URL de base de l'API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000, // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest' // Important pour Laravel pour identifier les requêtes AJAX
  },
  withCredentials: false // Important: doit être false car nous utilisons des tokens et non des cookies
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = token; 
      console.log('🔑 Token ajouté à la requête:', token);
    } else {
      console.warn('⚠️ Aucun token d\'authentification trouvé');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use(
  (response) => {
    // Retourner directement la réponse si tout va bien
    return response;
  },
  (error) => {
    // Gestion centralisée des erreurs
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      const { status, data } = error.response;
      
      switch (status) {        case 401:
          // Token expiré ou invalide
          console.warn('Session expirée. Redirection vers la page de connexion.');
          localStorage.removeItem('auth_token'); // Correction: utiliser 'auth_token' au lieu de 'token'
          // Éviter la redirection automatique ici pour laisser le composant gérer
          break;
          
        case 403:
          console.error('Accès interdit. Permissions insuffisantes.');
          break;
          
        case 404:
          console.error('Ressource non trouvée.');
          break;
          
        case 422:
          // Erreurs de validation Laravel
          console.error('Erreurs de validation:', data.errors || data.message);
          break;
          
        case 429:
          console.error('Trop de requêtes. Veuillez patienter.');
          break;
          
        case 500:
          console.error('Erreur serveur interne.');
          break;
          
        default:
          console.error(`Erreur ${status}:`, data.message || 'Une erreur est survenue.');
      }
    } else if (error.request) {
      // La requête a été envoyée mais aucune réponse n'a été reçue
      console.error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
