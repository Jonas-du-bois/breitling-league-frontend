<template>
  <div class="novelty-page">
    
    <!-- Header Bar -->
    <HeaderBar 
      page-title="Novelty"
      :with-back="true"
      class="novelty-header"
      @back="handleBack"
    />    <!-- Main Content -->
    <div class="novelty-content">
      <!-- Novelty Cards -->
      <div class="novelty-cards">
        <!-- September 2025 Card (with timer booster) -->
        <ChapterCard
          title="September 2025"
          bonus-multiplier="x2"
          :time-left="{ days: '08', hours: '21', minutes: '58' }"
          points-left="45'000"
          :show-time="true"
          image-url="https://placehold.co/402x130"
          @toggle-expanded="handleChapterToggle"
        />

        <!-- June 2025 Card -->
        <ChapterCard
          title="June 2025"
          bonus-multiplier="x1"
          :time-left="{ days: '00', hours: '00', minutes: '00' }"
          points-left="45'000"
          :show-time="false"
          image-url="https://placehold.co/402x130"
          @toggle-expanded="handleChapterToggle"
        />

        <!-- March 2025 Card -->
        <ChapterCard
          title="March 2025"
          bonus-multiplier="x1"
          :time-left="{ days: '00', hours: '00', minutes: '00' }"
          points-left="45'000"
          :show-time="false"
          image-url="https://placehold.co/402x130"
          @toggle-expanded="handleChapterToggle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '../components/bar/HeaderBar.vue'
import ChapterCard from '../components/card/ChapterCard.vue'

export default {
  name: 'NoveltyPage',
  components: {
    HeaderBar,
    ChapterCard
  },
  methods: {
    handleBack() {
      this.$emit('back')
      // Navigate back or to previous page
      this.$router.back()
    },
    handleChapterToggle(event) {
      this.$emit('chapter-toggle', event)
      console.log('Chapter toggle:', event)
    }
  },
  emits: [
    'back',
    'chapter-toggle'
  ]
}
</script>

<style scoped>
.novelty-page {
  width: 384px; /* w-96 */
  height: 1095px;
  background: white;
  overflow: hidden;
  position: relative;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.novelty-header {
  background: #FFFFFF;
  padding: 0 2rem 2rem 2rem;
}

/* Main Content */
.novelty-content {
  position: absolute;
  top: 123px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.novelty-cards {
  display: flex;
  flex-direction: column;
}

/* Responsive Design */
@media (max-width: 640px) {
  .novelty-page {
    width: 100%;
    max-width: 384px;
    margin: 0 auto;
  }
  
  .novelty-header {
    padding: 0 1rem 1rem 1rem;
  }
}
</style>
