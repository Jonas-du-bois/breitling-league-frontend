<template>
  <div class="quiz-journey-view">
    <header class="header">
      <h1>🎯 Parcours Utilisateur - Quiz Breitling League</h1>
      <p class="subtitle">Test complet de l'expérience utilisateur pour les quiz</p>
    </header>

    <!-- Indicateur de chargement global -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>{{ loadingMessage }}</p>
      </div>
    </div>

    <!-- Erreur globale -->
    <div v-if="error" class="error-banner">
      <span class="error-icon">⚠️</span>
      <span class="error-text">{{ error }}</span>
      <button @click="clearError" class="error-close">✕</button>
    </div>

    <!-- Navigation par étapes -->
    <nav class="journey-nav">
      <div 
        v-for="step in journeySteps" 
        :key="step.id"
        :class="['step-item', { 
          active: currentStep === step.id,
          completed: completedSteps.includes(step.id),
          disabled: !canAccessStep(step.id)
        }]"
        @click="goToStep(step.id)"
      >
        <div class="step-number">{{ step.id }}</div>
        <div class="step-details">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-description">{{ step.description }}</div>
        </div>
        <div v-if="completedSteps.includes(step.id)" class="step-check">✓</div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="journey-content">
      <!-- Étape 1: Chargement des types de quiz -->
      <section v-if="currentStep === 1" class="step-section">
        <h2>📋 Étape 1: Types de Quiz Disponibles</h2>
        
        <div class="actions">
          <button @click="loadQuizTypes" :disabled="isLoading" class="btn btn-primary">
            Charger les Types de Quiz
          </button>
        </div>

        <div v-if="quizData.quizTypes.length > 0" class="quiz-types-grid">
          <div 
            v-for="quizType in quizData.quizTypes" 
            :key="quizType.id"
            :class="['quiz-type-card', { selected: selectedQuizType?.id === quizType.id }]"
            @click="selectQuizType(quizType)"
          >
            <h3>{{ quizType.nom }}</h3>
            <div class="quiz-type-details">
              <div class="detail-item">
                <span class="label">Points de base:</span>
                <span class="value">{{ quizType.base_points }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Bonus vitesse:</span>
                <span class="value">{{ quizType.speed_bonus }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Donne un ticket:</span>
                <span class="value">{{ quizType.gives_ticket ? 'Oui' : 'Non' }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Instances:</span>
                <span class="value">{{ quizType.instances_count || 0 }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedQuizType" class="selected-quiz-info">
          <h4>✅ Type sélectionné: {{ selectedQuizType.nom }}</h4>
          <button @click="nextStep" class="btn btn-success">
            Continuer vers l'étape 2 →
          </button>
        </div>
      </section>

      <!-- Étape 2: Démarrage du quiz -->
      <section v-if="currentStep === 2" class="step-section">
        <h2>🚀 Étape 2: Démarrage du Quiz</h2>
        
        <div v-if="selectedQuizType" class="quiz-start-config">
          <h3>Configuration du Quiz</h3>
          <div class="config-form">
            <div class="form-group">
              <label>Type de Quiz:</label>
              <span class="selected-value">{{ selectedQuizType.nom }}</span>
            </div>
            <div class="form-group">
              <label for="moduleType">Type de Module:</label>
              <select id="moduleType" v-model="startConfig.module_type" class="form-control">
                <option value="Unit">Unit</option>
                <option value="Discovery">Discovery</option>
                <option value="Event">Event</option>
                <option value="Weekly">Weekly</option>
                <option value="Novelty">Novelty</option>
                <option value="Reminder">Reminder</option>
              </select>
            </div>
            <div class="form-group">
              <label for="moduleId">ID du Module:</label>
              <input 
                id="moduleId" 
                type="number" 
                v-model.number="startConfig.module_id" 
                class="form-control"
                min="1"
                placeholder="Ex: 1"
              >
            </div>
            <div class="form-group">
              <label for="chapterId">ID du Chapitre (optionnel):</label>
              <input 
                id="chapterId" 
                type="number" 
                v-model.number="startConfig.chapter_id" 
                class="form-control"
                min="1"
                placeholder="Ex: 3"
              >
            </div>
          </div>

          <div class="actions">
            <button @click="startQuiz" :disabled="isLoading || !canStartQuiz" class="btn btn-primary">
              🎯 Démarrer le Quiz
            </button>
          </div>
        </div>

        <div v-if="currentSession" class="quiz-session-info">
          <h4>✅ Quiz démarré avec succès!</h4>
          <div class="session-details">
            <div class="detail-item">
              <span class="label">ID de la session:</span>
              <span class="value">{{ currentSession.quiz_instance_id }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Nombre de questions:</span>
              <span class="value">{{ currentSession.total_questions }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Temps limite:</span>
              <span class="value">{{ currentSession.time_limit }}s</span>
            </div>
          </div>
          <button @click="nextStep" class="btn btn-success">
            Continuer vers les questions →
          </button>
        </div>
      </section>

      <!-- Étape 3: Répondre aux questions -->
      <section v-if="currentStep === 3" class="step-section">
        <h2>❓ Étape 3: Questions du Quiz</h2>
        
        <div v-if="currentSession?.questions" class="quiz-questions">
          <div class="quiz-header">
            <div class="quiz-info">
              <span class="quiz-title">{{ selectedQuizType.nom }}</span>
              <span class="question-count">{{ currentSession.questions.length }} questions</span>
            </div>
            <div class="timer">
              <span class="timer-label">Temps écoulé:</span>
              <span class="timer-value">{{ formatTime(elapsedTime) }}</span>
            </div>
          </div>

          <div class="questions-container">
            <div 
              v-for="(question, index) in currentSession.questions" 
              :key="question.id"
              class="question-block"
            >
              <h4 class="question-title">
                Question {{ index + 1 }}: {{ question.question_text }}
              </h4>
              
              <div class="choices-list">
                <label 
                  v-for="choice in question.choices" 
                  :key="choice.id"
                  class="choice-option"
                >
                  <input 
                    type="radio" 
                    :name="`question_${question.id}`"
                    :value="choice.id"
                    v-model="userAnswers[question.id]"
                    class="choice-radio"
                  >
                  <span class="choice-text">{{ choice.choice_text }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="quiz-controls">
            <div class="answers-summary">
              <span>Réponses données: {{ Object.keys(userAnswers).length }} / {{ currentSession.questions.length }}</span>
            </div>
            <button 
              @click="submitQuiz" 
              :disabled="isLoading || !canSubmitQuiz" 
              class="btn btn-success btn-large"
            >
              📝 Soumettre le Quiz
            </button>
          </div>
        </div>
      </section>

      <!-- Étape 4: Résultats -->
      <section v-if="currentStep === 4" class="step-section">
        <h2>📊 Étape 4: Résultats du Quiz</h2>
        
        <div v-if="quizResult" class="quiz-results">
          <div class="result-header">
            <h3>Félicitations! Quiz terminé 🎉</h3>
          </div>

          <div class="result-summary">
            <div class="summary-cards">
              <div class="summary-card score">
                <div class="card-icon">🎯</div>
                <div class="card-content">
                  <div class="card-title">Score</div>
                  <div class="card-value">{{ quizResult.score?.score || 0 }} / {{ quizResult.score?.total_questions || 0 }}</div>
                  <div class="card-subtitle">{{ Math.round(quizResult.score?.percentage || 0) }}%</div>
                </div>
              </div>

              <div class="summary-card points">
                <div class="card-icon">💎</div>
                <div class="card-content">
                  <div class="card-title">Points</div>
                  <div class="card-value">{{ quizResult.score?.total_points || 0 }}</div>
                  <div class="card-subtitle">
                    Base: {{ (quizResult.score?.score || 0) * (selectedQuizType?.base_points || 0) }}
                    <span v-if="quizResult.score?.speed_bonus">+ Vitesse: {{ quizResult.score.speed_bonus }}</span>
                  </div>
                </div>
              </div>

              <div class="summary-card time">
                <div class="card-icon">⏱️</div>
                <div class="card-content">
                  <div class="card-title">Temps</div>
                  <div class="card-value">{{ formatTime(quizResult.quiz_instance?.total_time || 0) }}</div>
                  <div class="card-subtitle">
                    <span v-if="quizResult.score?.time_bonus">Bonus: +{{ quizResult.score.time_bonus }}</span>
                  </div>
                </div>
              </div>

              <div v-if="quizResult.score?.ticket_obtained" class="summary-card ticket">
                <div class="card-icon">🎫</div>
                <div class="card-content">
                  <div class="card-title">Ticket</div>
                  <div class="card-value">Obtenu!</div>
                  <div class="card-subtitle">Félicitations</div>
                </div>
              </div>
            </div>
          </div>

          <div class="detailed-results">
            <h4>Détail des réponses</h4>
            <div class="answers-review">
              <div 
                v-for="answer in quizResult.answers" 
                :key="answer.question_id"
                :class="['answer-item', { correct: answer.is_correct, incorrect: !answer.is_correct }]"
              >
                <div class="answer-status">
                  <span class="status-icon">{{ answer.is_correct ? '✅' : '❌' }}</span>
                </div>
                <div class="answer-content">
                  <div class="question-text">{{ answer.question?.question_text }}</div>
                  <div class="choice-text">Votre réponse: {{ answer.choice?.choice_text }}</div>
                  <div v-if="answer.time_taken" class="time-taken">Temps: {{ answer.time_taken }}s</div>
                </div>
              </div>
            </div>
          </div>

          <div class="actions">
            <button @click="loadUserStats" class="btn btn-primary">
              📈 Voir mes Statistiques
            </button>
            <button @click="restartJourney" class="btn btn-secondary">
              🔄 Recommencer un Quiz
            </button>
          </div>
        </div>
      </section>

      <!-- Étape 5: Statistiques utilisateur -->
      <section v-if="currentStep === 5" class="step-section">
        <h2>📈 Étape 5: Vos Statistiques</h2>
        
        <div v-if="userStats" class="user-stats">
          <div class="stats-overview">
            <h3>Vue d'ensemble</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-label">Total des quiz</div>
                <div class="stat-value">{{ userStats.total_instances || 0 }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Quiz complétés</div>
                <div class="stat-value">{{ userStats.completed_instances || 0 }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Quiz en attente</div>
                <div class="stat-value">{{ userStats.pending_instances || 0 }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Score moyen</div>
                <div class="stat-value">{{ userStats.average_score || 0 }}%</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Meilleur score</div>
                <div class="stat-value">{{ userStats.best_score || 0 }}%</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Total des points</div>
                <div class="stat-value">{{ userStats.total_points || 0 }}</div>
              </div>
            </div>
          </div>

          <div v-if="userStats.quiz_types_stats?.length > 0" class="stats-by-type">
            <h3>Statistiques par type de quiz</h3>
            <div class="type-stats-list">
              <div 
                v-for="typeStat in userStats.quiz_types_stats" 
                :key="typeStat.quiz_type_id"
                class="type-stat-item"
              >
                <div class="type-name">{{ typeStat.quiz_type_name }}</div>
                <div class="type-details">
                  <span>{{ typeStat.completed_count }} / {{ typeStat.instances_count }} complétés</span>
                  <span>Moyenne: {{ typeStat.average_score }}%</span>
                  <span>Meilleur: {{ typeStat.best_score }}%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="actions">
            <button @click="loadQuizInstances" class="btn btn-primary">
              📋 Voir Mes Quiz
            </button>
            <button @click="restartJourney" class="btn btn-success">
              🎯 Nouveau Quiz
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Logs en temps réel -->
    <aside class="debug-panel" v-if="showDebug">
      <h3>🔍 Logs de Debug</h3>
      <div class="debug-logs">
        <div v-for="(log, index) in debugLogs" :key="index" :class="['log-entry', log.type]">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
      <button @click="clearDebugLogs" class="btn btn-small">Effacer</button>
    </aside>

    <!-- Toggle debug -->
    <button @click="showDebug = !showDebug" class="debug-toggle">
      {{ showDebug ? '🔍' : '👁️' }}
    </button>
  </div>
</template>

<script>
import { useQuiz } from '@/composables/useQuiz'

export default {
  name: 'QuizUserJourneyView',
  setup() {
    const {
      // État
      isLoading,
      error,
      quizData,
      
      // Méthodes principales
      loadQuizTypes,
      startQuiz: composableStartQuiz,
      submitQuiz: composableSubmitQuiz,
      getQuizResult,
      loadUserStats: composableLoadUserStats,
      loadQuizInstances: composableLoadQuizInstances,
      
      // Utilitaires
      clearError
    } = useQuiz()

    return {
      // État du composable
      isLoading,
      error,
      quizData,
      
      // Méthodes du composable
      loadQuizTypes,
      composableStartQuiz,
      composableSubmitQuiz,
      getQuizResult,
      composableLoadUserStats,
      composableLoadQuizInstances,
      clearError
    }
  },
  
  data() {
    return {
      // Navigation
      currentStep: 1,
      completedSteps: [],
      loadingMessage: '',
      
      // Configuration du quiz
      selectedQuizType: null,
      startConfig: {
        module_type: 'Unit',
        module_id: 1,
        chapter_id: null
      },
      
      // Session de quiz
      currentSession: null,
      userAnswers: {},
      quizStartTime: null,
      elapsedTime: 0,
      timer: null,
      
      // Résultats
      quizResult: null,
      userStats: null,
      
      // Debug
      showDebug: false,
      debugLogs: [],
      
      // Configuration des étapes
      journeySteps: [
        {
          id: 1,
          title: 'Types de Quiz',
          description: 'Découvrir les types disponibles'
        },
        {
          id: 2,
          title: 'Configuration',
          description: 'Paramétrer et démarrer'
        },
        {
          id: 3,
          title: 'Questions',
          description: 'Répondre au quiz'
        },
        {
          id: 4,
          title: 'Résultats',
          description: 'Voir les résultats'
        },
        {
          id: 5,
          title: 'Statistiques',
          description: 'Analyser les performances'
        }
      ]
    }
  },
  
  computed: {
    canStartQuiz() {
      return this.selectedQuizType && 
             this.startConfig.module_type && 
             this.startConfig.module_id > 0
    },
    
    canSubmitQuiz() {
      if (!this.currentSession?.questions) return false
      return Object.keys(this.userAnswers).length === this.currentSession.questions.length
    }
  },
  
  methods: {
    // === NAVIGATION ===
    canAccessStep(stepId) {
      if (stepId === 1) return true
      return this.completedSteps.includes(stepId - 1)
    },
    
    goToStep(stepId) {
      if (this.canAccessStep(stepId)) {
        this.currentStep = stepId
      }
    },
    
    nextStep() {
      if (!this.completedSteps.includes(this.currentStep)) {
        this.completedSteps.push(this.currentStep)
      }
      this.currentStep++
      this.addDebugLog('info', `Passage à l'étape ${this.currentStep}`)
    },
    
    // === QUIZ ACTIONS ===
    selectQuizType(quizType) {
      this.selectedQuizType = quizType
      this.addDebugLog('success', `Type de quiz sélectionné: ${quizType.nom}`)
    },
    
    async startQuiz() {
      try {
        this.loadingMessage = 'Démarrage du quiz...'
        this.addDebugLog('info', 'Démarrage du quiz...')
        
        const quizData = {
          quiz_type_id: this.selectedQuizType.id,
          module_type: this.startConfig.module_type,
          module_id: this.startConfig.module_id
        }
        
        if (this.startConfig.chapter_id) {
          quizData.chapter_id = this.startConfig.chapter_id
        }
        
        const response = await this.composableStartQuiz(
          quizData.quiz_type_id,
          quizData.module_type,
          quizData.module_id,
          quizData.chapter_id
        )
        
        this.currentSession = response.data
        this.quizStartTime = Date.now()
        this.startTimer()
        
        this.addDebugLog('success', `Quiz démarré - Instance ID: ${this.currentSession.quiz_instance_id}`)
        this.nextStep()
        
      } catch (err) {
        this.addDebugLog('error', `Erreur démarrage: ${err.message}`)
      }
    },
    
    async submitQuiz() {
      try {
        this.stopTimer()
        this.loadingMessage = 'Soumission des réponses...'
        this.addDebugLog('info', 'Soumission des réponses...')
        
        // Préparer les réponses au format attendu par l'API
        const answers = Object.entries(this.userAnswers).map(([questionId, choiceId]) => ({
          question_id: parseInt(questionId),
          choice_id: parseInt(choiceId)
        }))
        
        const totalTime = Math.floor(this.elapsedTime)
        
        await this.composableSubmitQuiz(
          this.currentSession.quiz_instance_id,
          answers,
          totalTime
        )
        
        // Récupérer le résultat détaillé
        const resultResponse = await this.getQuizResult(this.currentSession.quiz_instance_id)
        this.quizResult = resultResponse.data
        
        this.addDebugLog('success', `Quiz soumis - Score: ${this.quizResult.score?.score}/${this.quizResult.score?.total_questions}`)
        this.nextStep()
        
      } catch (err) {
        this.addDebugLog('error', `Erreur soumission: ${err.message}`)
      }
    },
    
    async loadUserStats() {
      try {
        this.loadingMessage = 'Chargement des statistiques...'
        this.addDebugLog('info', 'Chargement des statistiques...')
        
        const response = await this.composableLoadUserStats()
        this.userStats = response.data
        
        this.addDebugLog('success', `Statistiques chargées - ${this.userStats.total_instances} quiz total`)
        this.nextStep()
        
      } catch (err) {
        this.addDebugLog('error', `Erreur statistiques: ${err.message}`)
      }
    },
    
    async loadQuizInstances() {
      try {
        this.loadingMessage = 'Chargement des instances...'
        this.addDebugLog('info', 'Chargement des instances de quiz...')
        
        const response = await this.composableLoadQuizInstances()
        
        this.addDebugLog('success', `${response.data.instances?.length || 0} instances chargées`)
        
      } catch (err) {
        this.addDebugLog('error', `Erreur instances: ${err.message}`)
      }
    },
    
    // === TIMER ===
    startTimer() {
      this.timer = setInterval(() => {
        this.elapsedTime = Math.floor((Date.now() - this.quizStartTime) / 1000)
      }, 1000)
    },
    
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    
    // === UTILS ===
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    
    restartJourney() {
      // Reset de tout l'état
      this.currentStep = 1
      this.completedSteps = []
      this.selectedQuizType = null
      this.currentSession = null
      this.userAnswers = {}
      this.quizResult = null
      this.userStats = null
      this.stopTimer()
      this.elapsedTime = 0
      
      this.addDebugLog('info', 'Parcours redémarré')
    },
    
    // === DEBUG ===
    addDebugLog(type, message) {
      const now = new Date()
      this.debugLogs.unshift({
        type,
        message,
        time: now.toLocaleTimeString()
      })
      
      // Garder seulement les 50 derniers logs
      if (this.debugLogs.length > 50) {
        this.debugLogs = this.debugLogs.slice(0, 50)
      }
    },
    
    clearDebugLogs() {
      this.debugLogs = []
    }
  },
  
  mounted() {
    this.addDebugLog('info', 'Parcours utilisateur Quiz démarré')
  },
  
  unmounted() {
    this.stopTimer()
  }
}
</script>

<style scoped>
.quiz-journey-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* === LOADING & ERROR === */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-banner {
  background: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.error-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
}

/* === NAVIGATION === */
.journey-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.step-item {
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 1rem;
  min-width: 200px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  color: white;
}

.step-item.active {
  background: rgba(255,255,255,0.2);
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.step-item.completed {
  background: rgba(46, 204, 113, 0.3);
}

.step-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-number {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
}

.step-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.step-description {
  font-size: 0.9rem;
  opacity: 0.8;
}

.step-check {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #27ae60;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* === CONTENT === */
.journey-content {
  max-width: 1200px;
  margin: 0 auto;
}

.step-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.step-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

/* === BUTTONS === */
.actions {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-2px);
}

.btn-success {
  background: #27ae60;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #229954;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* === QUIZ TYPES === */
.quiz-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.quiz-type-card {
  border: 2px solid #ecf0f1;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.quiz-type-card:hover {
  border-color: #3498db;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.2);
}

.quiz-type-card.selected {
  border-color: #27ae60;
  background: #e8f5e8;
}

.quiz-type-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.quiz-type-details {
  display: grid;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.value {
  font-weight: 600;
  color: #2c3e50;
}

/* === FORMS === */
.config-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.selected-value {
  background: #e8f5e8;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #27ae60;
  font-weight: 600;
}

/* === QUIZ SESSION === */
.session-details, .quiz-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #3498db;
  color: white;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.timer {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
}

/* === QUESTIONS === */
.questions-container {
  margin: 1.5rem 0;
}

.question-block {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #3498db;
}

.question-title {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.choices-list {
  display: grid;
  gap: 0.75rem;
}

.choice-option {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.choice-option:hover {
  border-color: #3498db;
  background: #f0f8ff;
}

.choice-radio {
  margin-right: 0.75rem;
}

.choice-text {
  flex: 1;
  color: #2c3e50;
}

.quiz-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 2rem;
}

.answers-summary {
  font-weight: 600;
  color: #7f8c8d;
}

/* === RESULTS === */
.quiz-results {
  text-align: center;
}

.result-header h3 {
  color: #27ae60;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.summary-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-left: 4px solid;
}

.summary-card.score { border-left-color: #3498db; }
.summary-card.points { border-left-color: #f39c12; }
.summary-card.time { border-left-color: #9b59b6; }
.summary-card.ticket { border-left-color: #27ae60; }

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 0.9rem;
  color: #7f8c8d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0.25rem 0;
}

.card-subtitle {
  font-size: 0.8rem;
  color: #95a5a6;
}

/* === DETAILED RESULTS === */
.detailed-results {
  text-align: left;
  margin: 2rem 0;
}

.answers-review {
  display: grid;
  gap: 1rem;
}

.answer-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid;
}

.answer-item.correct {
  background: #e8f5e8;
  border-left-color: #27ae60;
}

.answer-item.incorrect {
  background: #fdeaea;
  border-left-color: #e74c3c;
}

.answer-status {
  margin-right: 1rem;
}

.status-icon {
  font-size: 1.2rem;
}

.answer-content {
  flex: 1;
}

.question-text {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.choice-text {
  color: #7f8c8d;
  margin-bottom: 0.25rem;
}

.time-taken {
  font-size: 0.8rem;
  color: #95a5a6;
}

/* === STATS === */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.stat-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.type-stats-list {
  display: grid;
  gap: 1rem;
}

.type-stat-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.type-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.type-details {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
  flex-wrap: wrap;
}

/* === DEBUG === */
.debug-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 350px;
  max-height: 400px;
  background: rgba(0,0,0,0.9);
  color: white;
  border-radius: 8px;
  padding: 1rem;
  z-index: 999;
  overflow: hidden;
}

.debug-panel h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.debug-logs {
  max-height: 300px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.log-entry {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
  border-radius: 4px;
}

.log-entry.info { background: rgba(52, 152, 219, 0.2); }
.log-entry.success { background: rgba(39, 174, 96, 0.2); }
.log-entry.error { background: rgba(231, 76, 60, 0.2); }

.log-time {
  color: #95a5a6;
  min-width: 60px;
}

.debug-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.7);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 998;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .quiz-journey-view {
    padding: 10px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .journey-nav {
    flex-direction: column;
    align-items: center;
  }
  
  .step-item {
    width: 100%;
    max-width: 300px;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
  }
  
  .quiz-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .quiz-controls {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .debug-panel {
    position: relative;
    width: 100%;
    margin-top: 2rem;
  }
}
</style>
