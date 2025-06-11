<template>
  <div class="component-demo-page">
    <!-- Header -->
    <header class="demo-header">
      <HeaderBar 
        page-title="Component Demo"
        :with-back="true"
        class="demo-nav"
        @back="handleBack"
      />
      
      <div class="hero-section">
        <h1 class="main-title">🃏 Card Components Gallery</h1>
        <p class="subtitle">
          Complete collection of interactive components for the Breitling League application
        </p>
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-number">6</span>
            <span class="stat-label">Components</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">Complete</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">0</span>
            <span class="stat-label">Errors</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="demo-content">
      <!-- Interactive Demo Section -->
      <section class="demo-section">
        <h2 class="section-title">🚀 Interactive Demo</h2>
        <p class="section-description">
          Real-time interactive showcase with dynamic controls and event logging
        </p>
        <div class="interactive-demo">
          <NewCardDemo />
        </div>
      </section>

      <!-- Card Components Gallery -->
      <section class="demo-section">
        <h2 class="section-title">🎴 Component Gallery</h2>
        
        <!-- Quiz Components -->
        <div class="component-category">
          <h3 class="category-title">Quiz & Learning Components</h3>
          
          <!-- Question Cards -->
          <div class="component-group">
            <h4 class="component-title">QuestionCard - Quiz Questions with Timer</h4>
            <div class="cards-grid">
              <QuestionCard 
                :current-question="13"
                :total-questions="20"
                :time-remaining="56"
                question-text="What year did Breitling introduce the Navitimer?"
                :correct-answers="7"
                :incorrect-answers="2"
              />
              <QuestionCard 
                :current-question="5"
                :total-questions="10"
                :time-remaining="30"
                :progress-value="75"
                question-text="Which innovation revolutionized aviation in the 1930s?"
                :correct-answers="3"
                :incorrect-answers="1"
              />
            </div>
          </div>

          <!-- Unit Cards -->
          <div class="component-group">
            <h4 class="component-title">UnitCard - Learning Units</h4>
            <div class="cards-grid">
              <UnitCard 
                :unit="{
                  id: 1,
                  title: 'Aviation History',
                  points: '45\'000',
                  badgeText: 'Learn',
                  isLearned: false
                }"
                @unit-click="handleUnitClick"
                @learn-unit="handleLearnUnit"
                @quiz-unit="handleQuizUnit"
              />
              <UnitCard 
                :unit="{
                  id: 2,
                  title: 'Watch Making',
                  points: '32\'500',
                  badgeText: 'Quiz',
                  isLearned: true
                }"
                @unit-click="handleUnitClick"
                @learn-unit="handleLearnUnit"
                @quiz-unit="handleQuizUnit"
              />
              <UnitCard 
                :unit="{
                  id: 3,
                  title: 'Breitling Legacy',
                  points: '0',
                  badgeText: 'Done',
                  isLearned: true
                }"
                @unit-click="handleUnitClick"
                @learn-unit="handleLearnUnit"
                @quiz-unit="handleQuizUnit"
              />
            </div>
          </div>

          <!-- Chapter Cards -->
          <div class="component-group">
            <h4 class="component-title">ChapterCard - Course Chapters</h4>
            <div class="cards-grid">
              <ChapterCard 
                title="September 2025"
                bonus-multiplier="x2"
                :time-left="{ days: '08', hours: '12', minutes: '24' }"
                points-left="45'000"
                :show-time="true"
                @toggle-expanded="handleChapterToggle"
              />
              <ChapterCard 
                title="Aviation Mastery"
                bonus-multiplier="x3"
                :time-left="{ days: '00', hours: '00', minutes: '00' }"
                points-left="28'800"
                :show-time="false"
                @toggle-expanded="handleChapterToggle"
              />
            </div>
          </div>
        </div>

        <!-- Event & Progress Components -->
        <div class="component-category">
          <h3 class="category-title">Events & Progress Components</h3>
          
          <!-- Timer Module Cards -->
          <div class="component-group">
            <h4 class="component-title">TimerModuleCard - Event Countdown</h4>
            <div class="cards-grid">
              <TimerModuleCard 
                event-label="NEXT EVENT"
                event-title="Father's Day Championship"
                button-text="Join Event"
                :button-disabled="false"
                :timer="{ days: '08', hours: '12', minutes: '24' }"
                :has-booster="true"
                booster-multiplier="x2"
                @event-click="handleEventClick"
              />
              <TimerModuleCard 
                event-label="SPECIAL EVENT"
                event-title="Aviation Week"
                button-text="Register"
                :button-disabled="false"
                :timer="{ days: '02', hours: '06', minutes: '45' }"
                :has-booster="false"
                @event-click="handleEventClick"
              />
            </div>
          </div>

          <!-- Specialist Cards -->
          <div class="component-group">
            <h4 class="component-title">SpecialistCard - Progress Tracking</h4>
            <div class="cards-grid">
              <SpecialistCard 
                :units-learned="7"
                :total-units="15"
                @card-click="handleSpecialistClick"
              />
              <SpecialistCard 
                :units-learned="12"
                :total-units="15"
                @card-click="handleSpecialistClick"
              />
              <SpecialistCard 
                :units-learned="15"
                :total-units="15"
                @card-click="handleSpecialistClick"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Specifications -->
      <section class="demo-section">
        <h2 class="section-title">🔧 Technical Specifications</h2>
        <div class="specs-grid">
          <div class="spec-card">
            <h4>Color Palette</h4>
            <div class="color-palette">
              <div class="color-item">
                <div class="color-swatch" style="background: #FFC72C;"></div>
                <span>#FFC72C</span>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #072C54;"></div>
                <span>#072C54</span>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #39A05D;"></div>
                <span>#39A05D</span>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #B9473B;"></div>
                <span>#B9473B</span>
              </div>
              <div class="color-item">
                <div class="color-swatch" style="background: #FFFFFF; border: 1px solid #ddd;"></div>
                <span>#FFFFFF</span>
              </div>
            </div>
          </div>
          
          <div class="spec-card">
            <h4>Typography</h4>
            <div class="typography-demo">
              <div class="font-sample" style="font-family: 'Italian_Plate_No2'; font-size: 30px; font-weight: 600;">
                Italian Plate No2
              </div>
              <p>Primary font family used across all components</p>
            </div>
          </div>
          
          <div class="spec-card">
            <h4>Dimensions</h4>
            <ul class="dimensions-list">
              <li>QuestionCard: 320px × 176px</li>
              <li>TimerModuleCard: 384px × 240px</li>
              <li>SpecialistCard: 384px × 208px</li>
              <li>UnitCard: 160px × 208px</li>
              <li>ChapterCard: Dynamic height</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Event Log -->
      <section class="demo-section">
        <h2 class="section-title">📝 Event Log</h2>
        <div class="event-log">
          <div v-if="eventLog.length === 0" class="no-events">
            Interact with components above to see events logged here
          </div>
          <div v-else class="events-list">
            <div 
              v-for="(event, index) in eventLog.slice().reverse()" 
              :key="index"
              class="event-item"
            >
              <span class="event-time">{{ event.time }}</span>
              <span class="event-type" :class="event.type">{{ event.type }}</span>
              <span class="event-message">{{ event.message }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import HeaderBar from '../components/bar/HeaderBar.vue'
import { 
  UnitCard, 
  ChapterCard, 
  QuestionCard, 
  TimerModuleCard, 
  SpecialistCard, 
  NewCardDemo 
} from '../components/card'

export default {
  name: 'ComponentDemoPage',
  components: {
    HeaderBar,
    UnitCard,
    ChapterCard,
    QuestionCard,
    TimerModuleCard,
    SpecialistCard,
    NewCardDemo
  },
  data() {
    return {
      eventLog: []
    }
  },
  methods: {
    handleBack() {
      this.$emit('back')
      this.$router.back()
    },
    
    logEvent(type, message) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.push({
        time: timestamp,
        type: type,
        message: message
      })
      
      // Keep only last 20 events
      if (this.eventLog.length > 20) {
        this.eventLog = this.eventLog.slice(-20)
      }
    },
    
    handleUnitClick(unit) {
      this.logEvent('unit', `Unit clicked: ${unit.title}`)
    },
    
    handleLearnUnit(unit) {
      this.logEvent('learn', `Learn started: ${unit.title}`)
    },
    
    handleQuizUnit(unit) {
      this.logEvent('quiz', `Quiz started: ${unit.title}`)
    },
    
    handleChapterToggle(chapter) {
      this.logEvent('chapter', `Chapter ${chapter.expanded ? 'expanded' : 'collapsed'}: ${chapter.title}`)
    },
    
    handleEventClick(event) {
      this.logEvent('event', `Event clicked: ${event.title || 'Event'}`)
    },
    
    handleSpecialistClick(specialist) {
      this.logEvent('specialist', `Specialist progress: ${specialist.unitsLearned}/${specialist.totalUnits} units (${specialist.progressPercentage}%)`)
    }
  },
  emits: ['back']
}
</script>

