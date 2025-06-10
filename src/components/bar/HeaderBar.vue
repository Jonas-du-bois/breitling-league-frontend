<template>
  <div class="w-80 h-11 relative font-italian-plate">
    <!-- Back Button -->
    <div 
      :data-direction="direction" 
      class="left-0 top-0 absolute inline-flex justify-start items-start cursor-pointer"
      @click="handleBackClick"
    >
      <div class="w-11 h-11 flex justify-start items-center hover:bg-gray-100 rounded transition-colors">
        <div class="w-6 h-6 relative overflow-hidden">
          <div class="w-4 h-4 left-[3px] top-[4px] absolute" :class="iconColorClass"></div>
        </div>
      </div>
    </div>
    
    <!-- Page Title -->
    <div class="h-7 p-2.5 left-[128.50px] top-[7px] absolute border-b-2 border-[#FFC72C] inline-flex justify-center items-center gap-2.5">
      <div class="text-center justify-start text-[#072C54] text-base font-semibold font-['Italian_Plate_No2'] uppercase">
        {{ pageTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    pageTitle: {
      type: String,
      default: 'Page title'
    },
    direction: {
      type: String,
      default: 'back',
      validator: (value) => ['back', 'forward'].includes(value)
    },
    iconColor: {
      type: String,
      default: 'black',
      validator: (value) => ['black', 'white', 'primary'].includes(value)
    }
  },
  computed: {
    iconColorClass() {
      const colorMap = {
        black: 'bg-black',
        white: 'bg-white',
        primary: 'bg-[#072C54]'
      }
      return colorMap[this.iconColor] || 'bg-black'
    }
  },
  emits: ['back-click'],
  methods: {
    handleBackClick() {
      this.$emit('back-click')
    }
  }
}
</script>

<style scoped>
.font-italian-plate {
  font-family: 'Italian_Plate_No2', 'Inter', sans-serif;
}

/* Color system based on component.txt specifications */
.text-color-primary-blue-100 {
  color: #072C54;
}

.border-color-primary-yellow-100 {
  border-color: #FFC72C;
}
</style>
