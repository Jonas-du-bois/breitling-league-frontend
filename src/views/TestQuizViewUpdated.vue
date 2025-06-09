<template>
  <div class="test-quiz-page">
    <div class="header">
      <h1>🧪 Page de Test des Quiz</h1>
      <p>Simulation complète de la logique des quiz avec données réalistes</p>
    </div>

    <!-- Section d'authentification -->
    <div class="auth-section" :class="{ 'authenticated': isAuthenticated, 'not-authenticated': !isAuthenticated }">
      <div class="auth-content">
        <div v-if="isAuthenticated" class="auth-status">
          <span class="auth-icon">✅</span>
          <span>Authentifié avec succès</span>
          <button @click="logout" class="logout-btn">Déconnexion</button>
        </div>
        <div v-else class="auth-status">
          <span class="auth-icon">🔒</span>
          <span>Non authentifié</span>
          <router-link to="/login" class="login-link">Se connecter</router-link>
        </div>
      </div>
    </div>

    <!-- Loading & Error States -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Chargement en cours...</p>
    </div>

    <div v-if="error" class="error-banner">
      <div class="error-content">
        <strong>Erreur:</strong> {{ error }}
        <button @click="clearError" class="error-close">×</button>
      </div>
    </div>

    <!-- Section des statistiques -->
    <div class="stats-section">
      <h2>📊 Statistiques Générales</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ quizData.quizInstances.length }}</div>
          <div class="stat-label">Total Quiz</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ completedQuizzes.length }}</div>
          <div class="stat-label">Complétés</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ pendingQuizzes.length }}</div>
          <div class="stat-label">En attente</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalScore }}%</div>
          <div class="stat-label">Score moyen</div>
        </div>
      </div>
    </div>    <!-- Section des tests rapides -->
    <div class="quick-tests-section">
      <h2>⚡ Tests Rapides</h2>
      <div class="test-buttons">
        <button @click="testSubmitQuizCorrect" class="test-btn success" :disabled="isLoading">
          🎯 Test Réponses Correctes
        </button>
        <button @click="testSubmitQuizIncorrect" class="test-btn danger" :disabled="isLoading">
          ❌ Test Réponses Incorrectes
        </button>
        <button @click="testSubmitQuizMixed" class="test-btn warning" :disabled="isLoading">
          🔀 Test Réponses Mixtes
        </button>
        <button @click="testCompleteQuizFlow" class="test-btn primary" :disabled="isLoading">
          🔄 Test Flux Complet
        </button>
      </div>
    </div>

    <!-- Section des tests corrigés pour le backend -->
    <div class="backend-tests-section">
      <h2>🔧 Tests Corrigés Backend</h2>
      <p class="section-description">Tests utilisant les bonnes données attendues par le backend Laravel</p>
      <div class="test-buttons">
        <button @click="testStartQuizFixedMethod" class="test-btn primary" :disabled="isLoading">
          🚀 Test Démarrage Corrigé
        </button>
        <button @click="testSubmitQuizFixedMethod" class="test-btn success" :disabled="isLoading">
          📝 Test Soumission Corrigée
        </button>
        <button @click="testCompleteQuizFlowFixedMethod" class="test-btn info" :disabled="isLoading">
          🔄 Test Flux Complet Corrigé
        </button>
        <button @click="testGetQuizResultMethod" class="test-btn secondary" :disabled="isLoading">
          📊 Test Récupération Résultat
        </button>
      </div>
    </div>

    <!-- Section des questions de test -->
    <div class="test-questions-section">
      <h2>❓ Questions de Test (Basées sur les Seeders)</h2>
      <div class="questions-list">
        <div v-for="question in getTestQuestions()" :key="question.id" class="question-card">
          <h3>Q{{ question.id }}: {{ question.statement }}</h3>
          <div class="choices">
            <div v-for="choice in question.choices" :key="choice.id" 
                 :class="['choice', { 'correct': choice.is_correct }]">
              <span class="choice-id">ID: {{ choice.id }}</span>
              <span class="choice-text">{{ choice.text }}</span>
              <span v-if="choice.is_correct" class="correct-badge">✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types de Quiz Disponibles -->
    <div class="quiz-types-section">
      <h2>🎯 Types de Quiz Disponibles</h2>
      <div class="quiz-types-grid">
        <div v-for="quizType in quizData.quizTypes" :key="quizType.id" class="quiz-type-card">
          <div class="quiz-type-header">
            <h3>{{ quizType.name }}</h3>
            <span class="quiz-type-id">#{{ quizType.id }}</span>
          </div>
          <div class="quiz-type-details">
            <div class="detail">
              <span class="detail-label">Points de base:</span>
              <span class="detail-value">{{ quizType.base_points }}</span>
            </div>
            <div class="detail">
              <span class="detail-label">Bonus vitesse:</span>
              <span class="detail-value">{{ quizType.speed_bonus }}%</span>
            </div>
            <div class="detail">
              <span class="detail-label">Multiplicateur:</span>
              <span class="detail-value">×{{ quizType.bonus_multiplier }}</span>
            </div>
            <div class="detail">
              <span class="detail-label">Donne ticket:</span>
              <span class="detail-value ticket" :class="{ active: quizType.gives_ticket }">
                {{ quizType.gives_ticket ? 'Oui' : 'Non' }}
              </span>
            </div>
          </div>
          <div class="quiz-type-count">
            {{ (quizzesByType[quizType.name] || []).length }} instances
          </div>
          <button @click="testStartQuiz(quizType.id)" class="test-quiz-btn" :disabled="isLoading">
            🚀 Tester ce type
          </button>
        </div>
      </div>
    </div>

    <!-- Instances de Quiz par Type -->
    <div class="quiz-instances-section">
      <h2>📋 Instances de Quiz par Type</h2>
      <div class="quiz-instances">
        <div v-for="(quizzes, typeName) in quizzesByType" :key="typeName" class="quiz-type-section">
          <h3 class="quiz-type-title">{{ typeName }} ({{ quizzes.length }})</h3>
          <div v-if="quizzes.length > 0" class="quiz-list">
            <div v-for="quiz in quizzes" :key="quiz.id" class="quiz-item">
              <div class="quiz-header">
                <span class="quiz-id">#{{ quiz.id }}</span>
                <span class="quiz-status" :class="quiz.status">{{ quiz.status }}</span>
                <span class="quiz-date">{{ formatDate(quiz.launch_date) }}</span>
              </div>
              <div class="quiz-content">
                <div class="quiz-module">
                  <span class="module-type">{{ quiz.module_type }}</span>
                  <span class="module-name">{{ quiz.module.name }}</span>
                </div>
                <div v-if="quiz.score" class="quiz-score">
                  <span class="score-value">{{ quiz.score.score }}/{{ quiz.score.total_questions }}</span>
                  <span class="score-percentage">({{ quiz.score.percentage }}%)</span>
                </div>
                <div v-else class="quiz-no-score">
                  <span class="no-score-text">Pas encore de score</span>
                </div>
              </div>
              <div class="quiz-actions">
                <button v-if="quiz.status === 'pending'" @click="testQuizInstance(quiz)" class="btn btn-start" :disabled="isLoading">
                  Démarrer Test
                </button>
                <button v-if="quiz.status === 'completed'" @click="testGetQuizResult(quiz.id)" class="btn btn-result" :disabled="isLoading">
                  Voir Résultat
                </button>
              </div>
            </div>
          </div>
          <div v-else class="no-quiz">
            Aucun quiz de ce type
          </div>
        </div>
      </div>
    </div>

    <!-- Actions de Test -->
    <div class="actions-section">
      <h2>🔧 Actions de Test</h2>
      <div class="actions">
        <button @click="loadMockData" :disabled="isLoading" class="btn btn-primary">
          Charger Données de Test
        </button>
        <button @click="loadChapters" :disabled="isLoading" class="btn">
          Charger Chapitres
        </button>
        <button @click="loadDiscoveries" :disabled="isLoading" class="btn">
          Charger Découvertes
        </button>
        <button @click="resetQuizData" :disabled="isLoading" class="btn btn-danger">
          Réinitialiser Données
        </button>
      </div>
    </div>

    <!-- Log Section -->
    <div class="log-section">
      <h2>📝 Console de Test</h2>
      <div class="log-content">
        <p><em>Consultez la console du navigateur (F12) pour voir les logs des tests</em></p>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useQuiz } from '@/composables/useQuiz';
