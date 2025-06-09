import { ref } from 'vue';
import { authService } from '@/services';

/**
 * Composable pour gérer l'état d'authentification
 * Respecte les principes SOLID et Clean Code
 * @returns {Object} État et méthodes d'authentification
 */
export function useAuth() {
  // État réactif
  const isAuthenticated = ref(authService.isAuthenticated());
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * Réinitialise l'état d'erreur
   * @private
   */
  const _clearError = () => {
    error.value = null;
  };

  /**
   * Met à jour l'état d'authentification
   * @private
   * @param {boolean} status - Nouveau statut d'authentification
   */
  const _updateAuthStatus = (status) => {
    isAuthenticated.value = status;
  };

  /**
   * Connexion de l'utilisateur
   * @param {Object} credentials - Email et mot de passe
   * @returns {Promise<Object>} Données de connexion
   * @throws {Error} En cas d'erreur de connexion
   */
  const login = async (credentials) => {
    loading.value = true;
    _clearError();
    
    try {
      const response = await authService.login(credentials);
      
      user.value = response.user;
      _updateAuthStatus(true);
      
      console.log('✅ Connexion réussie dans le composable');
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Erreur de connexion';
      error.value = errorMessage;
      _updateAuthStatus(false);
      
      console.error('❌ Erreur de connexion dans le composable:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Déconnexion de l'utilisateur
   * @returns {Promise<void>}
   */
  const logout = async () => {
    loading.value = true;
    
    try {
      await authService.logout();
      console.log('✅ Déconnexion réussie dans le composable');
    } catch (err) {
      console.warn('⚠️ Erreur lors de la déconnexion:', err.message);
      // On continue même en cas d'erreur car le token local sera supprimé
    } finally {
      // Nettoyage de l'état local
      user.value = null;
      _updateAuthStatus(false);
      loading.value = false;
      
      // Recharger la page pour réinitialiser l'état complet
      window.location.reload();
    }
  };

  /**
   * Récupération des données utilisateur
   * @returns {Promise<Object>} Données utilisateur
   * @throws {Error} En cas d'erreur de récupération
   */
  const fetchUser = async () => {
    if (!isAuthenticated.value) {
      throw new Error('Utilisateur non authentifié');
    }
    
    loading.value = true;
    _clearError();
    
    try {
      const userData = await authService.getMe();
      user.value = userData.user || userData;
      
      console.log('✅ Données utilisateur récupérées');
      return user.value;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de la récupération des données utilisateur';
      error.value = errorMessage;
      
      // Si erreur 401, déconnecter l'utilisateur
      if (err.message?.includes('401') || err.message?.includes('non autorisé')) {
        await logout();
      }
      
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données d'inscription
   * @returns {Promise<Object>} Données d'inscription
   * @throws {Error} En cas d'erreur d'inscription
   */
  const register = async (userData) => {
    loading.value = true;
    _clearError();
    
    try {
      const response = await authService.register(userData);
      
      console.log('✅ Inscription réussie dans le composable');
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Erreur lors de l\'inscription';
      error.value = errorMessage;
      
      console.error('❌ Erreur d\'inscription dans le composable:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Vérifie et valide le token actuel
   * @returns {Promise<boolean>} True si le token est valide
   */
  const validateToken = async () => {
    if (!isAuthenticated.value) {
      return false;
    }
    
    try {
      const isValid = await authService.validateToken();
      _updateAuthStatus(isValid);
      
      if (!isValid) {
        user.value = null;
      }
      
      return isValid;
    } catch (err) {
      console.warn('⚠️ Erreur lors de la validation du token:', err.message);
      _updateAuthStatus(false);
      user.value = null;
      return false;
    }
  };

  return {
    // État réactif
    isAuthenticated,
    user,
    loading,
    error,
    
    // Méthodes d'authentification
    login,
    logout,
    register,
    fetchUser,
    validateToken
  };
}
