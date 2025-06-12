<template>
  <div class="quiz-page">    <!-- Header with only back arrow -->
    <header class="quiz-header">
      <HeaderBar 
        :with-back="true"
        :with-title="false"
        direction="back"
        icon-color="white"
        @back-click="handleBackClick"
      />
    </header>

    <!-- Main Quiz Content -->
    <main class="quiz-content">
      <!-- Question Card with Progress Circle -->
      <div class="question-section">
        <QuestionCard 
          :current-question="currentQuestionIndex + 1"
          :total-questions="quizData.questions.length"
          :time-remaining="timeRemaining"
          :progress-value="questionProgress"
          :question-text="currentQuestion.question"
          :correct-answers="stats.correctAnswers"
          :incorrect-answers="stats.incorrectAnswers"
        />
      </div>      <!-- Answer Options -->
      <div class="answers-section">
        <div class="answers-grid">
          <button
            v-for="(answer, index) in currentQuestion.options"
            :key="index"
            class="answer-option"
            :class="{
              'selected': selectedAnswer === index,
              'correct': showResult && index === currentQuestion.correctAnswer,
              'incorrect': showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer,
              'disabled': showResult || isSubmitting
            }"
            @click="selectAnswer(index)"
            :disabled="showResult || isSubmitting"
          >
            <div class="answer-indicator">{{ String.fromCharCode(65 + index) }}</div>
            <div class="answer-text">{{ answer.text }}</div>
            <div v-if="showResult && index === currentQuestion.correctAnswer" class="result-icon success">✓</div>
            <div v-else-if="showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer" class="result-icon error">✗</div>
          </button>
        </div>
      </div>      <!-- Action Buttons -->
      <div class="quiz-actions">
        <OutlineButton 
          v-if="!showResult && selectedAnswer !== null"
          label="Submit Answer"
          @click="submitAnswer"
          :disabled="isSubmitting"
        />
        
        <FilledButton 
          v-if="showResult && !isLastQuestion"
          label="Next Question"
          variant="primary"
          @click="nextQuestion"
        />
        
        <FilledButton 
          v-if="showResult && isLastQuestion"
          label="Finish Quiz"
          variant="success"
          @click="finishQuiz"
        />
      </div>

      <!-- Quiz Statistics -->
      <div class="quiz-stats">
        <div class="stat-item">
          <span class="stat-label">Correct</span>
          <span class="stat-value correct">{{ stats.correctAnswers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Incorrect</span>
          <span class="stat-value incorrect">{{ stats.incorrectAnswers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Score</span>
          <span class="stat-value score">{{ scorePercentage }}%</span>
        </div>
      </div>
    </main>

    <!-- Results Modal -->
    <div v-if="showResults" class="results-overlay">
      <div class="results-modal">
        <div class="results-content">
          <div class="results-header">
            <div class="results-icon" :class="resultGrade">{{ resultIcon }}</div>
            <h2>Quiz Complete!</h2>
            <p>{{ resultMessage }}</p>
          </div>
          
          <div class="results-stats">
            <div class="result-stat">
              <div class="stat-number">{{ stats.correctAnswers }}</div>
              <div class="stat-label">Correct</div>
            </div>
            <div class="result-stat">
              <div class="stat-number">{{ stats.incorrectAnswers }}</div>
              <div class="stat-label">Incorrect</div>
            </div>
            <div class="result-stat">
              <div class="stat-number">{{ scorePercentage }}%</div>
              <div class="stat-label">Score</div>
            </div>
            <div class="result-stat">
              <div class="stat-number">{{ pointsEarned }}</div>
              <div class="stat-label">Points</div>
            </div>
          </div>
          
          <div class="results-actions">
            <OutlineButton 
              label="Review Answers"
              @click="reviewAnswers"
            />
            <FilledButton 
              label="Back to Dashboard"
              variant="primary"
              @click="backToDashboard"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderBar } from '../components/bar'
import { QuestionCard } from '../components/card'
import { OutlineButton, FilledButton } from '../components/button'
import { quizAPI } from '../services/api.js'

export default {
  name: 'QuizPage',  components: {
    HeaderBar,
    QuestionCard,
    OutlineButton,
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
      // Quiz state
      isLoading: true,
      isSubmitting: false,
      showResult: false,
      showResults: false,
      selectedAnswer: null,
      currentQuestionIndex: 0,
        // Timer state
      timeRemaining: 60,
      
      // Statistics
      stats: {
        correctAnswers: 0,
        incorrectAnswers: 0
      },
      
      // Sample quiz data - this will be replaced with API data
      quizData: {
        id: 1,
        title: "Mathematics Fundamentals",
        description: "Test your basic mathematics knowledge",
        timeLimit: 300, // 5 minutes in seconds
        totalPoints: 1000,
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
            points: 100,
            explanation: "15 + 27 = 42"
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
            points: 150,
            explanation: "17 is a prime number as it's only divisible by 1 and itself."
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
            points: 120,
            explanation: "π (pi) is approximately 3.14159, which rounds to 3.14."
          },
          {
            id: 4,
            question: "If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?",
            options: [
              { id: 'a', text: 'Right triangle' },
              { id: 'b', text: 'Isosceles triangle' },
              { id: 'c', text: 'Equilateral triangle' },
              { id: 'd', text: 'Scalene triangle' }
            ],
            correctAnswer: 2,
            points: 130,
            explanation: "A triangle with all angles equal (60°) is an equilateral triangle."
          }
        ]
      },
      
      // User answers tracking
      userAnswers: [],
      quizInstanceId: null
    }
  },
    computed: {
    currentQuestion() {
      return this.quizData.questions[this.currentQuestionIndex] || {}
    },
    
    isLastQuestion() {
      return this.currentQuestionIndex === this.quizData.questions.length - 1
    },
    
    questionProgress() {
      // Progress based on time remaining for current question
      return Math.max(0, (this.timeRemaining / 60) * 100)
    },
    
    scorePercentage() {
      const totalQuestions = this.stats.correctAnswers + this.stats.incorrectAnswers
      return totalQuestions > 0 ? Math.round((this.stats.correctAnswers / totalQuestions) * 100) : 0
    },
    
    pointsEarned() {
      return this.userAnswers
        .filter(answer => answer.isCorrect)
        .reduce((total, answer) => total + answer.points, 0)
    },
    
    resultGrade() {
      if (this.scorePercentage >= 90) return 'excellent'
      if (this.scorePercentage >= 70) return 'good'
      if (this.scorePercentage >= 50) return 'average'
      return 'poor'
    },
    
    resultIcon() {
      if (this.scorePercentage >= 90) return '🏆'
      if (this.scorePercentage >= 70) return '✅'
      if (this.scorePercentage >= 50) return '👍'
      return '📚'
    },
    
    resultMessage() {
      if (this.scorePercentage >= 90) return 'Excellent work! You mastered this topic!'
      if (this.scorePercentage >= 70) return 'Good job! You have a solid understanding.'
      if (this.scorePercentage >= 50) return 'Not bad! Keep practicing to improve.'
      return 'Keep studying! Practice makes perfect.'
    }
  },
  
  async mounted() {
    await this.loadQuizData()
    this.startTimer()
  },
  
  methods: {
    async loadQuizData() {
      try {
        this.isLoading = true
        // Fetch quiz data from backend
        const response = await quizAPI.startQuiz(this.quizId)
        // The backend should return quiz instance and questions
        this.quizData = response.data.quiz
        this.quizInstanceId = response.data.quiz_instance_id
        // Reset state
        this.currentQuestionIndex = 0
        this.userAnswers = []
        this.stats = { correctAnswers: 0, incorrectAnswers: 0 }
      } catch (error) {
        console.error('Failed to load quiz data:', error)
        this.$emit('error', 'Failed to load quiz data.')
      } finally {
        this.isLoading = false
      }
    },
    
    startTimer() {
      this.timeRemaining = 60 // 60 seconds per question
      
      this.questionTimer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--
        } else {
          // Auto-submit when time runs out
          this.submitAnswer()
        }
      }, 1000)
    },
    
    selectAnswer(index) {
      if (this.showResult || this.isSubmitting) return
      this.selectedAnswer = index
    },
    
    async submitAnswer() {
      if (this.selectedAnswer === null) return
      this.isSubmitting = true
      try {
        // Submit answer to backend
        const question = this.currentQuestion
        const answerPayload = {
          quizInstanceId: this.quizInstanceId,
          questionId: question.id,
          answer: this.selectedAnswer
        }
        const response = await quizAPI.submitAnswer(
          answerPayload.quizInstanceId,
          answerPayload.questionId,
          answerPayload.answer
        )
        // Update local state based on backend response
        const isCorrect = response.data.is_correct
        this.userAnswers.push({
          questionId: question.id,
          selected: this.selectedAnswer,
          isCorrect,
          points: question.points
        })
        if (isCorrect) {
          this.stats.correctAnswers++
        } else {
          this.stats.incorrectAnswers++
        }
        this.showResult = true
      } catch (error) {
        console.error('Failed to submit answer:', error)
        this.$emit('error', 'Failed to submit answer.')
      } finally {
        this.isSubmitting = false
      }
    },
    
    nextQuestion() {
      if (this.isLastQuestion) {
        this.finishQuiz()
        return
      }
      
      // Move to next question
      this.currentQuestionIndex++
      this.selectedAnswer = null
      this.showResult = false
      
      // Restart timer for next question
      this.startTimer()
    },
    
    async finishQuiz() {
      try {
        // Complete quiz and get results from backend
        const response = await quizAPI.completeQuiz(this.quizInstanceId)
        // Optionally update stats/results from backend
        this.showResults = true
      } catch (error) {
        console.error('Failed to complete quiz:', error)
        this.$emit('error', 'Failed to complete quiz.')
      }
    },
      handleBackClick() {
      // Show confirmation dialog before leaving
      if (confirm('Are you sure you want to leave the quiz? Your progress will be lost.')) {
        this.$router.push('/dashboard')
      }
    },
    
    reviewAnswers() {
      // TODO: Navigate to review page
      this.$router.push({
        name: 'QuizReview',
        params: { quizId: this.quizId },
        query: { userAnswers: JSON.stringify(this.userAnswers) }
      })
    },
    
    backToDashboard() {
      this.$router.push('/dashboard')
    },
    
    // API methods (to be implemented)
    async saveAnswerToBackend(answer) {
      try {
        // const response = await fetch('/api/quiz-answers', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     quizId: this.quizData.id,
        //     questionId: answer.questionId,
        //     selectedAnswer: answer.selectedAnswer,
        //     isCorrect: answer.isCorrect,
        //     points: answer.points,
        //     timeSpent: answer.timeSpent
        //   })
        // })
        // return await response.json()
      } catch (error) {
        console.error('Failed to save answer:', error)
      }
    },
    
    async submitQuizResults() {
      try {
        // const response = await fetch('/api/quiz-results', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     quizId: this.quizData.id,
        //     userAnswers: this.userAnswers,
        //     stats: this.stats,
        //     totalPoints: this.pointsEarned,
        //     scorePercentage: this.scorePercentage,
        //     completedAt: new Date().toISOString()
        //   })
        // })
        // return await response.json()
      } catch (error) {
        console.error('Failed to submit quiz results:', error)
      }
    }
  },
  
  beforeUnmount() {
    // Clean up timers
    if (this.questionTimer) {
      clearInterval(this.questionTimer)
    }
  }
}
</script>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header Styles */
.quiz-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem 1.5rem 1.5rem 1.5rem; /* Increased top padding from 20px */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Main Content */
.quiz-content {
  width: 100vw; /* Full viewport width */
  margin: 0;
  padding: 40px 20px; /* Add padding for spacing */
  box-sizing: border-box;
}

