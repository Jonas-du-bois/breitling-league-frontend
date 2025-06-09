import { ref, reactive, computed } from 'vue';
import quizService from '@/services/quiz';
import chaptersService from '@/services/chapters';
import discoveriesService from '@/services/discoveries';

/**
 * Composable pour gérer les données des quiz
 * Respecte les principes DRY, KISS et clean code
 */
export function useQuiz() {
  // État réactif centralisé
  const isLoading = ref(false);
  const error = ref(null);
  
  // Données des quiz (état minimal)
  const quizData = reactive({
    quizTypes: [],
    quizInstances: [],
    userStats: null,
    currentSession: null,
    chapters: [],
    discoveries: []
  });

  // === COMPUTED PROPERTIES ===
  const completedQuizzes = computed(() => 
    quizData.quizInstances.filter(quiz => quiz.status === 'completed')
  );

  const pendingQuizzes = computed(() => 
    quizData.quizInstances.filter(quiz => quiz.status === 'pending')
  );

  const quizzesByType = computed(() => {
    return quizData.quizTypes.reduce((acc, type) => {
      acc[type.id] = quizData.quizInstances.filter(
        quiz => quiz.quiz_type_id === type.id
      );
      return acc;
    }, {});
  });

  const totalScore = computed(() => {
    return quizData.userStats?.total_points || 0;
  });

  // === UTILITY FUNCTIONS ===
  /**
   * Gestion centralisée des erreurs
   */
  const handleError = (error, defaultMessage = 'Une erreur est survenue') => {
    console.error('❌ Erreur Quiz:', error);
    error.value = error?.response?.data?.message || error.message || defaultMessage;
    isLoading.value = false;
  };

  /**
   * Wrapper pour les appels API avec gestion d'erreurs
   */
  const apiCall = async (apiFunction, ...args) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await apiFunction(...args);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // === API METHODS ===
  /**
   * Charger les types de quiz disponibles
   */
  const loadQuizTypes = async () => {
    try {
      const data = await apiCall(quizService.getQuizTypes);
      quizData.quizTypes = data.data || [];
      return data;
    } catch (err) {
      console.error('Erreur chargement types de quiz:', err);
    }
  };

  /**
   * Charger les instances de quiz avec filtres
   */
  const loadQuizInstances = async (filters = {}) => {
    try {
      const data = await apiCall(quizService.getUserQuizInstances, filters);
      quizData.quizInstances = data.data?.instances || [];
      quizData.userStats = data.data?.stats || null;
      return data;
    } catch (err) {
      console.error('Erreur chargement instances de quiz:', err);
    }
  };

  /**
   * Charger les statistiques utilisateur
   */
  const loadUserStats = async () => {
    try {
      const data = await apiCall(quizService.getUserStats);
      quizData.userStats = data.data || null;
      return data;
    } catch (err) {
      console.error('Erreur chargement statistiques:', err);
    }
  };

  /**
   * Démarrer un nouveau quiz
   */
  const startQuiz = async (quizTypeId, moduleType = 'Unit', moduleId = 1, chapterId = null) => {
    try {
      const quizStartData = {
        quiz_type_id: quizTypeId,
        module_type: moduleType,
        module_id: moduleId
      };
      
      if (chapterId) {
        quizStartData.chapter_id = chapterId;
      }

      const data = await apiCall(quizService.start, quizStartData);
      quizData.currentSession = data.data || null;
      return data;
    } catch (err) {
      console.error('Erreur démarrage quiz:', err);
      throw err;
    }
  };
  /**
   * Soumettre les réponses d'un quiz
   */
  const submitQuiz = async (quizInstanceId, answers, totalTime = 0) => {
    try {
      const submissionData = {
        quiz_instance_id: quizInstanceId,
        answers: answers,
        total_time: totalTime
      };

      const data = await apiCall(quizService.submit, submissionData);
      
      // Recharger les instances pour mettre à jour les données
      await loadQuizInstances();
      
      return data;
    } catch (err) {
      console.error('Erreur soumission quiz:', err);
      throw err;
    }
  };

  /**
   * Récupérer le résultat détaillé d'un quiz
   */
  const getQuizResult = async (quizInstanceId) => {
    try {
      const data = await apiCall(quizService.getResult, quizInstanceId);
      return data;
    } catch (err) {
      console.error('Erreur récupération résultat quiz:', err);
      throw err;
    }
  };

  /**
   * Charger les chapitres disponibles
   */
  const loadChapters = async () => {
    try {
      const data = await apiCall(chaptersService.getAll);
      quizData.chapters = data.data || [];
      return data;
    } catch (err) {
      console.error('Erreur chargement chapitres:', err);
    }
  };

  /**
   * Charger les découvertes (explorations) disponibles
   */
  const loadDiscoveries = async () => {
    try {
      const data = await apiCall(discoveriesService.getAll);
      quizData.discoveries = data.data || [];
      return data;
    } catch (err) {
      console.error('Erreur chargement découvertes:', err);
    }
  };
  // === UTILITY METHODS ===
  /**
   * Nettoyer les erreurs
   */
  const clearError = () => {
    error.value = null;
  };

  /**
   * Réinitialiser toutes les données
   */
  const resetQuizData = () => {
    Object.assign(quizData, {
      quizTypes: [],
      quizInstances: [],
      userStats: null,
      currentSession: null,
      chapters: [],
      discoveries: []
    });
  };

  // === TEST METHODS (pour TestQuizView) ===
  /**
   * Questions de test basées sur les seeders réels
   */
  const getTestQuestions = () => [
    {
      id: 1,
      question_text: "In what year was Breitling founded?",
      choices: [
        { id: 1, choice_text: "1884", is_correct: true },
        { id: 2, choice_text: "1856", is_correct: false },
        { id: 3, choice_text: "1901", is_correct: false },
        { id: 4, choice_text: "1923", is_correct: false }
      ]
    },
    {
      id: 2,
      question_text: "Who founded Breitling?",
      choices: [
        { id: 5, choice_text: "Léon Breitling", is_correct: true },
        { id: 6, choice_text: "Georges Breitling", is_correct: false },
        { id: 7, choice_text: "Gaston Breitling", is_correct: false },
        { id: 8, choice_text: "Louis Breitling", is_correct: false }
      ]
    },
    {
      id: 3,
      question_text: "What are the three core values of Breitling?",
      choices: [
        { id: 9, choice_text: "Precision", is_correct: true },
        { id: 10, choice_text: "Performance", is_correct: true },
        { id: 11, choice_text: "Innovation", is_correct: true },
        { id: 12, choice_text: "Minimalism", is_correct: false }
      ]
    }
  ];

  /**
   * Test complet : démarrage + soumission + résultat
   */
  const testCompleteQuizFlow = async (quizTypeId = 1, moduleType = 'Unit', moduleId = 1) => {
    try {
      console.log('🔄 Test du flux complet de quiz...');
      
      // 1. Démarrer un quiz
      const session = await startQuiz(quizTypeId, moduleType, moduleId);
      
      if (!session?.quiz_instance_id) {
        throw new Error('Aucun quiz_instance_id retourné lors du démarrage');
      }
      
      // 2. Préparer les réponses correctes
      const correctAnswers = [
        { question_id: 1, choice_id: 1 },   // 1884 (correct)
        { question_id: 2, choice_id: 5 },   // Léon Breitling (correct) 
        { question_id: 3, choice_id: 9 }    // Precision (correct)
      ];
      
      // 3. Attendre un peu pour simuler le temps de réflexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 4. Soumettre les réponses avec temps total
      const submitResult = await submitQuiz(session.quiz_instance_id, correctAnswers, 120);
      
      // 5. Récupérer le résultat final
      const finalResult = await getQuizResult(session.quiz_instance_id);
      
      console.log('✅ Flux complet terminé avec succès');
      return { session, submitResult, finalResult };
    } catch (error) {
      console.error('❌ Erreur dans le flux complet de quiz:', error);
      throw error;
    }
  };

  /**
   * Test de différents types de réponses
   */
  const testSubmitQuizWithAnswers = async (quizInstanceId, answerType = 'correct') => {
    try {
      let answers;
      
      switch (answerType) {
        case 'correct':
          answers = [
            { question_id: 1, choice_id: 1 },   // Correct
            { question_id: 2, choice_id: 5 },   // Correct
            { question_id: 3, choice_id: 9 }    // Correct
          ];
          break;
        case 'incorrect':
          answers = [
            { question_id: 1, choice_id: 2 },   // Incorrect
            { question_id: 2, choice_id: 6 },   // Incorrect
            { question_id: 3, choice_id: 12 }   // Incorrect
          ];
          break;
        case 'mixed':
        default:
          answers = [
            { question_id: 1, choice_id: 1 },   // Correct
            { question_id: 2, choice_id: 6 },   // Incorrect
            { question_id: 3, choice_id: 10 }   // Correct mais partiel
          ];
      }
      
      console.log(`🎯 Test de soumission avec réponses ${answerType}...`);
      const result = await submitQuiz(quizInstanceId, answers, 180);
      console.log(`✅ Quiz soumis avec succès (${answerType}):`, result);
      return result;
    } catch (error) {
      console.error(`❌ Erreur lors de la soumission du quiz (${answerType}):`, error);
      throw error;
    }
  };

  // === RETURN OBJECT ===
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
    loadQuizTypes,
    loadQuizInstances,
    loadUserStats,
    startQuiz,
    submitQuiz,
    getQuizResult,
    loadChapters,
    loadDiscoveries,
    
    // Utilitaires
    clearError,
    resetQuizData,
    
    // Tests
    getTestQuestions,
    testCompleteQuizFlow,
    testSubmitQuizWithAnswers
  };
}
