import api from '@/services/api';

/**
 * Service pour gérer les reminders de quiz de révision Breitling League
 * Les reminders sont des quiz de révision générés automatiquement à partir de questions précédemment vues
 */
export default {
  /**
   * Récupère les reminders non expirés avec informations sur les chapitres associés et statut
   * @returns {Promise} Promesse contenant la liste des reminders actifs
   */
  getAll() {
    return api.get('/reminders');
  },

  /**
   * Récupère un reminder spécifique
   * @param {number} id - ID du reminder
   * @returns {Promise} Promesse contenant les détails du reminder
   */
  getById(id) {
    return api.get(`/reminders/${id}`);
  }
};
