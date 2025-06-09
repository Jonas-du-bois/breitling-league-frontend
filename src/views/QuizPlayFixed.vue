<template>
  <div class="quiz-play">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner">
        <i class="icon-loading"></i>
      </div>
      <p>Chargement du quiz...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">
        <i class="icon-alert-triangle"></i>
      </div>
      <h3>Erreur</h3>
      <p>{{ error }}</p>
      <button @click="retryLoading" class="btn-primary">
        Réessayer
      </button>
    </div>

    <!-- Quiz content -->
    <div v-else>
      <!-- Header avec progression -->
      <div class="quiz-header">
        <div class="quiz-progress-container">
          <div class="quiz-info">
            <h1 class="quiz-title">{{ quizInstance?.quizable?.title || 'Quiz en cours' }}</h1>
            <div class="quiz-meta">
              <span class="quiz-type">{{ getQuizTypeLabel(quizInstance?.quizable?.type) }}</span>
              <span class="quiz-points">{{ quizInstance?.quiz_type?.base_points || 1000 }} points</span>
            </div>
          </div>
          
          <div class="progress-section">
            <div class="progress-info">
              <span class="current-question">
                Question {{ currentQuestionIndex + 1 }} sur {{ totalQuestions }}
              </span>
              <span class="time-remaining" v-if="timeRemaining">
                <i class="icon-clock"></i>
                {{ formatTime(timeRemaining) }}
              </span>
            </div>
            
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Actions header -->
        <div class="quiz-actions">
          <button 
            @click="pauseQuiz" 
            class="btn-secondary"
            :disabled="isSubmitting"
          >
            <i class="icon-pause"></i>
            Pause
          </button>
          
          <button 
            @click="quitQuiz" 
            class="btn-danger"
            :disabled="isSubmitting"
          >
            <i class="icon-exit"></i>
            Quitter
          </button>
        </div>
      </div>

      <!-- Zone de jeu principale -->
      <div class="quiz-content" v-if="currentQuestion">
        <div class="question-container">
          <div class="question-header">
            <div class="question-number">
              {{ currentQuestionIndex + 1 }}
            </div>
            <div class="question-text">
              {{ currentQuestion.question }}
            </div>
          </div>
          
          <!-- Réponses -->
          <div class="answers-container">
            <div 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              class="answer-option"
              :class="{
                'selected': selectedAnswer === index,
                'correct': showResults && index === currentQuestion.correct_answer,
                'incorrect': showResults && selectedAnswer === index && index !== currentQuestion.correct_answer,
                'disabled': showResults || isSubmitting
              }"
              @click="selectAnswer(index)"
            >
              <div class="answer-letter">
                {{ String.fromCharCode(65 + index) }}
              </div>
              <div class="answer-text">
                {{ option }}
              </div>
              <div v-if="showResults" class="answer-indicator">
                <i 
                  v-if="index === currentQuestion.correct_answer" 
                  class="icon-check-circle correct-icon"
                ></i>
                <i 
                  v-else-if="selectedAnswer === index" 
                  class="icon-x-circle incorrect-icon"
                ></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Boutons d'action -->
        <div class="question-actions">
          <button 
            v-if="!showResults"
            @click="submitAnswer"
            class="btn-primary submit-btn"
            :disabled="selectedAnswer === null || isSubmitting"
          >
            <span v-if="isSubmitting">
              <i class="icon-loading"></i>
              Validation...
            </span>
            <span v-else>
              Valider la réponse
            </span>
          </button>
          
          <button 
            v-if="showResults"
            @click="nextQuestion"
            class="btn-primary next-btn"
            :disabled="isSubmitting"
          >
            <span v-if="isLastQuestion">
              Terminer le quiz
              <i class="icon-trophy"></i>
            </span>
            <span v-else>
              Question suivante
              <i class="icon-arrow-right"></i>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Résultats finaux -->
    <div v-if="showFinalResults" class="results-overlay">
      <div class="results-modal">
        <div class="results-content">
          <div class="results-header">
            <div class="results-icon">
              <i 
                :class="[
                  getFinalResultIcon(),
                  getFinalResultClass()
                ]"
              ></i>
            </div>
            <h2>{{ getFinalResultTitle() }}</h2>
            <p class="results-subtitle">{{ getFinalResultMessage() }}</p>
          </div>
          
          <div class="results-stats">
            <div class="stat-card">
              <div class="stat-value">{{ correctAnswers }}</div>
              <div class="stat-label">Bonnes réponses</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ Math.round(scorePercentage) }}%</div>
              <div class="stat-label">Score</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ earnedPoints }}</div>
              <div class="stat-label">Points gagnés</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ formatTime(totalTime) }}</div>
              <div class="stat-label">Temps total</div>
            </div>
          </div>
          
          <div class="results-actions">
            <button @click="returnToDashboard" class="btn-primary">
              <i class="icon-home"></i>
              Retour au dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import quizService from '@/services/quiz'