.question-section {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

/* Answer Section */
.answers-section {
  margin-bottom: 40px;
}

.answers-grid {
  display: grid;
  gap: 15px;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
}

.answer-option:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.answer-option.selected {
  border-color: #FFC72C;
  background: rgba(255, 199, 44, 0.1);
}

.answer-option.correct {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.answer-option.incorrect {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.answer-option.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.answer-indicator {
  width: 40px;
  height: 40px;
  background: #072C54;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  flex-shrink: 0;
}

.answer-option.selected .answer-indicator {
  background: #FFC72C;
  color: #072C54;
}

.answer-option.correct .answer-indicator {
  background: #22c55e;
}

.answer-option.incorrect .answer-indicator {
  background: #ef4444;
}

.answer-text {
  flex: 1;
  font-size: 16px;
  color: #09091A;
  font-weight: 500;
  line-height: 1.5;
}

.result-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.result-icon.success {
  background: #22c55e;
  color: white;
}

.result-icon.error {
  background: #ef4444;
  color: white;
}

/* Quiz Actions */
.quiz-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* Quiz Statistics */
.quiz-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.stat-value.correct {
  color: #22c55e;
}

.stat-value.incorrect {
  color: #ef4444;
}

.stat-value.score {
  color: #FFC72C;
}

/* Results Modal */
.results-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.results-modal {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.results-header {
  margin-bottom: 30px;
}

.results-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.results-icon.excellent {
  color: #ffd700;
}

.results-icon.good {
  color: #22c55e;
}

.results-icon.average {
  color: #f59e0b;
}

.results-icon.poor {
  color: #ef4444;
}

.results-header h2 {
  color: #072C54;
  margin-bottom: 10px;
  font-size: 2rem;
}

.results-header p {
  color: #6b7280;
  font-size: 1.1rem;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.result-stat {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
}

.result-stat .stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #072C54;
  margin-bottom: 5px;
}

.result-stat .stat-label {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

.results-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-content {
    padding: 20px 15px;
  }
  
  .quiz-meta {
    flex-direction: column;
    gap: 15px;
  }
    .quiz-progress-section {
    width: 100%;
    justify-content: center;
  }
  
  .answers-grid {
    gap: 12px;
  }
  
  .answer-option {
    padding: 15px;
    gap: 15px;
  }
  
  .answer-indicator {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  
  .answer-text {
    font-size: 15px;
  }
  
  .quiz-stats {
    gap: 20px;
    padding: 20px;
  }
  
  .results-modal {
    padding: 30px 20px;
  }
  
  .results-stats {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .results-actions {
    flex-direction: column;
  }
}
</style>
