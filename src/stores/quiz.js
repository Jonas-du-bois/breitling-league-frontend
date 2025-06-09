import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import quizService from '@/services/quiz.js'
import userService from '@/services/user.js'

export const useQuizStore = defineStore('quiz', () => {
  // État réactif
  const user = ref(null)
  const userStats = ref(null)
  const availableQuizTypes = ref([])
  const currentQuizInstance = ref(null)
  const currentQuizSession = ref(null)
  const userProgress = ref({
    discovery: null,
    novelty: null,
    weekly: null,
    event: null
  })
  const isLoading = ref(false)
  const error = ref(null)

  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const userRank = computed(() => user.value?.rank || null)
  const totalPoints = computed(() => userStats.value?.total_points || 0)
  const completedQuizzes = computed(() => userStats.value?.completed_quizzes || 0)
  
  const nextRecommendedQuiz = computed(() => {
    if (!availableQuizTypes.value.length) return null
    
    // Logique de recommandation automatique
    const userLevel = user.value?.rank?.level || 1
    
    // Priorité: Discovery -> Weekly -> Novelty -> Event
    const priorities = ['discovery', 'weekly', 'novelty', 'event']
    
    for (const priority of priorities) {
      const quizType = availableQuizTypes.value.find(
        type => type.morph_type === priority && !hasCompletedToday(type)
      )
      if (quizType) return quizType
    }
    
    return availableQuizTypes.value[0] || null
  })

  // Actions
  const setError = (message) => {
    error.value = message
    setTimeout(() => error.value = null, 5000)
  }

  const clearError = () => {
    error.value = null
  }

  const loadUser = async () => {
    try {
      isLoading.value = true
      const response = await userService.getCurrentUser()
      user.value = response.data
    } catch (err) {
      setError('Erreur lors du chargement de l\'utilisateur')
      console.error('Erreur loadUser:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadUserStats = async () => {
    try {
      const response = await quizService.getUserStats()
      userStats.value = response.data
    } catch (err) {
      setError('Erreur lors du chargement des statistiques')
      console.error('Erreur loadUserStats:', err)
    }
  }

  const loadQuizTypes = async () => {
    try {
      const response = await quizService.getQuizTypes()
      availableQuizTypes.value = response.data
    } catch (err) {
      setError('Erreur lors du chargement des types de quiz')
      console.error('Erreur loadQuizTypes:', err)
    }
  }

  const loadUserProgress = async () => {
    try {      // Charger le progrès pour chaque type de quiz
      const progressPromises = Object.keys(userProgress.value).map(async (type) => {
        try {
          const response = await quizService.getUserQuizInstances({
            module_type: type,
            status: 'in_progress',
            limit: 1
          })
          
          // Vérifier la structure de la réponse
          const instances = response.data?.instances || response.data || []
          return { type, data: Array.isArray(instances) ? instances[0] || null : instances }
        } catch (err) {
          console.warn(`Erreur chargement progrès ${type}:`, err)
          return { type, data: null }
        }
      })

      const results = await Promise.all(progressPromises)
      results.forEach(({ type, data }) => {
        userProgress.value[type] = data
      })
    } catch (err) {
      console.error('Erreur loadUserProgress:', err)
    }
  }

  const startAutomaticQuiz = async (forceType = null) => {
    try {
      isLoading.value = true
      
      const quizType = forceType || nextRecommendedQuiz.value
      if (!quizType) {
        setError('Aucun quiz disponible pour le moment')
        return null
      }

      const quizData = {
        quiz_type_id: quizType.id,
        quizable_type: quizType.morph_type,
        quiz_mode: 'auto'
      }

      // Ajouter des données spécifiques selon le type
      if (quizType.morph_type === 'weekly') {
        // Pour les quiz hebdomadaires, prendre le challenge actuel
        const weeklyResponse = await quizService.getCurrentWeeklyChallenge()
        if (weeklyResponse.data) {
          quizData.quizable_id = weeklyResponse.data.id
        }
      } else if (quizType.morph_type === 'discovery') {
        // Pour discovery, prendre le prochain chapitre non complété
        const progressResponse = await quizService.getUserProgress()
        const nextChapter = progressResponse.data.next_discovery
        if (nextChapter) {
          quizData.quizable_id = nextChapter.id
        }
      }

      const response = await quizService.start(quizData)
      currentQuizInstance.value = response.data

      return response.data
    } catch (err) {
      setError('Erreur lors du démarrage automatique du quiz')
      console.error('Erreur startAutomaticQuiz:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const continueQuiz = async (quizInstanceId) => {
    try {
      isLoading.value = true
      const response = await quizService.getQuizInstance(quizInstanceId)
      currentQuizInstance.value = response.data
      return response.data
    } catch (err) {
      setError('Erreur lors de la reprise du quiz')
      console.error('Erreur continueQuiz:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const submitAnswer = async (questionId, selectedAnswer) => {
    try {
      if (!currentQuizInstance.value) {
        throw new Error('Aucune instance de quiz active')
      }

      const response = await quizService.submitAnswer({
        quiz_instance_id: currentQuizInstance.value.id,
        question_id: questionId,
        selected_answer: selectedAnswer,
        answered_at: new Date().toISOString()
      })

      // Mettre à jour l'instance locale
      if (response.data.quiz_instance) {
        currentQuizInstance.value = response.data.quiz_instance
      }

      return response.data
    } catch (err) {
      setError('Erreur lors de la soumission de la réponse')
      console.error('Erreur submitAnswer:', err)
      throw err
    }
  }

  const completeQuiz = async () => {
    try {
      if (!currentQuizInstance.value) {
        throw new Error('Aucune instance de quiz active')
      }

      const response = await quizService.complete(currentQuizInstance.value.id)
      
      // Recharger les stats utilisateur après completion
      await loadUserStats()
      await loadUser() // Pour mettre à jour les points et le rang
      
      // Nettoyer l'instance courante
      currentQuizInstance.value = null
      
      return response.data
    } catch (err) {
      setError('Erreur lors de la completion du quiz')
      console.error('Erreur completeQuiz:', err)
      throw err
    }
  }

  const initializeApp = async () => {
    try {
      isLoading.value = true
      await Promise.all([
        loadUser(),
        loadQuizTypes(),
        loadUserStats(),
        loadUserProgress()
      ])
    } catch (err) {
      setError('Erreur lors de l\'initialisation de l\'application')
      console.error('Erreur initializeApp:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Helpers
  const hasCompletedToday = (quizType) => {
    if (!userStats.value?.today_completed) return false
    return userStats.value.today_completed.some(
      completed => completed.quiz_type_id === quizType.id
    )
  }

  const hasInProgressQuiz = (quizType) => {
    const progress = userProgress.value[quizType.morph_type]
    return progress && progress.status === 'in_progress'
  }

  const getInProgressQuiz = (quizType) => {
    return userProgress.value[quizType.morph_type]
  }

  return {
    // État
    user,
    userStats,
    availableQuizTypes,
    currentQuizInstance,
    currentQuizSession,
    userProgress,
    isLoading,
    error,
    
    // Computed
    isAuthenticated,
    userRank,
    totalPoints,
    completedQuizzes,
    nextRecommendedQuiz,
    
    // Actions
    setError,
    clearError,
    loadUser,
    loadUserStats,
    loadQuizTypes,
    loadUserProgress,
    startAutomaticQuiz,
    continueQuiz,
    submitAnswer,
    completeQuiz,
    initializeApp,
    
    // Helpers
    hasCompletedToday,
    hasInProgressQuiz,
    getInProgressQuiz
  }
})
