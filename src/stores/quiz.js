import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import quizService from '@/services/quiz.js'
import authService from '@/services/auth.js'

/**
 * Store Quiz - Version CLEAN, DRY, KISS
 * Responsabilité unique : gestion de l'état du quiz
 */
export const useQuizStore = defineStore('quiz', () => {
  // === STATE ===
  const currentQuiz = ref(null)
  const userAnswers = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Cache data for performance
  const cache = ref({
    types: null,
    stats: null,
    instances: null
  })

  // === COMPUTED ===
  const hasCurrentQuiz = computed(() => !!currentQuiz.value)
  const currentQuizId = computed(() => currentQuiz.value?.quiz_instance_id)
  const isQuizActive = computed(() => hasCurrentQuiz.value && currentQuiz.value?.status === 'started')
  
  // === ACTIONS ===
  
  /**
   * Charge et démarre un quiz
   */
  async function loadQuiz(quizInstanceId) {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await quizService.getInstance(quizInstanceId)
      currentQuiz.value = response.data
      userAnswers.value = []
      
      return response.data
    } catch (err) {
      error.value = 'Erreur lors du chargement du quiz'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Démarre un nouveau quiz
   */
  async function startQuiz(quizData) {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await quizService.start(quizData)
      currentQuiz.value = response.data
      userAnswers.value = []
      
      return response.data
    } catch (err) {
      error.value = 'Erreur lors du démarrage du quiz'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Ajoute une réponse utilisateur
   */
  function addAnswer(questionId, choiceId, timeTaken = 10) {
    const existingIndex = userAnswers.value.findIndex(a => a.question_id === questionId)
    
    const answer = {
      question_id: questionId,
      choice_id: choiceId,
      time_taken: timeTaken
    }
    
    if (existingIndex >= 0) {
      userAnswers.value[existingIndex] = answer
    } else {
      userAnswers.value.push(answer)
    }
  }

  /**
   * Soumet le quiz
   */
  async function submitQuiz(totalTime = 300) {
    if (!currentQuizId.value || !userAnswers.value.length) {
      throw new Error('Aucune réponse à soumettre')
    }

    try {
      isLoading.value = true
      error.value = null
      
      const submissionData = {
        quiz_instance_id: currentQuizId.value,
        answers: userAnswers.value,
        total_time: totalTime
      }
      
      const response = await quizService.submit(submissionData)
      currentQuiz.value = null
      userAnswers.value = []
      
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la soumission'
      throw err
    } finally {
      isLoading.value = false
    }
  }  /**
   * Recharge les données mises en cache
   */
  async function refreshCache() {
    try {
      // Récupérer les données utilisateur réelles
      const userPromise = authService.getMe().catch(() => null)
      
      const [types, stats, instances, userData] = await Promise.all([
        quizService.getQuizTypes(),
        quizService.getUserStats(),
        quizService.getUserQuizInstances({ limit: 10 }),
        userPromise
      ])
      
      // Enrichir les stats avec les données utilisateur réelles
      // userData contient directement l'objet utilisateur depuis authService.getMe()
      const enrichedStats = {
        ...stats.data,
        user: userData || null
      }
        cache.value = {
        types: types.data?.data || types.data || [],
        stats: enrichedStats,
        instances: instances.data?.data?.instances || instances.data?.instances || instances.data || []
      }
      
      console.log('✅ Cache rafraîchi avec données réelles:', {
        types: cache.value.types?.length || 0,
        user: cache.value.stats?.user?.name || 'Non authentifié',
        instances: cache.value.instances?.length || 0
      })
      
    } catch (err) {
      console.warn('Erreur lors du rafraîchissement du cache:', err)
    }
  }

  /**
   * Réinitialise l'état
   */
  function resetState() {
    currentQuiz.value = null
    userAnswers.value = []
    error.value = null
    isLoading.value = false
  }

  /**
   * Clear error
   */
  function clearError() {
    error.value = null
  }

  // === GETTERS POUR LE CACHE ===
  const getQuizTypes = computed(() => cache.value.types || [])
  const getUserStats = computed(() => cache.value.stats || {})
  const getRecentInstances = computed(() => cache.value.instances || [])

  return {
    // State
    currentQuiz,
    userAnswers,
    isLoading,
    error,
    cache,
    
    // Computed
    hasCurrentQuiz,
    currentQuizId,
    isQuizActive,
    getQuizTypes,
    getUserStats,
    getRecentInstances,
    
    // Actions
    loadQuiz,
    startQuiz,
    addAnswer,
    submitQuiz,
    refreshCache,
    resetState,
    clearError
  }
})
