import api from '@/services/api';

/**
 * Service pour la gestion des sessions de quiz et des réponses
 */
export default {
  /**
   * Récupère tous les types de quiz disponibles
   * @returns {Promise} Promesse contenant la liste des types de quiz
   */
  getQuizTypes() {
    console.log('📋 Service Quiz - Récupération des types de quiz');
    return api.get('/quiz/types');
  },

  /**
   * Récupère les instances de quiz de l'utilisateur avec filtres
   * @param {Object} filters - Filtres optionnels (status, quiz_type_id, limit)
   * @returns {Promise} Promesse contenant les instances et statistiques
   */
  getUserQuizInstances(filters = {}) {
    console.log('📊 Service Quiz - Récupération des instances avec filtres:', filters);
    return api.get('/quiz/instances', { params: filters });
  },

  /**
   * Récupère les statistiques détaillées des quiz de l'utilisateur
   * @returns {Promise} Promesse contenant les statistiques complètes
   */
  getUserStats() {
    console.log('📈 Service Quiz - Récupération des statistiques utilisateur');
    return api.get('/quiz/stats');
  },

  /**
   * Démarre une nouvelle session de quiz
   * @param {Object} quizData - Données pour démarrer le quiz
   * @param {number} quizData.quiz_type_id - ID du type de quiz (requis)
   * @param {string} [quizData.quizable_type] - Type de module quiz (unit, discovery, event, weekly, novelty, reminder)
   * @param {number} [quizData.quizable_id] - ID du module associé
   * @param {string} [quizData.quiz_mode] - Mode de quiz personnalisé
   * @param {number} [quizData.chapter_id] - ID du chapitre (backward compatibility)
   * @param {string} [quizData.module_type] - Type de module (backward compatibility)
   * @param {number} [quizData.module_id] - ID du module (backward compatibility)
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  start(quizData) {
    console.log('🚀 Service Quiz - Démarrage avec données:', quizData);
    return api.post('/quiz/start', quizData);
  },

  /**
   * Soumet les réponses d'un quiz
   * @param {Object} submissionData - Données de soumission (quiz_instance_id, answers, total_time)
   * @returns {Promise} Promesse contenant le résultat de la soumission
   */
  submit(submissionData) {
    console.log('📝 Service Quiz - Soumission avec données:', submissionData);
    return api.post('/quiz/submit', submissionData);
  },

  /**
   * Récupère le résultat détaillé d'un quiz
   * @param {number} quizInstanceId - ID de l'instance de quiz
   * @returns {Promise} Promesse contenant le résultat du quiz
   */
  getResult(quizInstanceId) {
    console.log('📊 Service Quiz - Récupération résultat pour:', quizInstanceId);
    return api.get(`/quiz/${quizInstanceId}/result`);
  },

  // Alias pour compatibilité
  startQuiz(quizData) {
    return this.start(quizData);
  },

  submitAnswers(submissionData) {
    return this.submit(submissionData);
  },

  /**
   * Méthodes utilitaires pour la nouvelle architecture polymorphique
   */

  /**
   * Démarre un quiz pour un module spécifique
   * @param {number} quizTypeId - ID du type de quiz
   * @param {string} quizableType - Type de module (unit, discovery, event, etc.)
   * @param {number} quizableId - ID du module
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForModule(quizTypeId, quizableType, quizableId, quizMode = null) {
    const quizData = {
      quiz_type_id: quizTypeId,
      quizable_type: quizableType,
      quizable_id: quizableId
    };
    
    if (quizMode) {
      quizData.quiz_mode = quizMode;
    }
    
    console.log('🎯 Service Quiz - Démarrage pour module:', { quizableType, quizableId });
    return this.start(quizData);
  },

  /**
   * Démarre un quiz pour une unité spécifique
   * @param {number} quizTypeId - ID du type de quiz
   * @param {number} unitId - ID de l'unité
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForUnit(quizTypeId, unitId, quizMode = null) {
    return this.startForModule(quizTypeId, 'unit', unitId, quizMode);
  },

  /**
   * Démarre un quiz de découverte
   * @param {number} quizTypeId - ID du type de quiz
   * @param {number} discoveryId - ID de la découverte
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForDiscovery(quizTypeId, discoveryId, quizMode = null) {
    return this.startForModule(quizTypeId, 'discovery', discoveryId, quizMode);
  },

  /**
   * Démarre un quiz d'événement
   * @param {number} quizTypeId - ID du type de quiz
   * @param {number} eventId - ID de l'événement
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForEvent(quizTypeId, eventId, quizMode = null) {
    return this.startForModule(quizTypeId, 'event', eventId, quizMode);
  },

  /**
   * Démarre un quiz hebdomadaire
   * @param {number} quizTypeId - ID du type de quiz
   * @param {number} weeklyId - ID du quiz hebdomadaire
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForWeekly(quizTypeId, weeklyId, quizMode = null) {
    return this.startForModule(quizTypeId, 'weekly', weeklyId, quizMode);
  },

  /**
   * Démarre un quiz de nouveauté
   * @param {number} quizTypeId - ID du type de quiz
   * @param {number} noveltyId - ID de la nouveauté
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForNovelty(quizTypeId, noveltyId, quizMode = null) {
    return this.startForModule(quizTypeId, 'novelty', noveltyId, quizMode);
  },

  /**
   * Démarre un quiz de rappel
   * @param {number} quizTypeId - ID du type de quiz
   * @param {number} reminderId - ID du rappel
   * @param {string} [quizMode] - Mode de quiz optionnel
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  startForReminder(quizTypeId, reminderId, quizMode = null) {
    return this.startForModule(quizTypeId, 'reminder', reminderId, quizMode);
  },

  /**
   * Helper pour migrer de l'ancienne API vers la nouvelle
   * @param {Object} legacyData - Données dans l'ancien format
   * @returns {Object} Données converties au nouveau format
   */
  convertLegacyToPolymorphic(legacyData) {
    const converted = { ...legacyData };
    
    // Mapper les anciens types vers les nouveaux
    if (legacyData.module_type && legacyData.module_id) {
      const typeMapping = {
        'Unit': 'unit',
        'Discovery': 'discovery',
        'Event': 'event',
        'Weekly': 'weekly',
        'Novelty': 'novelty',
        'Reminder': 'reminder'
      };
      
      converted.quizable_type = typeMapping[legacyData.module_type];
      converted.quizable_id = legacyData.module_id;
      
      // Garder les anciens champs pour backward compatibility
      console.log('🔄 Conversion legacy vers polymorphic:', {
        from: { module_type: legacyData.module_type, module_id: legacyData.module_id },
        to: { quizable_type: converted.quizable_type, quizable_id: converted.quizable_id }
      });
    }
    
    return converted;
  }
};
