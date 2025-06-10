<template>
  <div class="card-components-demo p-8 space-y-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">New Card Components Demo</h1>
    
    <!-- Question Card Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Question Card</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Default Question Card -->
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">Default Question Card</h3>
            <QuestionCard />
          </div>
          
          <!-- Custom Question Card -->
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">Custom Question Card</h3>
            <QuestionCard
              :current-question="5"
              :total-questions="15"
              :time-remaining="42"
              question-text="What is the primary component of stellar fusion in main sequence stars?"
              :correct-answers="4"
              :incorrect-answers="1"
            />
          </div>
        </div>
        
        <!-- Interactive Controls -->
        <div class="mt-8 text-center space-y-4">
          <h4 class="text-lg font-semibold">Interactive Question Card</h4>
          <QuestionCard
            :current-question="interactiveQuestion.current"
            :total-questions="interactiveQuestion.total"
            :time-remaining="interactiveQuestion.timeRemaining"
            :question-text="interactiveQuestion.text"
            :correct-answers="interactiveQuestion.correct"
            :incorrect-answers="interactiveQuestion.incorrect"
          />
          <div class="flex justify-center gap-4 mt-4">
            <button 
              @click="nextQuestion"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Next Question
            </button>
            <button 
              @click="decreaseTime"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Decrease Time
            </button>
            <button 
              @click="addCorrectAnswer"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Correct Answer
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Timer Module Card Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Timer Module Card</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Default Timer Module Card -->
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">Default Timer Module</h3>
            <TimerModuleCard @event-click="handleEventClick" />
          </div>
          
          <!-- Custom Timer Module Card -->
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">Custom Timer Module</h3>
            <TimerModuleCard
              event-label="special event"
              event-title="Christmas Sale"
              button-text="join event"
              :button-disabled="false"
              :timer="{ days: '15', hours: '06', minutes: '45' }"
              :has-booster="true"
              booster-multiplier="x3"
              @event-click="handleEventClick"
            />
          </div>
        </div>
        
        <!-- Interactive Timer -->
        <div class="mt-8 text-center space-y-4">
          <h4 class="text-lg font-semibold">Interactive Timer Module</h4>
          <TimerModuleCard
            :event-label="interactiveTimer.label"
            :event-title="interactiveTimer.title"
            :button-text="interactiveTimer.buttonText"
            :button-disabled="interactiveTimer.disabled"
            :timer="interactiveTimer.timer"
            :has-booster="interactiveTimer.hasBooster"
            :booster-multiplier="interactiveTimer.booster"
            @event-click="handleInteractiveEventClick"
          />
          <div class="flex justify-center gap-4 mt-4">
            <button 
              @click="decreaseTimerTime"
              class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Decrease Timer
            </button>
            <button 
              @click="toggleBooster"
              class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Toggle Booster
            </button>
            <button 
              @click="toggleButton"
              class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Toggle Button
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Specifications -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Technical Specifications</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Question Card Specs -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Question Card</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><strong>Dimensions:</strong> 320px × 176px (w-80 h-44)</li>
              <li><strong>Background:</strong> #FFFFFF with yellow shadow</li>
              <li><strong>Timer Circle:</strong> 80px with yellow background</li>
              <li><strong>Colors:</strong> #FFC72C (yellow), #09091A (black), #39A05D (success), #B9473B (error)</li>
              <li><strong>Typography:</strong> Italian_Plate_No2, text-xl for main text</li>
              <li><strong>Props:</strong> currentQuestion, totalQuestions, timeRemaining, questionText, correctAnswers, incorrectAnswers</li>
            </ul>
          </div>
          
          <!-- Timer Module Specs -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Timer Module Card</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><strong>Dimensions:</strong> 384px × 240px (w-96 h-60)</li>
              <li><strong>Background:</strong> Gradient from black to transparent</li>
              <li><strong>Timer Bar:</strong> Full width, yellow background (#FFC72C)</li>
              <li><strong>Booster:</strong> 44px circle with amber background</li>
              <li><strong>Colors:</strong> #FDF8E9 (light), #09091A (dark), #FFC72C (yellow)</li>
              <li><strong>Typography:</strong> Italian_Plate_No2, text-3xl for title</li>
              <li><strong>Props:</strong> eventLabel, eventTitle, timer, hasBooster, buttonDisabled</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Log -->
    <section v-if="eventLog.length > 0" class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Event Log</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="max-h-40 overflow-y-auto">
          <div 
            v-for="(event, index) in eventLog" 
            :key="index"
            class="text-sm text-gray-600 py-1 border-b border-gray-200 last:border-b-0"
          >
            <span class="font-mono text-xs text-gray-400">{{ event.timestamp }}</span>
            <span class="ml-2">{{ event.message }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import QuestionCard from './QuestionCard.vue'
import TimerModuleCard from './TimerModuleCard.vue'

export default {
  name: 'NewCardDemo',
  components: {
    QuestionCard,
    TimerModuleCard
  },
  data() {
    return {
      interactiveQuestion: {
        current: 8,
        total: 20,
        timeRemaining: 45,
        text: "Interactive question: What happens when you click the buttons below?",
        correct: 3,
        incorrect: 2
      },
      interactiveTimer: {
        label: "interactive event",
        title: "Demo Event",
        buttonText: "click me",
        disabled: false,
        timer: { days: '02', hours: '14', minutes: '30' },
        hasBooster: true,
        booster: "x2"
      },
      eventLog: []
    }
  },
  methods: {
    nextQuestion() {
      if (this.interactiveQuestion.current < this.interactiveQuestion.total) {
        this.interactiveQuestion.current++
        this.logEvent(`Advanced to question ${this.interactiveQuestion.current}`)
      }
    },
    decreaseTime() {
      if (this.interactiveQuestion.timeRemaining > 0) {
        this.interactiveQuestion.timeRemaining--
        this.logEvent(`Time decreased to ${this.interactiveQuestion.timeRemaining} seconds`)
      }
    },
    addCorrectAnswer() {
      this.interactiveQuestion.correct++
      this.logEvent(`Correct answers increased to ${this.interactiveQuestion.correct}`)
    },
    handleEventClick() {
      this.logEvent('Default timer module event clicked')
    },
    handleInteractiveEventClick() {
      this.logEvent('Interactive timer module event clicked')
    },
    decreaseTimerTime() {
      const timer = this.interactiveTimer.timer
      let minutes = parseInt(timer.minutes)
      if (minutes > 0) {
        timer.minutes = String(minutes - 1).padStart(2, '0')
        this.logEvent(`Timer decreased to ${timer.days}D ${timer.hours}H ${timer.minutes}M`)
      }
    },
    toggleBooster() {
      this.interactiveTimer.hasBooster = !this.interactiveTimer.hasBooster
      this.logEvent(`Booster ${this.interactiveTimer.hasBooster ? 'enabled' : 'disabled'}`)
    },
    toggleButton() {
      this.interactiveTimer.disabled = !this.interactiveTimer.disabled
      this.logEvent(`Button ${this.interactiveTimer.disabled ? 'disabled' : 'enabled'}`)
    },
    logEvent(message) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.unshift({ timestamp, message })
      // Keep only last 10 events
      if (this.eventLog.length > 10) {
        this.eventLog.pop()
      }
    }
  }
}
</script>

<style scoped>
.card-components-demo {
  font-family: 'Italian_Plate_No2', Arial, sans-serif;
}
</style>