const route = useRoute()
const router = useRouter()

// État local du composant
const selectedAnswer = ref(null)
const showResults = ref(false)
const isSubmitting = ref(false)
const showFinalResults = ref(false)
const timeRemaining = ref(null)
const elapsedTime = ref(0)
const quizInstance = ref(null)
const questions = ref([])
const currentQuestionIndex = ref(0)
const isLoading = ref(true)
const error = ref(null)
const correctAnswers = ref(0)

// Timer
let timer = null

// Computed properties
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || null)
const totalQuestions = computed(() => questions.value.length || 0)
const progressPercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100
})

const isLastQuestion = computed(() => 
  currentQuestionIndex.value === totalQuestions.value - 1
)

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (correctAnswers.value / totalQuestions.value) * 100
})

const earnedPoints = computed(() => {
  const basePoints = quizInstance.value?.quiz_type?.base_points || 1000
  const multiplier = quizInstance.value?.quiz_type?.bonus_multiplier || 1
  return Math.round((scorePercentage.value / 100) * basePoints * multiplier)
})

const totalTime = computed(() => elapsedTime.value)

// Méthodes utilitaires
const getQuizTypeLabel = (type) => {
  const labels = {
    'discovery': 'Découverte',
    'weekly': 'Hebdomadaire', 
    'event': 'Événement',
    'novelty': 'Nouveauté',
    'unit': 'Unité'
  }
  return labels[type] || type
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Gestion des réponses
const selectAnswer = (index) => {
  if (showResults.value || isSubmitting.value) return
  selectedAnswer.value = index
}

const submitAnswer = async () => {
  if (selectedAnswer.value === null || isSubmitting.value) return
  
  isSubmitting.value = true
  
  // Vérifier si la réponse est correcte
  const isCorrect = selectedAnswer.value === currentQuestion.value.correct_answer
  if (isCorrect) {
    correctAnswers.value++
  }
  
  // Afficher le résultat
  showResults.value = true
  
  // Attendre un peu avant de passer à la question suivante
  setTimeout(() => {
    if (isLastQuestion.value) {
      // Quiz terminé, soumettre les résultats
      submitQuizResults()
    } else {
      // Question suivante
      nextQuestion()
    }
  }, 2000)
}

const nextQuestion = () => {
  currentQuestionIndex.value++
  selectedAnswer.value = null
  showResults.value = false
  isSubmitting.value = false
}

const submitQuizResults = async () => {
  try {
    // Préparer les données de soumission
    const submissionData = {
      quiz_instance_id: quizInstance.value.id,
      answers: [], // TODO: Collecter toutes les réponses
      total_time: elapsedTime.value
    }
    
    // Soumettre les résultats
    const response = await quizService.submit(submissionData)
    
    if (response.data?.success) {
      console.log('✅ Quiz soumis avec succès:', response.data)
      showFinalResults.value = true
      clearInterval(timer)
    } else {
      console.error('❌ Erreur lors de la soumission:', response.data)
    }
  } catch (error) {
    console.error('❌ Erreur lors de la soumission:', error)
  }
  
  isSubmitting.value = false
}

// Gestion de la pause
const pauseQuiz = () => {
  // TODO: Implémenter la pause
  console.log('Pause demandée')
}

const quitQuiz = () => {
  if (confirm('Êtes-vous sûr de vouloir quitter le quiz ? Votre progression sera perdue.')) {
    router.push('/quiz')
  }
}

// Timer management
const startTimer = () => {
  if (timer) clearInterval(timer)
  
  timer = setInterval(() => {
    elapsedTime.value++
  }, 1000)
}

// Résultats finaux
const getFinalResultClass = () => {
  if (scorePercentage.value >= 80) return 'excellent'
  if (scorePercentage.value >= 60) return 'good'
  if (scorePercentage.value >= 40) return 'average'
  return 'poor'
}

const getFinalResultIcon = () => {
  if (scorePercentage.value >= 80) return 'icon-trophy'
  if (scorePercentage.value >= 60) return 'icon-star'
  if (scorePercentage.value >= 40) return 'icon-thumbs-up'
  return 'icon-refresh'
}

const getFinalResultTitle = () => {
  if (scorePercentage.value >= 80) return 'Excellent !'
  if (scorePercentage.value >= 60) return 'Bien joué !'
  if (scorePercentage.value >= 40) return 'Pas mal !'
  return 'Continue tes efforts !'
}

const getFinalResultMessage = () => {
  if (scorePercentage.value >= 80) return 'Tu maîtrises parfaitement le sujet !'
  if (scorePercentage.value >= 60) return 'Tu as une bonne compréhension du sujet.'
  if (scorePercentage.value >= 40) return 'Tu peux encore t\'améliorer.'
  return 'N\'hésite pas à réviser et recommencer.'
}

const returnToDashboard = () => {
  router.push('/quiz')
}

const retryLoading = () => {
  const quizId = route.params.id
  if (quizId) {
    console.log('🔄 Tentative de rechargement pour quiz ID:', quizId)
    router.push('/quiz')
  }
}

// Lifecycle
onMounted(async () => {
  const quizId = route.params.id
  if (quizId) {
    console.log('📋 QuizPlay monté avec ID:', quizId)
    
    try {
      isLoading.value = true
      error.value = null
      
      // Charger les données de l'instance de quiz depuis l'API
      console.log('🔄 Chargement des données du quiz:', quizId)
      const response = await quizService.getInstance(quizId)
      
      if (response.data?.success && response.data?.data) {
        const instanceData = response.data.data
        console.log('✅ Données du quiz chargées:', instanceData)
        
        // Configurer l'instance de quiz
        quizInstance.value = instanceData
        
        // Si le quiz a des questions, les utiliser
        if (instanceData.questions && instanceData.questions.length > 0) {
          questions.value = instanceData.questions.map(q => ({
            id: q.id,
            question: q.question_text || q.statement,
            options: q.choices ? q.choices.map(c => c.choice_text || c.text) : [],
            correct_answer: q.correct_answer || 0
          }))
        } else {
          // Sinon, on doit démarrer le quiz pour obtenir les questions
          console.log('🚀 Pas de questions dans l\'instance, démarrage du quiz...')
          const startResponse = await quizService.start({
            quiz_type_id: instanceData.quiz_type_id,
            quizable_type: instanceData.quizable?.type,
            quizable_id: instanceData.quizable?.id
          })
          
          if (startResponse.data?.success && startResponse.data?.data) {
            const quizData = startResponse.data.data
            questions.value = quizData.questions.map(q => ({
              id: q.id,
              question: q.question_text || q.statement,
              options: q.choices ? q.choices.map(c => c.choice_text || c.text) : [],
              correct_answer: q.correct_answer || 0
            }))
            // Mettre à jour l'ID de l'instance avec celle nouvellement créée
            quizInstance.value.id = quizData.quiz_instance_id
          }
        }
        
        // Réinitialiser l'index des questions
        currentQuestionIndex.value = 0
        
        // Démarrer le timer
        startTimer()
        
        isLoading.value = false
      } else {
        console.error('❌ Échec du chargement des données du quiz')
        error.value = 'Impossible de charger le quiz'
        isLoading.value = false
      }
    } catch (err) {
      console.error('❌ Erreur lors du chargement du quiz:', err)
      error.value = 'Erreur lors du chargement du quiz'
      isLoading.value = false
    }
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.quiz-play {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

/* Loading et Error states */
.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.loading-spinner {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

.error-icon {
  font-size: 3rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

/* Header */
.quiz-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.quiz-progress-container {
  flex: 1;
  max-width: 600px;
}

.quiz-info {
  margin-bottom: 1rem;
}

.quiz-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.quiz-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  opacity: 0.8;
}

.quiz-type, .quiz-points {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.progress-section {
  margin-bottom: 0.5rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.time-remaining {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffd700;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  transition: width 0.3s ease;
}

.quiz-actions {
  display: flex;
  gap: 1rem;
}

/* Content */
.quiz-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.question-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.question-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.question-number {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.answer-option {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.answer-option:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.answer-option.selected {
  background: rgba(74, 222, 128, 0.2);
  border-color: #4ade80;
}

.answer-option.correct {
  background: rgba(34, 197, 94, 0.3);
  border-color: #22c55e;
}

.answer-option.incorrect {
  background: rgba(239, 68, 68, 0.3);
  border-color: #ef4444;
}

.answer-option.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.answer-letter {
  background: rgba(255, 255, 255, 0.3);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.answer-text {
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
}

.answer-indicator {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.correct-icon {
  color: #22c55e;
  font-size: 1.5rem;
}

.incorrect-icon {
  color: #ef4444;
  font-size: 1.5rem;
}

/* Actions */
.question-actions {
  text-align: center;
}

.submit-btn, .next-btn {
  min-width: 200px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Overlays */
.results-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.results-modal {
  background: white;
  color: #333;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.results-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.results-header {
  text-align: center;
}

.results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.results-icon.excellent {
  color: #ffd700;
}

.results-icon.good {
  color: #4ade80;
}

.results-icon.average {
  color: #f59e0b;
}

.results-icon.poor {
  color: #ef4444;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #0f172a;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-danger {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .quiz-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .quiz-content {
    padding: 1rem;
  }
  
  .question-header {
    flex-direction: column;
    text-align: center;
  }
  
  .results-stats {
    grid-template-columns: 1fr;
  }
  
  .results-actions {
    flex-direction: column;
  }
}
</style>
