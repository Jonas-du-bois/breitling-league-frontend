<template>
  <div class="quiz-start-page">
    <!-- Status Bar -->
    <div class="status-bar">
      <div class="status-content">
        <div class="time">13:41</div>
        <div class="status-icons">
          <div class="icon">􀛨</div>
          <div class="icon">􀙇</div>
        </div>
      </div>
    </div>

    <!-- Header with Back Button -->
    <div class="header-section">
      <HeaderBar 
        :with-back="true"
        :with-title="false"
        class="quiz-header"
        @back="handleBack"
      />
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="content-container">
        <!-- Quiz Title -->
        <div class="quiz-title">Quiz</div>
        
        <!-- Chapter Title -->
        <div class="chapter-title">{{ chapterTitle }}</div>
        
        <!-- Description -->
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
  },
  methods: {
    handleBack() {
      this.$emit('back')
      this.$router.back()
    },    startQuiz() {
      this.$emit('start-quiz', {
        unitId: this.unitId,
        chapterId: this.chapterId
      })
      // Navigate to the actual quiz page
      this.$router.push({ 
        name: 'Quiz', 
        params: { 
          unitId: this.unitId || 'default',
          chapterId: this.chapterId || 'default'
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

/* Status Bar */
.status-bar {
  width: 100%; /* w-96 */
  position: absolute;
  left: 0;
  top: 0;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.status-content {
  align-self: stretch;
  height: 56px; /* h-14 */
  padding: 32px; /* px-8 pt-8 */
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.status-content > div {
  align-self: stretch;
  backdrop-filter: blur(20px);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  text-align: center;
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 14px; /* text-sm */
  font-weight: 500; /* font-medium */
  font-family: 'Inter', sans-serif;
}

.status-icons {
  width: 64px; /* w-16 */
  height: 14px; /* h-3.5 */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-icons .icon {
  color: #FFFFFF; /* text-color-secondary-white */
  font-family: 'SF_Pro_Text', sans-serif;
}

.status-icons .icon:first-child {
  position: absolute;
  left: 41px;
  top: -3px;
  font-size: 16px; /* text-base */
  font-weight: normal;
}

.status-icons .icon:last-child {
  position: absolute;
  left: 21px;
  top: -1px;
  font-size: 14px; /* text-sm */
  font-weight: normal;
}

/* Header */
.header-section {
  position: absolute;
  top: 56px;
  left: 0;
  width: 100%;
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
  top: 298px;
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
  gap: 32px; /* gap-8 */
}

.quiz-title {
  width: 288px; /* w-72 */
  text-align: center;
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 30px; /* text-3xl */
  font-weight: 600; /* font-semibold */
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
}

.chapter-title {
  width: 320px; /* w-80 */
  text-align: center;
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 24px; /* text-2xl */
  font-weight: 700; /* font-bold */
  font-family: 'Italian_Plate_No2', sans-serif;
}

.description {
  width: 320px; /* w-80 */
  text-align: center;
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 20px; /* text-xl */
  font-weight: 400; /* font-normal */
  font-family: 'Italian_Plate_No2', sans-serif;
  white-space: pre-line; /* To handle line breaks */
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
  top: 634px;
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
  .chapter-title,
  .description {
    width: 100%;
  }
  
  .start-button {
    left: 5%;
    width: 90%;
  }
}
</style>
