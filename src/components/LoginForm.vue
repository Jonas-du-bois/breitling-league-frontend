<template>
  <div class="login-form">
    <h2>{{ isRegistering ? 'Inscription' : 'Connexion' }}</h2>
      <div v-if="message" :class="['message', message.type]" v-html="message.html ? message.text : message.text"></div>

    <form @submit.prevent="submitForm">
      <!-- Champ nom pour l'inscription -->
      <div class="form-group" v-if="isRegistering">
        <label for="name">Nom</label>
        <input 
          id="name" 
          type="text" 
          v-model="form.name" 
          required
          placeholder="Votre nom"
        />
      </div>

      <!-- Champ email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          v-model="form.email" 
          required
          placeholder="votre@email.com"
        />
      </div>

      <!-- Champ mot de passe -->
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          id="password" 
          type="password" 
          v-model="form.password" 
          required
          placeholder="Mot de passe"
        />
      </div>

      <!-- Confirmation du mot de passe (inscription uniquement) -->
      <div class="form-group" v-if="isRegistering">
        <label for="password_confirmation">Confirmer le mot de passe</label>
        <input 
          id="password_confirmation" 
          type="password" 
          v-model="form.password_confirmation" 
          required
          placeholder="Confirmer le mot de passe"
        />
      </div>

      <!-- Boutons -->
      <div class="form-actions">
        <button type="submit" class="btn-primary">
          {{ isRegistering ? 'S\'inscrire' : 'Se connecter' }}
        </button>
        <button type="button" class="btn-link" @click="toggleForm">
          {{ isRegistering ? 'Déjà un compte ? Connectez-vous' : 'Créer un compte' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import auth from '../services/auth';

export default {
  name: 'LoginForm',
  data() {
    return {
      isRegistering: false,
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      message: null
    };
  },
  methods: {
    /**
     * Bascule entre le formulaire de connexion et d'inscription
     */
    toggleForm() {
      this.isRegistering = !this.isRegistering;
      this.resetForm();
      this.message = null;
    },
    
    /**
     * Réinitialise le formulaire
     */
    resetForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      };
    },
    
    /**
     * Soumission du formulaire (connexion ou inscription)
     */
    async submitForm() {
      try {
        let response;
        
        if (this.isRegistering) {
          // Inscription
          response = await auth.register(this.form);
          this.message = {
            type: 'success',
            text: 'Inscription réussie !'
          };
          this.isRegistering = false;
        } else {
          // Connexion
          response = await auth.login({
            email: this.form.email,
            password: this.form.password
          });
          this.message = {
            type: 'success',
            text: 'Connexion réussie !'
          };
        }
        
        // Stockage du token et émission de l'événement de connexion
        const { access_token, user } = response.data;
        localStorage.setItem('token', access_token);
        this.$emit('login-success', { user, token: access_token });
        
        // Réinitialisation du formulaire
        this.resetForm();      } catch (error) {
        console.error('Erreur:', error);
        
        // Gestion des erreurs de validation
        if (error.response && error.response.status === 422) {
          const errorData = error.response.data;
          let errorMessage = 'Veuillez corriger les erreurs suivantes:';
          
          // Affichage des erreurs de validation
          if (errorData.errors) {
            errorMessage += '<ul class="error-list">';
            Object.keys(errorData.errors).forEach(field => {
              errorData.errors[field].forEach(message => {
                errorMessage += `<li>${message}</li>`;
              });
            });
            errorMessage += '</ul>';
          } else if (errorData.error) {
            // Affichage des messages d'erreur généraux
            errorMessage = `${errorData.message}: ${errorData.error}`;
          }
          
          this.message = {
            type: 'error',
            html: true,
            text: errorMessage
          };
        } else {
          // Autres types d'erreurs
          this.message = {
            type: 'error',
            text: error.response?.data?.message || 'Erreur lors de la tentative de connexion.'
          };
        }
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-link {
  background: none;
  border: none;
  color: #2196F3;
  text-decoration: underline;
  cursor: pointer;
  padding: 5px;
}

.message {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

.error {
  background-color: #f2dede;
  color: #a94442;
  border: 1px solid #ebccd1;
}

.error-list {
  margin-top: 10px;
  margin-bottom: 0;
  padding-left: 20px;
  text-align: left;
}
</style>
