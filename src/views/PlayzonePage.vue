<template>
  <div class="playzone-page">    <!-- Header -->
    <HeaderBar 
      page-title="Playzone"
      :with-back="false"
      class="playzone-header"
    /><!-- Main Content -->
    <div class="playzone-content"><!-- Hero Section - Become Breitling Specialist -->
      <div class="hero-section">
        <SpecialistCard 
          :units-learned="7"
          :total-units="15"
          @card-click="handleSpecialistClick"
        />
      </div>      <!-- Weekly Challenge Section -->
      <div class="challenge-section">
        <div class="challenge-header">
          <h2 class="section-title">weekly challenge</h2>
          <div class="flame-counter">
            <Icon name="flame" size="lg" alt="Flame" />
            <span class="flame-count">13</span>
          </div>
        </div>
        <FilledButton 
          label="Keep your flames"
          class="challenge-button"
          @click="handleKeepFlames"
        />
      </div>

      <!-- Don't Miss Section -->
      <h2 class="section-title standalone">don't miss</h2>

      <!-- Event Cards -->
      <div class="event-card fathers-day">
        <div class="event-content">
          <div class="event-info">
            <div class="event-badge">New Event</div>
            <h3 class="event-title">Father's day</h3>
          </div>
          <OutlineButton 
            label="Discover"
            class="event-button"
            @click="handleDiscoverEvent('fathers-day')"
          />        </div>
        <TimerBoosterBar 
          :timer="{ days: '08', hours: '21', minutes: '58' }"
          :has-booster="false"
          class="timer-booster-bar"
        />
      </div>

      <div class="event-card novelty">
        <div class="event-content">
          <div class="event-info">
            <div class="event-badge">Novelty</div>
            <h3 class="event-title">September 2025</h3>
          </div>
          <OutlineButton 
            label="Discover"
            class="event-button"
            @click="handleDiscoverEvent('novelty')"
          />
        </div>
        <TimerBoosterBar 
          :timer="{ days: '08', hours: '21', minutes: '58' }"
          :has-booster="true"
          booster-multiplier="x2"
          class="timer-booster-bar"
        />
      </div>      <!-- Reminder Section -->
      <div class="reminder-section">
        <div class="reminder-header-centered">
          <div class="reminder-title-container">
            <h3 class="reminder-title">reminder</h3>
          </div>
          <div class="reminder-timer-container">
            <div class="timer-item">
              <div class="timer-number">08</div>
              <div class="timer-label">days</div>
            </div>
            <div class="timer-item">
              <div class="timer-number">21</div>
              <div class="timer-label">hours</div>
            </div>
            <div class="timer-item">
              <div class="timer-number">58</div>
              <div class="timer-label">min</div>
            </div>
          </div>
        </div>
        <FilledButton 
          label="Test your knowledge"
          class="reminder-button"
          @click="handleTestKnowledge"
        />
      </div>      <!-- Discovery Section -->
      <div class="discovery-section">
        <h2 class="section-title left-aligned">Discovery</h2>
        
        <!-- Error Message -->
        <div v-if="error" class="error-message">
          {{ error }}
          <button @click="loadPlayzoneData" class="retry-button">Retry</button>
        </div>
        
        <div class="cards-container">
          <div class="cards-scroll">
            <!-- Loading State -->
            <div v-if="loading.discovery" class="loading-cards">
              <div v-for="i in 3" :key="i" class="loading-card">
                <div class="loading-placeholder"></div>
              </div>
            </div>
            
            <!-- Unit Cards -->
            <UnitCard
              v-for="unit in discoveryUnits"
              :key="unit.id"
              :unit="unit"
              :is-learned="unit.isLearned"
              :is-clicked="clickedCards.has(unit.id)"
              :is-blurred="false"
              @unit-click="handleUnitClick"
              @learn-unit="handleLearnUnit"
              @quiz-unit="handleQuizUnit"
            />
            <OutlineButton 
              label="See more"
              class="see-more-button"
              @click="handleSeeMore('discovery')"
            />
          </div>
        </div>
      </div>      <!-- Novelty Section -->
      <div class="novelty-section">
        <h2 class="section-title left-aligned">Novelty</h2>
        <div class="cards-container">
          <div class="cards-scroll">
            <!-- Loading State -->
            <div v-if="loading.novelty" class="loading-cards">
              <div v-for="i in 3" :key="i" class="loading-card">
                <div class="loading-placeholder"></div>
              </div>
            </div>
            
            <!-- Unit Cards -->
            <UnitCard
              v-for="unit in noveltyUnits"
              :key="unit.id"
              :unit="unit"
              :is-learned="unit.isLearned"
              :is-clicked="clickedCards.has(unit.id)"
              :is-blurred="false"
              @unit-click="handleUnitClick"
              @learn-unit="handleLearnUnit"
              @quiz-unit="handleQuizUnit"
            />
            <OutlineButton
              label="See more"
              class="see-more-button"
              @click="handleSeeMore('novelty')"
            />
          </div>
        </div>
      </div>
    </div>    <!-- Bottom Navigation -->
    <BottomNavigation 
      :active-tab="'playzone'"
      @navigate="handleBottomNavigation"
    />
  </div>
