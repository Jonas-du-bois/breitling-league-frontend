<template>
  <div class="user-profile">    <div class="profile-header">
      <div class="profile-avatar">
        <Icon name="user" size="lg" alt="User Avatar" />
      </div>
      <h3>Welcome back!</h3>
      <p v-if="user">{{ user.name || 'User' }}</p>
    </div>
    
    <div class="profile-actions">
      <button class="logout-button" @click="handleLogout">
        <Icon name="arrow-back" size="sm" alt="Logout" class="logout-icon" />
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'UserProfile',
  components: {
    Icon
  },
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

.profile-avatar {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
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
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
}

.logout-button:hover {
  background: #c82333;
}

.logout-icon {
  filter: brightness(0) invert(1);
}
</style>
