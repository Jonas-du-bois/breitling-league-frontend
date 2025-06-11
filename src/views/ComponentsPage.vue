<template>
  <div class="components-page">
    <ComponentNavigation @navigate="handleNavigate" />
    
    <!-- Individual Demo Pages -->
    <div v-if="currentView === 'bar'">
      <BarDemoPage @back="handleBackToNavigation" />
    </div>

    <div v-else-if="currentView === 'button'">
      <ButtonDemoPage @back="handleBackToNavigation" />
    </div>

    <div v-else-if="currentView === 'card'">
      <CardDemoPage @back="handleBackToNavigation" />
    </div>

    <div v-else-if="currentView === 'other'">
      <OtherDemoPage @back="handleBackToNavigation" />
    </div>

    <!-- Quiz Demo Pages -->
    <div v-else-if="currentView === 'quiz-start'">
      <QuizPage 
        :quiz-id="'demo-quiz'"
        @quiz-complete="handleQuizComplete"
        @back="handleBackToNavigation"
      />
    </div>

    <div v-else-if="currentView === 'quiz-review'">
      <QuizReviewPage 
        :quiz-id="'demo-quiz'"
        @back="handleBackToNavigation"
      />
    </div>
  </div>
</template>

<script>
import ComponentNavigation from '../components/ComponentNavigation.vue'
import BarDemoPage from '../components/BarDemoPage.vue'
import ButtonDemoPage from '../components/ButtonDemoPage.vue'
import CardDemoPage from '../components/CardDemoPage.vue'
import OtherDemoPage from '../components/OtherDemoPage.vue'
import QuizPage from './QuizPage.vue'
import QuizReviewPage from './QuizReviewPage.vue'

export default {
  name: 'ComponentsPage',
  components: {
    ComponentNavigation,
    BarDemoPage,
    ButtonDemoPage,
    CardDemoPage,
    OtherDemoPage,
    QuizPage,
    QuizReviewPage
  },
  data() {
    return {
      currentView: 'navigation'
    }
  },
  methods: {
    handleNavigate(page) {
      console.log('Navigation requested:', page)
      this.currentView = page
    },

    handleBackToNavigation() {
      this.currentView = 'navigation'
    },

    handleQuizComplete() {
      this.currentView = 'quiz-review'
    }
  }
}
</script>

<style scoped>
.components-page {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>
