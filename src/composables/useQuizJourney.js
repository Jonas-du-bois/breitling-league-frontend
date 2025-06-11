import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Composable pour la navigation dans un quiz
 * Version CLEAN : une seule responsabilité - navigation entre questions
 */
export function useQuizJourney() {
  const router = useRouter()
  
  // === STATE ===
  const currentQuestionIndex = ref(0)
  const startTime = ref(null)
  const answers = ref(new Map())
  
  // === COMPUTED ===
  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)
  const canGoBack = computed(() => !isFirstQuestion.value)
  
  function isLastQuestion(totalQuestions) {
    return currentQuestionIndex.value >= totalQuestions - 1
  }
  
  function getProgressPercentage(totalQuestions) {
    if (totalQuestions === 0) return 0
    return Math.round((currentQuestionIndex.value / totalQuestions) * 100)
  }
  
  // === NAVIGATION ===
  
  /**
   * Va à la question suivante
   */
  function nextQuestion(totalQuestions) {
    if (!isLastQuestion(totalQuestions)) {
      currentQuestionIndex.value++
    }
  }
  
  /**
   * Va à la question précédente
   */
  function previousQuestion() {
    if (canGoBack.value) {
      currentQuestionIndex.value--
    }
  }
  
  /**
   * Va directement à une question spécifique
   */
  function goToQuestion(index, totalQuestions) {
    if (index >= 0 && index < totalQuestions) {
      currentQuestionIndex.value = index
    }
  }
  
  // === QUIZ SESSION ===
  
  /**
   * Démarre une session de quiz
   */
  function startSession() {
    startTime.value = Date.now()
    currentQuestionIndex.value = 0
    answers.value.clear()
  }
  
  /**
   * Enregistre une réponse pour la question courante
   */
  function saveAnswer(questionId, choiceId) {
    const answerTime = Date.now()
    const timeTaken = startTime.value ? Math.round((answerTime - startTime.value) / 1000) : 10
    
    answers.value.set(questionId, {
      choice_id: choiceId,
      time_taken: timeTaken,
      answered_at: answerTime
    })
  }
  
  /**
   * Récupère toutes les réponses au format API
   */
  function getAnswersForSubmission() {
    return Array.from(answers.value.entries()).map(([questionId, answer]) => ({
      question_id: parseInt(questionId),
      choice_id: answer.choice_id,
      time_taken: answer.time_taken
    }))
  }
  
  /**
   * Calcule le temps total écoulé
   */
  function getTotalTime() {
    if (!startTime.value) return 0
    return Math.round((Date.now() - startTime.value) / 1000)
  }
  
  /**
   * Réinitialise la session
   */
  function resetSession() {
    currentQuestionIndex.value = 0
    startTime.value = null
    answers.value.clear()
  }
  
  // === NAVIGATION ENTRE VUES ===
  
  /**
   * Navigue vers la page de quiz
   */
  function goToQuiz(quizInstanceId) {
    router.push(`/quiz/${quizInstanceId}`)
  }
  
  /**
   * Navigue vers la page de résultats
   */
  function goToResults(quizInstanceId) {
    router.push(`/quiz/${quizInstanceId}/results`)
  }
  
  /**
   * Retourne au dashboard
   */
  function goToDashboard() {
    router.push('/dashboard')
  }
  
  return {
    // State
    currentQuestionIndex,
    answers,
    startTime,
    
    // Computed
    isFirstQuestion,
    canGoBack,
    
    // Question navigation
    nextQuestion,
    previousQuestion,
    goToQuestion,
    isLastQuestion,
    getProgressPercentage,
    
    // Quiz session
    startSession,
    saveAnswer,
    getAnswersForSubmission,
    getTotalTime,
    resetSession,
    
    // Page navigation
    goToQuiz,
    goToResults,
    goToDashboard
  }
}
