import api from '@/services/api';

/**
 * Service pour gérer les défis hebdomadaires et les tickets de loterie
 */
export default {
  /**
   * Récupère les défis hebdomadaires disponibles pour l'utilisateur
   * @returns {Promise} Promesse contenant la liste des défis hebdomadaires
   */
  getWeeklyChallenges() {
    return api.get('/weekly');
  },

  /**
   * Réclame un ticket après avoir réussi un défi hebdomadaire
   * @param {number} weeklyId - ID du défi hebdomadaire
   * @returns {Promise} Promesse de réclamation du ticket
   */
  claimTicket(weeklyId) {
    return api.post(`/weekly/${weeklyId}/claim`);
  },

  /**
   * Récupère les informations sur la série de l'utilisateur
   * @returns {Promise} Promesse contenant les informations de série
   */
  getSeries() {
    return api.get('/weekly/series');
  },

  /**
   * Récupère les tickets de loterie de l'utilisateur
   * @returns {Promise} Promesse contenant les tickets de loterie
   */
  getTickets() {
    return api.get('/weekly/tickets');
  }
};