</template>

<script>
import HeaderBar from '../components/bar/HeaderBar.vue'
import BottomNavigation from '../components/bar/BottomNavigation.vue'
import TimerBoosterBar from '../components/bar/TimerBoosterBar.vue'
import { OutlineButton, FilledButton } from '../components/button'
import UnitCard from '../components/card/UnitCard.vue'
import SpecialistCard from '../components/card/SpecialistCard.vue'
import Icon from '../components/Icon.vue'
import { eventsAPI, unitsAPI, autoLogin } from '../services/api.js'

export default {
  name: 'PlayzonePage',  components: {
    HeaderBar,
    BottomNavigation,
    TimerBoosterBar,
    OutlineButton,
    FilledButton,
    UnitCard,
    SpecialistCard,
    Icon
  },  async mounted() {
    console.log('PlayzonePage mounted successfully!')
    // Add click-outside handler to close overlays
    document.addEventListener('click', this.handleClickOutside)
    
    // Perform auto-login first
    await this.performAutoLogin()
    
    // Load data from API
    this.loadPlayzoneData()
    
    // Expose reset method globally for development
    if (process.env.NODE_ENV === 'development') {
      window.resetAutoLogin = this.resetAutoLogin
      console.log('🛠️ Development: window.resetAutoLogin() available')
    }
  },
  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('click', this.handleClickOutside)
  },  data() {
    return {
      clickedCards: new Set(), // Track which cards have their overlays open
      discoveryUnits: [], // Will be populated from API
      noveltyUnits: [], // Will be populated from API
      loading: {
        events: false,
        discovery: false,
        novelty: false
      },      error: null
    }
    }
  },
  computed: {    authStatusMessage() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        return '🔐 Authenticated as Lucas Moreau (lucas@example.com)'
      }
      return this.authStatus === 'checking' ? '⏳ Checking authentication...' : '🔓 Not authenticated'
    }
  },
  methods: {
    handleKeepFlames() {
      this.$emit('keep-flames')
    },    handleDiscoverEvent(eventType) {
      if (eventType === 'novelty') {
        // Navigate to the novelty page
        this.$router.push('/novelty')
      } else {
        // For other event types, emit the event
        this.$emit('discover-event', eventType)
      }
    },
    handleTestKnowledge() {
      this.$emit('test-knowledge')
    },    handleUnitClick(unit) {
      // Toggle the clicked state for overlay display
      if (this.clickedCards.has(unit.id)) {
        this.clickedCards.delete(unit.id);
      } else {
        // Close other overlays first (only one overlay at a time)
        this.clickedCards.clear();
        this.clickedCards.add(unit.id);
      }
      this.$emit('unit-click', unit)
    },
    handleLearnUnit(unit) {
      this.$emit('learn-unit', unit)
    },
    handleQuizUnit(unit) {
      this.$emit('quiz-unit', unit)
    },    handleSeeMore(section) {
      this.$emit('see-more', section)
    },
    handleSpecialistClick(specialistData) {
      console.log('Specialist card clicked:', specialistData)
      this.$emit('specialist-click', specialistData)
    },    handleBottomNavigation(item) {
      this.$emit('navigate', item)
      // Optional: Handle navigation here if needed
      console.log('Bottom navigation clicked:', item)
    },
    handleClickOutside(event) {
      // Check if click is outside unit cards
      const unitCard = event.target.closest('.unit-card')
      if (!unitCard && this.clickedCards.size > 0) {
        this.clickedCards.clear()
      }
    },
    // Load data from API
    async loadPlayzoneData() {
      this.error = null
      
      try {
        // Load discovery units (random units)
        this.loading.discovery = true
        const discoveryResponse = await unitsAPI.getRandomUnits(3)
        this.discoveryUnits = discoveryResponse.data.map(unit => ({
          id: unit.id,
          title: unit.title || unit.name,
          name: unit.specialist_name || `${unit.title} Specialist`,
          points: unit.points?.toLocaleString() || "0",
          badgeText: unit.is_certified ? 'Certified' : 'Text',
          isLearned: unit.is_certified || false
        }))
      } catch (error) {
        console.error('Error loading discovery units:', error)
        this.error = 'Failed to load discovery units.'
      } finally {
        this.loading.discovery = false
      }

      try {
        // Load novelty units (could be different endpoint or marked novelty units)
        this.loading.novelty = true
        const noveltyResponse = await unitsAPI.getRandomUnits(3)
        this.noveltyUnits = noveltyResponse.data.map(unit => ({
          id: unit.id,
          title: unit.title || unit.name,
          name: unit.specialist_name || `${unit.title} Specialist`,
          points: unit.points?.toLocaleString() || "0",
          badgeText: unit.is_certified ? 'Certified' : 'Text',
          isLearned: unit.is_certified || false
        }))
      } catch (error) {
        console.error('Error loading novelty units:', error)
        this.error = 'Failed to load novelty units.'
      } finally {
        this.loading.novelty = false
      }

      try {
        // Load events data for future use
        this.loading.events = true
        const eventsResponse = await eventsAPI.getEvents()
        // Store events if needed in component state
        console.log('Events loaded:', eventsResponse.data)
      } catch (error) {
        console.error('Error loading events:', error)
        this.error = 'Failed to load events.'
      } finally {
        this.loading.events = false
      }
    },
      // Auto-login functionality
    async performAutoLogin() {
      this.authStatus = 'checking'
      try {
        const loginSuccessful = await autoLogin.performAutoLogin()
        if (loginSuccessful) {
          console.log('🎉 Auto-login completed successfully')
          this.authStatus = 'authenticated'
        } else {
          this.authStatus = 'guest'
        }
      } catch (error) {
        console.error('❌ Auto-login error:', error)
        this.authStatus = 'guest'
        // Don't block the app if auto-login fails
      }
    },
    
    // Development helper to reset auto-login (can be called from browser console)
    resetAutoLogin() {
      localStorage.removeItem('auto_login_performed')
      localStorage.removeItem('auth_token')
      console.log('🔄 Auto-login flag and auth token cleared')
    },
  },
  emits: [
    'keep-flames',
    'discover-event', 
    'test-knowledge',
    'unit-click',
    'learn-unit',
    'quiz-unit',
    'see-more',
    'navigate'
  ]
}
</script>

