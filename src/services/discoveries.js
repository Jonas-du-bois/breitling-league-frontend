import api from '@/services/api';

/**
 * Service pour gérer les explorations de chapitres (théorie + quiz)
 */
export default {
  /**
   * Récupère la liste des explorations de chapitres disponibles
   * @returns {Promise} Promesse contenant la liste des découvertes
   */
  getAll() {
    return api.get('/discoveries');
  },

  /**
   * Récupère une exploration de chapitre spécifique avec ses unités
   * @param {number} id - ID de la découverte
   * @returns {Promise} Promesse contenant les détails de la découverte
   */
  getById(id) {
    return api.get(`/discoveries/${id}`);
  }
};
