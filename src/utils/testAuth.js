/**
 * Utilitaires pour les tests d'authentification
 */

// Token de test généré - remplacez par un nouveau token si nécessaire
const TEST_TOKEN = '4d0a2ca7-5916-451b-bd1c-1018c3506405';

/**
 * Configure l'authentification pour les tests
 */
export function setupTestAuth() {
  localStorage.setItem('token', TEST_TOKEN);
  console.log('🔑 Token de test configuré pour l\'authentification');
}

/**
 * Nettoie l'authentification de test
 */
export function cleanupTestAuth() {
  localStorage.removeItem('token');
  console.log('🔑 Token de test supprimé');
}

/**
 * Vérifie si un token de test est configuré
 */
export function hasTestAuth() {
  return localStorage.getItem('token') === TEST_TOKEN;
}

/**
 * Obtient le token actuel
 */
export function getTestToken() {
  return localStorage.getItem('token');
}
