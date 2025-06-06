import { ref, reactive } from 'vue';
import { authService } from '@/services';

/**
 * Composable pour gérer l'état d'authentification
 * @returns {Object} État et méthodes d'authentification
 */
export function useAuth() {
  const isAuthenticated = ref(authService.isAuthenticated());
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * Connexion de l'utilisateur
   * @param {Object} credentials - Email et mot de passe
   */
  const login = async (credentials) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await authService.login(credentials);
      const { token, user: userData } = response.data;
      
      authService.setToken(token);
      user.value = userData;
      isAuthenticated.value = true;
      
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur de connexion';
      throw err;
    } finally {
      loading.value = false;
    }
  };
  /**
   * Déconnexion de l'utilisateur
   */
  const logout = async () => {
    loading.value = true;
    
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Erreur lors de la déconnexion:', err);
    } finally {
      authService.removeToken();
      user.value = null;
      isAuthenticated.value = false;
      loading.value = false;
      // Navigation manuelle sans router
      window.location.reload();
    }
  };

  /**
   * Récupération des données utilisateur
   */
  const fetchUser = async () => {
    if (!isAuthenticated.value) return;
    
    loading.value = true;
    
    try {
      const response = await authService.getMe();
      user.value = response.data;
    } catch (err) {
      if (err.response?.status === 401) {
        await logout();
      }
      error.value = err.response?.data?.message || 'Erreur lors de la récupération des données utilisateur';
    } finally {
      loading.value = false;
    }
  };

  /**
   * Inscription d'un nouvel utilisateur
   * @param {Object} userData - Données d'inscription
   */
  const register = async (userData) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de l\'inscription';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // État
    isAuthenticated,
    user,
    loading,
    error,
    
    // Méthodes
    login,
    logout,
    register,
    fetchUser
  };
}
