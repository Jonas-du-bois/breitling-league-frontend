<template>
  <div class="card-demo-page">
    <header class="demo-header">
      <button class="back-button" @click="$emit('back')">← Back to Navigation</button>
      <h1>🃏 Card Components Demo</h1>
      <p class="demo-description">
        Information cards for displaying course content, quizzes, and modules with interactive features
      </p>
    </header>

    <main class="demo-content">
      <!-- Interactive Card Demo -->
      <NewCardDemo />
      
      <!-- Individual Card Examples -->
      <section class="component-section">
        <h2>🎴 Individual Card Examples</h2>
          <!-- UnitCard Examples -->
        <div class="example-group">
          <h3>UnitCard - Course Units</h3>          <div class="card-grid">
            <UnitCard 
              :unit="{
                id: 'unit-1',
                title: 'Mathematics Fundamentals',
                points: '45',
                totalPoints: '100',
                badgeText: 'Beginner',
                isLearned: false,
                chapterId: 'math-ch1'
              }"
              :isClicked="clickedCards.has('unit-1')"
              @unit-click="handleUnitClick"
              @learn-unit="handleLearnUnit"
              @quiz-unit="handleQuizUnit"
            />
            <UnitCard 
              :unit="{
                id: 'unit-2',
                title: 'Advanced Physics',
                points: '25',
                totalPoints: '100',
                badgeText: 'Intermediate',
                isLearned: false,
                chapterId: 'physics-ch1'
              }"
              :isClicked="clickedCards.has('unit-2')"
              @unit-click="handleUnitClick"
              @learn-unit="handleLearnUnit"
              @quiz-unit="handleQuizUnit"
            />
            <UnitCard 
              :unit="{
                id: 'unit-3',
                title: 'Quantum Mechanics',
                points: '0',
                totalPoints: '100',
                badgeText: 'Advanced',
                isLearned: true,
                chapterId: 'physics-ch2'
              }"
              :isClicked="clickedCards.has('unit-3')"
              @unit-click="handleUnitClick"
              @learn-unit="handleLearnUnit"
              @quiz-unit="handleQuizUnit"
            />
          </div>
        </div>

        <!-- ChapterCard Examples -->
        <div class="example-group">
          <h3>ChapterCard - Course Chapters</h3>
          <div class="card-grid">
            <ChapterCard 
              title="Space Mission Alpha"
              bonus-multiplier="x2"
              :time-left="{ days: '08', hours: '12', minutes: '24' }"
              points-left="45000"
              :show-time="true"
              @toggle-expanded="handleChapterToggle"
            />
            <ChapterCard 
              title="Ocean Explorer"
              bonus-multiplier="x3"
              :time-left="{ days: '12', hours: '06', minutes: '30' }"
              points-left="28800"
              :show-time="true"
              @toggle-expanded="handleChapterToggle"
            />
            <ChapterCard 
              title="Aviation Legend"
              bonus-multiplier="x1.5"
              :time-left="{ days: '0', hours: '00', minutes: '00' }"
              points-left="12000"
              :show-time="false"
              @toggle-expanded="handleChapterToggle"
            />
          </div>
        </div>        <!-- QuestionCard Examples -->
        <div class="example-group">
          <h3>QuestionCard - New Layout with Center Progress Circle</h3>
          <div class="card-grid">
            <QuestionCard 
              current-question="13"
              total-questions="20"
              time-remaining="56"
              :progress-value="65"
              question-text="What is the capital of France?"
              correct-answers="07"
              incorrect-answers="05"
              @answer-selected="handleAnswerSelected"
            />
            <QuestionCard 
              current-question="8"
              total-questions="15"
              time-remaining="42"
              :progress-value="85"
              question-text="Which planet is known as the Red Planet?"
              correct-answers="04"
              incorrect-answers="03"
              @answer-selected="handleAnswerSelected"
            />
            <QuestionCard 
              current-question="5"
              total-questions="10"
              time-remaining="30"
              :progress-value="30"
              question-text="What is 2 + 2?"
              correct-answers="02"
              incorrect-answers="02"
              @answer-selected="handleAnswerSelected"
            />
          </div>
        </div>        <!-- TimerModuleCard Examples -->
        <div class="example-group">
          <h3>TimerModuleCard - Event Modules with Timer</h3>
          <div class="card-grid">
            <TimerModuleCard 
              event-label="New Event"
              event-title="Father's Day"
              button-text="Discover"
              :button-disabled="false"
              :timer="{ days: '08', hours: '21', minutes: '58' }"
              :has-booster="false"
              @event-click="handleTimerModuleClick"
            />
            <TimerModuleCard 
              event-label="Novelty"
              event-title="September 2025"
              button-text="Go to Event"
              :button-disabled="false"
              :timer="{ days: '12', hours: '06', minutes: '30' }"
              :has-booster="true"
              booster-multiplier="x2"
              @event-click="handleTimerModuleClick"
              @booster-click="handleBoosterClick"
            />
            <TimerModuleCard 
              event-label="Limited Time"
              event-title="Flash Sale"
              button-text="Shop Now"
              :button-disabled="true"
              :timer="{ days: '00', hours: '02', minutes: '15' }"
              :has-booster="true"
              booster-multiplier="x3"
              @event-click="handleTimerModuleClick"
              @booster-click="handleBoosterClick"
            />
          </div>
        </div>

        <!-- SpecialistCard Examples -->
        <div class="example-group">
          <h3>SpecialistCard - Specialist Progress</h3>
          <div class="card-grid">
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

        <!-- Interactive Card Builder -->
        <div class="example-group">
          <h3>🔧 Interactive Card Builder</h3>
          <div class="card-builder">
            <div class="builder-controls">
              <h4>Card Configuration</h4>
              <div class="control-group">
                <label>
                  Card Type:
                  <select v-model="builderConfig.type">
                    <option value="unit">Unit Card</option>
                    <option value="chapter">Chapter Card</option>
                  </select>
                </label>
                <label>
                  Title:
                  <input v-model="builderConfig.title" type="text" placeholder="Enter card title">
                </label>                <label v-if="builderConfig.type === 'unit'">
                  Points Left:
                  <input v-model.number="builderConfig.points" type="number" placeholder="Points remaining" min="0" max="100">
                </label>
                <label v-if="builderConfig.type === 'unit'">
                  Badge Text:
                  <input v-model="builderConfig.buttonText" type="text" placeholder="Badge label (e.g., Beginner)">
                </label>
                <label v-if="builderConfig.type === 'unit'">
                  <input v-model="builderConfig.disabled" type="checkbox">
                  Mark as Completed
                </label>
                <label v-if="builderConfig.type === 'chapter'">
                  Bonus Multiplier:
                  <input v-model="builderConfig.bonusMultiplier" type="text" placeholder="e.g., x2">
                </label>
                <label>
                  <input v-model="builderConfig.disabled" type="checkbox"> Disabled
                </label>
              </div>
            </div>
            <div class="builder-preview">
              <h4>Preview</h4>              <div class="preview-container">
                <UnitCard 
                  v-if="builderConfig.type === 'unit'"
                  :unit="{
                    id: 'builder-unit',
                    title: builderConfig.title || 'Custom Unit',
                    points: builderConfig.points?.toString() || '50',
                    totalPoints: '100',
                    badgeText: builderConfig.buttonText || 'Custom',
                    isLearned: builderConfig.disabled || false,
                    chapterId: 'custom-ch1'
                  }"
                  :isClicked="clickedCards.has('builder-unit')"
                  @unit-click="handleCustomUnitClick"
                  @learn-unit="handleCustomLearnUnit"
                  @quiz-unit="handleCustomQuizUnit"
                />
                <ChapterCard 
                  v-else
                  :title="builderConfig.title || 'Custom Chapter'"
                  :bonus-multiplier="builderConfig.bonusMultiplier || 'x1'"
                  :time-left="{ days: '05', hours: '12', minutes: '30' }"
                  points-left="15000"
                  :show-time="true"
                  :disabled="builderConfig.disabled"
                  @toggle-expanded="handleCustomToggle"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Log -->
      <section class="action-log">
        <h3>🎯 Action Log</h3>
        <div class="log-container">
          <div v-for="(action, index) in actionLog" :key="index" class="log-entry">
            <span class="log-time">{{ action.time }}</span>
            <span class="log-type" :class="action.type">{{ action.type }}</span>
            <span class="log-message">{{ action.message }}</span>
          </div>
        </div>        <button class="clear-log-button" @click="clearLog">Clear Log</button>
      </section>

      <!-- Bottom Navigation Demo -->
      <section class="component-section">
        <h2>📱 Bottom Navigation</h2>
        <div class="example-group">
          <h3>BottomNavigation - Tab Navigation</h3>
          <p class="example-description">Interactive bottom navigation with icons and home indicator</p>
          <div class="navigation-demo-container">
            <BottomNavigation 
              :active-tab="activeNavigationTab"
              @navigate="handleNavigationDemo"
            />
          </div>
          <p class="demo-note">Current active tab: <strong>{{ activeNavigationTab }}</strong></p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { UnitCard, ChapterCard, QuestionCard, TimerModuleCard, NewCardDemo, SpecialistCard } from './card'
