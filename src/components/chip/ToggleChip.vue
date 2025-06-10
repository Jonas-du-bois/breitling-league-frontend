<template>
  <button 
    :class="['toggle-chip', { 'active': isActive, 'disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
    :type="type"
    :aria-pressed="isActive"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  name: 'ToggleChip',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    }
  },
  emits: ['update:modelValue', 'click', 'toggle'],
  computed: {
    isActive() {
      return this.modelValue
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        const newValue = !this.isActive
        this.$emit('update:modelValue', newValue)
        this.$emit('click', event)
        this.$emit('toggle', newValue)
      }
    }
  }
}
</script>

<style scoped>
.toggle-chip {
  /* Base Figma CSS Properties */
  display: inline-flex;
  height: var(--chip-height-default, 44px);
  min-width: var(--chip-width-min, 44px);
  padding: var(--chip-padding, 12px);
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: var(--chip-radius, 0px);
  border: var(--chip-stroke-weight, 1.5px) solid var(--chip-stroke-color, #072C54);
  
  /* Default state styling */
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Typography */
  font-family: var(--fontfamily-default, "Italian Plate No2");
  font-size: var(--chip-fontsize, 14px);
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--chip-stroke-color, #072C54);
  
  /* Remove default button styles */
  border-style: solid;
  outline: none;
}

/* Active/Selected state - matches the "on click" specification */
.toggle-chip.active {
  background: var(--chip-background-color, #072C54);
  color: var(--chip-active-text-color, #ffffff);
  border-color: var(--chip-background-color, #072C54);
}

/* Hover states */
.toggle-chip:hover:not(:disabled):not(.active) {
  background: rgba(7, 44, 84, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(7, 44, 84, 0.2);
}

.toggle-chip.active:hover:not(:disabled) {
  background: var(--chip-background-color-dark, #051f3d);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(7, 44, 84, 0.4);
}

/* Focus state */
.toggle-chip:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(7, 44, 84, 0.25);
}

/* Active press state */
.toggle-chip:active:not(:disabled) {
  transform: translateY(0);
}

/* Disabled state */
.toggle-chip.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: var(--gray-300, #dee2e6);
  color: var(--gray-400, #ced4da);
}

.toggle-chip.disabled.active {
  background: var(--gray-400, #ced4da);
  color: var(--gray-600, #6c757d);
}

/* Loading state (optional) */
.toggle-chip.loading {
  cursor: wait;
  opacity: 0.7;
}

/* Size variants */
.toggle-chip.small {
  height: var(--chip-height-small, 32px);
  min-width: var(--chip-width-min-small, 32px);
  padding: var(--chip-padding-small, 8px);
  font-size: var(--chip-fontsize-small, 12px);
}

.toggle-chip.large {
  height: var(--chip-height-large, 56px);
  min-width: var(--chip-width-min-large, 56px);
  padding: var(--chip-padding-large, 16px);
  font-size: var(--chip-fontsize-large, 16px);
}

/* Icon support */
.toggle-chip .chip-icon {
  margin-right: 6px;
  width: 16px;
  height: 16px;
}

.toggle-chip .chip-icon:only-child {
  margin-right: 0;
}

/* Animation for smooth transitions */
@keyframes chipActivate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.toggle-chip.active {
  animation: chipActivate 0.2s ease-out;
}
</style>
