import api from '@/services/api';

/**
 * Service pour gérer les notifications utilisateur
 */
export default {
  /**
   * Récupère les notifications de l'utilisateur connecté
   * @returns {Promise} Promesse contenant la liste des notifications
   */
  getAll() {
    return api.get('/notifications');
  },

  /**
   * Marque une notification comme lue
   * @param {number} id - ID de la notification
   * @returns {Promise} Promesse de mise à jour de la notification
   */
  markAsRead(id) {
    return api.patch(`/notifications/${id}/read`);
  },

  /**
   * Compte les notifications non lues
   * @returns {Promise} Promesse contenant le nombre de notifications non lues
   */
  getUnreadCount() {
    return api.get('/notifications/unread-count');
  }
};