import authService from '@/services/auth';

export default {
  name: 'TestQuizViewUpdated',  setup() {
    const {
      // État
      isLoading,
      error,
      
      // Données
      quizData,
      
      // Propriétés calculées
      completedQuizzes,
      pendingQuizzes,
      quizzesByType,
      totalScore,
      
      // Méthodes principales
      loadQuizTypes,
      loadQuizInstances,
      loadUserStats,
      startQuiz,
      submitQuiz,
      getQuizResult,
      loadChapters,
      loadDiscoveries,
      clearError,
      resetQuizData,
      
      // Méthodes de test
      getTestQuestions,
      testCompleteQuizFlow,
      testSubmitQuizWithAnswers
    } = useQuiz();
    
    // État d'authentification
    const isAuthenticated = computed(() => authService.isAuthenticated());
    
    // Méthodes d'authentification
    const logout = async () => {
      try {
        await authService.logout();
        console.log('✅ Déconnexion réussie');
      } catch (error) {
        console.error('❌ Erreur lors de la déconnexion:', error);
      }
    };    // Méthodes spécifiques à la vue
    const testQuizInstance = async (quizInstance) => {
      try {
        console.log('🎯 Test de l\'instance de quiz:', quizInstance);
        await startQuiz(
          quizInstance.quiz_type_id,
          quizInstance.module_type || 'Unit',
          quizInstance.module_id || 1
        );
      } catch (err) {
        console.error('❌ Erreur test instance:', err);
      }
    };

    // Méthodes de test simplifiées
    const testSubmitQuizCorrect = async () => {
      try {
        const pendingInstance = quizData.quizInstances.find(q => q.status === 'pending');
        if (!pendingInstance) {
          console.warn('⚠️ Aucune instance de quiz en attente');
          return;
        }
        await testSubmitQuizWithAnswers(pendingInstance.id, 'correct');
      } catch (error) {
        console.error('❌ Erreur test réponses correctes:', error);
      }
    };

    const testSubmitQuizIncorrect = async () => {
      try {
        const pendingInstance = quizData.quizInstances.find(q => q.status === 'pending');
        if (!pendingInstance) {
          console.warn('⚠️ Aucune instance de quiz en attente');
          return;
        }
        await testSubmitQuizWithAnswers(pendingInstance.id, 'incorrect');
      } catch (error) {
        console.error('❌ Erreur test réponses incorrectes:', error);
      }
    };

    const testSubmitQuizMixed = async () => {
      try {
        const pendingInstance = quizData.quizInstances.find(q => q.status === 'pending');
        if (!pendingInstance) {
          console.warn('⚠️ Aucune instance de quiz en attente');
          return;
        }
        await testSubmitQuizWithAnswers(pendingInstance.id, 'mixed');
      } catch (error) {
        console.error('❌ Erreur test réponses mixtes:', error);
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'Date inconnue';
      try {
        return new Date(dateString).toLocaleString('fr-FR');
      } catch (err) {
        return 'Date invalide';
      }
    };    // Méthodes de test corrigées pour le backend
    const testStartQuizFixedMethod = async () => {
      try {
        console.log('🚀 Test de démarrage avec quizTypeId=1');
        await startQuiz(1, 'Unit', 1);
      } catch (error) {
        console.error('❌ Erreur dans testStartQuizFixedMethod:', error);
      }
    };

    const testSubmitQuizFixedMethod = async () => {
      try {
        console.log('📝 Test de soumission avec réponses correctes');
        const activeInstance = quizData.quizInstances.find(q => q.status === 'pending');
        if (activeInstance) {
          await testSubmitQuizWithAnswers(activeInstance.id, 'correct');
        } else {
          console.warn('⚠️ Aucune instance de quiz active trouvée');
        }
      } catch (error) {
        console.error('❌ Erreur dans testSubmitQuizFixedMethod:', error);
      }
    };

    const testCompleteQuizFlowFixedMethod = async () => {
      try {
        console.log('🔄 Test de flux complet');
        await testCompleteQuizFlow(1, 'Unit', 1);
      } catch (error) {
        console.error('❌ Erreur dans testCompleteQuizFlowFixedMethod:', error);
      }
    };

    const testGetQuizResultMethod = async () => {
      try {
        console.log('📊 Test de récupération de résultat');
        const completedInstance = quizData.quizInstances.find(q => q.status === 'completed');
        if (completedInstance) {
          await getQuizResult(completedInstance.id);
        } else {
          console.warn('⚠️ Aucune instance de quiz complétée trouvée');
        }
      } catch (error) {
        console.error('❌ Erreur dans testGetQuizResultMethod:', error);
      }
    };    // Méthode pour charger toutes les données de test
    const loadMockData = async () => {
      try {
        console.log('🔄 Chargement des données de test...');
        await Promise.all([
          loadQuizTypes(),
          loadQuizInstances(),
          loadUserStats()
        ]);
        console.log('✅ Données de test chargées');
      } catch (error) {
        console.error('❌ Erreur lors du chargement des données de test:', error);
      }
    };

    // Méthode pour tester un quiz par son type
    const testStartQuiz = async (quizTypeId) => {
      try {
        console.log(`🎯 Test démarrage quiz type ${quizTypeId}`);
        await startQuiz(quizTypeId, 'Unit', 1);
      } catch (error) {
        console.error(`❌ Erreur test quiz type ${quizTypeId}:`, error);
      }
    };

    // Méthode pour tester la récupération d'un résultat
    const testGetQuizResult = async (instanceId) => {
      try {
        console.log(`📊 Test récupération résultat pour instance ${instanceId}`);
        await getQuizResult(instanceId);
      } catch (error) {
        console.error(`❌ Erreur récupération résultat ${instanceId}:`, error);
      }
    };

    // Charger les données de test au montage
    onMounted(() => {
      console.log('🚀 Initialisation de la page de test des quiz');
      loadMockData();
    });

    return {
      // État
      isLoading,
      error,
      
      // Données
      quizData,
      
      // Propriétés calculées
      completedQuizzes,
      pendingQuizzes,
      quizzesByType,
      totalScore,
      
      // Méthodes principales
      loadChapters,
      loadDiscoveries,
      loadMockData,
      clearError,
      resetQuizData,
      
      // Méthodes de test
      getTestQuestions,
      testSubmitQuizCorrect,
      testSubmitQuizIncorrect,
      testSubmitQuizMixed,
      testStartQuiz,
      testGetQuizResult,
      testCompleteQuizFlow,
      testQuizInstance,
      
      // Méthodes de test corrigées pour le backend
      testStartQuizFixedMethod,
      testSubmitQuizFixedMethod,
      testCompleteQuizFlowFixedMethod,
      testGetQuizResultMethod,
      
      // Utilitaires
      formatDate,
      isAuthenticated,
      logout
    }
  }
}
</script>

<style scoped>
.test-quiz-page {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1em;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-banner {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 16px;
}

.error-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #c00;
}

.error-close {
  background: none;
  border: none;
  color: #c00;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}

/* Auth Section */
.auth-section {
  margin-bottom: 30px;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;
}

.auth-section.authenticated {
  background: #d4edda;
}

.auth-section.not-authenticated {
  background: #f8d7da;
}

.auth-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1em;
}

.auth-icon {
  font-size: 1.2em;
}

.logout-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1em;
  text-decoration: underline;
}

