<script>
import LoginForm from './components/LoginForm.vue';
import UserProfile from './components/UserProfile.vue';

export default {
  components: {
    LoginForm,
    UserProfile
  },
  data() {
    return {
      authenticated: false,
      user: null
    };
  },
  created() {
    // Vérifier si un token est déjà stocké
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
    }
  },
  methods: {
    handleLoginSuccess(data) {
      this.authenticated = true;
      this.user = data.user;
    },
    handleLogout() {
      this.authenticated = false;
      this.user = null;
    }
  }
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Test d'Authentification API</h1>
    </header>
    
    <main class="app-content">
      <div v-if="!authenticated">
        <LoginForm @login-success="handleLoginSuccess" />
      </div>
      <div v-else>
        <UserProfile 
          :initial-user="user"
          @logout="handleLogout"
        />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>Breitling League - Test d'authentification API</p>
    </footer>
  </div>
</template>

<style>
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
}

.app-header h1 {
  font-weight: 500;
  color: #35495e;
}

.app-footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 14px;
}

body {
  margin: 0;
  background-color: #f9f9f9;
}
</style>
