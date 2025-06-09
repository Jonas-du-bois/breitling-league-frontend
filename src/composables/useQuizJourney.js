import { computed, ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useRouter } from 'vue-router'

/**
 * Composable pour la gestion automatique du parcours utilisateur des quiz
 * Implemente la logique KISS et DRY pour une UX fluide
 */
export function useQuizJourney() {
  const quizStore = useQuizStore()
  const router = useRouter()
  
  const currentStep = ref('loading') // loading, dashboard, quiz, completed, error
  const quizProgress = ref({
    currentQuestionIndex: 0,
    totalQuestions: 0,
    answers: {},
    startTime: null,
    timeSpent: 0
  })

  // Computed pour l'état de l'interface
  const journeyState = computed(() => {
    const { user, isLoading, nextRecommendedQuiz, userProgress } = quizStore
    
    if (isLoading) return 'loading'
    if (!user) return 'auth_required'
    
    // Vérifier s'il y a un quiz en cours
    const inProgressQuiz = Object.values(userProgress).find(
      progress => progress && progress.status === 'in_progress'
    )
    
    if (inProgressQuiz) return 'resume_available'
    if (nextRecommendedQuiz) return 'ready_to_start'
    
    return 'no_quiz_available'
  })

  const currentQuizMeta = computed(() => {
    const instance = quizStore.currentQuizInstance
    if (!instance) return null

    return {
      type: instance.quiz_type?.name || 'Quiz',
      description: instance.quiz_type?.description || '',
      totalQuestions: instance.questions?.length || 0,
      currentQuestion: quizProgress.value.currentQuestionIndex + 1,
      timeLimit: instance.quiz_type?.time_limit_minutes || null,
      pointsPerCorrect: instance.quiz_type?.points_per_correct_answer || 1
    }
  })

  const currentQuestion = computed(() => {
    const instance = quizStore.currentQuizInstance
    if (!instance?.questions) return null

    const questions = instance.questions
    const index = quizProgress.value.currentQuestionIndex
    
    if (index >= questions.length) return null
    
    return questions[index]
  })

  const isQuizCompleted = computed(() => {
    const meta = currentQuizMeta.value
    if (!meta) return false
    
    return quizProgress.value.currentQuestionIndex >= meta.totalQuestions
  })

  const progressPercentage = computed(() => {
    const meta = currentQuizMeta.value
    if (!meta || meta.totalQuestions === 0) return 0
    
    return Math.round((quizProgress.value.currentQuestionIndex / meta.totalQuestions) * 100)
  })

  // Actions automatiques
  const startQuizJourney = async (forceType = null) => {
    try {
      currentStep.value = 'loading'
      
      // Démarrer automatiquement le quiz le plus approprié
      const quizInstance = await quizStore.startAutomaticQuiz(forceType)
      
      if (quizInstance) {
        initializeQuizSession(quizInstance)
        currentStep.value = 'quiz'
        return quizInstance
      } else {
        currentStep.value = 'error'
        return null
      }
    } catch (error) {
      console.error('Erreur startQuizJourney:', error)
      currentStep.value = 'error'
      return null
    }
  }

  const resumeQuiz = async (quizInstanceId) => {
    try {
      currentStep.value = 'loading'
      
      const quizInstance = await quizStore.continueQuiz(quizInstanceId)
      
      if (quizInstance) {
        initializeQuizSession(quizInstance)
        currentStep.value = 'quiz'
        return quizInstance
      } else {
        currentStep.value = 'error'
        return null
      }
    } catch (error) {
      console.error('Erreur resumeQuiz:', error)
      currentStep.value = 'error'
      return null
    }
  }

  const initializeQuizSession = (quizInstance) => {
    const answeredQuestions = Object.keys(quizInstance.user_answers || {}).length
    
    quizProgress.value = {
      currentQuestionIndex: answeredQuestions,
      totalQuestions: quizInstance.questions?.length || 0,
      answers: { ...quizInstance.user_answers },
      startTime: quizInstance.started_at ? new Date(quizInstance.started_at) : new Date(),
      timeSpent: 0
    }
  }

  const submitCurrentAnswer = async (selectedAnswer) => {
    try {
      const question = currentQuestion.value
      if (!question) throw new Error('Aucune question courante')

      // Enregistrer la réponse localement
      quizProgress.value.answers[question.id] = selectedAnswer

      // Soumettre au backend
      await quizStore.submitAnswer(question.id, selectedAnswer)

      // Passer à la question suivante ou terminer
      if (quizProgress.value.currentQuestionIndex < quizProgress.value.totalQuestions - 1) {
        quizProgress.value.currentQuestionIndex++
      } else {
        // Quiz terminé
        await completeCurrentQuiz()
      }

      return true
    } catch (error) {
      console.error('Erreur submitCurrentAnswer:', error)
      quizStore.setError('Erreur lors de la soumission de la réponse')
      return false
    }
  }

  const completeCurrentQuiz = async () => {
    try {
      currentStep.value = 'loading'
      
      const result = await quizStore.completeQuiz()
      
      currentStep.value = 'completed'
      
      // Auto-navigation vers le dashboard après 3 secondes
      setTimeout(() => {
        returnToDashboard()
      }, 3000)
      
      return result
    } catch (error) {
      console.error('Erreur completeCurrentQuiz:', error)
      currentStep.value = 'error'
      return null
    }
  }

  const returnToDashboard = () => {
    currentStep.value = 'dashboard'
    quizProgress.value = {
      currentQuestionIndex: 0,
      totalQuestions: 0,
      answers: {},
      startTime: null,
      timeSpent: 0
    }
  }

  const skipToNextRecommended = async () => {
    try {
      // Trouver le prochain quiz recommandé différent de l'actuel
      const currentType = quizStore.currentQuizInstance?.quiz_type?.morph_type
      const available = quizStore.availableQuizTypes.filter(
        type => type.morph_type !== currentType && !quizStore.hasCompletedToday(type)
      )
      
      if (available.length === 0) {
        quizStore.setError('Aucun autre quiz disponible aujourd\'hui')
        return false
      }
      
      await startQuizJourney(available[0])
      return true
    } catch (error) {
      console.error('Erreur skipToNextRecommended:', error)
      return false
    }
  }

  // Auto-initialisation des timers
  const startTimeTracking = () => {
    if (quizProgress.value.startTime) {
      const interval = setInterval(() => {
        if (currentStep.value === 'quiz') {
          quizProgress.value.timeSpent = Math.floor(
            (Date.now() - quizProgress.value.startTime.getTime()) / 1000
          )
        } else {
          clearInterval(interval)
        }
      }, 1000)
    }
  }

  // Watchers pour l'automatisation
  watch(currentStep, (newStep) => {
    if (newStep === 'quiz') {
      startTimeTracking()
    }
  })

  // Navigation helpers
  const navigateToQuiz = () => {
    if (router.currentRoute.value.name !== 'QuizPlay') {
      router.push({ name: 'QuizPlay' })
    }
  }

  const navigateToDashboard = () => {
    if (router.currentRoute.value.name !== 'Dashboard') {
      router.push({ name: 'Dashboard' })
    }
  }

  // Initialisation automatique
  const initializeJourney = async () => {
    await quizStore.initializeApp()
    
    const state = journeyState.value
    
    switch (state) {
      case 'resume_available':
        const inProgress = Object.values(quizStore.userProgress).find(
          p => p && p.status === 'in_progress'
        )
        if (inProgress) {
          await resumeQuiz(inProgress.id)
        }
        break
        
      case 'ready_to_start':
        currentStep.value = 'dashboard'
        break
        
      case 'auth_required':
        router.push({ name: 'Login' })
        break
        
      default:
        currentStep.value = 'dashboard'
    }
  }

  return {
    // État
    currentStep,
    quizProgress,
    
    // Computed
    journeyState,
    currentQuizMeta,
    currentQuestion,
    isQuizCompleted,
    progressPercentage,
    
    // Actions
    startQuizJourney,
    resumeQuiz,
    submitCurrentAnswer,
    completeCurrentQuiz,
    returnToDashboard,
    skipToNextRecommended,
    initializeJourney,
    
    // Navigation
    navigateToQuiz,
    navigateToDashboard
  }
}
