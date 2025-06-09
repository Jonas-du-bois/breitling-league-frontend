<template>
  <div class="error-banner" :class="`error-banner--${type}`">
    <div class="error-content">
      <div class="error-icon">
        <svg v-if="type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else-if="type === 'warning'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="error-text">
        <h3 v-if="title" class="error-title">{{ title }}</h3>
        <p class="error-message">{{ message }}</p>
      </div>
      <button v-if="dismissible" @click="$emit('dismiss')" class="error-dismiss">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div v-if="actions" class="error-actions">
      <button
        v-for="action in actions"
        :key="action.label"
        @click="action.handler"
        :class="action.primary ? 'btn-primary' : 'btn-secondary'"
        class="error-action-btn"
      >
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['dismiss'])

defineProps({
  type: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: null
  },
  message: {
    type: String,
    required: true
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array,
    default: null
  }
})
</script>

<style scoped>
.error-banner {
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  border-left: 4px solid;
}

.error-banner--error {
  background-color: #fef2f2;
  border-left-color: #ef4444;
  color: #dc2626;
}

.error-banner--warning {
  background-color: #fffbeb;
  border-left-color: #f59e0b;
  color: #d97706;
}

.error-banner--info {
  background-color: #eff6ff;
  border-left-color: #3b82f6;
  color: #2563eb;
}

.error-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.error-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
}

.error-text {
  flex: 1;
}

.error-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
}

.error-message {
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

.error-dismiss {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.error-dismiss:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.error-actions {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.error-action-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: currentColor;
  color: white;
  border-color: currentColor;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: transparent;
  color: currentColor;
  border-color: currentColor;
}

.btn-secondary:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
</style>
