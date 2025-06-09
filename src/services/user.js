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
  },

  /**
   * Récupère l'utilisateur actuel avec toutes ses données (rang, points, etc.)
   * @returns {Promise} Promesse contenant l'utilisateur complet
   */
  getCurrentUser() {
    console.log('👤 Service User - Récupération de l\'utilisateur actuel');
    return api.get('/user');
  },

  /**
   * Met à jour les préférences utilisateur
   * @param {Object} preferences - Nouvelles préférences
   * @returns {Promise} Promesse de mise à jour
   */
  updatePreferences(preferences) {
    console.log('⚙️ Service User - Mise à jour des préférences', preferences);
    return api.put('/user/preferences', preferences);
  },

  /**
   * Récupère les notifications de l'utilisateur
   * @param {Object} filters - Filtres optionnels
   * @returns {Promise} Promesse contenant les notifications
   */
  getNotifications(filters = {}) {
    console.log('🔔 Service User - Récupération des notifications');
    return api.get('/user/notifications', { params: filters });
  },

  /**
   * Marque les notifications comme lues
   * @param {Array} notificationIds - IDs des notifications à marquer
   * @returns {Promise} Promesse de mise à jour
   */
  markNotificationsAsRead(notificationIds) {
    console.log('✅ Service User - Marquage notifications comme lues', notificationIds);
    return api.post('/user/notifications/mark-read', { ids: notificationIds });
  }
};
