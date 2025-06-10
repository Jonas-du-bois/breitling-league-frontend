<template>
  <div class="quiz-test-view">
    <!-- Header -->
    <header class="test-header">
      <h1>🎯 Test des Quiz - Système Polymorphique</h1>
      <p>Interface simple pour tester les quiz disponibles</p>
    </header>

    <!-- Loading -->
    <div v-if="isLoading" class="loading-section">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>{{ loadingMessage }}</p>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="error-section">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">{{ error }}</span>
        <button @click="clearError" class="error-close">✕</button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-if="!isLoading" class="test-content">      <!-- User Info -->
      <section v-if="user || isAuthenticated" class="user-section">
        <div class="user-card">
          <div class="user-avatar">{{ userInitials }}</div>
          <div class="user-info">
            <h3>{{ user?.name || 'Utilisateur connecté' }}</h3>
            <p>{{ user?.email || 'Email non disponible' }}</p>            <div class="user-stats">
              <span class="stat">{{ hybridTotalPoints }} points</span>
              <span class="stat">{{ hybridCompletedQuizzes }} quiz complétés</span>
              <span class="stat" :class="{ 'stat-success': isAuthenticated, 'stat-error': !isAuthenticated }">
                {{ isAuthenticated ? '✅ Authentifié' : '❌ Non authentifié' }}
              </span>
              <span class="stat stat-source" :title="dataSource.label">
                {{ dataSource.icon }} {{ dataSource.source }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Auth Status (si pas d'utilisateur mais authentifié) -->
      <section v-else-if="!user && !isAuthenticated" class="auth-status-section">
        <div class="auth-warning">
          <span class="warning-icon">⚠️</span>
          <div class="warning-content">
            <h3>Authentification requise</h3>
            <p>Veuillez vous connecter pour accéder aux fonctionnalités de quiz.</p>
            <button @click="setupDemoAuthentication" class="btn btn-primary">
              🎭 Utiliser le token de démonstration
            </button>
          </div>
        </div>
      </section>

      <!-- Quiz Types Available -->
      <section class="quiz-types-section">
        <h2>📋 Types de Quiz Disponibles</h2>
        <div v-if="quizTypes.length > 0" class="quiz-types-grid">
          <div 
            v-for="quizType in quizTypes" 
            :key="quizType.id"
            class="quiz-type-card"
            :class="{ 'selected': selectedQuizType?.id === quizType.id }"
            @click="selectQuizType(quizType)"
          >
            <div class="quiz-type-icon">🎯</div>
            <div class="quiz-type-content">
              <h3>{{ quizType.name }}</h3>
              <p>{{ quizType.description }}</p>
              <div class="quiz-type-meta">
                <span class="meta-item">{{ quizType.base_points }} pts de base</span>
                <span class="meta-item">{{ quizType.speed_bonus }}% bonus vitesse</span>
                <span class="meta-item">{{ quizType.gives_ticket ? '🎫 Ticket' : '❌ Pas de ticket' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          <p>Aucun type de quiz disponible</p>
          <button @click="loadQuizTypes" class="btn btn-primary">Recharger</button>
        </div>
      </section>      <!-- Available Modules for Selected Quiz Type -->
      <section v-if="selectedQuizType" class="modules-section">
        <h2>📚 {{ getModuleSectionTitle(selectedQuizType.name) }}</h2>
        
        <!-- Modules List -->
        <div v-if="availableModules.length > 0" class="modules-grid">
          <div 
            v-for="module in availableModules" 
            :key="`${selectedQuizType.name}-${module.id}`"
            class="module-card"
            @click="startQuizForModule(module)"
          >
            <div class="module-icon">{{ getQuizTypeIcon(selectedQuizType.name) }}</div>
            <div class="module-content">
              <h4>{{ module.name || module.title }}</h4>
              <p>{{ module.description || getModuleDescription(selectedQuizType.name, module) }}</p>
              <div class="module-actions">
                <button class="btn btn-small btn-primary" :disabled="isStarting">
                  {{ isStarting ? 'Démarrage...' : 'Démarrer Quiz' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-data">
          <p>{{ getNoModulesMessage(selectedQuizType.name) }}</p>
          <button @click="loadModulesForQuizType" class="btn btn-secondary">Recharger</button>
        </div>
      </section>

      <!-- Recent Quiz Instances -->
      <section class="instances-section">
        <h2>📊 Quiz Récents</h2>
        <div v-if="recentInstances.length > 0" class="instances-list">
          <div 
            v-for="instance in recentInstances" 
            :key="instance.id"
            class="instance-item"
          >
            <div class="instance-info">
              <div class="instance-header">
                <span class="instance-id">#{{ instance.id }}</span>
                <span class="instance-status" :class="instance.status">{{ instance.status }}</span>
                <span class="instance-date">{{ formatDate(instance.launch_date) }}</span>
              </div>
              <div class="instance-details">
                <span class="module-info">{{ instance.module_type }} - {{ instance.module?.name || `#${instance.module_id}` }}</span>
                <span class="quiz-type">{{ instance.quiz_type?.name }}</span>
              </div>
              <div v-if="instance.user_quiz_score" class="instance-score">
                <span class="score">{{ instance.user_quiz_score.total_points }} points</span>
                <span class="percentage">{{ instance.user_quiz_score.percentage }}%</span>
                <span class="time">{{ Math.floor(instance.user_quiz_score.total_time / 60) }}min</span>
              </div>
            </div>
            <div class="instance-actions">
              <button 
                v-if="instance.status === 'completed'" 
                @click="viewResult(instance.id)"
                class="btn btn-small btn-secondary"
              >
                Voir Résultat
              </button>
              <button 
                v-if="instance.status === 'started'" 
                @click="resumeQuiz(instance.id)"
                class="btn btn-small btn-primary"
              >
                Reprendre
              </button>
            </div>
          </div>
        </div>
        <div v-else class="no-data">
          <p>Aucun quiz récent</p>
          <button @click="loadRecentInstances" class="btn btn-secondary">Recharger</button>
        </div>
      </section>

      <!-- Actions -->
      <section class="actions-section">
        <h2>🔧 Actions</h2>
        <div class="actions-grid">
          <button @click="loadAllData" class="btn btn-primary" :disabled="isLoading">
            🔄 Recharger toutes les données
          </button>
          <button @click="clearAllData" class="btn btn-secondary">
            🗑️ Vider le cache
          </button>
          <button @click="goToDashboard" class="btn btn-success">
            📊 Aller au Dashboard
          </button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'
import { useProgress } from '@/composables/useProgress'
import quizService from '@/services/quiz'
import authService from '@/services/auth'
import chapterService from '@/services/chapters'
import discoveryService from '@/services/discoveries'
import weeklyService from '@/services/weeklyChallenges'
import eventService from '@/services/events'

const router = useRouter()
const quizStore = useQuizStore()
const { 
  totalPoints, 
  completedQuizzes, 
  getProgress: fetchUserProgress,
  loading: progressLoading,
  error: progressError 
} = useProgress()

// State
const isLoading = ref(false)
const isStarting = ref(false)
const loadingMessage = ref('Chargement...')
const error = ref('')

const selectedQuizType = ref(null)
const quizTypes = ref([])
const availableModules = ref([])
const recentInstances = ref([])

// Computed
const user = computed(() => quizStore.getUserStats?.user || null)

// Données hybrides : useProgress en priorité, store quiz en fallback
const hybridTotalPoints = computed(() => {
  // Toujours utiliser useProgress pour la cohérence avec le Dashboard
  return totalPoints.value || 0
})

const hybridCompletedQuizzes = computed(() => {
  // Toujours utiliser useProgress pour la cohérence avec le Dashboard
  return completedQuizzes.value || 0
})

// Indicateur de la source de données utilisée
const dataSource = computed(() => {
  if (totalPoints.value && !progressError.value) {
    return { source: 'useProgress', icon: '🔄', label: 'Données temps réel' }
  }
  return { source: 'store', icon: '💾', label: 'Données cache' }
})

// Utilisation des données du composable useProgress au lieu du store quiz
// const totalPoints = computed(() => quizStore.getUserStats?.total_points || 0)
// const completedQuizzes = computed(() => quizStore.getUserStats?.completed_quizzes || 0)

const userInitials = computed(() => {
  if (user.value?.name) {
    return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }
  return isAuthenticated.value ? 'U' : '?'
})

const isAuthenticated = computed(() => authService.isAuthenticated())

// Methods
const clearError = () => {
  error.value = ''
}

const setupDemoAuthentication = async () => {
  try {
    // Vérifier si on est déjà authentifié
    if (authService.isAuthenticated()) {
      console.log('✅ Utilisateur déjà authentifié')
      // Recharger les données du cache après authentification
      await quizStore.refreshCache()
      return true
    }
    
    // Configurer le token de démonstration
    console.log('🎭 Configuration du token de démonstration...')
    const demoToken = authService.setDemoToken()
    
    // Valider le token
    const isValid = await authService.validateToken()
    if (isValid) {
      console.log('✅ Token de démonstration validé')
      // Recharger les données du cache après authentification
      await quizStore.refreshCache()
      return true
    } else {
      console.warn('❌ Token de démonstration invalide')
      return false
    }
  } catch (err) {
    console.error('❌ Erreur configuration authentification:', err)
    error.value = 'Erreur de configuration de l\'authentification de test'
    return false
  }
}

const selectQuizType = async (quizType) => {
  selectedQuizType.value = quizType
  availableModules.value = []
  console.log('Type de quiz sélectionné:', quizType.name)
  
  // Charger automatiquement les modules correspondant au type de quiz
  await loadModulesForQuizType()
}

const loadModulesForQuizType = async () => {
  if (!selectedQuizType.value) return
  
  try {
    isLoading.value = true
    loadingMessage.value = `Chargement des modules ${selectedQuizType.value.name}...`
    
    let modules = []
      // Correspondance avec la vraie architecture polymorphique Breitling League    // Les types réels sont : Discovery Quiz, Novelty Quiz, Weekly Quiz, Event Quiz, Reminder Quiz
    const quizTypeName = selectedQuizType.value.name.toLowerCase()
    
    switch (quizTypeName) {
      case 'discovery quiz':
        // Quiz Discovery : chapitres discovery avec mode apprentissage + quiz
        const discoveriesResponse = await discoveryService.getAll();
        modules = (discoveriesResponse.data?.data || discoveriesResponse.data || []).map(discovery => ({
          ...discovery,
          name: discovery.title || `Discovery ${discovery.id}`,
          description: discovery.description || `Chapitre discovery avec théorie et quiz`,
          availableDate: discovery.available_date,
          chapterTitle: discovery.chapter?.title || 'Chapitre non défini',
          type: 'discovery', // Type polymorphique
          mode: 'discovery' // Mode de quiz
        }))
        break
        
      case 'novelty quiz':
        // Quiz Novelty : nouveautés avec théorie + quiz (structure similaire aux discovery)
        const chaptersResponse = await chapterService.getAll()
        const chapters = chaptersResponse.data?.data || chaptersResponse.data || []
        modules = chapters
          .filter(chapter => chapter.title?.toLowerCase().includes('[novelties]') || chapter.title?.toLowerCase().includes('nouveauté'))
          .map(chapter => ({
            id: chapter.id,            name: chapter.title?.replace('[novelties]', '').trim() || `Nouveauté ${chapter.id}`,
            description: chapter.description || 'Découvrez les dernières nouveautés Breitling',
            chapterTitle: chapter.title,
            theoryContent: chapter.theory_content,
            type: 'novelty', // Type polymorphique
            mode: 'novelty' // Mode de quiz
          }));
        break
          case 'weekly quiz':
        // Quiz Weekly : défis hebdomadaires basés sur des chapitres
        const weeklyChaptersResponse = await chapterService.getAll();
        const weeklyChapters = weeklyChaptersResponse.data?.data || weeklyChaptersResponse.data || [];
        modules = weeklyChapters.slice(0, 4).map((chapter, i) => ({
          id: i + 1,
          name: `Défi Semaine ${i + 1}`,
          description: `Questions aléatoires du chapitre "${chapter.title}" - Gagnez des tickets !`,
          chapterTitle: chapter.title,
          chapterId: chapter.id,
          type: 'weekly', // Type polymorphique
          mode: 'weekly' // Mode de quiz
        }))
        break
          case 'event quiz':
        // Quiz Event : événements thématiques multi-unités
        modules = [
          { 
            id: 1, 
            name: 'Fête des Mères 2025', 
            description: 'Quiz spécial Fête des Mères - Collections féminines',
            type: 'event', // Type polymorphique
            mode: 'event' // Mode de quiz
          },
          { 
            id: 2, 
            name: 'Watches & Wonders 2025', 
            description: 'Quiz sur les nouveautés du salon',
            type: 'event', // Type polymorphique
            mode: 'event' // Mode de quiz
          },
          { 
            id: 3, 
            name: 'Breitling Aviation Legacy', 
            description: 'Quiz sur l\'héritage aviation de Breitling',
            type: 'event', // Type polymorphique
            mode: 'event' // Mode de quiz
          }
        ]
        break
        
      case 'reminder quiz':
        // Quiz Reminder : révisions des Discovery déjà complétées
        const reminderResponse = await discoveryService.getAll()
        modules = (reminderResponse.data?.data || reminderResponse.data || []).map(discovery => ({
          ...discovery,          name: `Rappel: ${discovery.title || discovery.name}`,
          description: `Révision rapide du chapitre discovery`,
          originalTitle: discovery.title || discovery.name,
          type: 'reminder', // Type polymorphique
          mode: 'reminder' // Mode de quiz
        }))
        break
        
      default:
        console.warn('Type de quiz non reconnu:', selectedQuizType.value.name)
        modules = []
    }
    
    availableModules.value = modules
    console.log(`Modules ${selectedQuizType.value.name} chargés:`, modules.length)
    
  } catch (err) {
    console.error(`Erreur chargement modules ${selectedQuizType.value.name}:`, err)
    error.value = `Erreur lors du chargement des modules ${selectedQuizType.value.name}`
  } finally {
    isLoading.value = false
  }
}

const loadQuizTypes = async () => {
  try {
    isLoading.value = true
    loadingMessage.value = 'Chargement des types de quiz...'
    
    const response = await quizService.getQuizTypes()
    quizTypes.value = response.data.data || response.data || []
    
    console.log('Types de quiz chargés:', quizTypes.value.length)
  } catch (err) {
    console.error('Erreur chargement types quiz:', err)
    error.value = 'Erreur lors du chargement des types de quiz'
  } finally {
    isLoading.value = false
  }
}

const loadModules = async () => {
  // Cette fonction n'est plus nécessaire car loadModulesForQuizType gère tout
  console.warn('loadModules() est obsolète, utiliser loadModulesForQuizType()')
}

const startQuizForModule = async (module) => {
  if (!selectedQuizType.value) return
  
  try {
    isStarting.value = true
    loadingMessage.value = 'Démarrage du quiz...'
    
    // Correspondance avec l'architecture polymorphique réelle
    const quizTypeName = selectedQuizType.value.name.toLowerCase()
    let quizableType = ''
      // Mapper les noms de types de quiz vers les types polymorphiques
    switch (quizTypeName) {
      case 'discovery quiz':
        quizableType = 'discovery';
        break
      case 'novelty quiz':
        quizableType = 'novelty';
        break
      case 'weekly quiz':
        quizableType = 'weekly';
        break
      case 'event quiz':
        quizableType = 'event';
        break
      case 'reminder quiz':        quizableType = 'reminder';
        break
      default:
        console.warn('Type de quiz non reconnu:', selectedQuizType.value.name);
        quizableType = 'unit';
    }
    
    // Utiliser l'architecture polymorphique avec quizable_type et quizable_id
    const quizData = {
      quiz_type_id: selectedQuizType.value.id,
      quizable_type: quizableType,
      quizable_id: module.id
    }
    
    // Ajouter quiz_mode selon le type si nécessaire
    if (module.mode) {
      quizData.quiz_mode = module.mode
    }
    
    console.log('🎯 Démarrage quiz polymorphique avec:', quizData)
    
    const response = await quizService.start(quizData)
    console.log('Réponse complète du démarrage:', response.data)
    
    // La structure de réponse est { success: true, data: { quiz_instance_id: ... } }
    const quizInstanceId = response.data?.data?.quiz_instance_id || response.data?.quiz_instance_id
    
    if (quizInstanceId) {
      console.log('✅ Quiz démarré avec succès:', quizInstanceId)
      // Rediriger vers la page de jeu ou afficher le quiz
      router.push({ 
        name: 'QuizPlay', 
        params: { id: quizInstanceId }
      })
    } else {
      console.error('❌ Aucun quiz_instance_id trouvé dans la réponse')
      error.value = 'Erreur lors du démarrage : aucun ID de quiz retourné'
    }
    
  } catch (err) {
    console.error('❌ Erreur démarrage quiz:', err)
    error.value = 'Erreur lors du démarrage du quiz'
  } finally {
    isStarting.value = false
  }
}

const loadRecentInstances = async () => {
  try {
    isLoading.value = true
    loadingMessage.value = 'Chargement des quiz récents...'
      const response = await quizService.getUserQuizInstances({ limit: 10 })
    // Corriger l'accès aux données - l'API retourne response.data.data.instances
    recentInstances.value = response.data?.data?.instances || response.data?.instances || response.data || []
    
    console.log('Quiz récents chargés:', recentInstances.value.length)
  } catch (err) {
    console.error('Erreur chargement instances:', err)
    error.value = 'Erreur lors du chargement des quiz récents'
  } finally {
    isLoading.value = false
  }
}

const viewResult = async (instanceId) => {
  try {
    const response = await quizService.getResult(instanceId)
    console.log('Résultat du quiz:', response.data)
    // Vous pouvez afficher les résultats dans une modal ou rediriger
  } catch (err) {
    console.error('Erreur récupération résultat:', err)
    error.value = 'Erreur lors de la récupération du résultat'
  }
}

const resumeQuiz = (instanceId) => {
  router.push({ 
    name: 'QuizPlay', 
    params: { id: instanceId }
  })
}

const loadAllData = async () => {
  await Promise.all([
    loadQuizTypes(),
    loadRecentInstances()
  ])
}

const clearAllData = () => {
  selectedQuizType.value = null
  quizTypes.value = []
  availableModules.value = []
  recentInstances.value = []
  error.value = ''
  console.log('Cache vidé')
}

const goToDashboard = () => {
  router.push({ name: 'Dashboard' })
}

const getQuizTypeIcon = (quizTypeName) => {
  const icons = {
    'discovery': '🔍',
    'unit': '📖',
    'weekly': '📅',
    'event': '🎉',
    'novelty': '✨',
    'reminder': '📌'
  }
  return icons[quizTypeName.toLowerCase()] || '🎯'
}

const getModuleSectionTitle = (quizTypeName) => {
  const titles = {
    'discovery': 'Modules Discovery Disponibles',
    'unit': 'Unités de Chapitre Disponibles',
    'weekly': 'Défis Hebdomadaires',
    'event': 'Événements Thématiques',
    'novelty': 'Nouveautés Produits',
    'reminder': 'Rappels Discovery'
  }
  return titles[quizTypeName.toLowerCase()] || `Modules ${quizTypeName}`
}

const getModuleDescription = (quizTypeName, module) => {
  switch (quizTypeName.toLowerCase()) {
    case 'discovery':
      return module.description || 'Module de découverte'
    case 'unit':
      return `Unité du chapitre: ${module.chapterName || 'Chapitre'}`
    case 'weekly':
      return 'Défi hebdomadaire'
    case 'event':
      return 'Quiz événementiel'
    case 'novelty':
      return 'Nouveauté produit'
    case 'reminder':
      return 'Rappel rapide'
    default:
      return module.description || 'Module de quiz'
  }
}

const getNoModulesMessage = (quizTypeName) => {
  const messages = {
    'discovery': 'Aucun module Discovery disponible',
    'unit': 'Aucune unité disponible',
    'weekly': 'Aucun défi hebdomadaire actif',
    'event': 'Aucun événement en cours',
    'novelty': 'Aucune nouveauté disponible',
    'reminder': 'Aucun rappel disponible'
  }
  return messages[quizTypeName.toLowerCase()] || `Aucun module ${quizTypeName} disponible`
}

const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue'
  try {
    return new Date(dateString).toLocaleString('fr-FR')
  } catch {
    return 'Date invalide'
  }
}

// Lifecycle
onMounted(async () => {
  console.log('🚀 Initialisation QuizTestView')
  
  // Configurer l'authentification de test d'abord
  const authConfigured = await setupDemoAuthentication()
  if (!authConfigured) {
    error.value = 'Impossible de configurer l\'authentification de test'
    return
  }
  
  await quizStore.refreshCache()
  
  // Charger les données de progression si l'utilisateur est authentifié
  if (authService.isAuthenticated()) {
    try {
      await fetchUserProgress()
      console.log('✅ Données de progression chargées:', {
        totalPoints: totalPoints.value,
        completedQuizzes: completedQuizzes.value
      })
    } catch (err) {
      console.warn('⚠️ Impossible de charger les données de progression, utilisation du cache store:', err.message)
      // En cas d'erreur, les données du store seront utilisées comme fallback
    }
  }
  
  await loadAllData()
})
</script>

<style scoped>
.quiz-test-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.test-header {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.test-header h1 {
  margin: 0 0 10px 0;
  color: #2d3748;
  font-size: 32px;
}

.test-header p {
  margin: 0;
  color: #4a5568;
  font-size: 16px;
}

.loading-section, .error-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
  background: rgba(254, 226, 226, 0.95);
}

.error-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #e53e3e;
}

.error-close {
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
}

.test-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.user-section, .quiz-types-section, .modules-section, .instances-section, .actions-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 20px;
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

.user-info h3 {
  margin: 0 0 5px 0;
  color: #2d3748;
}

.user-info p {
  margin: 0 0 10px 0;
  color: #4a5568;
}

.user-stats {
  display: flex;
  gap: 15px;
}

.stat {
  background: #e2e8f0;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: #4a5568;
}

.stat-success {
  background: #d4edda;
  color: #155724;
}

.stat-error {
  background: #f8d7da;
  color: #721c24;
}

.stat-source {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: bold;
  cursor: help;
}

.auth-status-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.auth-warning {
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.warning-icon {
  font-size: 48px;
}

.warning-content h3 {
  margin: 0 0 10px 0;
  color: #d69e2e;
}

.warning-content p {
  margin: 0 0 15px 0;
  color: #4a5568;
}

.quiz-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.quiz-type-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 15px;
}

.quiz-type-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.quiz-type-card.selected {
  border-color: #667eea;
  background: #f7fafc;
}

.quiz-type-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quiz-type-content h3 {
  margin: 0 0 8px 0;
  color: #2d3748;
}

.quiz-type-content p {
  margin: 0 0 10px 0;
  color: #4a5568;
  font-size: 14px;
}

.quiz-type-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-item {
  font-size: 12px;
  color: #718096;
}

.module-type-selector {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.module-type-btn {
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.module-type-btn:hover {
  border-color: #667eea;
}

.module-type-btn.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.module-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.module-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.module-icon {
  font-size: 24px;
  margin-bottom: 10px;
}

.module-content h4 {
  margin: 0 0 5px 0;
  color: #2d3748;
}

.module-content p {
  margin: 0 0 15px 0;
  color: #718096;
  font-size: 14px;
}

.instances-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.instance-item {
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
}

.instance-header {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.instance-id {
  font-weight: bold;
  color: #2d3748;
}

.instance-status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.instance-status.completed {
  background: #d4edda;
  color: #155724;
}

.instance-status.started {
  background: #fff3cd;
  color: #856404;
}

.instance-date {
  color: #718096;
  font-size: 12px;
}

.module-info, .quiz-type {
  color: #4a5568;
  font-size: 14px;
}

.instance-score {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.score, .percentage, .time {
  font-size: 12px;
  color: #718096;
}

.actions-grid {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
}

.btn-success {
  background: #48bb78;
  color: white;
}

.btn-success:hover {
  background: #38a169;
}

.btn-small {
  padding: 8px 12px;
  font-size: 12px;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #718096;
}

.no-data p {
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .quiz-test-view {
    padding: 15px;
  }
  
  .test-header {
    padding: 20px;
  }
  
  .user-card {
    flex-direction: column;
    text-align: center;
  }
  
  .quiz-types-grid, .modules-grid {
    grid-template-columns: 1fr;
  }
  
  .instance-item {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .actions-grid {
    flex-direction: column;
  }
}
</style>
