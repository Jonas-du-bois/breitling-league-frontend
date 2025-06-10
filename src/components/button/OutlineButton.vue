<template>
  <button 
    :class="['outline-button', { 'disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
    :type="type"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  name: 'OutlineButton',
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
.outline-button {
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
  flex-shrink: 0;  /* Additional styling for outline button */
  background: transparent;
  border: 2px solid var(--button-background-color, #FFC72C);
  border-radius: var(--button-radius, 0px);
  color: var(--button-background-color, #FFC72C);
  
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
    background: var(--button-background-color, #FFC72C);
    color: var(--breitling-navy, #1a365d);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 199, 44, 0.3);
  }
    &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 199, 44, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
    &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: var(--gray-300, #ccc);
    color: var(--gray-300, #ccc);
  }
}
</style>
