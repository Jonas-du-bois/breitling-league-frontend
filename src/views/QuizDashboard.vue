<template>  <div class="quiz-dashboard">
    <!-- Loading overlay -->
    <LoadingSpinner v-if="journeyState === 'loading'" overlay message="Initialisation..." />
    
    <!-- Error state -->
    <ErrorBanner
      v-if="journeyState === 'error'"
      type="error"
      title="Erreur de chargement"
      :message="error || 'Une erreur est survenue'"
      :actions="[
        { label: 'Réessayer', handler: () => initializeJourney(), primary: true }
      ]"
    />

    <!-- Dashboard principal -->
    <div v-else class="dashboard-content">
      <!-- Header avec profil utilisateur -->
      <header class="dashboard-header">
        <div class="user-profile-section">
          <div class="user-avatar">
            <span>{{ userInitials }}</span>
          </div>
          <div class="user-info">
            <h1>Bonjour {{ user?.name || 'Utilisateur' }}! 👋</h1>
            <div class="user-stats">
              <span class="rank-badge" :class="rankBadgeClass">
                {{ userRank?.name || 'Débutant' }}
              </span>
              <span class="points">{{ totalPoints }} points</span>
              <span class="completed">{{ completedQuizzes }} quiz terminés</span>
            </div>
          </div>
        </div>
          <!-- Indicateur de progression globale -->
        <div class="global-progress">
          <div class="progress-title">Progression aujourd'hui</div>
          <ProgressBar 
            :percentage="dailyProgressPercentage"
            variant="success"
            :animated="true"
            :label="dailyProgressText"
          />        </div>
      </header>

      <!-- Contenu principal du dashboard -->
      <!-- Erreur -->
      <div v-if="error" class="error-section">
        <div class="error-content">
          <span class="error-icon">⚠️</span>
          <span class="error-message">{{ error }}</span>
          <button @click="clearError" class="error-dismiss">✕</button>
        </div>
      </div>

      <!-- Contenu principal basé sur l'état du parcours -->
      <main class="dashboard-main" v-if="!isLoading">
      
      <!-- Quiz en cours - À reprendre -->
      <section v-if="journeyState === 'resume_available'" class="resume-section">
        <div class="resume-card">
          <div class="resume-header">
            <h2>📚 Quiz en cours</h2>
            <span class="resume-badge">À reprendre</span>
          </div>
          
          <div class="resume-content">
            <div class="quiz-preview">
              <h3>{{ inProgressQuiz.quiz_type?.name }}</h3>
              <p>{{ inProgressQuiz.quiz_type?.description }}</p>
              <div class="resume-progress">
                <div class="progress-info">
                  <span>Question {{ (inProgressQuiz.answered_count || 0) + 1 }} sur {{ inProgressQuiz.total_questions }}</span>
                  <span>{{ Math.round(((inProgressQuiz.answered_count || 0) / inProgressQuiz.total_questions) * 100) }}% complété</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${((inProgressQuiz.answered_count || 0) / inProgressQuiz.total_questions) * 100}%` }"></div>
                </div>
              </div>
            </div>
            
            <div class="resume-actions">
              <button @click="resumeInProgressQuiz" class="btn btn-primary btn-large">
                <span class="btn-icon">▶️</span>
                Reprendre le quiz
              </button>
              <button @click="startNewQuiz" class="btn btn-secondary">
                Commencer un nouveau quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Prêt à commencer un nouveau quiz -->
      <section v-else-if="journeyState === 'ready_to_start'" class="start-section">
        
        <!-- Quiz recommandé automatiquement -->
        <div class="recommended-quiz">
          <div class="recommendation-header">
            <h2>🎯 Quiz recommandé pour vous</h2>
            <p>Basé sur votre niveau et vos préférences</p>
          </div>
          
          <div class="quiz-card-large" v-if="nextRecommendedQuiz">
            <div class="quiz-card-content">
              <div class="quiz-icon">{{ getQuizIcon(nextRecommendedQuiz.morph_type) }}</div>
              <div class="quiz-details">
                <h3>{{ nextRecommendedQuiz.name }}</h3>
                <p>{{ nextRecommendedQuiz.description }}</p>
                <div class="quiz-meta">
                  <span class="meta-item">
                    <span class="meta-icon">⏱️</span>
                    {{ nextRecommendedQuiz.time_limit_minutes || 'Illimité' }} min
                  </span>
                  <span class="meta-item">
                    <span class="meta-icon">🎯</span>
                    {{ nextRecommendedQuiz.points_per_correct_answer }} pts/réponse
                  </span>
                  <span class="meta-item">
                    <span class="meta-icon">📊</span>
                    {{ getDifficultyText(nextRecommendedQuiz.difficulty_level) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="quiz-actions">
              <button @click="startRecommendedQuiz" class="btn btn-primary btn-large" :disabled="isStarting">
                <span v-if="isStarting" class="btn-spinner"></span>
                <span v-else class="btn-icon">🚀</span>
                {{ isStarting ? 'Démarrage...' : 'Commencer maintenant' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Autres options disponibles -->
        <div class="other-options" v-if="otherAvailableQuizzes.length > 0">
          <h3>📚 Autres quiz disponibles</h3>
          <div class="quiz-grid">
            <div 
              v-for="quiz in otherAvailableQuizzes" 
              :key="quiz.id"
              class="quiz-card-small"
              @click="startSpecificQuiz(quiz)"
              :class="{ 'completed-today': hasCompletedToday(quiz) }"
            >
              <div class="quiz-icon-small">{{ getQuizIcon(quiz.morph_type) }}</div>
              <div class="quiz-info">
                <h4>{{ quiz.name }}</h4>
                <p>{{ quiz.points_per_correct_answer }} pts</p>
              </div>
              <div v-if="hasCompletedToday(quiz)" class="completed-badge">✅</div>
            </div>
          </div>
        </div>

      </section>

      <!-- Aucun quiz disponible -->
      <section v-else-if="journeyState === 'no_quiz_available'" class="no-quiz-section">
        <div class="no-quiz-content">
          <div class="no-quiz-icon">🎉</div>
          <h2>Bravo ! Vous avez terminé tous les quiz disponibles aujourd'hui</h2>
          <p>Revenez demain pour de nouveaux défis !</p>
          
          <div class="next-available">
            <h3>Prochains quiz disponibles :</h3>
            <div class="upcoming-list">
              <div class="upcoming-item">
                <span class="upcoming-time">Demain</span>
                <span class="upcoming-desc">Nouveaux quiz quotidiens</span>
              </div>
              <div class="upcoming-item">
                <span class="upcoming-time">Cette semaine</span>
                <span class="upcoming-desc">Challenge hebdomadaire</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Historique et statistiques -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🏆</div>
            <div class="stat-content">
              <div class="stat-number">{{ userStats?.weekly_completed || 0 }}</div>
              <div class="stat-label">Quiz cette semaine</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-content">
              <div class="stat-number">{{ userStats?.average_score || 0 }}%</div>
              <div class="stat-label">Score moyen</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <div class="stat-number">{{ userStats?.best_streak || 0 }}</div>
              <div class="stat-label">Meilleure série</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-content">
              <div class="stat-number">{{ formatTime(userStats?.total_time_minutes || 0) }}</div>
              <div class="stat-label">Temps total</div>
            </div>
          </div>
        </div>      </section>

    </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import { useQuizJourney } from '@/composables/useQuizJourney'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import ProgressBar from '@/components/ProgressBar.vue'

const quizStore = useQuizStore()
const { 
  journeyState, 
  startQuizJourney, 
  resumeQuiz, 
  initializeJourney 
} = useQuizJourney()
const router = useRouter()

const isStarting = ref(false)
const loadingMessage = ref('Chargement...')

// Computed properties
const user = computed(() => quizStore.user)
const userRank = computed(() => quizStore.userRank)
const totalPoints = computed(() => quizStore.totalPoints)
const completedQuizzes = computed(() => quizStore.completedQuizzes)
const userStats = computed(() => quizStore.userStats)
const nextRecommendedQuiz = computed(() => quizStore.nextRecommendedQuiz)
const isLoading = computed(() => quizStore.isLoading)
const error = computed(() => quizStore.error)

const userInitials = computed(() => {
  const name = user.value?.name || 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
})

const rankBadgeClass = computed(() => {
  const level = userRank.value?.level || 1
  if (level <= 2) return 'rank-bronze'
  if (level <= 4) return 'rank-silver'
  if (level <= 6) return 'rank-gold'
  return 'rank-diamond'
})

const dailyProgressPercentage = computed(() => {
  const stats = userStats.value
  if (!stats) return 0
  
  const completed = stats.today_completed?.length || 0
  const available = stats.daily_available || 4
  return Math.min((completed / available) * 100, 100)
})

const dailyProgressText = computed(() => {
  const stats = userStats.value
  if (!stats) return 'Chargement...'
  
  const completed = stats.today_completed?.length || 0
  const available = stats.daily_available || 4
  return `${completed}/${available} quiz terminés aujourd'hui`
})

