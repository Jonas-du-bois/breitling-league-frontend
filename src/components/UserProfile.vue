<template>
  <div class="user-profile">
    <h2>Profil Utilisateur</h2>
    
    <div v-if="loading" class="loading">
      Chargement en cours...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="user" class="user-info">
      <h3>Bienvenue, {{ user.name }} !</h3>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p v-if="user.nom"><strong>Nom complet :</strong> {{ user.nom }}</p>
      <p><strong>Date d'inscription :</strong> {{ formatDate(user.date_inscription) }}</p>
      
      <div class="actions">
        <button @click="logout" class="btn-danger">
          Se déconnecter
        </button>
      </div>
    </div>
    
    <div v-else class="not-logged-in">
      <p>Vous n'êtes pas connecté.</p>
    </div>

    <div class="api-test">
      <h3>Tester l'API</h3>
      <button @click="testApi" class="btn-secondary">
        Tester la route publique
      </button>
      <button @click="testProtectedApi" class="btn-secondary">
        Tester la route protégée
      </button>
      
      <div v-if="apiResponse" class="api-response">
        <h4>Réponse :</h4>
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../services/auth';

export default {
  name: 'UserProfile',
  props: {
    initialUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      user: this.initialUser,
      loading: false,
      error: null,
      apiResponse: null
    };
  },
  created() {
    if (!this.user && localStorage.getItem('token')) {
      this.fetchUserData();
    }
  },
  methods: {
    /**
     * Récupère les données de l'utilisateur connecté
     */
    async fetchUserData() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await auth.getUser();
        this.user = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur', error);
        this.error = 'Impossible de récupérer vos informations. Vous êtes peut-être déconnecté.';
        // Si on reçoit une erreur 401, l'utilisateur n'est pas/plus authentifié
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          this.$emit('logout');
        }
      } finally {
        this.loading = false;
      }
    },
    
    /**
     * Déconnexion de l'utilisateur
     */
    async logout() {
      try {
        await auth.logout();
        localStorage.removeItem('token');
        this.user = null;
        this.$emit('logout');
      } catch (error) {
        console.error('Erreur lors de la déconnexion', error);
      }
    },
    
    /**
     * Teste la route API publique
     */
    async testApi() {
      try {
        const response = await auth.testApi();
        this.apiResponse = response.data;
      } catch (error) {
        this.apiResponse = {
          error: true,
          message: error.response?.data?.message || 'Erreur lors du test de l\'API'
        };
      }
    },
    
    /**
     * Teste la route API protégée
     */
    async testProtectedApi() {
      try {
        const response = await auth.getUser();
        this.apiResponse = response.data;
      } catch (error) {
        this.apiResponse = {
          error: true,
          message: error.response?.data?.message || 'Erreur lors du test de l\'API protégée'
        };
      }
    },
    
    /**
     * Formate une date pour l'affichage
     */
    formatDate(dateString) {
      if (!dateString) return 'Non disponible';
      
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    }
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2, h3 {
  margin-top: 0;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.error {
  background-color: #f2dede;
  color: #a94442;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ebccd1;
}

.user-info {
  margin-bottom: 20px;
}

.actions {
  margin-top: 20px;
}

.btn-danger {
  padding: 10px 15px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  padding: 8px 12px;
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

.api-test {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.api-response {
  margin-top: 15px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: auto;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.not-logged-in {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}
</style>
