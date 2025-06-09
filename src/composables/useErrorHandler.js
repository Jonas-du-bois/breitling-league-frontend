import { ref } from 'vue';

/**
 * Composable pour la gestion centralisée des erreurs
 * Respecte le principe DRY et fournit une interface cohérente
 * @returns {Object} État et méthodes de gestion d'erreur
 */
export function useErrorHandler() {
  // État réactif des erreurs
  const errors = ref([]);
  const isLoading = ref(false);

  /**
   * Types d'erreurs standardisés
   */
  const ERROR_TYPES = {
    NETWORK: 'network',
    VALIDATION: 'validation',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    SERVER: 'server',
    CLIENT: 'client'
  };

  /**
   * Ajoute une nouvelle erreur à la liste
   * @param {Error|string} error - Erreur à ajouter
   * @param {string} type - Type d'erreur (optionnel)
   * @param {Object} context - Contexte additionnel (optionnel)
   */
  const addError = (error, type = ERROR_TYPES.CLIENT, context = {}) => {
    const errorObject = {
      id: Date.now() + Math.random(),
      message: typeof error === 'string' ? error : error.message,
      type,
      context,
      timestamp: new Date().toISOString(),
      originalError: error
    };

    errors.value.push(errorObject);
    console.error(`[${type.toUpperCase()}]`, errorObject.message, context);
  };

  /**
   * Supprime une erreur par son ID
   * @param {string|number} errorId - ID de l'erreur à supprimer
   */
  const removeError = (errorId) => {
    const index = errors.value.findIndex(err => err.id === errorId);
    if (index > -1) {
      errors.value.splice(index, 1);
    }
  };

  /**
   * Efface toutes les erreurs
   */
  const clearErrors = () => {
    errors.value = [];
  };

  /**
   * Gère une erreur HTTP de manière intelligente
   * @param {Error} error - Erreur HTTP à traiter
   * @param {string} defaultMessage - Message par défaut si aucun message spécifique
   * @returns {string} Message d'erreur formaté
   */
  const handleHttpError = (error, defaultMessage = 'Une erreur est survenue') => {
    let errorType = ERROR_TYPES.CLIENT;
    let errorMessage = defaultMessage;

    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorType = ERROR_TYPES.VALIDATION;
          errorMessage = data.message || 'Données invalides';
          break;
          
        case 401:
          errorType = ERROR_TYPES.AUTHENTICATION;
          errorMessage = 'Session expirée. Veuillez vous reconnecter.';
          break;
          
        case 403:
          errorType = ERROR_TYPES.AUTHORIZATION;
          errorMessage = 'Accès non autorisé';
          break;
          
        case 404:
          errorType = ERROR_TYPES.CLIENT;
          errorMessage = 'Ressource non trouvée';
          break;
          
        case 422:
          errorType = ERROR_TYPES.VALIDATION;
          if (data.errors) {
            // Gestion des erreurs de validation Laravel
            const firstError = Object.values(data.errors)[0];
            errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            errorMessage = data.message || 'Erreur de validation';
          }
          break;
          
        case 429:
          errorType = ERROR_TYPES.CLIENT;
          errorMessage = 'Trop de requêtes. Veuillez patienter.';
          break;
          
        case 500:
        case 502:
        case 503:
        case 504:
          errorType = ERROR_TYPES.SERVER;
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
          break;
          
        default:
          errorMessage = data.message || defaultMessage;
      }
    } else if (error.request) {
      errorType = ERROR_TYPES.NETWORK;
      errorMessage = 'Problème de connexion. Vérifiez votre connexion internet.';
    }

    addError(errorMessage, errorType, {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method
    });

    return errorMessage;
  };

  /**
   * Exécute une fonction asynchrone avec gestion d'erreur automatique
   * @param {Function} asyncFn - Fonction asynchrone à exécuter
   * @param {string} errorMessage - Message d'erreur par défaut
   * @returns {Promise} Résultat de la fonction ou undefined en cas d'erreur
   */
  const withErrorHandling = async (asyncFn, errorMessage = 'Opération échouée') => {
    isLoading.value = true;
    clearErrors();
    
    try {
      const result = await asyncFn();
      return result;
    } catch (error) {
      handleHttpError(error, errorMessage);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Retourne la dernière erreur
   * @returns {Object|null} Dernière erreur ou null
   */
  const getLastError = () => {
    return errors.value.length > 0 ? errors.value[errors.value.length - 1] : null;
  };

  /**
   * Retourne les erreurs par type
   * @param {string} type - Type d'erreur à filtrer
   * @returns {Array} Liste des erreurs du type spécifié
   */
  const getErrorsByType = (type) => {
    return errors.value.filter(error => error.type === type);
  };

  /**
   * Vérifie s'il y a des erreurs d'un type spécifique
   * @param {string} type - Type d'erreur à vérifier
   * @returns {boolean} True s'il y a des erreurs de ce type
   */
  const hasErrorsOfType = (type) => {
    return getErrorsByType(type).length > 0;
  };

  return {
    // État
    errors,
    isLoading,
    
    // Constantes
    ERROR_TYPES,
    
    // Méthodes de gestion
    addError,
    removeError,
    clearErrors,
    handleHttpError,
    withErrorHandling,
    
    // Méthodes utilitaires
    getLastError,
    getErrorsByType,
    hasErrorsOfType
  };
}
