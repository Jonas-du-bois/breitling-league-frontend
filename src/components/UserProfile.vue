<template>
  <div class="user-profile">
    <div class="profile-header">
      <h3>Welcome back!</h3>
      <p v-if="user">{{ user.name || 'User' }}</p>
    </div>
    
    <div class="profile-actions">
      <button class="logout-button" @click="handleLogout">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    initialUser: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['logout'],
  methods: {
    handleLogout() {
      this.$emit('logout');
    }
  }
}
</script>

<style scoped>
.user-profile {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.profile-header h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.profile-header p {
  color: #6c757d;
  margin-bottom: 20px;
}

.logout-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: #c82333;
}
</style>