<style scoped>
.component-demo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.demo-header {
  background: linear-gradient(135deg, #072C54 0%, #0f3a6b 100%);
  color: white;
  padding: 0 0 3rem 0;
  position: relative;
  overflow: hidden;
}

.demo-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  pointer-events: none;
}

.demo-nav {
  position: relative;
  z-index: 10;
  background: transparent;
}

.hero-section {
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #FFC72C, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #FFC72C;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Main Content */
.demo-content {
  padding: 3rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #072C54;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-description {
  color: #64748b;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

/* Interactive Demo */
.interactive-demo {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

/* Component Categories */
.component-category {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FFC72C;
}

.component-group {
  margin-bottom: 2rem;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.component-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
}

/* Technical Specifications */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.spec-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.spec-card h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #072C54;
  margin-bottom: 1rem;
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.color-swatch {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.typography-demo .font-sample {
  margin-bottom: 0.5rem;
}

.dimensions-list {
  list-style: none;
  padding: 0;
}

.dimensions-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  font-family: 'Courier New', monospace;
}

.dimensions-list li:last-child {
  border-bottom: none;
}

/* Event Log */
.event-log {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  max-height: 400px;
  overflow-y: auto;
}

.no-events {
  text-align: center;
  color: #64748b;
  font-style: italic;
  padding: 2rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  border-left: 4px solid #e2e8f0;
  transition: all 0.2s ease;
}

.event-item:hover {
  background: #f1f5f9;
  border-left-color: #FFC72C;
}

.event-time {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #64748b;
  min-width: 80px;
}

.event-type {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 80px;
  text-align: center;
}

.event-type.unit {
  background: #dbeafe;
  color: #1e40af;
}

.event-type.learn {
  background: #dcfce7;
  color: #166534;
}

.event-type.quiz {
  background: #fef3c7;
  color: #92400e;
}

.event-type.chapter {
  background: #e0e7ff;
  color: #3730a3;
}

.event-type.event {
  background: #fce7f3;
  color: #be185d;
}

.event-type.specialist {
  background: #f3e8ff;
  color: #7c2d12;
}

.event-message {
  flex: 1;
  color: #334155;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .stats-bar {
    gap: 1.5rem;
  }
  
  .demo-content {
    padding: 2rem 1rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
  
  .color-palette {
    justify-content: center;
  }
  
  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .event-time,
  .event-type {
    min-width: auto;
  }
}
</style>
