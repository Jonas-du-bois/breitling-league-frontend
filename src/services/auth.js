import api from './api';

export default {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur (name, email, password, etc.)
   */
  register(userData) {
    return api.post('/register', userData);
  },

  /**
   * Connexion d'un utilisateur
   * @param {Object} credentials - Identifiants (email, password)
   */
  login(credentials) {
    return api.post('/login', credentials);
  },

  /**
   * Déconnexion de l'utilisateur courant
   */
  logout() {
    return api.post('/logout');
  },

  /**
   * Récupère les informations de l'utilisateur connecté
   */
  getUser() {
    return api.get('/me');
  },

  /**
   * Test simple pour vérifier que l'API est accessible
   */
  testApi() {
    return api.get('/test');
  }
};
