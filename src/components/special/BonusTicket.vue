<template>
  <div 
    class="relative flex items-center justify-center"
    :class="sizeClasses"
  >
    <!-- Ticket Icon Background -->
    <Icon 
      name="ticket" 
      :size="iconSize"
      alt="Bonus Ticket"
      class="ticket-icon"
    />
    
    <!-- Bonus Value Text Overlay -->
    <div 
      class="absolute justify-center items-center text-white font-bold font-['Italian_Plate_No2'] uppercase flex"
      :class="[textSizeClasses]"
    >
      {{ bonusValue }}
    </div>
  </div>
</template>

<script>
import Icon from '../Icon.vue'

export default {
  name: 'BonusTicket',
  components: {
    Icon
  },
  props: {
    size: {
      type: String,
      default: 'default',
      validator: value => ['default', 'small'].includes(value)
    },
    bonusValue: {
      type: String,
      default: '+X'
    }
  },  computed: {
    sizeClasses() {
      return this.size === 'default' ? 'w-12 h-12' : 'w-7 h-7'
    },
    iconSize() {
      return this.size === 'default' ? 48 : 28
    },
    textSizeClasses() {
      return this.size === 'default' ? 'text-base' : 'text-[10px]'
    }
  }
}
</script>

<style scoped>
.ticket-icon {
  filter: brightness(0) saturate(100%) invert(12%) sepia(45%) saturate(2332%) hue-rotate(204deg) brightness(94%) contrast(96%);
}
</style>
