import api from '@/services/api';

/**
 * Service pour gérer les nouveautés de chapitres Breitling League
 * Les nouveautés offrent un bonus si réalisées dans les 7 jours suivant leur publication
 */
export default {
  /**
   * Récupère toutes les nouveautés accessibles avec informations sur les bonus et chapitres associés
   * @returns {Promise} Promesse contenant la liste des nouveautés
   */
  getAll() {
    return api.get('/novelties');
  },

  /**
   * Récupère une nouveauté spécifique avec le contenu du chapitre
   * @param {number} id - ID de la nouveauté
   * @returns {Promise} Promesse contenant les détails de la nouveauté
   */
  getById(id) {
    return api.get(`/novelties/${id}`);
  }
};