import BottomNavigation from './bar/BottomNavigation.vue'

export default {
  name: 'CardDemoPage',  components: {
    UnitCard,
    ChapterCard,
    QuestionCard,
    TimerModuleCard,
    NewCardDemo,
    SpecialistCard,
    BottomNavigation
  },
  data() {
    return {
      // Sample data
      sampleQuestions: [
        {
          id: 1,
          text: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2
        },
        {
          id: 2,
          text: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1
        }      ],
      
      // Card builder configuration
      builderConfig: {
        type: 'unit',
        title: '',
        points: 1000,
        buttonText: 'START',
        bonusMultiplier: 'x2',
        disabled: false      },
      
      // Action logging
      actionLog: [],
        // Track clicked cards for overlay display
      clickedCards: new Set(),
      
      // Bottom navigation demo state
      activeNavigationTab: 'playzone'
    }
    },  methods: {
    handleUnitClick(unit) {
      // Toggle the clicked state for overlay display
      if (this.clickedCards.has(unit.id)) {
        this.clickedCards.delete(unit.id);
      } else {
        // Close other overlays first (only one overlay at a time)
        this.clickedCards.clear();
        this.clickedCards.add(unit.id);
      }
      this.logAction('unit', `Unit clicked: ${unit.title} (${unit.points} pts left)`);
    },
    
    handleLearnUnit(unit) {
      this.logAction('unit', `Learn unit: ${unit.title}`);
    },
    
    handleQuizUnit(unit) {
      this.logAction('unit', `Quiz unit: ${unit.title} (${unit.isLearned ? 'Completed' : 'Not ready'})`);
    },
    
    handleChapterToggle(chapterData) {
      this.logAction('chapter', `Chapter ${chapterData.expanded ? 'expanded' : 'collapsed'}: ${chapterData.title}`);
    },
    
    handleAnswerSelected(questionData) {
      this.logAction('question', `Answer selected for question ${questionData.questionId}: Option ${questionData.selectedAnswer + 1}`);
    },
      handleTimerModuleClick() {
      this.logAction('timer', `Timer module event clicked`);
    },
    
    handleBoosterClick() {
      this.logAction('timer', `Booster clicked`);
    },
    
    handleSpecialistClick(specialistData) {
      this.logAction('specialist', `Specialist card clicked: ${specialistData.unitsLearned}/${specialistData.totalUnits} units (${specialistData.progressPercentage}% complete)`);
        },
      handleCustomUnitClick(unit) {
      // Toggle the clicked state for overlay display
      if (this.clickedCards.has(unit.id)) {
        this.clickedCards.delete(unit.id);
      } else {
        // Close other overlays first (only one overlay at a time)
        this.clickedCards.clear();
        this.clickedCards.add(unit.id);
      }
      this.logAction('custom', `Custom unit clicked: ${unit.title}`);
    },
    
    handleCustomLearnUnit(unit) {
      this.logAction('custom', `Custom learn unit: ${unit.title}`);
    },
    
    handleCustomQuizUnit(unit) {
      this.logAction('custom', `Custom quiz unit: ${unit.title}`);
    },
    
    handleCustomToggle(cardData) {
      this.logAction('custom', `Custom chapter toggle: ${cardData.title}`);
    },
    
    logAction(type, message) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      this.actionLog.unshift({ time, type, message });
      
      // Keep only last 25 actions
      if (this.actionLog.length > 25) {
        this.actionLog = this.actionLog.slice(0, 25);
      }
        },
    
    clearLog() {
      this.actionLog = [];
    },
    
    handleNavigationDemo(tab) {
      this.activeNavigationTab = tab;
      this.logAction('navigation', `Navigation tab clicked: ${tab}`);
    },
    
    handleClickOutside(event) {
      // Check if click is outside any unit card
      const unitCards = document.querySelectorAll('.unit-card');
      let clickedInsideCard = false;
      
      unitCards.forEach(card => {
        if (card.contains(event.target)) {
          clickedInsideCard = true;
        }
      });
      
      // Close all overlays if clicked outside
      if (!clickedInsideCard) {
        this.clickedCards.clear();
      }
    },
  },
  mounted() {
    // Add click outside handler to close overlays
    document.addEventListener('click', this.handleClickOutside);
  },

  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>

