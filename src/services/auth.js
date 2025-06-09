import api from '@/services/api';

/**
 * Configuration des constantes d'authentification
 */
const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  TOKEN_PREFIX: 'Bearer',
  DEMO_TOKEN: '2|QPzKqmaXBMlxX5yFf8JwNNdJEEHSpeum57Tb536R45e4fe14'
};

/**
 * Service pour gérer l'authentification des utilisateurs
 * Respecte les principes SOLID et Clean Code
 */
class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur (name, email, password, etc.)
   * @returns {Promise<Object>} Promesse contenant la réponse d'inscription
   * @throws {Error} En cas d'erreur d'inscription
   */
  async register(userData) {
    try {
      const response = await api.post('/register', userData);
      return this._handleAuthResponse(response);
    } catch (error) {
      throw this._handleAuthError(error, 'Erreur lors de l\'inscription');
    }
  }

  /**
   * Connexion d'un utilisateur
   * @param {Object} credentials - Identifiants (email, password)
   * @returns {Promise<Object>} Promesse contenant les données de connexion et le token
   * @throws {Error} En cas d'erreur de connexion
   */
  async login(credentials) {
    try {
      this._validateCredentials(credentials);
      
      console.log('🔐 Tentative de connexion pour:', credentials.email);
      
      const response = await api.post('/login', credentials);
      
      console.log('✅ Réponse de connexion reçue');
      
      return this._handleAuthResponse(response);
    } catch (error) {
      throw this._handleAuthError(error, 'Erreur de connexion');
    }
  }

  /**
   * Traite la réponse d'authentification et stocke le token
   * @private
   * @param {Object} response - Réponse de l'API
   * @returns {Object} Données de réponse normalisées
   */
  _handleAuthResponse(response) {
    const { data } = response;
    
    // Laravel Sanctum retourne 'access_token', pas 'token'
    const accessToken = data.access_token || data.token;
    
    if (!accessToken) {
      throw new Error('Token d\'accès manquant dans la réponse');
    }
    
    const formattedToken = this._formatToken(accessToken);
    this.setToken(formattedToken);
    
    console.log('💾 Token sauvegardé avec succès');
    
    return {
      ...data,
      token: formattedToken,
      user: data.user
    };
  }

  /**
   * Formate le token avec le préfixe Bearer si nécessaire
   * @private
   * @param {string} token - Token brut
   * @returns {string} Token formaté
   */
  _formatToken(token) {
    if (token.startsWith(AUTH_CONFIG.TOKEN_PREFIX)) {
      return token;
    }
    return `${AUTH_CONFIG.TOKEN_PREFIX} ${token}`;
  }

  /**
   * Valide les credentials avant envoi
   * @private
   * @param {Object} credentials - Identifiants à valider
   * @throws {Error} Si les credentials sont invalides
   */
  _validateCredentials(credentials) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new Error('Email et mot de passe requis');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Format d\'email invalide');
    }
  }

  /**
   * Gère les erreurs d'authentification
   * @private
   * @param {Error} error - Erreur originale
   * @param {string} defaultMessage - Message par défaut
   * @returns {Error} Erreur formatée
   */
  _handleAuthError(error, defaultMessage) {
    console.error('❌', defaultMessage, ':', error.response?.data || error.message);
    
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0];
        return new Error(Array.isArray(firstError) ? firstError[0] : firstError);
      }
    }
    
    return new Error(error.message || defaultMessage);
  }

  /**
   * Récupère les données de l'utilisateur connecté
   * @returns {Promise<Object>} Promesse contenant les données utilisateur
   * @throws {Error} En cas d'erreur de récupération
   */
  async getMe() {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw this._handleAuthError(error, 'Erreur lors de la récupération du profil');
    }
  }

  /**
   * Déconnexion de l'utilisateur courant (révocation du token actuel)
   * @returns {Promise<Object>} Promesse de déconnexion
   * @throws {Error} En cas d'erreur de déconnexion
   */
  async logout() {
    try {
      const response = await api.post('/logout');
      this.removeToken();
      console.log('🚪 Déconnexion réussie');
      return response.data;
    } catch (error) {
      // Même en cas d'erreur, on supprime le token local
      this.removeToken();
      console.warn('⚠️ Déconnexion avec erreur, token supprimé localement');
      throw this._handleAuthError(error, 'Erreur lors de la déconnexion');
    }
  }

  /**
   * Déconnexion de tous les appareils (révocation de tous les tokens)
   * @returns {Promise<Object>} Promesse de déconnexion complète
   * @throws {Error} En cas d'erreur de déconnexion
   */
  async logoutAll() {
    try {
      const response = await api.post('/logout-all');
      this.removeToken();
      console.log('🚪 Déconnexion de tous les appareils réussie');
      return response.data;
    } catch (error) {
      this.removeToken();
      console.warn('⚠️ Déconnexion globale avec erreur, token supprimé localement');
      throw this._handleAuthError(error, 'Erreur lors de la déconnexion globale');
    }
  }

  /**
   * Stocke le token d'authentification de manière sécurisée
   * @param {string} token - Token d'authentification
   * @throws {Error} Si le token est invalide
   */
  setToken(token) {
    if (!token || typeof token !== 'string') {
      throw new Error('Token invalide');
    }
    
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
    console.log('💾 Token sauvegardé dans localStorage');
  }

  /**
   * Supprime le token d'authentification
   */
  removeToken() {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    console.log('🗑️ Token supprimé du localStorage');
  }

  /**
   * Récupère le token d'authentification stocké
   * @returns {string|null} Token d'authentification ou null
   */
  getToken() {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns {boolean} True si l'utilisateur est connecté
   */
  isAuthenticated() {
    const token = this.getToken();
    const isAuth = Boolean(token);
    console.log('🔍 Statut d\'authentification:', isAuth);
    return isAuth;
  }

  /**
   * Configure un token de démonstration pour les tests
   * @returns {string} Token de démonstration configuré
   */
  setDemoToken() {
    const demoToken = `${AUTH_CONFIG.TOKEN_PREFIX} ${AUTH_CONFIG.DEMO_TOKEN}`;
    this.setToken(demoToken);
    console.log('🎭 Token de démonstration configuré');
    return demoToken;
  }

  /**
   * Vérifie la validité du token actuel
   * @returns {Promise<boolean>} True si le token est valide
   */
  async validateToken() {
    if (!this.isAuthenticated()) {
      return false;
    }
    
    try {
      await this.getMe();
      return true;
    } catch (error) {
      console.warn('🔑 Token invalide, suppression...');
      this.removeToken();
      return false;
    }
  }
}

// Export d'une instance unique (Singleton)
const authService = new AuthService();
export default authService;
