import api from './api'

/**
 * @typedef {Object} RankDetails
 * @property {number} id - ID unique du rang
 * @property {string} name - Nom du rang
 * @property {number} level - Niveau du rang
 * @property {number} minimum_points - Points minimum requis
 * @property {string} material - Matériau du rang (Caoutchouc, Tissu, etc.)
 * @property {string} description - Description du rang
 */

/**
 * @typedef {Object} AdjacentRanks
 * @property {RankDetails|null} previous - Rang précédent
 * @property {RankDetails} current - Rang actuel
 * @property {RankDetails|null} next - Rang suivant
 */

/**
 * @typedef {Object} UserProgression
 * @property {RankDetails} current_rank - Rang actuel de l'utilisateur
 * @property {RankDetails|null} next_rank - Rang suivant (null si max atteint)
 * @property {number} current_points - Points actuels de l'utilisateur
 * @property {number} points_to_next - Points manquants pour le rang suivant
 * @property {number} progress_percentage - Pourcentage de progression vers le rang suivant
 */

/**
 * @typedef {Object} RankStatistics
 * @property {number} rank_id - ID du rang
 * @property {string} rank_name - Nom du rang
 * @property {number} user_count - Nombre d'utilisateurs ayant ce rang
 * @property {number} percentage - Pourcentage d'utilisateurs ayant ce rang
 */

/**
 * Service pour la gestion des rangs dans la Breitling League
 * Suit les principes Clean Code et fournit une API cohérente pour les opérations liées aux rangs
 */
class RankService {
  /**
   * Instance singleton du service
   * @private
   */
  static instance = null

  /**
   * Configuration des endpoints API
   * @private
   */
  static ENDPOINTS = {
    BASE: '/ranks',
    BY_ID: (id) => `/ranks/${id}`,
    ADJACENT_USER: '/ranks/adjacent/user',
    MINIMUM_POINTS: '/ranks/minimum-points',
    USER_PROGRESSION: '/ranks/user/progression',
    STATISTICS: '/ranks/statistics'
  }

  /**
   * Matériaux des rangs dans l'ordre croissant
   * @private
   */
  static RANK_MATERIALS = [
    'Caoutchouc',
    'Tissu', 
    'Cuir exotique',
    'Acier',
    'Or',
    'Titane'
  ]

  /**
   * Constructeur privé pour pattern Singleton
   * @private
   */
  constructor() {
    if (RankService.instance) {
      return RankService.instance
    }
    RankService.instance = this
  }

  /**
   * Récupère l'instance singleton du service
   * @returns {RankService} Instance du service
   */
  static getInstance() {
    if (!RankService.instance) {
      RankService.instance = new RankService()
    }
    return RankService.instance
  }

  /**
   * Exécute une requête API avec gestion d'erreur standardisée
   * @private
   * @param {string} endpoint - Endpoint de l'API
   * @param {string} operation - Description de l'opération (pour les logs)
   * @returns {Promise<Object>} Données de réponse
   * @throws {Error} En cas d'erreur API
   */
  async executeRequest(endpoint, operation) {
    try {
      const response = await api.get(endpoint)
      
      if (response.data.success) {
        return response.data.data
      } else {
        throw new Error(response.data.message || `Erreur lors de ${operation}`)
      }
    } catch (error) {
      console.error(`Erreur RankService - ${operation}:`, error)
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          `Erreur lors de ${operation}`
      
      throw new Error(errorMessage)
    }
  }

