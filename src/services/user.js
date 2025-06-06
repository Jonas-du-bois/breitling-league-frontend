import api from '@/services/api';

/**
 * Service pour gérer le profil utilisateur
 */
export default {
  /**
   * Récupère le profil de l'utilisateur connecté
   * @returns {Promise} Promesse contenant les données du profil
   */
  getProfile() {
    return api.get('/profile');
  },

  /**
   * Met à jour le profil de l'utilisateur connecté
   * @param {Object} profileData - Nouvelles données du profil
   * @returns {Promise} Promesse de mise à jour du profil
   */
  updateProfile(profileData) {
    return api.put('/profile', profileData);
  },

  /**
   * Récupère le profil public d'un autre utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise} Promesse contenant le profil public
   */
  getPublicProfile(userId) {
    return api.get(`/users/${userId}/profile`);
  },

  /**
   * Récupère les données de l'utilisateur connecté via l'endpoint /me
   * @returns {Promise} Promesse contenant les données utilisateur
   */
  getMe() {
    return api.get('/me');
  }
};
