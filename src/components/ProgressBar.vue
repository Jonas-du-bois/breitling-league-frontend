<template>
  <div class="progress-bar" :class="{ 'progress-bar--animated': animated }">
    <div class="progress-track">
      <div 
        class="progress-fill" 
        :style="{ width: `${percentage}%` }"
        :class="`progress-fill--${variant}`"
      ></div>
    </div>
    <div v-if="showLabel" class="progress-label">
      <span>{{ label || `${percentage}%` }}</span>
      <span v-if="showDetails && current !== null && total !== null">
        {{ current }} / {{ total }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    default: null
  },
  total: {
    type: Number,
    default: null
  },
  percentage: {
    type: Number,
    default: 0
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value)
  },
  animated: {
    type: Boolean,
    default: true
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  showDetails: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: null
  }
})

const percentage = computed(() => {
  if (props.percentage !== 0) {
    return Math.min(100, Math.max(0, props.percentage))
  }
  
  if (props.current !== null && props.total !== null && props.total > 0) {
    return Math.min(100, Math.max(0, (props.current / props.total) * 100))
  }
  
  return 0
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
}

.progress-track {
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

.progress-bar--animated .progress-fill {
  animation: progress-shimmer 2s ease-in-out infinite;
}

.progress-fill--primary {
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.progress-fill--success {
  background: linear-gradient(90deg, #10b981, #059669);
}

.progress-fill--warning {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.progress-fill--danger {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

@keyframes progress-shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.progress-bar--animated .progress-fill {
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
}
</style>