const inProgressQuiz = computed(() => {
  const progress = quizStore.userProgress
  return Object.values(progress).find(quiz => quiz && quiz.status === 'in_progress')
})

const otherAvailableQuizzes = computed(() => {
  const recommended = nextRecommendedQuiz.value
  return quizStore.availableQuizTypes.filter(quiz => 
    quiz.id !== recommended?.id && !quizStore.hasCompletedToday(quiz)
  )
})

// Actions
const clearError = () => quizStore.clearError()

const startRecommendedQuiz = async () => {
  try {
    isStarting.value = true
    await startQuizJourney()
    router.push({ name: 'QuizPlay' })
  } catch (error) {
    console.error('Erreur démarrage quiz recommandé:', error)
  } finally {
    isStarting.value = false
  }
}

const startSpecificQuiz = async (quizType) => {
  try {
    isStarting.value = true
    await startQuizJourney(quizType)
    router.push({ name: 'QuizPlay' })
  } catch (error) {
    console.error('Erreur démarrage quiz spécifique:', error)
  } finally {
    isStarting.value = false
  }
}

const resumeInProgressQuiz = async () => {
  try {
    const quiz = inProgressQuiz.value
    if (quiz) {
      await resumeQuiz(quiz.id)
      router.push({ name: 'QuizPlay' })
    }
  } catch (error) {
    console.error('Erreur reprise quiz:', error)
  }
}

