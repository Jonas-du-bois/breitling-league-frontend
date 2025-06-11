<template>
  <div class="w-96 h-60 relative">
    <div class="w-96 h-60 p-8 left-0 top-0 absolute bg-gradient-to-br from-black to-black/0 inline-flex flex-col justify-start items-start gap-6">
      <div class="flex flex-col justify-start items-start gap-3">
        <div class="justify-start text-color-primary-yellow-10 text-base font-semibold font-['Italian_Plate_No2'] uppercase">{{ eventLabel }}</div>
        <div class="w-64 justify-start text-color-primary-yellow-10 text-3xl font-semibold font-['Italian_Plate_No2'] uppercase">{{ eventTitle }}</div>
      </div>
      <div 
        :data-disabled="buttonDisabled" 
        :data-status="buttonStatus" 
        class="h-14 max-w-80 min-w-14 p-6 outline outline-2 outline-offset-[-2px] outline-color-primary-yellow-10 inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-color-primary-yellow-10 hover:bg-opacity-10 transition-all duration-200"
        @click="handleEventClick"
      >
        <div class="justify-start text-color-primary-yellow-10 text-base font-bold font-['Italian_Plate_No2'] uppercase">{{ buttonText }}</div>
      </div>
    </div>
    
    <!-- Timer bar positioned at bottom with full width -->
    <div 
      :data-with-booster="hasBooster" 
      class="w-full left-0 bottom-0 absolute"
    >
      <TimerBoosterBar 
        :timer="timer"
        :has-booster="hasBooster"
        :booster-multiplier="boosterMultiplier"
        @booster-click="handleBoosterClick"
        class="w-full"
      />
    </div>
  </div>
</template>

<script>
import TimerBoosterBar from '../bar/TimerBoosterBar.vue'

export default {
  name: 'TimerModuleCard',
  components: {
    TimerBoosterBar
  },
  props: {
    eventLabel: {
      type: String,
      default: 'new event'
    },
    eventTitle: {
      type: String,
      default: "Father's day"
    },
    buttonText: {
      type: String,
      default: 'go to event'
    },
    buttonDisabled: {
      type: Boolean,
      default: true
    },
    buttonStatus: {
      type: String,
      default: 'default'
    },
    timer: {
      type: Object,
      default: () => ({
        days: '08',
        hours: '12',
        minutes: '24'
      })
    },
    hasBooster: {
      type: Boolean,
      default: true
    },
    boosterMultiplier: {
      type: String,
      default: 'x2'
    }
  },  emits: ['event-click', 'booster-click'],
  methods: {
    handleEventClick() {
      if (!this.buttonDisabled) {
        this.$emit('event-click');
      }
    },
    handleBoosterClick() {
      this.$emit('booster-click');
    }
  }
}
</script>

<style scoped>
/* Color system based on component.txt specifications */
.text-color-primary-yellow-10 {
  color: #FDF8E9;
}

.outline-color-primary-yellow-10 {
  outline-color: #FDF8E9;
}

.bg-color-primary-yellow-10 {
  background-color: #FDF8E9;
}

/* Disabled state styling */
[data-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.8;
}

[data-disabled="true"]:hover {
  background-color: transparent !important;
}

/* Custom gradient backgrounds */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #000000, rgba(0, 0, 0, 0));
}
</style>
