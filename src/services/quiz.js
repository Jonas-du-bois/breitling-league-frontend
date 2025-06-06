import api from '@/services/api';

/**
 * Service pour la gestion des sessions de quiz et des réponses
 */
export default {
  /**
   * Démarre une nouvelle session de quiz
   * @param {Object} quizData - Données pour démarrer le quiz (type, chapitre, etc.)
   * @returns {Promise} Promesse contenant la session de quiz créée
   */
  start(quizData) {
    return api.post('/quiz/start', quizData);
  },

  /**
   * Soumet les réponses d'un quiz
   * @param {Object} submissionData - Données de soumission (session_id, réponses, etc.)
   * @returns {Promise} Promesse contenant le résultat de la soumission
   */
  submit(submissionData) {
    return api.post('/quiz/submit', submissionData);
  },

  /**
   * Récupère le résultat d'un quiz
   * @param {number} sessionId - ID de la session de quiz
   * @returns {Promise} Promesse contenant le résultat du quiz
   */
  getResult(sessionId) {
    return api.get(`/quiz/result/${sessionId}`);
  }
};
