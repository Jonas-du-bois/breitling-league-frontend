import api from '@/services/api';

/**
 * Service pour suivre la progression et les statistiques des utilisateurs
 */
export default {
  /**
   * Récupère la progression globale de l'utilisateur connecté
   * @returns {Promise} Promesse contenant la progression de l'utilisateur
   */
  getProgress() {
    return api.get('/progress');
  },

  /**
   * Récupère le rang de l'utilisateur et ses statistiques
   * @returns {Promise} Promesse contenant le rang et les statistiques
   */
  getRank() {
    return api.get('/progress/rank');
  },

  /**
   * Récupère l'historique des quiz de l'utilisateur
   * @returns {Promise} Promesse contenant l'historique des quiz
   */
  getHistory() {
    return api.get('/progress/history');
  },

  /**
   * Récupère les données de bilan (wrap) de l'utilisateur
   * @returns {Promise} Promesse contenant les données de bilan
   */
  getWrap() {
    return api.get('/progress/wrap');
  },

  /**
   * Récupère le classement général de tous les joueurs
   * @returns {Promise} Promesse contenant le classement général
   */
  getLeaderboard() {
    return api.get('/leaderboard');
  }
};
