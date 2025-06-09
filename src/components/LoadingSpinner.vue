<template>
  <div class="loading-spinner" :class="{ 'loading-spinner--overlay': overlay }">
    <div class="spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Chargement...'
  },
  overlay: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner--overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(2) {
  animation-delay: 0.1s;
  border-top-color: #10b981;
}

.spinner-ring:nth-child(3) {
  animation-delay: 0.2s;
  border-top-color: #f59e0b;
}

.loading-message {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
}

.loading-spinner--overlay .loading-message {
  color: #ffffff;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