.login-link {
  color: #007bff;
  text-decoration: underline;
}

/* Stats Section */
.stats-section {
  margin-bottom: 30px;
}

.stats-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.stat-value {
  font-size: 2.5em;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Quick Tests Section */
.quick-tests-section {
  margin-bottom: 30px;
}

.quick-tests-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.test-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.test-btn {
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: none;
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.test-btn.success {
  background: #28a745;
  color: white;
}

.test-btn.success:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-2px);
}

.test-btn.danger {
  background: #dc3545;
  color: white;
}

.test-btn.danger:hover:not(:disabled) {
  background: #c82333;
  transform: translateY(-2px);
}

.test-btn.warning {
  background: #ffc107;
  color: #212529;
}

.test-btn.warning:hover:not(:disabled) {
  background: #e0a800;
  transform: translateY(-2px);
}

.test-btn.primary {
  background: #007bff;
  color: white;
}

.test-btn.primary:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
}

/* Test Questions Section */
.test-questions-section {
  margin-bottom: 30px;
}

.test-questions-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-card h3 {
  color: #333;
  margin-bottom: 16px;
  font-size: 1.2em;
}

.choices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

.choice {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.choice.correct {
  background: #d4edda;
  border-color: #28a745;
}

.choice-id {
  background: #6c757d;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 600;
}

.choice-text {
  flex: 1;
  font-weight: 500;
}

.correct-badge {
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
}

/* Quiz Types Section */
.quiz-types-section {
  margin-bottom: 30px;
}

.quiz-types-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.quiz-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.quiz-type-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.quiz-type-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.quiz-type-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.quiz-type-header h3 {
  color: #333;
  margin: 0;
  font-size: 1.2em;
}

.quiz-type-id {
  background: #667eea;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.quiz-type-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
}

.detail-label {
  color: #666;
}

.detail-value {
  font-weight: 600;
  color: #333;
}

.detail-value.ticket {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.detail-value.ticket.active {
  background: #d4edda;
  color: #155724;
}

.detail-value.ticket:not(.active) {
  background: #f8d7da;
  color: #721c24;
}

.quiz-type-count {
  text-align: center;
  color: #666;
  font-size: 0.9em;
  margin-bottom: 12px;
  font-style: italic;
}

.test-quiz-btn {
  width: 100%;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.test-quiz-btn:hover:not(:disabled) {
  background: #5a6fd8;
}

.test-quiz-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Quiz Instances Section */
.quiz-instances-section {
  margin-bottom: 30px;
}

.quiz-instances-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.quiz-instances {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quiz-type-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quiz-type-title {
  background: #f8f9fa;
  color: #333;
  margin: 0;
  padding: 16px 20px;
  font-size: 1.1em;
  border-bottom: 1px solid #dee2e6;
}

.quiz-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quiz-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e9ecef;
  transition: border-color 0.2s;
}

.quiz-item:hover {
  border-color: #667eea;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.quiz-id {
  font-weight: 600;
  color: #666;
}

.quiz-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
  text-transform: uppercase;
}

.quiz-status.completed {
  background: #d4edda;
  color: #155724;
}

.quiz-status.pending {
  background: #fff3cd;
  color: #856404;
}

.quiz-date {
  color: #666;
  font-size: 0.9em;
}

.quiz-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.quiz-module {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.module-type {
  font-size: 0.8em;
  color: #666;
  text-transform: uppercase;
  font-weight: 600;
}

.module-name {
  font-weight: 600;
  color: #333;
}

.quiz-score {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-value {
  font-weight: 700;
  color: #28a745;
}

.score-percentage {
  color: #666;
}

.quiz-no-score {
  color: #666;
  font-style: italic;
}

.quiz-actions {
  display: flex;
  gap: 8px;
}

.no-quiz {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
}

/* Actions Section */
.actions-section {
  margin-bottom: 30px;
}

.actions-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  padding: 12px 20px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9em;
  font-weight: 500;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: white;
  border-color: #0056b3;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-start {
  background: #28a745;
  color: white;
  border-color: #1e7e34;
}

.btn-start:hover:not(:disabled) {
  background: #1e7e34;
}

.btn-result {
  background: #17a2b8;
  color: white;
  border-color: #117a8b;
}

.btn-result:hover:not(:disabled) {
  background: #117a8b;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border-color: #bd2130;
}

.btn-danger:hover:not(:disabled) {
  background: #bd2130;
}

/* Log Section */
.log-section {
  margin-bottom: 30px;
}

.log-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.log-content {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
}

/* Responsive Design */
@media (max-width: 768px) {
  .test-quiz-page {
    padding: 15px;
  }
  
  .header h1 {
    font-size: 2em;
  }
  
  .stats-grid,
  .test-buttons,
  .questions-list .choices,
  .quiz-types-grid {
    grid-template-columns: 1fr;
  }
  
  .quiz-header,
  .quiz-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
