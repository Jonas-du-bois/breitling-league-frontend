import { ref, computed } from 'vue';

/**
 * Composable générique pour gérer les états de chargement et d'erreur des API
 * @returns {Object} État et méthodes pour gérer les appels API
 */
export function useApi() {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

  /**
   * Exécute une requête API avec gestion automatique des états
   * @param {Function} apiCall - Fonction qui retourne une promesse (appel API)
   * @param {Object} options - Options de configuration
   * @returns {Promise} Promesse résolue avec les données ou rejetée avec l'erreur
   */
  const execute = async (apiCall, options = {}) => {
    const {
      loadingMessage = null,
      successMessage = null,
      errorMessage = null,
      resetOnStart = true
    } = options;

    if (resetOnStart) {
      error.value = null;
    }
    
    loading.value = true;

    try {
      const response = await apiCall();
      data.value = response.data;
      
      if (successMessage) {
        console.log(successMessage);
      }
      
      return response.data;
    } catch (err) {
      const errorMsg = errorMessage || 
                      err.response?.data?.message || 
                      err.message || 
                      'Une erreur est survenue';
      
      error.value = errorMsg;
      console.error('Erreur API:', errorMsg);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Réinitialise l'état
   */
  const reset = () => {
    loading.value = false;
    error.value = null;
    data.value = null;
  };

  /**
   * État calculé pour savoir si une opération est en cours
   */
  const isLoading = computed(() => loading.value);

  /**
   * État calculé pour savoir s'il y a une erreur
   */
  const hasError = computed(() => !!error.value);

  /**
   * État calculé pour savoir s'il y a des données
   */
  const hasData = computed(() => !!data.value);

  return {
    // État
    loading,
    error,
    data,
    
    // États calculés
    isLoading,
    hasError,
    hasData,
    
    // Méthodes
    execute,
    reset
  };
}

/**
 * Composable spécialisé pour les listes avec pagination
 * @returns {Object} État et méthodes pour gérer les listes paginées
 */
export function useApiList() {
  const { loading, error, data, execute, reset, isLoading, hasError } = useApi();
  
  const items = computed(() => data.value?.data || []);
  const total = computed(() => data.value?.total || 0);
  const currentPage = computed(() => data.value?.current_page || 1);
  const lastPage = computed(() => data.value?.last_page || 1);
  const hasNextPage = computed(() => currentPage.value < lastPage.value);
  const hasPreviousPage = computed(() => currentPage.value > 1);

  return {
    // État de base
    loading,
    error,
    data,
    isLoading,
    hasError,
    
    // États spécifiques aux listes
    items,
    total,
    currentPage,
    lastPage,
    hasNextPage,
    hasPreviousPage,
    
    // Méthodes
    execute,
    reset
  };
}
