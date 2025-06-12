<template>
  <div class="novelty-page">
      <!-- Header Bar -->
    <HeaderBar 
      page-title="Novelty"
      :with-back="true"
      class="novelty-header"
      @back-click="handleBack"
    /><!-- Main Content -->
    <div class="novelty-content">      <!-- Novelty Cards -->
      <div class="novelty-cards">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <template v-else>
          <ChapterCard
            v-for="novelty in noveltyList"
            :key="novelty.id"
            :title="novelty.title"
            :bonus-multiplier="novelty.bonus_multiplier || 'x1'"
            :time-left="novelty.time_left || { days: '00', hours: '00', minutes: '00' }"
            :points-left="novelty.points_left || '0'"
            :show-time="novelty.show_time || false"
            :image-url="novelty.image_url || '/novelty-default.jpg'"
            @toggle-expanded="handleChapterToggle"
          />
        </template>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation 
      :active-tab="'playzone'"
      @navigate="handleBottomNavigation"
    />
  </div>
</template>

<script>
import HeaderBar from '../components/bar/HeaderBar.vue'
import BottomNavigation from '../components/bar/BottomNavigation.vue'
import ChapterCard from '../components/card/ChapterCard.vue'
import { noveltyAPI } from '../services/api.js'

export default {
  name: 'NoveltyPage',
  components: {
    HeaderBar,
    BottomNavigation,
    ChapterCard
  },
  data() {
    return {
      noveltyList: [],
      loading: false,
      error: null
    }
  },
  mounted() {
    this.fetchNovelty()
  },
  methods: {
    async fetchNovelty() {
      this.loading = true
      this.error = null
      try {
        const response = await noveltyAPI.getTrendingNovelty()
        this.noveltyList = response.data
      } catch (err) {
        this.error = 'Failed to load novelty data.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    handleBack() {
      // Navigate back to the playground/playzone page
      this.$router.push({ name: 'Playzone' })
    },
    handleChapterToggle(event) {
      this.$emit('chapter-toggle', event)
      console.log('Chapter toggle:', event)
    },
    handleBottomNavigation(item) {
      // Handle bottom navigation clicks
      if (item === 'playzone') {
        this.$router.push({ name: 'Playzone' })
      } else {
        // For other navigation items, you can add routing logic here
        console.log('Bottom navigation clicked:', item)
      }
    }
  },  emits: [
    'back',
    'chapter-toggle'
  ]
}
</script>

<style scoped>
.novelty-page {
  width: 100vw; /* Full viewport width */
  min-height: 100vh; /* Changed from fixed height to min-height */
  background: white;
  overflow-x: hidden; /* Prevent horizontal scroll */
  overflow-y: auto; /* Allow vertical scroll */
  position: relative;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
}

/* Header */
.novelty-header {
  background: #FFFFFF;
  padding: 3rem 2rem 2.5rem 2rem; /* Increased from 0 2rem 2rem 2rem */
}

/* Main Content */
.novelty-content {
  position: absolute;
  top: 160px; /* Increased from 123px to account for larger header */
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 120px; /* Add padding for bottom navigation */
  box-sizing: border-box;
}

.novelty-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 0;
}

/* Loading and Error States */
.loading {
  text-align: center;
  color: #888;
  margin: 2rem 0;
}
.error {
  text-align: center;
  color: #c00;
  margin: 2rem 0;
}

/* Responsive Design */
@media (max-width: 640px) {
  .novelty-page {
    width: 100%;
    max-width: 384px;
    margin: 0 auto;
  }
  
  .novelty-header {
    padding: 2rem 1rem 1.5rem 1rem; /* Increased top padding for mobile */
  }
}
</style>
