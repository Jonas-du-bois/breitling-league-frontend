<template>
  <div class="w-80 h-44 px-16 py-12 bg-color-secondary-white rounded-lg shadow-[0px_4px_8px_0px_rgba(255,199,43,0.40)] relative">    <!-- Top section with success indicator, progress circle, and error indicator -->
    <div class="flex justify-between items-center mb-2 ">
      <!-- Left side: Success indicator -->
      <div class="flex items-center gap-1">
        <div class="text-center text-color-functional-success-100 text-base font-semibold font-['Italian_Plate_No2'] uppercase">   {{ correctAnswers }}   </div>
        <svg width="32" height="10" viewBox="0 0 32 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="10" rx="5" fill="#39A05D"/>
        </svg>
      </div>
      
      <!-- Center: Progress circle -->
      <div class="flex-shrink-0">
        <ProgressCircle 
          :value="progressValue" 
          :size="70"
          color="#FFC72C"
          background-color="#FFFFFF"
          :format-value="formatTimeValue"
          :animated="true"
        />
      </div>
      
      <!-- Right side: Error indicator -->
      <div class="flex items-center gap-1">
        <svg width="32" height="10" viewBox="0 0 32 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="10" rx="5" fill="#B9473B"/>
        </svg>
        <div class="text-center text-color-functional-error-100 text-base font-semibold font-['Italian_Plate_No2'] uppercase">{{ incorrectAnswers }}</div>
      </div>
    </div>
    
    <!-- Question progress section -->
    <div class="text-center mb-2">
      <span class="text-color-primary-yellow-100 text-xl font-normal font-['Italian_Plate_No2']">Question </span>
      <span class="text-color-primary-yellow-100 text-xl font-semibold font-['Italian_Plate_No2']">{{ currentQuestion }}</span>
      <span class="text-color-primary-yellow-100 text-xl font-normal font-['Italian_Plate_No2']">/{{ totalQuestions }}</span>
    </div>
    
    <!-- Question text section -->
    <div class="text-center text-color-secondary-black text-xl font-normal font-['Italian_Plate_No2']">
      {{ questionText }}
    </div>
  </div>
</template>

<script>
import ProgressCircle from '../special/ProgressCircle.vue'

export default {
  name: 'QuestionCard',
  components: {
    ProgressCircle
  },
  props: {
    currentQuestion: {
      type: [Number, String],
      default: 13
    },
    totalQuestions: {
      type: [Number, String],
      default: 20
    },
    timeRemaining: {
      type: [Number, String],
      default: 56
    },
    // Add progress value for the circle (0-100)
    progressValue: {
      type: [Number, String],
      default: 65 // Default to 65% progress based on timeRemaining/total time
    },
    questionText: {
      type: String,
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    correctAnswers: {
      type: [Number, String],
      default: "07"
    },
    incorrectAnswers: {
      type: [Number, String],
      default: "07"
    }
  },
  methods: {
    formatTimeValue(value) {
      // Format the display to show the timeRemaining instead of progress percentage
      return this.timeRemaining.toString()
    }
  }
}
</script>

<style scoped>
/* Color system based on component.txt specifications */
.text-color-primary-yellow-100 {
  color: #FFC72C;
}

.text-color-secondary-black {
  color: #09091A;
}

.text-color-functional-success-100 {
  color: #39A05D;
}

.text-color-functional-error-100 {
  color: #B9473B;
}

.bg-color-secondary-white {
  background-color: #FFFFFF;
}

.bg-color-primary-yellow-100 {
  background-color: #FFC72C;
}

.bg-color-functional-success-100 {
  background-color: #39A05D;
}

.bg-color-functional-error-100 {
  background-color: #B9473B;
}

/* Custom shadow for the card */
.shadow-custom-yellow {
  box-shadow: 0px 4px 8px 0px rgba(255, 199, 43, 0.40);
}

/* Custom shadow for the timer circle */
.shadow-custom-dark {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
</style>
