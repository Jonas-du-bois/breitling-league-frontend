<template>
  <div class="quiz-question-type1">
    <!-- Header with only back arrow -->
    <header class="quiz-header">
      <HeaderBar 
        :with-back="true"
        :with-title="false"
        direction="back"
        icon-color="white"
        @back-click="handleBackClick"
      />
    </header>
      <!-- Main Container -->
    <div class="w-full h-[874px] relative bg-color-primary-blue-100 overflow-hidden">
        <!-- Next Button -->
      <div class="left-[32px] top-[736px] absolute">
        <FilledButton 
          :label="isLastQuestion ? 'Finish' : 'Next'"
          variant="primary"
          @click="nextQuestion"
          class="next-button-component"
        />
      </div><!-- Question Card -->
      <div class="left-0 top-[189px] absolute w-full px-8">
        <QuestionCard 
          :current-question="currentQuestionNumber"
          :total-questions="totalQuestions"
          :time-remaining="timeRemaining"
          :progress-value="questionProgress"
          :question-text="currentQuestion.question"
          :correct-answers="correctAnswers"
          :incorrect-answers="incorrectAnswers"
        />
      </div>

      <!-- Status Bar -->
      <div data-with-statusbar="true" class="w-96 left-0 top-0 absolute inline-flex flex-col justify-start items-center">
        <div class="self-stretch h-14 px-8 pt-8 flex flex-col justify-start items-start">
          <div class="self-stretch backdrop-blur-[20px] inline-flex justify-between items-center">
            <div class="text-center justify-start text-color-secondary-white text-sm font-medium font-inter">
              {{ currentTime }}
            </div>
            <div class="w-16 h-3.5 relative overflow-hidden">
              <div class="left-[41px] top-[-3px] absolute justify-start text-color-secondary-white text-base font-normal font-sf-pro">􀛨</div>
              <div class="left-[21px] top-[-1px] absolute justify-start text-color-secondary-white text-sm font-normal font-sf-pro">􀙇</div>
            </div>
          </div>
        </div>
        
        <!-- Header Bar (empty for this layout) -->
        <div data-with-back="false" data-with-title="false" class="w-80 h-11 relative"></div>
      </div>      <!-- Answer Options -->
      <div class="left-0 top-[424px] absolute w-full px-8 flex flex-col gap-2">
        <TextInput 
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :model-value="option.text"
          :is-selected="selectedAnswer === index && !showResult"
          :is-correct-answer="showResult && index === currentQuestion.correctAnswer"
          :is-wrong-answer="showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer"
          :points="showResult && index === currentQuestion.correctAnswer ? currentQuestion.points : undefined"
          @click="selectAnswer(index)"
          :class="{ 
            'cursor-not-allowed opacity-70': showResult,
            'cursor-pointer': !showResult
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/bar/HeaderBar.vue'
import { QuestionCard } from '@/components/card'
import { TextInput } from '@/components/input'
import { FilledButton } from '@/components/button'

