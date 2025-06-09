<template>
  <div class="login-container">
    <div class="login-card">
      <header class="login-header">
        <h2>🔐 Connexion - Breitling League</h2>
        <p class="login-subtitle">Connectez-vous pour accéder au tableau de bord</p>
      </header>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email :</label>
          <input
            id="email"
            v-model="credentials.email"
            type="email"
            required
            class="form-input"
            placeholder="exemple@breitling.com"
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Mot de passe :</label>
          <input
            id="password"
            v-model="credentials.password"
            type="password"
            required
            class="form-input"
            placeholder="Votre mot de passe"
            :disabled="loading"
          />
        </div>
        
        <button 
          type="submit" 
          :disabled="loading || !isFormValid" 
          class="login-btn"
          :class="{ 'loading': loading }"
        >
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>
      
      <div class="demo-section">
        <h3>🚀 Accès de démonstration</h3>
        <p class="demo-description">
          Utilisez le token de démonstration pour tester l'application
        </p>
        <button 
          @click="handleDemoLogin" 
          :disabled="loading"
          class="demo-btn"
        >
          Utiliser le token de démonstration
        </button>
      </div>
      
      <!-- Messages d'état -->
      <div v-if="error" class="message error-message">
        ⚠️ {{ error }}
      </div>
      
      <div v-if="success" class="message success-message">
        ✅ {{ success }}
      </div>
      
      <!-- Informations de développement -->
      <div v-if="showDevInfo" class="dev-info">
        <h4>Informations de développement :</h4>
        <div class="token-display">
          <strong>Token actuel :</strong>
          <code v-if="currentToken">{{ formatTokenDisplay(currentToken) }}</code>
          <span v-else class="no-token">Aucun token</span>
        </div>
        <div class="auth-status">
          <strong>Statut :</strong>
          <span :class="authStatusClass">{{ authStatusText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { authService } from '@/services';

/**
 * Configuration et constantes
 */
const DEMO_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password'
};

const REDIRECT_DELAY = 1500; // ms

/**
 * Composables et router
 */
const router = useRouter();
const { login, loading, error: authError, isAuthenticated } = useAuth();

/**
 * État local du composant
 */
const credentials = ref({ ...DEMO_CREDENTIALS });
const localError = ref('');
const success = ref('');
const showDevInfo = ref(true); // Pour le développement

/**
 * Propriétés calculées
 */
const error = computed(() => authError.value || localError.value);

const currentToken = computed(() => authService.getToken());

const isFormValid = computed(() => {
  return credentials.value.email.length > 0 && 
         credentials.value.password.length > 0 &&
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.value.email);
});

const authStatusText = computed(() => {
  if (loading.value) return 'Chargement...';
  return isAuthenticated.value ? 'Connecté' : 'Non connecté';
});

const authStatusClass = computed(() => ({
  'status-connected': isAuthenticated.value,
  'status-disconnected': !isAuthenticated.value,
  'status-loading': loading.value
}));

/**
 * Utilitaires
 */
const formatTokenDisplay = (token) => {
  if (!token) return 'Aucun';
  return token.length > 50 ? `${token.substring(0, 50)}...` : token;
};

const clearMessages = () => {
  localError.value = '';
  success.value = '';
};

const showSuccessAndRedirect = (message, redirectPath = '/') => {
  success.value = message;
  setTimeout(() => {
    router.push(redirectPath);
  }, REDIRECT_DELAY);
};

/**
 * Gestionnaires d'événements
 */
const handleLogin = async () => {
  clearMessages();
  
  try {
    console.log('🔐 Tentative de connexion depuis LoginView');
    await login(credentials.value);
    showSuccessAndRedirect('Connexion réussie ! Redirection...', '/test-quiz');
  } catch (err) {
    console.error('❌ Erreur de connexion dans LoginView:', err);
    localError.value = err.message || 'Erreur de connexion';
  }
};

const handleDemoLogin = () => {
  clearMessages();
  
  try {
    authService.setDemoToken();
    showSuccessAndRedirect('Token de démonstration configuré !', '/test-quiz');
  } catch (err) {
    console.error('❌ Erreur lors de la configuration du token de démo:', err);
    localError.value = 'Erreur lors de la configuration du token de démonstration';
  }
};

/**
 * Cycle de vie du composant
 */
onMounted(() => {
  console.log('📍 Composant LoginView monté');
  console.log('🔑 Token actuel:', currentToken.value ? 'Présent' : 'Absent');
  console.log('🔍 Statut d\'authentification:', isAuthenticated.value);
});
</script>

<style scoped>
/* Variables CSS pour maintenir la cohérence */
:root {
  --primary-color: #667eea;
  --primary-dark: #5a6fd8;
  --success-color: #28a745;
  --success-dark: #218838;
  --error-color: #dc3545;
  --warning-color: #ffc107;
  --text-color: #333;
  --text-light: #555;
  --border-color: #ddd;
  --border-focus: #667eea;
  --background-light: #f8f9fa;
  --shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  --border-radius: 12px;
  --transition: all 0.3s ease;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1.5rem;
}

.login-subtitle {
  margin: 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-light);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  transition: var(--transition);
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--background-light);
}

.login-btn, .demo-btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
}

.login-btn {
  background: var(--primary-color);
  color: white;
  margin-bottom: 1rem;
}

.login-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.login-btn.loading {
  opacity: 0.8;
}

.demo-section {
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.demo-section h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1.1rem;
}

.demo-description {
  margin: 0 0 1rem 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

.demo-btn {
  background: var(--success-color);
  color: white;
}

.demo-btn:hover:not(:disabled) {
  background: var(--success-dark);
  transform: translateY(-1px);
}

.message {
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-message {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.dev-info {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--background-light);
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.dev-info h4 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
  font-size: 1rem;
}

.token-display, .auth-status {
  margin-bottom: 0.5rem;
}

.token-display code, .no-token {
  background: #e9ecef;
  padding: 0.5rem;
  border-radius: 4px;
  display: block;
  word-break: break-all;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.no-token {
  color: var(--text-light);
  font-style: italic;
}

.status-connected {
  color: var(--success-color);
  font-weight: 600;
}

.status-disconnected {
  color: var(--error-color);
  font-weight: 600;
}

.status-loading {
  color: var(--warning-color);
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 1.5rem;
  }
  
  .login-header h2 {
    font-size: 1.3rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  animation: fadeIn 0.5s ease-out;
}
</style>
