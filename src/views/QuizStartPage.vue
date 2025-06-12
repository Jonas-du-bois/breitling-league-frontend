<template>
  <div class="quiz-start-page">
    <!-- Header with Back Button -->
    <div class="header-section">
      <HeaderBar 
        :with-back="true"
        :with-title="false"
        icon-color="white"
        class="quiz-header"
        @back-click="handleBack"
      />
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="content-container">
        <!-- Quiz Title at the top center -->
        <div class="quiz-title">{{ chapterTitle }}</div>
        
        <!-- Description as paragraphs -->
        <div class="description">{{ description }}</div>
      </div>
    </div>

    <!-- Start Button -->
    <FilledButton 
      label="Start"
      class="start-button"
      @click="startQuiz"
    />
  </div>
</template>

<script>
import HeaderBar from '../components/bar/HeaderBar.vue'
import { FilledButton } from '../components/button'

export default {
  name: 'QuizStartPage',
  components: {
    HeaderBar,
    FilledButton
  },
  props: {
    unitId: {
      type: [String, Number],
      required: false
    },
    chapterId: {
      type: [String, Number], 
      required: false
    }
  },
  data() {
    return {
      chapterTitle: "Les innovations des années 30",
      description: "Les années 1930 ont été une décennie de progrès audacieux - dans les airs, sur terre, et au poignet. À travers ce quiz, explorez les grandes innovations de cette époque, dont certaines ont inspiré l'univers Breitling.\n\nÊtes-vous prêt à tester vos connaissances ?"
    }
  },  methods: {
    handleBack() {
      this.$emit('back')
      this.$router.back()
    },    startQuiz() {
      this.$emit('start-quiz', {
        unitId: this.unitId,
        chapterId: this.chapterId
      })
      // Navigate to the new quiz question type 1 page
      this.$router.push({ 
        name: 'QuizQuestionType1', 
        params: { 
          quizId: this.unitId || 'default'
        }
      })
    }
  },
  emits: [
    'back',
    'start-quiz'
  ]
}
</script>

<style scoped>
.quiz-start-page {
  width: 384px; /* w-96 */
  height: 874px; /* h-[874px] */
  position: relative;
  background: #072C54; /* bg-color-primary-blue-100 */
  overflow: hidden;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.header-section {
  position: absolute;
  top: 20px; /* Moved higher since no status bar */
  left: 0;
  width: 100%;
  padding: 2rem 0 1rem 0;
}

.quiz-header {
  width: 320px; /* w-80 */
  height: 44px; /* h-11 */
  position: relative;
  margin: 0 auto;
}

/* Main Content */
.main-content {
  width: 320px; /* w-80 */
  padding: 20px 0; /* py-5 */
  position: absolute;
  left: 33px;
  top: 180px; /* Adjusted for new layout without status bar */
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px; /* gap-8 */
}

.content-container {
  width: 288px; /* w-72 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px; /* Increased gap for better spacing */
}

.quiz-title {
  width: 288px; /* w-72 */
  text-align: center;
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 32px; /* Increased font size for title */
  font-weight: 700; /* font-bold */
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
  line-height: 1.2;
}

.description {
  width: 320px; /* w-80 */
  text-align: left; /* Changed to left align for paragraph style */
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 18px; /* Slightly smaller for better readability */
  font-weight: 400; /* font-normal */
  font-family: 'Italian_Plate_No2', sans-serif;
  white-space: pre-line; /* To handle line breaks */
  line-height: 1.6; /* Better line spacing for paragraphs */
}

/* Start Button */
.start-button {
  width: 320px; /* w-80 */
  height: 56px; /* h-14 */
  max-width: 320px; /* max-w-80 */
  min-width: 56px; /* min-w-14 */
  min-height: 44px; /* min-h-11 */
  padding: 24px; /* p-6 */
  position: absolute;
  left: 32px;
  bottom: 60px; /* Position from bottom for better responsiveness */
  background: #FFC72C; /* bg-button-background-color */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* gap-2.5 */
}

.start-button :deep(.button-label) {
  color: #072C54; /* text-button-label-color-dark */
  font-size: 16px; /* text-base */
  font-weight: 700; /* font-bold */
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em; /* tracking-widest */
}

/* Responsive Design */
@media (max-width: 640px) {
  .quiz-start-page {
    width: 100%;
    max-width: 384px;
    margin: 0 auto;
  }
  
  .main-content {
    left: 5%;
    width: 90%;
  }
  
  .content-container {
    width: 100%;
  }
  
  .quiz-title,
  .description {
    width: 100%;
  }
  
  .start-button {
    left: 5%;
    width: 90%;
  }
}
</style>
