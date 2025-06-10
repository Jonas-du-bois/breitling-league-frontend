<template>
  <div class="quiz-review-page">
    <!-- Header -->
    <header class="review-header">
      <HeaderBar 
        page-title="Quiz Review"
        direction="back"
        icon-color="white"
        @back-click="handleBackClick"
      />
      
      <div class="review-summary">
        <div class="summary-card">
          <h2>{{ quizData.title }}</h2>
          <div class="summary-stats">
            <div class="summary-stat">
              <span class="stat-number">{{ stats.correctAnswers }}/{{ totalQuestions }}</span>
              <span class="stat-label">Correct</span>
            </div>
            <div class="summary-stat">
              <span class="stat-number">{{ scorePercentage }}%</span>
              <span class="stat-label">Score</span>
            </div>
            <div class="summary-stat">
              <span class="stat-number">{{ pointsEarned }}</span>
              <span class="stat-label">Points</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Questions Review -->
    <main class="review-content">
      <div class="review-questions">
        <div 
          v-for="(question, index) in quizData.questions" 
          :key="question.id"
          class="question-review"
          :class="{ 
            'correct': userAnswers[index]?.isCorrect,
            'incorrect': !userAnswers[index]?.isCorrect && userAnswers[index]?.selectedAnswer !== null,
            'skipped': userAnswers[index]?.selectedAnswer === null
          }"
        >
          <!-- Question Header -->
          <div class="question-header">
            <div class="question-number">
              <span>{{ index + 1 }}</span>
              <div class="result-indicator">
                <span v-if="userAnswers[index]?.isCorrect" class="correct-icon">✓</span>
                <span v-else-if="userAnswers[index]?.selectedAnswer !== null" class="incorrect-icon">✗</span>
                <span v-else class="skipped-icon">—</span>
              </div>
            </div>
            <div class="question-info">
              <h3 class="question-text">{{ question.question }}</h3>
              <div class="question-meta">
                <span class="points">{{ question.points }} points</span>
                <span v-if="userAnswers[index]?.timeSpent" class="time-spent">
                  {{ userAnswers[index].timeSpent }}s
                </span>
              </div>
            </div>
          </div>

          <!-- Answer Options -->
          <div class="answer-options">
            <div 
              v-for="(option, optionIndex) in question.options"
              :key="option.id"
              class="option-review"
              :class="{
                'user-selected': userAnswers[index]?.selectedAnswer === optionIndex,
                'correct-answer': optionIndex === question.correctAnswer,
                'incorrect-selection': userAnswers[index]?.selectedAnswer === optionIndex && optionIndex !== question.correctAnswer
              }"
            >
              <div class="option-indicator">{{ String.fromCharCode(65 + optionIndex) }}</div>
              <div class="option-text">{{ option.text }}</div>
              <div class="option-status">
                <span v-if="optionIndex === question.correctAnswer" class="correct-badge">Correct</span>
                <span v-if="userAnswers[index]?.selectedAnswer === optionIndex && optionIndex !== question.correctAnswer" class="your-answer-badge">Your Answer</span>
              </div>
            </div>
          </div>

          <!-- Explanation -->
          <div v-if="question.explanation" class="explanation">
            <h4>Explanation</h4>
            <p>{{ question.explanation }}</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="review-actions">
        <OutlineButton 
          label="Retake Quiz"
          @click="retakeQuiz"
        />
        <FilledButton 
          label="Back to Dashboard"
          variant="primary"
          @click="backToDashboard"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { HeaderBar } from '../components/bar'
import { OutlineButton, FilledButton } from '../components/button'

