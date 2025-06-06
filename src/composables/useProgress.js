import { ref, computed } from 'vue'
import api from '@/services/api'

/**
 * @typedef {Object} ProgressData
 * @property {number} user_id - ID de l'utilisateur
 * @property {number} completed_chapters - Nombre de chapitres complétés
 * @property {number} total_chapters - Nombre total de chapitres
 * @property {number} completed_quizzes - Nombre de quiz complétés
 * @property {number} total_points - Points totaux
 * @property {number} quiz_points - Points des quiz
 * @property {number} bonus_points - Points bonus
 * @property {number} progress_percentage - Pourcentage de progression
 * @property {Object} current_rank - Rang actuel
 * @property {Object} next_rank - Rang suivant
 * @property {string} last_activity - Dernière activité
 */

/**
 * @typedef {Object} RankData
 * @property {Object} rank - Informations du rang
 * @property {number} total_points - Points totaux
 * @property {number} completed_quizzes - Quiz complétés
 * @property {number} average_score - Score moyen
 * @property {number} global_position - Position globale
 */

/**
 * Composable pour gérer la progression et les statistiques des utilisateurs
 * Suit les principes Clean Code et SOLID pour une architecture maintenable
 * 
 * @returns {Object} API publique du composable
 */
export function useProgress() {
  // === ÉTAT RÉACTIF ===
  const state = {
    loading: ref(false),
    error: ref(null),
    progress: ref(null),
    rank: ref(null),
    history: ref([]),
    leaderboard: ref([]),
    wrapData: ref(null),
    stats: ref({})
  }

  // === UTILITAIRES PRIVÉS ===
  
  /**
   * Gère les erreurs d'API de manière cohérente
   * @param {Error} error - L'erreur capturée
   * @param {string} operation - Nom de l'opération qui a échoué
   */
  const handleApiError = (error, operation) => {
    console.error(`Erreur lors de ${operation}:`, error)
    state.error.value = error.response?.data?.message || `Erreur lors de ${operation}`
  }

  /**
   * Exécute une requête API avec gestion d'erreur standard
   * @param {Function} apiCall - Fonction d'appel API
   * @param {string} operation - Description de l'opération
   * @param {Function} successHandler - Gestionnaire de succès
   */
  const executeApiCall = async (apiCall, operation, successHandler) => {
    try {
      state.loading.value = true
      state.error.value = null
      
      const response = await apiCall()
      
      if (response.data.success) {
        successHandler(response.data.data)
      }
    } catch (error) {
      handleApiError(error, operation)
    } finally {
      state.loading.value = false
    }
  }

  /**
   * Calcule les statistiques dérivées à partir des données de progression
   * @param {ProgressData} progressData - Données de progression
   * @returns {Object} Statistiques calculées
   */
  const calculateDerivedStats = (progressData) => {
    const chaptersCompletionRate = progressData.total_chapters > 0 
      ? ((progressData.completed_chapters / progressData.total_chapters) * 100).toFixed(1)
      : '0.0'

    const rankProgress = progressData.next_rank 
      ? calculateRankProgress(progressData)
      : '100.0'

    return {
      chapters_completion_rate: chaptersCompletionRate,
      total_activities: progressData.completed_quizzes,
      rank_progress: rankProgress
    }
  }

  /**
   * Calcule le pourcentage de progression vers le rang suivant
   * @param {ProgressData} progressData - Données de progression
   * @returns {string} Pourcentage formaté
   */
  const calculateRankProgress = (progressData) => {
    const currentMinPoints = progressData.current_rank?.minimum_points || 0
    const nextMinPoints = progressData.next_rank.minimum_points
    const currentPoints = progressData.total_points

    const progressPercentage = ((currentPoints - currentMinPoints) / 
                               (nextMinPoints - currentMinPoints)) * 100

    return Math.max(0, Math.min(100, progressPercentage)).toFixed(1)
  }

  /**
   * Transforme les données brutes de progression en objet structuré
   * @param {Object} rawData - Données brutes de l'API
   * @returns {ProgressData} Données transformées
   */
  const transformProgressData = (rawData) => ({
    user_id: rawData.user_id,
    completed_chapters: rawData.completed_chapters,
    total_chapters: rawData.total_chapters,
    completed_quizzes: rawData.completed_quizzes,
    total_points: rawData.total_points,
    quiz_points: rawData.quiz_points,
    bonus_points: rawData.bonus_points,
    progress_percentage: rawData.progress_percentage,
    current_rank: rawData.current_rank,
    next_rank: rawData.next_rank,
    last_activity: rawData.last_activity
  })

  // === MÉTHODES PUBLIQUES ===

  /**
   * Récupère la progression globale de l'utilisateur
   * @returns {Promise<void>}
   */
  const fetchUserProgress = async () => {
    await executeApiCall(
      () => api.get('/progress'),
      'la récupération de la progression',
      (data) => {
        state.progress.value = transformProgressData(data)
        state.stats.value = calculateDerivedStats(data)
      }
    )
  }

  /**
   * Récupère les détails du rang de l'utilisateur
   * @returns {Promise<void>}
   */
  const fetchUserRank = async () => {
    await executeApiCall(
      () => api.get('/progress/rank'),
      'la récupération du rang',
      (data) => { state.rank.value = data }
    )
  }

  /**
   * Récupère l'historique des quiz de l'utilisateur
   * @returns {Promise<void>}
   */
  const fetchQuizHistory = async () => {
    await executeApiCall(
      () => api.get('/progress/history'),
      'la récupération de l\'historique',
      (data) => { state.history.value = data }
    )
  }

  /**
   * Récupère le classement général
   * @returns {Promise<void>}
   */
  const fetchLeaderboard = async () => {
    await executeApiCall(
      () => api.get('/leaderboard'),
      'la récupération du classement',
      (data) => { state.leaderboard.value = data }
    )
  }

  /**
   * Récupère les données de bilan annuel
   * @returns {Promise<void>}
   */
  const fetchWrapData = async () => {
    await executeApiCall(
      () => api.get('/progress/wrap'),
      'la récupération du bilan',
      (data) => { state.wrapData.value = data }
    )
  }
  /**
   * Actualise toutes les données utilisateur en parallèle
   * @returns {Promise<void>}
   */
  const refreshAllData = async () => {
    await Promise.all([
      fetchUserProgress(),
      fetchUserRank(),
      fetchQuizHistory(),
      fetchLeaderboard(),
      fetchWrapData()
    ])
  }

  // === PROPRIÉTÉS CALCULÉES ===

  /**
   * Rang actuel de l'utilisateur
   * @returns {Object|null}
   */
  const currentRank = computed(() => state.progress.value?.current_rank || null)

  /**
   * Rang suivant de l'utilisateur
   * @returns {Object|null}
   */
  const nextRank = computed(() => state.progress.value?.next_rank || null)

  /**
   * Points totaux de l'utilisateur
   * @returns {number}
   */
  const totalPoints = computed(() => state.progress.value?.total_points || 0)

  /**
   * Nombre de chapitres complétés
   * @returns {number}
   */
  const completedChapters = computed(() => state.progress.value?.completed_chapters || 0)

  /**
   * Nombre total de chapitres disponibles
   * @returns {number}
   */
  const totalChapters = computed(() => state.progress.value?.total_chapters || 0)

  /**
   * Nombre de quiz complétés
   * @returns {number}
   */
  const completedQuizzes = computed(() => state.progress.value?.completed_quizzes || 0)

  /**
   * Pourcentage de progression globale
   * @returns {number}
   */
  const progressPercentage = computed(() => state.progress.value?.progress_percentage || 0)

  /**
   * Points nécessaires pour atteindre le rang suivant
   * @returns {number}
   */
  const pointsToNextRank = computed(() => {
    if (!nextRank.value || !totalPoints.value) return 0
    return Math.max(0, nextRank.value.minimum_points - totalPoints.value)
  })

  /**
   * Pourcentage de progression vers le rang suivant
   * @returns {number}
   */
  const rankProgressPercentage = computed(() => {
    return parseFloat(state.stats.value.rank_progress || '0')
  })

  /**
   * Taux de complétion des chapitres en pourcentage
   * @returns {number}
   */
  const chaptersCompletionRate = computed(() => {
    return parseFloat(state.stats.value.chapters_completion_rate || '0')
  })

  // === UTILITAIRES PUBLICS ===

  /**
   * Formate un nombre de points avec séparateurs de milliers
   * @param {number|null|undefined} points - Nombre de points à formater
   * @returns {string} Points formatés
   */
  const formatPoints = (points) => {
    if (!points || typeof points !== 'number') return '0'
    return points.toLocaleString('fr-FR')
  }

  /**
   * Vérifie si l'utilisateur a atteint le rang maximum
   * @returns {boolean}
   */
  const isMaxRankReached = computed(() => !nextRank.value)

  /**
   * Obtient un indicateur visuel de progression sous forme de couleur
   * @returns {string} Code couleur hexadécimal
   */
  const getProgressColor = computed(() => {
    const percentage = progressPercentage.value
    if (percentage >= 80) return '#27ae60' // Vert
    if (percentage >= 50) return '#f39c12' // Orange
    if (percentage >= 25) return '#e67e22' // Orange foncé
    return '#e74c3c' // Rouge
  })

  // === API PUBLIQUE ===
  return {
    // États réactifs
    loading: state.loading,
    error: state.error,
    progress: state.progress,
    rank: state.rank,
    history: state.history,
    leaderboard: state.leaderboard,
    wrapData: state.wrapData,
    stats: state.stats,
    
    // Propriétés calculées - Données principales
    currentRank,
    nextRank,
    totalPoints,
    completedChapters,
    totalChapters,
    completedQuizzes,
    progressPercentage,
    pointsToNextRank,
    rankProgressPercentage,
    chaptersCompletionRate,
    
    // Propriétés calculées - Utilitaires
    isMaxRankReached,
    getProgressColor,
    
    // Méthodes de récupération de données
    getProgress: fetchUserProgress,
    getRank: fetchUserRank,
    getHistory: fetchQuizHistory,
    getLeaderboard: fetchLeaderboard,
    getWrapData: fetchWrapData,
    refreshAll: refreshAllData,
    
    // Utilitaires
    formatPoints
  }
}

