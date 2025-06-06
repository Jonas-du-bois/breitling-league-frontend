import api from '@/services/api';

/**
 * Service pour gérer les tickets de loterie et les bonus de séries
 */
export default {
  /**
   * Récupère tous les tickets de l'utilisateur connecté
   * @returns {Promise} Promesse contenant la liste des tickets
   */
  getAll() {
    return api.get('/tickets');
  },

  /**
   * Réclame un bonus pour série de 5 tickets consécutifs
   * @returns {Promise} Promesse de réclamation du bonus
   */
  claimBonus() {
    return api.post('/tickets/bonus');
  },

  /**
   * Récupère des statistiques sur les tickets de l'utilisateur
   * @returns {Promise} Promesse contenant les statistiques des tickets
   */
  getStats() {
    return api.get('/tickets/stats');
  }
};
