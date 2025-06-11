import api from '@/services/api'

/**
 * Service principal pour la gestion des quiz
 * Architecture CLEAN : méthodes simples et responsabilités claires
 */
class QuizService {
  // === CORE METHODS ===
  
  /**
   * Récupère tous les types de quiz disponibles
   */
  async getQuizTypes() {
    return api.get('/quiz/types')
  }

  /**
   * Récupère les instances de quiz de l'utilisateur
   */
  async getUserQuizInstances(filters = {}) {
    return api.get('/quiz/instances', { params: filters })
  }

  /**
   * Récupère les statistiques détaillées de l'utilisateur
   */
  async getUserStats() {
    return api.get('/quiz/stats')
  }

  /**
   * Récupère une instance de quiz spécifique
   */
  async getInstance(quizInstanceId) {
    return api.get(`/quiz/instance/${quizInstanceId}`)
  }

  /**
   * Démarre une nouvelle session de quiz
   */
  async start(quizData) {
    return api.post('/quiz/start', this._normalizeQuizData(quizData))
  }

  /**
   * Soumet les réponses d'un quiz
   */
  async submit(submissionData) {
    return api.post('/quiz/submit', submissionData)
  }

  /**
   * Récupère le résultat détaillé d'un quiz
   */
  async getResult(quizInstanceId) {
    return api.get(`/quiz/${quizInstanceId}/result`)
  }

  // === CONVENIENCE METHODS ===
  
  /**
   * Démarre un quiz pour un module spécifique (DRY pattern)
   */
  async startForModule(quizTypeId, quizableType, quizableId, quizMode = null) {
    return this.start({
      quiz_type_id: quizTypeId,
      quizable_type: quizableType,
      quizable_id: quizableId,
      ...(quizMode && { quiz_mode: quizMode })
    })
  }

  /**
   * Méthodes spécialisées par type de module
   */
  async startForUnit(quizTypeId, unitId, quizMode = null) {
    return this.startForModule(quizTypeId, 'unit', unitId, quizMode)
  }

  async startForDiscovery(quizTypeId, discoveryId, quizMode = null) {
    return this.startForModule(quizTypeId, 'discovery', discoveryId, quizMode)
  }

  async startForEvent(quizTypeId, eventId, quizMode = null) {
    return this.startForModule(quizTypeId, 'event', eventId, quizMode)
  }

  async startForWeekly(quizTypeId, weeklyId, quizMode = null) {
    return this.startForModule(quizTypeId, 'weekly', weeklyId, quizMode)
  }

  async startForNovelty(quizTypeId, noveltyId, quizMode = null) {
    return this.startForModule(quizTypeId, 'novelty', noveltyId, quizMode)
  }

  async startForReminder(quizTypeId, reminderId, quizMode = null) {
    return this.startForModule(quizTypeId, 'reminder', reminderId, quizMode)
  }

  // === LEGACY COMPATIBILITY ===
  
  /**
   * Alias pour backward compatibility
   */
  startQuiz(quizData) {
    return this.start(quizData)
  }

  submitAnswers(submissionData) {
    return this.submit(submissionData)
  }

  getQuizInstance(instanceId) {
    return this.getInstance(instanceId)
  }

  // === PRIVATE HELPERS ===
  
  /**
   * Normalise les données de quiz (KISS principle)
   */
  _normalizeQuizData(quizData) {
    const normalized = { ...quizData }
    
    // Conversion legacy vers polymorphic si nécessaire
    if (quizData.module_type && quizData.module_id && !quizData.quizable_type) {
      const typeMapping = {
        'Unit': 'unit',
        'Discovery': 'discovery', 
        'Event': 'event',
        'Weekly': 'weekly',
        'Novelty': 'novelty',
        'Reminder': 'reminder'
      }
      
      normalized.quizable_type = typeMapping[quizData.module_type]
      normalized.quizable_id = quizData.module_id
    }
    
    return normalized
  }
}

// Export singleton instance
export default new QuizService()
