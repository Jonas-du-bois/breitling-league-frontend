<template>  <div class="w-full max-w-md h-11 relative font-italian-plate header-bar-container">
    <!-- Back Button - Conditional -->
    <div 
      v-if="withBack"
      :data-direction="direction" 
      class="left-0 top-0 absolute inline-flex justify-start items-start cursor-pointer z-10"
      @click="handleBackClick"
    >
      <div class="w-11 h-11 flex justify-start items-center hover:bg-gray-100 rounded transition-colors">        <Icon 
          :name="direction === 'right' ? 'arrow-forward' : 'arrow-back'" 
          size="sm" 
          alt="Navigation arrow"
          :color="iconColor === 'white' ? 'white' : null"
          class="nav-arrow-icon"
        />
      </div>
    </div>
    
    <!-- Page Title - Centered -->
    <div class="w-full h-11 flex justify-center items-center">
      <div class="h-7 px-4 py-2.5 border-b-2 border-[#FFC72C] inline-flex justify-center items-center">
        <div class="text-center text-[#072C54] text-base font-semibold font-['Italian_Plate_No2'] uppercase">
          {{ pageTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon.vue'

export default {
  name: 'HeaderBar',
  components: {
    Icon
  },  props: {
    pageTitle: {
      type: String,
      default: 'Page title'
    },
    withBack: {
      type: Boolean,
      default: true
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

.header-bar-container {
  padding: 2rem 0 1.5rem 0; /* Increased top padding and bottom padding */
}

/* Color system based on component.txt specifications */
.text-color-primary-blue-100 {
  color: #072C54;
}

.border-color-primary-yellow-100 {
  border-color: #FFC72C;
}
</style>
