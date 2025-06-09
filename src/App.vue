<script>
export default {
  name: 'App'
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Breitling League - Test des Composables</h1>
      <p>Vue de test avec les vraies structures API Postman/Scribe</p>
      
      <nav class="app-navigation">
        <router-link to="/" class="nav-btn" active-class="active">
          📊 Test Progression
        </router-link>
        <router-link to="/test-quiz-updated" class="nav-btn" active-class="active">
          🎯 Test Quiz
        </router-link>
        <router-link to="/quiz-user-journey" class="nav-btn" active-class="active">
          🎮 Parcours Quiz
        </router-link>
        <router-link to="/user-quiz-test" class="nav-btn" active-class="active">
          🧪 Test Utilisateur Quiz
        </router-link>
      </nav>
    </header>
    
    <main class="app-content">
      <router-view />
    </main>
    
    <footer class="app-footer">
      <p>Breitling League - Frontend avec composables adaptés aux vraies API</p>
    </footer>
  </div>
</template>

<style>
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-weight: 600;
  font-size: 1.8rem;
}

.app-navigation {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
}

.nav-btn {
  padding: 0.5rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.nav-btn.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
}

.logout-btn {
  margin-left: auto;
  border-color: #ff6b6b;
}

.logout-btn:hover {
  background: #ff6b6b;
  border-color: #ff6b6b;
}

.app-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 14px;
  margin-top: auto;
}

body {
  margin: 0;
  background-color: #f8fafc;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }
  
  .app-navigation {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .logout-btn {
    margin-left: 0;
  }
  
  .app-content {
    padding: 1rem;
  }
}
</style>
