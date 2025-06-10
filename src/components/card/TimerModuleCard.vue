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
    <div 
      :data-with-booster="hasBooster" 
      class="w-96 h-6 left-0 top-[211px] absolute bg-color-primary-yellow-100 inline-flex justify-center items-center"
    >
      <div class="justify-start">
        <span class="text-color-secondary-black text-xl font-semibold font-['Italian_Plate_No2']">{{ timer.days }} </span>
        <span class="text-color-secondary-black text-xl font-normal font-['Italian_Plate_No2']">D</span>
        <span class="text-color-secondary-black text-xl font-semibold font-['Italian_Plate_No2']"> {{ timer.hours }} </span>
        <span class="text-color-secondary-black text-xl font-normal font-['Italian_Plate_No2']">H</span>
        <span class="text-color-secondary-black text-xl font-semibold font-['Italian_Plate_No2']"> {{ timer.minutes }} </span>
        <span class="text-color-secondary-black text-xl font-normal font-['Italian_Plate_No2']">M</span>
      </div>
      <div 
        v-if="hasBooster"
        class="w-11 h-11 left-[47px] top-[-19px] absolute bg-amber-400 rounded-[100px]"
      >
        <div class="left-[12px] top-[15px] absolute justify-start text-black text-2xl font-semibold font-['Italian_Plate_No2']">{{ boosterMultiplier }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimerModuleCard',
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
  },
  emits: ['event-click'],
  methods: {
    handleEventClick() {
      if (!this.buttonDisabled) {
        this.$emit('event-click');
      }
    }
  }
}
</script>

<style scoped>
/* Color system based on component.txt specifications */
.text-color-primary-yellow-10 {
  color: #FDF8E9;
}

.text-color-secondary-black {
  color: #09091A;
}

.bg-color-primary-yellow-100 {
  background-color: #FFC72C;
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

/* Booster styling */
.bg-amber-400 {
  background-color: #fbbf24;
}
</style>