const startNewQuiz = async () => {
  await startRecommendedQuiz()
}

// Helpers
const getQuizIcon = (morphType) => {
  const icons = {
    discovery: '🔍',
    novelty: '✨',
    weekly: '📅',
    event: '🎉'
  }
  return icons[morphType] || '📝'
}

const getDifficultyText = (level) => {
  if (level <= 2) return 'Facile'
  if (level <= 4) return 'Moyen'
  if (level <= 6) return 'Difficile'
  return 'Expert'
}

const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes}min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h${mins > 0 ? mins + 'min' : ''}`
}

const hasCompletedToday = (quiz) => quizStore.hasCompletedToday(quiz)

// Initialisation
onMounted(async () => {
  loadingMessage.value = 'Initialisation de votre parcours...'
  await initializeJourney()
})
</script>

<style scoped>
.quiz-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.dashboard-header {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.user-profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 24px;
}

.user-info h1 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 28px;
}

.user-stats {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.rank-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.rank-bronze { background: #cd7f32; color: white; }
.rank-silver { background: #c0c0c0; color: #333; }
.rank-gold { background: #ffd700; color: #333; }
.rank-diamond { background: linear-gradient(45deg, #b9f2ff, #ffd3ff); color: #333; }

.points, .completed {
  color: #4a5568;
  font-weight: 500;
}

.global-progress {
  max-width: 400px;
}

.progress-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #718096;
}

.loading-section, .error-section {
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-section {
  background: rgba(254, 226, 226, 0.9);
  border-radius: 10px;
  margin: 20px 0;
}

.error-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #e53e3e;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.resume-section, .start-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.resume-card {
  border: 2px solid #fbbf24;
  border-radius: 12px;
  overflow: hidden;
}

.resume-header {
  background: #fbbf24;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resume-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.resume-content {
  padding: 20px;
}

.quiz-card-large {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.quiz-card-large:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.quiz-card-content {
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.quiz-icon {
  font-size: 48px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quiz-details h3 {
  margin: 0 0 8px 0;
  color: #2d3748;
  font-size: 24px;
}

.quiz-details p {
  color: #4a5568;
  margin: 0 0 15px 0;
}

.quiz-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #718096;
}

.quiz-actions {
  padding: 20px 25px;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
}

.btn-large {
  padding: 16px 32px;
  font-size: 16px;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.quiz-card-small {
  background: white;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  position: relative;
}

.quiz-card-small:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.quiz-card-small.completed-today {
  background: #f0fff4;
  border-color: #68d391;
}

.quiz-icon-small {
  font-size: 24px;
  margin-bottom: 10px;
}

.quiz-info h4 {
  margin: 0 0 5px 0;
  color: #2d3748;
}

.quiz-info p {
  margin: 0;
  color: #718096;
  font-size: 14px;
}

.completed-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
}

.stats-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #2d3748;
}

.stat-label {
  color: #718096;
  font-size: 14px;
}

.no-quiz-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 50px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.no-quiz-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.no-quiz-content h2 {
  color: #2d3748;
  margin-bottom: 10px;
}

.upcoming-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 20px auto 0;
}

.upcoming-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 8px;
}

.upcoming-time {
  font-weight: 600;
  color: #667eea;
}

@media (max-width: 768px) {
  .quiz-dashboard {
    padding: 15px;
  }
  
  .dashboard-header {
    padding: 20px;
  }
  
  .user-profile-section {
    flex-direction: column;
    text-align: center;
  }
  
  .quiz-card-content {
    flex-direction: column;
    text-align: center;
  }
  
  .quiz-meta {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
