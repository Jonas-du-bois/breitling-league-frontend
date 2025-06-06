<template>
  <div class="test-progress-view">
    <h1>Test de la Progression - Breitling League</h1>
    
    <div v-if="loading" class="loading">
      Chargement des données...
    </div>
    
    <div v-if="error" class="error">
      Erreur: {{ error }}
    </div>
    
    <div v-if="!loading && !error" class="progress-data">
      
      <!-- Progression Globale -->
      <section class="section">
        <h2>📊 Progression Globale</h2>
        <div v-if="progress" class="card">
          <div class="progress-stats">
            <div class="stat">
              <span class="label">Utilisateur ID:</span>
              <span class="value">{{ progress.user_id }}</span>
            </div>
            <div class="stat">
              <span class="label">Chapitres complétés:</span>
              <span class="value">{{ completedChapters }} / {{ totalChapters }}</span>
              <span class="percentage">({{ chaptersCompletionRate }}%)</span>
            </div>
            <div class="stat">
              <span class="label">Quiz complétés:</span>
              <span class="value">{{ completedQuizzes }}</span>
            </div>
            <div class="stat">
              <span class="label">Points totaux:</span>
              <span class="value">{{ formatPoints(totalPoints) }}</span>
            </div>
            <div class="stat">
              <span class="label">Points de quiz:</span>
              <span class="value">{{ formatPoints(progress.quiz_points) }}</span>
            </div>
            <div class="stat">
              <span class="label">Points bonus:</span>
              <span class="value">{{ formatPoints(progress.bonus_points) }}</span>
            </div>
            <div class="stat">
              <span class="label">Progression globale:</span>
              <span class="value">{{ progressPercentage }}%</span>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          Aucune donnée de progression disponible
        </div>
      </section>

      <!-- Rang Actuel -->
      <section class="section">
        <h2>🏆 Rang et Système de Points</h2>
        <div v-if="currentRank" class="card">
          <div class="rank-info">
            <div class="rank-current">
              <h3>Rang actuel: {{ currentRank.name }} (Niveau {{ currentRank.level }})</h3>
              <p>Points minimum requis: {{ formatPoints(currentRank.minimum_points) }}</p>
            </div>
            
            <div v-if="nextRank" class="rank-next">
              <h4>Prochain rang: {{ nextRank.name }} (Niveau {{ nextRank.level }})</h4>
              <p>Points requis: {{ formatPoints(nextRank.minimum_points) }}</p>
              <p>Points manquants: {{ formatPoints(pointsToNextRank) }}</p>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: rankProgressPercentage + '%' }"></div>
              </div>
              <p>Progression: {{ rankProgressPercentage }}%</p>
            </div>
            
            <div v-else class="rank-max">
              <p>🎉 Rang maximum atteint !</p>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          Aucune donnée de rang disponible
        </div>
      </section>

      <!-- Rang depuis API /progress/rank -->
      <section class="section" v-if="rank">
        <h2>📈 Statistiques Détaillées du Rang</h2>
        <div class="card">
          <div class="rank-details">
            <div class="stat">
              <span class="label">Rang:</span>
              <span class="value">{{ rank.rank?.name }} (Niveau {{ rank.rank?.level }})</span>
            </div>
            <div class="stat">
              <span class="label">Points totaux:</span>
              <span class="value">{{ formatPoints(rank.total_points) }}</span>
            </div>
            <div class="stat">
              <span class="label">Quiz complétés:</span>
              <span class="value">{{ rank.completed_quizzes }}</span>
            </div>
            <div class="stat">
              <span class="label">Score moyen:</span>
              <span class="value">{{ rank.average_score?.toFixed(1) || '0.0' }}</span>
            </div>
            <div class="stat">
              <span class="label">Position globale:</span>
              <span class="value">#{{ rank.global_position }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <section class="section">
        <h2>🔄 Actions</h2>
        <div class="actions">
          <button @click="getProgress" :disabled="loading" class="btn">
            Recharger Progression
          </button>
          <button @click="getRank" :disabled="loading" class="btn">
            Recharger Rang
          </button>
          <button @click="getHistory" :disabled="loading" class="btn">
            Charger Historique
          </button>
          <button @click="getLeaderboard" :disabled="loading" class="btn">
            Charger Classement
          </button>
          <button @click="getWrapData" :disabled="loading" class="btn">
            Charger Bilan
          </button>
          <button @click="refreshAll" :disabled="loading" class="btn btn-primary">
            Tout Recharger
          </button>
        </div>
      </section>

      <!-- Historique -->
      <section class="section" v-if="history.length > 0">
        <h2>📚 Historique des Quiz</h2>
        <div class="card">
          <div class="history-list">
            <div v-for="quiz in history.slice(0, 5)" :key="quiz.id" class="history-item">
              <span class="quiz-type">{{ quiz.quizType?.name || 'Quiz' }}</span>
              <span class="score">{{ quiz.userQuizScore?.total_points || 0 }} pts</span>
              <span class="date">{{ new Date(quiz.created_at).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Classement -->
      <section class="section" v-if="leaderboard.length > 0">
        <h2>🏅 Top 10 du Classement</h2>
        <div class="card">
          <div class="leaderboard-list">
            <div v-for="entry in leaderboard.slice(0, 10)" :key="entry.user.id" class="leaderboard-item">
              <span class="position">#{{ entry.position }}</span>
              <span class="name">{{ entry.user.name }}</span>
              <span class="rank">{{ entry.user.rank?.name || 'Aucun' }} ({{ entry.user.rank?.level || 0 }})</span>
              <span class="points">{{ formatPoints(entry.total_points) }} pts</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Données Wrap -->
      <section class="section" v-if="wrapData">
        <h2>📈 Bilan Annuel</h2>
        <div class="card">
          <div class="wrap-summary">
            <div class="stat">
              <span class="label">Année:</span>
              <span class="value">{{ wrapData.year }}</span>
            </div>
            <div class="stat">
              <span class="label">Points totaux (année):</span>
              <span class="value">{{ formatPoints(wrapData.summary?.total_points) }}</span>
            </div>
            <div class="stat">
              <span class="label">Quiz complétés (année):</span>
              <span class="value">{{ wrapData.summary?.completed_quizzes }}</span>
            </div>
          </div>
          
          <div v-if="wrapData.monthly_progress" class="monthly-progress">
            <h4>Progression Mensuelle</h4>
            <div class="months-grid">
              <div v-for="month in wrapData.monthly_progress" :key="month.month" class="month-item">
                <div class="month-name">{{ month.month }}</div>
                <div class="month-points">{{ formatPoints(month.points) }}</div>
                <div class="month-quizzes">{{ month.quizzes }} quiz</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useProgress } from '@/composables/useProgress'

export default {
  name: 'TestProgressView',
  setup() {
    const {
      // États
      loading,
      error,
      progress,
      rank,
      history,
      leaderboard,
      wrapData,
      
      // Propriétés calculées
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
      
      // Méthodes
      getProgress,
      getRank,
      getHistory,
      getLeaderboard,
      getWrapData,
      refreshAll,
      formatPoints
    } = useProgress()

    // Charger les données au montage
    onMounted(() => {
      getProgress()
    })

    return {
      // États
      loading,
      error,
      progress,
      rank,
      history,
      leaderboard,
      wrapData,
      
      // Propriétés calculées
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
      
      // Méthodes
      getProgress,
      getRank,
      getHistory,
      getLeaderboard,
      getWrapData,
      refreshAll,
      formatPoints
    }
  }
}
</script>

<style scoped>
.test-progress-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  background-color: #fee;
  border: 1px solid #fcc;
  color: #c00;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #333;
  border-bottom: 2px solid #e67e22;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.progress-stats,
.rank-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.stat .label {
  font-weight: 600;
  color: #555;
}

.stat .value {
  color: #e67e22;
  font-weight: 700;
}

.percentage {
  color: #27ae60;
  font-weight: 600;
  margin-left: 8px;
}

.rank-current h3 {
  color: #e67e22;
  margin-bottom: 8px;
}

.rank-next {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.rank-next h4 {
  color: #3498db;
  margin-bottom: 8px;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: #ecf0f1;
  border-radius: 6px;
  overflow: hidden;
  margin: 12px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
}

.rank-max {
  text-align: center;
  color: #f39c12;
  font-size: 18px;
  font-weight: 600;
}

.no-data {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 40px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  background: #ecf0f1;
  border: 1px solid #bdc3c7;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  background: #d5dbdb;
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #3498db;
  color: white;
  border-color: #2980b9;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.history-list,
.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item,
.leaderboard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 8px;
}

.position {
  font-weight: 700;
  color: #e67e22;
  min-width: 40px;
}

.name {
  font-weight: 600;
  flex-grow: 1;
  margin-left: 12px;
}

.rank {
  color: #7f8c8d;
  font-size: 14px;
}

.points {
  font-weight: 700;
  color: #27ae60;
}

.quiz-type {
  font-weight: 600;
  color: #3498db;
}

.score {
  font-weight: 700;
  color: #27ae60;
}

.date {
  color: #7f8c8d;
  font-size: 14px;
}

.wrap-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.monthly-progress h4 {
  margin-bottom: 16px;
  color: #2c3e50;
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}

.month-item {
  text-align: center;
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
}

.month-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.month-points {
  color: #e67e22;
  font-weight: 700;
  font-size: 14px;
}

.month-quizzes {
  color: #7f8c8d;
  font-size: 12px;
}
</style>
