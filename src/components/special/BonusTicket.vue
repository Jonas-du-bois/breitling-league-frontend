<template>
  <div 
    class="relative"
    :class="sizeClasses"
  >
    <div 
      class="absolute overflow-hidden"
      :class="sizeClasses"
    >
      <div 
        class="absolute bg-color-primary-blue-100"
        :class="innerSizeClasses"
      ></div>
    </div>
    <div 
      class="absolute justify-start text-white font-bold font-['Italian_Plate_No2'] uppercase"
      :class="[textSizeClasses, textPositionClasses]"
    >
      {{ bonusValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BonusTicket',
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
  },
  computed: {
    sizeClasses() {
      return this.size === 'default' ? 'w-12 h-12' : 'w-7 h-7'
    },
    innerSizeClasses() {
      return this.size === 'default' 
        ? 'w-11 h-11 left-[3.90px] top-[3.90px]' 
        : 'w-6 h-6 left-[2.34px] top-[2.34px]'
    },
    textSizeClasses() {
      return this.size === 'default' ? 'text-base' : 'text-[10px]'
    },
    textPositionClasses() {
      return this.size === 'default' 
        ? 'w-4 h-3 left-[17.71px] top-[19.79px]' 
        : 'w-2.5 h-1.5 left-[10.62px] top-[11.88px]'
    }
  }
}
</script>

<style scoped>
.bg-color-primary-blue-100 {
  background-color: #072C54;
}
</style>