<style scoped>
.card-demo-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.back-button {
  position: absolute;
  left: 0;
  top: 0;
  background: #072C54;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #0a3a6b;
}

.demo-header h1 {
  font-size: 2.5rem;
  color: #072C54;
  margin-bottom: 10px;
}

.demo-description {
  color: #6c757d;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.component-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.component-section h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.example-group {
  margin-bottom: 40px;
}

.example-group h3 {
  color: #495057;
  margin-bottom: 20px;
  font-size: 1.3rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 8px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.card-builder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
}

.builder-controls h4,
.builder-preview h4 {
  margin-bottom: 15px;
  color: #343a40;
  font-size: 1.1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.control-group label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 500;
  color: #495057;
}

.control-group input,
.control-group select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-family: inherit;
}

.control-group input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 200px;
}

.action-log {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-log h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.log-container {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.log-entry {
  display: flex;
  gap: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-time {
  color: #6c757d;
  font-size: 0.85rem;
  font-weight: 500;
  min-width: 80px;
}

.log-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  min-width: 70px;
  text-align: center;
}

.log-type.unit {
  background: #d1ecf1;
  color: #0c5460;
}

.log-type.chapter {
  background: #d4edda;
  color: #155724;
}

.log-type.question {
  background: #fff3cd;
  color: #856404;
}

.log-type.timer {
  background: #f8d7da;
  color: #721c24;
}

.log-type.custom {
  background: #e2e3e5;
  color: #383d41;
}

.log-message {
  color: #495057;
  font-size: 0.9rem;
  flex: 1;
}

.clear-log-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
}

.clear-log-button:hover {
  background: #c82333;
}

/* Navigation Demo Styling */
.navigation-demo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.example-description {
  color: #6c757d;
  font-size: 0.95rem;
  margin-bottom: 15px;
  font-style: italic;
}

.demo-note {
  color: #495057;
  font-size: 0.9rem;
  margin-top: 15px;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .back-button {
    position: relative;
    margin-bottom: 20px;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .card-builder {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .component-section {
    padding: 20px;
  }
}
</style>
