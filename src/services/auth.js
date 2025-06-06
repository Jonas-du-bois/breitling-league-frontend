import api from '@/services/api';

/**
 * Service pour gérer l'authentification des utilisateurs
 */
export default {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur (name, email, password, etc.)
   * @returns {Promise} Promesse contenant la réponse d'inscription
   */
  register(userData) {
    return api.post('/register', userData);
  },

  /**
   * Connexion d'un utilisateur
   * @param {Object} credentials - Identifiants (email, password)
   * @returns {Promise} Promesse contenant les données de connexion et le token
   */
  login(credentials) {
    return api.post('/login', credentials);
  },

  /**
   * Récupère les données de l'utilisateur connecté
   * @returns {Promise} Promesse contenant les données utilisateur
   */
  getMe() {
    return api.get('/me');
  },

  /**
   * Déconnexion de l'utilisateur courant (révocation du token actuel)
   * @returns {Promise} Promesse de déconnexion
   */
  logout() {
    return api.post('/logout');
  },

  /**
   * Déconnexion de tous les appareils (révocation de tous les tokens)
   * @returns {Promise} Promesse de déconnexion complète
   */
  logoutAll() {
    return api.post('/logout-all');
  },

  /**
   * Vérifie si l'utilisateur est connecté en vérifiant la présence du token
   * @returns {boolean} True si l'utilisateur est connecté
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Stocke le token d'authentification
   * @param {string} token - Token d'authentification
   */
  setToken(token) {
    localStorage.setItem('token', token);
  },

  /**
   * Supprime le token d'authentification
   */
  removeToken() {
    localStorage.removeItem('token');
  },

  /**
   * Récupère le token d'authentification stocké
   * @returns {string|null} Token d'authentification ou null
   */
  getToken() {
    return localStorage.getItem('token');
  }
};
