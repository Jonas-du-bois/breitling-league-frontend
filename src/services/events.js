import api from '@/services/api';

/**
 * Service pour gérer les événements spéciaux Breitling League
 * Les événements sont des modules spéciaux liés à plusieurs unités
 */
export default {
  /**
   * Récupère tous les événements avec leur statut et informations sur les unités associées
   * @returns {Promise} Promesse contenant la liste des événements
   */
  getAll() {
    return api.get('/events');
  },

  /**
   * Récupère toutes les unités associées à un événement avec leur théorie HTML et questions
   * @param {number} id - ID de l'événement
   * @returns {Promise} Promesse contenant les unités de l'événement
   */
  getUnits(id) {
    return api.get(`/events/${id}/units`);
  }
};
