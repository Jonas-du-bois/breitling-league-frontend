<template>
  <button 
    :class="['filled-button', { 'disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
    :type="type"
  >
    <Icon v-if="icon" :name="icon" :size="iconSize" class="button-icon" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
import Icon from '../Icon.vue'

export default {
  name: 'FilledButton',
  components: {
    Icon
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value)
    },
    icon: {
      type: String,
      default: null
    },
    iconSize: {
      type: String,
      default: 'sm'
    }
  },
  emits: ['click'],
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>
.filled-button {
  /* Figma CSS Properties */
  display: flex;
  width: var(--button-width-max, 338px);
  height: var(--button-height-default, 60px);
  min-width: var(--button-width-min, 60px);
  max-width: var(--button-width-max, 338px);
  min-height: var(--button-height-default, 44px);
  padding: var(--button-padding, 24px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  /* Additional styling for filled button */
  background: var(--button-background-color, #FFC72C);
  border: 2px solid var(--button-background-color, #FFC72C);
  border-radius: var(--button-radius, 0px);
  color: var(--button-label-color-dark, #072C54);
  
  /* Typography from Figma */
  font-family: var(--fontfamily-default, "Italian Plate No2");
  font-size: var(--button-fontsize, 16px);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.92px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
    /* Hover and focus states */
  &:hover:not(:disabled) {
    background: var(--breitling-gold-dark, #e6b329);
    border-color: var(--breitling-gold-dark, #e6b329);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 199, 44, 0.4);
  }
    &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 199, 44, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    background: var(--breitling-gold-dark, #e6b329);
  }
  
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--gray-400, #999);
    border-color: var(--gray-400, #999);
  }
}

/* Variant styles */
.filled-button[data-variant="secondary"] {
  background: var(--secondary-color, #6c757d);
  border-color: var(--secondary-color, #6c757d);
  
  &:hover:not(:disabled) {
    background: var(--secondary-color-dark, #545b62);
    border-color: var(--secondary-color-dark, #545b62);
  }
}

.filled-button[data-variant="success"] {
  background: var(--success-color, #28a745);
  border-color: var(--success-color, #28a745);
  
  &:hover:not(:disabled) {
    background: var(--success-color-dark, #1e7e34);
    border-color: var(--success-color-dark, #1e7e34);
  }
}

.filled-button[data-variant="danger"] {
  background: var(--danger-color, #dc3545);
  border-color: var(--danger-color, #dc3545);
  
  &:hover:not(:disabled) {
    background: var(--danger-color-dark, #c82333);
    border-color: var(--danger-color-dark, #c82333);
  }
}

.filled-button[data-variant="warning"] {
  background: var(--warning-color, #ffc107);
  border-color: var(--warning-color, #ffc107);
  color: var(--dark-color, #212529);
    &:hover:not(:disabled) {
    background: var(--warning-color-dark, #e0a800);
    border-color: var(--warning-color-dark, #e0a800);
  }
}

.button-icon {
  flex-shrink: 0;
}
</style>