export default {
  name: 'QuizQuestionType1',
    components: {
    HeaderBar,
    QuestionCard,
    TextInput,
    FilledButton
  },
  
  props: {
    quizId: {
      type: [String, Number],
      required: true
    }
  },
  
  data() {
    return {
      // Current state
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showResult: false,
      timeRemaining: 60,
      correctAnswers: 7,
      incorrectAnswers: 6,
        // Sample quiz data
      quizData: {
        id: 1,
        title: "Mathematics Fundamentals",
        questions: [
          {
            id: 1,
            question: "What is the result of 15 + 27?",
            options: [
              { id: 'a', text: '42' },
              { id: 'b', text: '41' },
              { id: 'c', text: '43' },
              { id: 'd', text: '44' }
            ],
            correctAnswer: 0,
            points: 100
          },
          {
            id: 2,
            question: "Which of the following is a prime number?",
            options: [
              { id: 'a', text: '15' },
              { id: 'b', text: '17' },
              { id: 'c', text: '21' },
              { id: 'd', text: '25' }
            ],
            correctAnswer: 1,
            points: 150
          },
          {
            id: 3,
            question: "What is the value of π (pi) rounded to 2 decimal places?",
            options: [
              { id: 'a', text: '3.14' },
              { id: 'b', text: '3.15' },
              { id: 'c', text: '3.13' },
              { id: 'd', text: '3.16' }
            ],
            correctAnswer: 0,
            points: 120
          },
          {
            id: 4,
            question: "What is 8 × 7?",
            options: [
              { id: 'a', text: '54' },
              { id: 'b', text: '56' },
              { id: 'c', text: '58' },
              { id: 'd', text: '64' }
            ],
            correctAnswer: 1,
            points: 100
          },
          {
            id: 5,
            question: "What is the square root of 144?",
            options: [
              { id: 'a', text: '11' },
              { id: 'b', text: '12' },
              { id: 'c', text: '13' },
              { id: 'd', text: '14' }
            ],
            correctAnswer: 1,
            points: 130
          }
        ]
      }
    }
  },
    computed: {
    currentQuestion() {
      return this.quizData.questions[this.currentQuestionIndex] || {}
    },
    
    currentQuestionNumber() {
      return this.currentQuestionIndex + 1
    },
    
    totalQuestions() {
      return this.quizData.questions.length
    },
    
    isLastQuestion() {
      return this.currentQuestionIndex === this.quizData.questions.length - 1
    },
    
    timerScale() {
      return Math.max(0.3, this.timeRemaining / 60)
    },
    
    questionProgress() {
      // Calculate progress as percentage of time remaining
      return (this.timeRemaining / 60) * 100
    },
    
    currentTime() {
      return new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  },
  
  mounted() {
    this.startTimer()
    this.updateTime()
  },
  
  beforeUnmount() {
    if (this.questionTimer) {
      clearInterval(this.questionTimer)
    }
    if (this.clockTimer) {
      clearInterval(this.clockTimer)
    }
  },
  
  methods: {
    startTimer() {
      this.questionTimer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--
        } else {
          this.nextQuestion()
        }
      }, 1000)
    },
    
    updateTime() {
      this.clockTimer = setInterval(() => {
        this.$forceUpdate() // Force update to refresh current time
      }, 1000)
    },    selectAnswer(index) {
      if (this.showResult) return
      this.selectedAnswer = index
      
      // Show result for 2 seconds before allowing next question
      setTimeout(() => {
        this.showResult = true
        
        // Auto-advance after showing result
        setTimeout(() => {
          this.nextQuestion()
        }, 2000)
      }, 500)
    },
      nextQuestion() {
      // Don't allow manual next if we're still waiting for answer selection
      if (this.selectedAnswer === null && this.timeRemaining > 0 && !this.showResult) {
        return
      }
      
      // Process the answer if not already processed
      if (!this.showResult) {
        if (this.selectedAnswer !== null) {
          if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
            this.correctAnswers++
          } else {
            this.incorrectAnswers++
          }
        } else {
          // Time ran out
          this.incorrectAnswers++
        }
      }
      
      if (this.isLastQuestion) {
        this.finishQuiz()
        return
      }
      
      // Move to next question
      this.currentQuestionIndex++
      this.selectedAnswer = null
      this.showResult = false
      this.timeRemaining = 60
      
      // Restart timer
      clearInterval(this.questionTimer)
      this.startTimer()
    },      finishQuiz() {
      // Navigate to review page with results
      this.$router.push({
        name: 'QuizReview',
        params: { quizId: this.quizId },
        query: {
          correct: this.correctAnswers,
          incorrect: this.incorrectAnswers,
          total: this.totalQuestions
        }
      })
    },

    handleBackClick() {
      // Navigate back to quiz start page or previous route
      this.$router.push({ name: 'QuizStart' })
    }
  }
}
</script>

<style scoped>
/* Font families */
.font-italian-plate-no2 {
  font-family: 'Italian_Plate_No2', 'Inter', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-sf-pro {
  font-family: 'SF Pro Text', sans-serif;
}

/* Color system based on design specifications */
.bg-color-primary-blue-100 {
  background-color: #072C54;
}

.bg-color-secondary-white {
  background-color: #FFFFFF;
}

.text-color-primary-yellow-100 {
  color: #FFC72C;
}

.text-color-secondary-black {
  color: #09091A;
}

.text-color-functional-success-100 {
  color: #39A05D;
}

.bg-color-functional-success-100 {
  background-color: #39A05D;
}

.text-color-functional-error-100 {
  color: #B9473B;
}

.bg-color-functional-error-100 {
  background-color: #B9473B;
}

.text-color-secondary-white {
  color: #FFFFFF;
}

/* Custom shadows */
.shadow-custom-yellow {
  box-shadow: 0px 4px 8px 0px rgba(255, 199, 43, 0.40);
}

.shadow-custom-dark {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}

/* Quiz container */
.quiz-question-type1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

/* Header styling */
.quiz-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #072C54;
  padding: 16px 20px;
}

/* Adjust main container to account for header */
.quiz-question-type1 > div:last-child {
  margin-top: 80px;
}

/* Override QuestionCard width to be responsive */
:deep(.w-80) {
  width: 100% !important;
  max-width: none !important;
}

/* Custom cursor states for quiz interaction */
.cursor-not-allowed {
  cursor: not-allowed !important;
}

.cursor-pointer {
  cursor: pointer !important;
}

/* Next button component styling */
.next-button-component {
  width: 320px !important;
  height: 56px !important;
  max-width: 320px !important;
  min-width: 56px !important;
  min-height: 44px !important;
}

/* Responsive design */
@media (max-width: 640px) {
  .quiz-header {
    padding: 12px 16px;
  }
}
</style>