<style scoped>
.playzone-page {
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.playzone-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #FFFFFF;
  padding: 3rem 0 2rem 0; /* Increased from 2rem 0 1rem 0 */
  display: flex;
  justify-content: center;
  width: 100%;
}

.playzone-content {
  flex: 1;
  padding: 0 0 120px 0; /* Added bottom padding for navigation */
  overflow-x: hidden;
}

/* Auth Status Banner */
.auth-status-banner {
  background: linear-gradient(90deg, #e1f5fe, #f3e5f5);
  color: #01579b;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  position: relative;
  z-index: 200;
  border-bottom: 1px solid #b3e5fc;
  transition: all 0.3s ease;
}

.auth-status-text {
  margin: 0;
  font-weight: 500;
}

/* Hero Section */
.hero-section {
  height: 208px;
  background: linear-gradient(to bottom right, #000000, rgba(0, 0, 0, 0));
  background-image: url('/breitling-watch.jpg');
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  display: flex;
  flex-direction: column;
  position: relative;
}

.hero-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.hero-title {
  font-size: 1.875rem;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.2;
  margin: 0;
}

.text-white {
  color: #FDF8E9;
}

.text-yellow {
  color: #FFC72C;
}

.hero-subtitle {
  color: #FDF8E9;  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

/* Section Titles */
.section-title {
  color: #072C54;
  font-size: 1.875rem;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
  padding: 0 2rem;
}

.section-title.standalone {
  margin: 2rem 0 1rem 0;
  text-align: left;
  padding: 0;
}

.section-title.left-aligned {
  text-align: left;
  padding: 0 2rem;
  margin: 2rem 0 1rem 0;
}

/* Challenge Section */
.challenge-section {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.challenge-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  min-height: 2rem;
}

.flame-counter {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.flame-count {
  color: #FFC72C;
  font-size: 1.25rem;
  font-weight: normal;
  line-height: 1;
}

.challenge-button {
  width: auto;
  min-width: 200px;
}

.challenge-button {
  width: 100%;
  background: #FFC72C !important;
  color: #072C54 !important;
  letter-spacing: 0.1em;
}

/* Event Cards */
.event-card {
  height: 180px;
  margin: 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  background: 
    linear-gradient(to bottom right, #000000, rgba(0, 0, 0, 0)),
    url('/breitling-watch.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: local;
  overflow: hidden;
}

.event-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  gap: 1rem;
}

.event-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.event-badge {
  color: #FDF8E9;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
}

.event-title {
  color: #FDF8E9;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
  text-align: left;
}

.event-button {
  border-color: #FDF8E9 !important;
  color: #FDF8E9 !important;
  background: transparent !important;
  align-self: flex-start;
  margin-top: auto;
}

/* Timer bar in event cards */
.event-card .timer-booster-bar {
  width: 100%;
  margin-top: auto;
}

/* Reminder Section */
.reminder-section {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.reminder-header-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.reminder-title-container {
  display: flex;
  align-items: center;
}

.reminder-title {
  color: #072C54;
  font-size: 1.875rem;
  font-weight: bold;
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
  margin: 0;
}

.reminder-timer-container {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.timer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.timer-number {
  color: #09091A;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Italian_Plate_No2', sans-serif;
}

.timer-label {
  color: #09091A;
  font-size: 0.75rem;
  font-weight: normal;
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
}

.reminder-button {
  width: 100%;
  max-width: 300px;
  background: #FFC72C !important;
  color: #072C54 !important;
  letter-spacing: 0.1em;
}

/* Card Sections */
.discovery-section,
.novelty-section {
  margin: 2rem 0;
  padding-top: 10px; /* Added extra padding on top */
}

.cards-container {
  margin-top: 1rem;
  overflow: hidden;
}

.cards-scroll {
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.cards-scroll::-webkit-scrollbar {
  height: 4px;
}

.cards-scroll::-webkit-scrollbar-track {
  background: rgba(7, 44, 84, 0.05);
}

.cards-scroll::-webkit-scrollbar-thumb {
  background: rgba(7, 44, 84, 0.2);
  border-radius: 2px;
}

.see-more-button {
  min-width: 14rem;
  height: 3.5rem;
  border-color: #072C54 !important;
  color: #072C54 !important;
  background: transparent !important;
  flex-shrink: 0;
}

/* Loading and Error States */
.error-message {
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.retry-button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: #b91c1c;
}

.loading-cards {
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
}

.loading-card {
  width: 280px;
  flex-shrink: 0;
}

.loading-placeholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: loading-shimmer 2s infinite;
  border-radius: 12px;
}

@keyframes loading-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .event-title {
    font-size: 1.5rem;
  }
  
  .cards-scroll {
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .challenge-section,
  .reminder-section {
    padding: 0 1rem;
  }
  
  .section-title {
    padding: 0 1rem;
  }
}
</style>
