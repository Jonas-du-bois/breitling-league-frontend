<template>
  <div class="w-full h-6 px-4 py-1.5 relative bg-[#FFC72C] inline-flex justify-center items-center gap-2.5 font-italian-plate">
    <!-- Timer Display -->
    <div class="justify-start">
      <span class="text-[#09091A] text-xl font-semibold font-['Italian_Plate_No2']">{{ formatTime(timer.days) }} </span>
      <span class="text-[#09091A] text-xl font-normal font-['Italian_Plate_No2']">D</span>
      <span class="text-[#09091A] text-xl font-semibold font-['Italian_Plate_No2']"> {{ formatTime(timer.hours) }} </span>
      <span class="text-[#09091A] text-xl font-normal font-['Italian_Plate_No2']">H</span>
      <span class="text-[#09091A] text-xl font-semibold font-['Italian_Plate_No2']"> {{ formatTime(timer.minutes) }} </span>
      <span class="text-[#09091A] text-xl font-normal font-['Italian_Plate_No2']">M</span>
    </div>
    
    <!-- Booster Badge -->
    <div 
      v-if="hasBooster"
      class="w-11 h-11 left-[47px] top-[-19px] absolute bg-amber-400 rounded-[100px] cursor-pointer hover:bg-amber-500 transition-colors"
      @click="handleBoosterClick"
    >
      <div class="left-[12px] top-[15px] absolute justify-start text-black text-2xl font-semibold font-['Italian_Plate_No2']">
        {{ boosterMultiplier }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimerBoosterBar',
  props: {
    timer: {
      type: Object,
      default: () => ({
        days: 8,
        hours: 12,
        minutes: 24
      })
    },
    hasBooster: {
      type: Boolean,
      default: true
    },
    boosterMultiplier: {
      type: String,
      default: 'x2'
    },
    autoUpdate: {
      type: Boolean,
      default: false
    }
  },
  emits: ['booster-click', 'timer-update'],
  data() {
    return {
      internalTimer: { ...this.timer },
      intervalId: null
    }
  },
  watch: {
    timer: {
      handler(newTimer) {
        this.internalTimer = { ...newTimer }
      },
      deep: true
    },
    autoUpdate(enabled) {
      if (enabled) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    }
  },
  mounted() {
    if (this.autoUpdate) {
      this.startTimer()
    }
  },
  beforeUnmount() {
    this.stopTimer()
  },
  methods: {
    formatTime(value) {
      return String(value).padStart(2, '0')
    },
    handleBoosterClick() {
      this.$emit('booster-click', {
        multiplier: this.boosterMultiplier,
        active: this.hasBooster
      })
    },
    startTimer() {
      if (this.intervalId) return
      
      this.intervalId = setInterval(() => {
        this.updateTimer()
      }, 60000) // Update every minute
    },
    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    updateTimer() {
      if (this.internalTimer.minutes > 0) {
        this.internalTimer.minutes--
      } else if (this.internalTimer.hours > 0) {
        this.internalTimer.hours--
        this.internalTimer.minutes = 59
      } else if (this.internalTimer.days > 0) {
        this.internalTimer.days--
        this.internalTimer.hours = 23
        this.internalTimer.minutes = 59
      }
      
      this.$emit('timer-update', { ...this.internalTimer })
      
      // Stop timer if it reaches zero
      if (this.internalTimer.days === 0 && this.internalTimer.hours === 0 && this.internalTimer.minutes === 0) {
        this.stopTimer()
      }
    }
  }
}
</script>

<style scoped>
.font-italian-plate {
  font-family: 'Italian_Plate_No2', 'Inter', sans-serif;
}

/* Color system based on component.txt specifications */
.text-color-secondary-black {
  color: #09091A;
}

.bg-color-primary-yellow-100 {
  background-color: #FFC72C;
}
</style>