  /**
   * Valide l'ID d'un rang
   * @private
   * @param {number} id - ID à valider
   * @throws {Error} Si l'ID est invalide
   */
  validateRankId(id) {
    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new Error('ID de rang invalide : doit être un entier positif')
    }
  }

  /**
   * Récupère la liste complète de tous les rangs disponibles
   * @returns {Promise<RankDetails[]>} Liste de tous les rangs
   * @throws {Error} En cas d'erreur de récupération
   */
  async fetchAllRanks() {
    return await this.executeRequest(
      RankService.ENDPOINTS.BASE,
      'la récupération de tous les rangs'
    )
  }

  /**
   * Récupère les détails d'un rang spécifique par son ID
   * @param {number} rankId - ID du rang à récupérer
   * @returns {Promise<RankDetails>} Détails du rang
   * @throws {Error} En cas d'ID invalide ou d'erreur de récupération
   */
  async fetchRankById(rankId) {
    this.validateRankId(rankId)
    
    return await this.executeRequest(
      RankService.ENDPOINTS.BY_ID(rankId),
      `la récupération du rang ${rankId}`
    )
  }

  /**
   * Récupère les rangs adjacents (précédent, actuel, suivant) pour l'utilisateur connecté
   * @returns {Promise<AdjacentRanks>} Rangs précédent, actuel et suivant
   * @throws {Error} En cas d'erreur de récupération
   */
  async fetchAdjacentRanks() {
    return await this.executeRequest(
      RankService.ENDPOINTS.ADJACENT_USER,
      'la récupération des rangs adjacents'
    )
  }

  /**
   * Récupère la structure des points minimum requis pour chaque rang
   * @returns {Promise<Object>} Mapping rang -> points minimum
   * @throws {Error} En cas d'erreur de récupération
   */
  async fetchMinimumPointsStructure() {
    return await this.executeRequest(
      RankService.ENDPOINTS.MINIMUM_POINTS,
      'la récupération des points minimum'
    )
  }

  /**
   * Récupère les données de progression de rang pour l'utilisateur connecté
   * @returns {Promise<UserProgression>} Progression actuelle vers le rang suivant
   * @throws {Error} En cas d'erreur de récupération
   */
  async fetchUserProgression() {
    return await this.executeRequest(
      RankService.ENDPOINTS.USER_PROGRESSION,
      'la récupération de la progression utilisateur'
    )
  }

  /**
   * Récupère les statistiques de répartition des utilisateurs par rang
   * @returns {Promise<RankStatistics[]>} Statistiques par rang
   * @throws {Error} En cas d'erreur de récupération
   */
  async fetchRankStatistics() {
    return await this.executeRequest(
      RankService.ENDPOINTS.STATISTICS,
      'la récupération des statistiques des rangs'
    )
  }

  /**
   * Calcule le pourcentage de progression entre deux rangs
   * @param {number} currentPoints - Points actuels de l'utilisateur
   * @param {number} currentRankMinPoints - Points minimum du rang actuel
   * @param {number} nextRankMinPoints - Points minimum du rang suivant
   * @returns {number} Pourcentage de progression (0-100)
   */
  calculateProgressionPercentage(currentPoints, currentRankMinPoints, nextRankMinPoints) {
    if (nextRankMinPoints <= currentRankMinPoints) {
      return 100 // Rang maximum atteint
    }

    const progressInRange = currentPoints - currentRankMinPoints
    const totalRangePoints = nextRankMinPoints - currentRankMinPoints
    
    const percentage = (progressInRange / totalRangePoints) * 100
    
    return Math.max(0, Math.min(100, Math.round(percentage * 10) / 10))
  }

  /**
   * Détermine si un utilisateur a atteint le rang maximum
   * @param {RankDetails|null} nextRank - Rang suivant (null si aucun)
   * @returns {boolean} True si rang maximum atteint
   */
  isMaxRankReached(nextRank) {
    return !nextRank || nextRank === null
  }

  /**
   * Obtient la couleur associée à un matériau de rang
   * @param {string} material - Matériau du rang
   * @returns {string} Code couleur hexadécimal
   */
  getRankColor(material) {
    const colorMap = {
      'Caoutchouc': '#8B4513',  // Marron
      'Tissu': '#4A90E2',       // Bleu
      'Cuir exotique': '#D2691E', // Orange foncé
      'Acier': '#C0C0C0',       // Argent
      'Or': '#FFD700',          // Or
      'Titane': '#778899'       // Gris titane
    }
    
    return colorMap[material] || '#6C757D' // Gris par défaut
  }

  /**
   * Formate l'affichage d'un rang avec son niveau
   * @param {RankDetails} rank - Détails du rang
   * @returns {string} Rang formaté (ex: "Acier (Niveau 4)")
   */
  formatRankDisplay(rank) {
    if (!rank || !rank.name) {
      return 'Rang inconnu'
    }
    
    return `${rank.name}${rank.level ? ` (Niveau ${rank.level})` : ''}`
  }

  /**
   * Retourne la liste des matériaux de rangs dans l'ordre
   * @returns {string[]} Liste ordonnée des matériaux
   */
  getRankMaterials() {
    return [...RankService.RANK_MATERIALS]
  }
}

// Export de l'instance singleton
export default RankService.getInstance()

// Export nommé pour compatibilité
export { RankService }