export default {
  name: 'QuizReviewPage',
  components: {
    HeaderBar,
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
      isLoading: true,
      quizData: {},
      userAnswers: [],
      stats: {
        correctAnswers: 0,
        incorrectAnswers: 0,
        skippedQuestions: 0
      }
    }
  },
  
  computed: {
    totalQuestions() {
      return this.quizData.questions?.length || 0
    },
    
    scorePercentage() {
      const totalAnswered = this.stats.correctAnswers + this.stats.incorrectAnswers
      return totalAnswered > 0 ? Math.round((this.stats.correctAnswers / totalAnswered) * 100) : 0
    },
    
    pointsEarned() {
      return this.userAnswers
        .filter(answer => answer.isCorrect)
        .reduce((total, answer) => total + answer.points, 0)
    }
  },
  
  async mounted() {
    await this.loadReviewData()
  },
  
  methods: {
    async loadReviewData() {
      try {
        this.isLoading = true
        
        // Get user answers from query params or API
        const userAnswersParam = this.$route.query.userAnswers
        if (userAnswersParam) {
          this.userAnswers = JSON.parse(userAnswersParam)
        }
        
        // TODO: Replace with actual API calls
        // const [quizResponse, answersResponse] = await Promise.all([
        //   fetch(`/api/quizzes/${this.quizId}`),
        //   fetch(`/api/quiz-results/${this.quizId}/latest`)
        // ])
        // this.quizData = await quizResponse.json()
        // if (!userAnswersParam) {
        //   this.userAnswers = await answersResponse.json()
        // }
        
        // Sample data for demonstration
        this.quizData = {
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
              points: 100,
              explanation: "15 + 27 = 42. This is basic addition."
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
              explanation: "17 is a prime number as it's only divisible by 1 and itself. 15=3×5, 21=3×7, 25=5×5."
            }
          ]
        }
        
        // Calculate statistics
        this.calculateStats()
        
        this.isLoading = false
      } catch (error) {
        console.error('Failed to load review data:', error)
      }
    },
    
    calculateStats() {
      this.stats = {
        correctAnswers: 0,
        incorrectAnswers: 0,
        skippedQuestions: 0
      }
      
      this.userAnswers.forEach(answer => {
        if (answer.selectedAnswer === null) {
          this.stats.skippedQuestions++
        } else if (answer.isCorrect) {
          this.stats.correctAnswers++
        } else {
          this.stats.incorrectAnswers++
        }
      })
    },
    
    retakeQuiz() {
      this.$router.push({
        name: 'QuizPage',
        params: { quizId: this.quizId }
      })
    },
    
    backToDashboard() {
      this.$router.push('/dashboard')
    },
    
    handleBackClick() {
      this.backToDashboard()
    }
  }
}
</script>

<style scoped>
.quiz-review-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header Styles */
.review-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.review-summary {
  margin-top: 20px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
}

.summary-card h2 {
  color: #072C54;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.summary-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.summary-stat {
  text-align: center;
}

.summary-stat .stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #072C54;
  margin-bottom: 5px;
}

.summary-stat .stat-label {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Main Content */
.review-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.review-questions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

/* Question Review */
.question-review {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  border-left: 6px solid transparent;
}

.question-review.correct {
  border-left-color: #22c55e;
}

.question-review.incorrect {
  border-left-color: #ef4444;
}

.question-review.skipped {
  border-left-color: #f59e0b;
}

.question-header {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.question-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.question-number span {
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
}

.result-indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.correct-icon {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.incorrect-icon {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skipped-icon {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.question-info {
  flex: 1;
}

.question-text {
  color: #072C54;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.4;
}

.question-meta {
  display: flex;
  gap: 20px;
  color: #6b7280;
  font-size: 0.9rem;
}

.points {
  font-weight: 600;
  color: #FFC72C;
}

/* Answer Options */
.answer-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.option-review {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8fafc;
  border: 2px solid transparent;
  border-radius: 10px;
  position: relative;
}

.option-review.correct-answer {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.option-review.incorrect-selection {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.option-review.user-selected:not(.correct-answer) {
  border-color: #FFC72C;
  background: rgba(255, 199, 44, 0.05);
}

.option-indicator {
  width: 35px;
  height: 35px;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.option-review.correct-answer .option-indicator {
  background: #22c55e;
  color: white;
}

.option-review.incorrect-selection .option-indicator {
  background: #ef4444;
  color: white;
}

.option-text {
  flex: 1;
  color: #2d3748;
  font-weight: 500;
}

.option-status {
  display: flex;
  gap: 10px;
}

.correct-badge,
.your-answer-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.correct-badge {
  background: #22c55e;
  color: white;
}

.your-answer-badge {
  background: #FFC72C;
  color: #072C54;
}

/* Explanation */
.explanation {
  background: #f1f5f9;
  border-radius: 10px;
  padding: 20px;
  border-left: 4px solid #FFC72C;
}

.explanation h4 {
  color: #072C54;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.explanation p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

/* Review Actions */
.review-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (max-width: 768px) {
  .review-content {
    padding: 20px 15px;
  }
  
  .summary-stats {
    gap: 20px;
  }
  
  .question-header {
    gap: 15px;
  }
  
  .question-number span {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }
  
  .result-indicator,
  .correct-icon,
  .incorrect-icon,
  .skipped-icon {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
  
  .question-meta {
    flex-direction: column;
    gap: 5px;
  }
  
  .option-review {
    gap: 12px;
    padding: 12px;
  }
  
  .option-indicator {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  
  .review-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
