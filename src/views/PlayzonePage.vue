<template>
  <div class="playzone-page">
    <!-- Header -->
    <HeaderBar 
      page-title="Playzone"
      :with-back="false"
      class="playzone-header"
    />    <!-- Main Content -->
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
        <div class="cards-container">
          <div class="cards-scroll">
            <UnitCard
              v-for="unit in discoveryUnits"
              :key="unit.id"
              :unit="unit"
              :is-clicked="false"
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
            <UnitCard
              v-for="unit in noveltyUnits"
              :key="unit.id"
              :unit="unit"
              :is-clicked="false"
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
  },
  mounted() {
    console.log('PlayzonePage mounted successfully!')
  },
  data() {
    return {
      discoveryUnits: [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        }
      ],
      noveltyUnits: [
        {
          id: 4,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 6,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        }
      ]
    }
  },
  methods: {
    handleKeepFlames() {
      this.$emit('keep-flames')
    },
    handleDiscoverEvent(eventType) {
      this.$emit('discover-event', eventType)
    },
    handleTestKnowledge() {
      this.$emit('test-knowledge')
    },
    handleUnitClick(unit) {
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
    },
    handleBottomNavigation(item) {
      this.$emit('navigate', item)
      // Optional: Handle navigation here if needed
      console.log('Bottom navigation clicked:', item)
    }
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
  padding: 2rem 0 1rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

.playzone-content {
  flex: 1;
  padding: 0 0 2rem 0;
  overflow-x: hidden;
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
