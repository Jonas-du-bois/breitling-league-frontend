import api from '@/services/api';

/**
 * Service pour gérer les chapitres et leurs unités de formation
 */
export default {
  /**
   * Récupère la liste complète des chapitres avec leurs unités associées
   * @returns {Promise} Promesse contenant la liste des chapitres
   */
  getAll() {
    return api.get('/chapters');
  },

  /**
   * Récupère les détails d'un chapitre particulier avec ses unités
   * @param {number} id - ID du chapitre
   * @returns {Promise} Promesse contenant les détails du chapitre
   */
  getById(id) {
    return api.get(`/chapters/${id}`);
  }
};
