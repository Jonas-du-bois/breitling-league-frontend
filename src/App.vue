<script>
import LoginForm from './components/LoginForm.vue';
import UserProfile from './components/UserProfile.vue';
import { OutlineButton, FilledButton } from './components/button';
import { ToggleChip } from './components/chip';
import { UnitCard, ChapterCard, QuestionCard, TimerModuleCard, NewCardDemo } from './components/card';
import { HeaderBar, NavBar, BottomBar, HorizontalScrollingBar, SearchBar, TimerBoosterBar, BarDemo } from './components/bar';
import { TextInputGroup, TextInputVerticalGroup, TextInputVerticalExactGroup } from './components/input';
import { ListGroup } from './components/list';
import { TableGroup } from './components/table';
import { SpecialGroup } from './components/special';
import TailwindTest from './components/TailwindTest.vue';

// Import new demo components
import ComponentNavigation from './components/ComponentNavigation.vue';
import BarDemoPage from './components/BarDemoPage.vue';
import ButtonDemoPage from './components/ButtonDemoPage.vue';
import CardDemoPage from './components/CardDemoPage.vue';
import OtherDemoPage from './components/OtherDemoPage.vue';

// Import quiz pages
import QuizPage from './views/QuizPage.vue';
import QuizReviewPage from './views/QuizReviewPage.vue';

export default {  components: {
    LoginForm,
    UserProfile,
    OutlineButton,
    FilledButton,
    ToggleChip,    UnitCard,
    ChapterCard,    QuestionCard,
    TimerModuleCard,
    NewCardDemo,
    HeaderBar,
    NavBar,
    BottomBar,
    HorizontalScrollingBar,
    SearchBar,
    TimerBoosterBar,
    BarDemo,
    TextInputGroup,
    TextInputVerticalGroup,
    TextInputVerticalExactGroup,    ListGroup,
    TableGroup,
    SpecialGroup,
    TailwindTest,    ComponentNavigation,
    BarDemoPage,
    ButtonDemoPage,
    CardDemoPage,
    OtherDemoPage,
    QuizPage,
    QuizReviewPage
  },data() {
    return {
      authenticated: false,
      user: null,
        // Demo navigation state
      currentView: 'navigation', // 'navigation', 'all', 'bar', 'button', 'card', 'chip', 'input', 'list', 'table', 'special', 'utility', 'quiz'
      
      showcaseActions: {
        clicks: 0,
        lastAction: ''
      },      chipToggles: {
        option1: false,
        option2: true,
        option3: false,
        category1: false,
        difficulty: true
      },      sampleUnits: [
        { id: 1, title: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisci', pointsLeft: 450, disabled: false },
        { id: 2, title: 'Advanced Physics Quantum Mechanics', pointsLeft: 320, disabled: false },
        { id: 3, title: 'Organic Chemistry Molecular Structures', pointsLeft: 0, disabled: true },
        { id: 4, title: 'Cellular Biology and Genetics', pointsLeft: 280, disabled: false }
      ]
    };
  },
  created() {
    // Vérifier si un token est déjà stocké
    const token = localStorage.getItem('token');
    if (token) {
      this.authenticated = true;
    }
  },  methods: {
    handleLoginSuccess(data) {
      this.authenticated = true;
      this.user = data.user;
    },    handleLogout() {
      this.authenticated = false;
      this.user = null;
    },
    
    // Demo navigation methods
    handleNavigate(category) {
      this.currentView = category;
    },
    
    handleBackToNavigation() {
      this.currentView = 'navigation';
    },
    
    handleShowcaseClick(action) {
      this.showcaseActions.clicks++;
      this.showcaseActions.lastAction = action;
    },    resetShowcase() {
      this.showcaseActions.clicks = 0;
      this.showcaseActions.lastAction = '';
    },    handleChipToggle(chipName, newValue) {
      this.chipToggles[chipName] = newValue;
      this.handleShowcaseClick(`Toggle ${chipName}: ${newValue ? 'ON' : 'OFF'}`);
    },    handleUnitAction(unitData) {
      this.handleShowcaseClick(`Unit Action: ${unitData.title} (${unitData.pointsLeft} pts)`);
    },    handleChapterDropdown(option) {
      this.handleShowcaseClick(`Chapter Dropdown: ${option.label}`);
    },    handleChapterToggle(data) {
      this.handleShowcaseClick(`Chapter ${data.expanded ? 'Expanded' : 'Collapsed'}: ${data.title}`);
    },
    
    handleChapterToggle(chapterData) {
      this.handleShowcaseClick(`Chapter ${chapterData.expanded ? 'Expanded' : 'Collapsed'}: ${chapterData.title}`);
    },

    // Quiz demo navigation methods
    startSampleQuiz() {
      this.currentView = 'quiz-start';
      this.handleShowcaseClick('Started Sample Quiz Demo');
    },

    viewQuizReview() {
      this.currentView = 'quiz-review';
      this.handleShowcaseClick('Viewed Quiz Review Demo');
    },

    viewComponentShowcase() {
      this.currentView = 'special';
      this.handleShowcaseClick('Viewed Quiz Component Showcase');
    }
  }
}
</script>

<template>
  <div class="app-container">
    <!-- Demo Navigation System -->
    <div v-if="currentView === 'navigation'">
      <ComponentNavigation @navigate="handleNavigate" />
    </div>

    <!-- Individual Demo Pages -->
    <div v-else-if="currentView === 'bar'">
      <BarDemoPage @back="handleBackToNavigation" />
    </div>

    <div v-else-if="currentView === 'button'">
      <ButtonDemoPage @back="handleBackToNavigation" />
    </div>

    <div v-else-if="currentView === 'card'">
      <CardDemoPage @back="handleBackToNavigation" />
    </div>    <div v-else-if="['chip', 'input', 'list', 'table', 'special', 'utility'].includes(currentView)">
      <OtherDemoPage :component-type="currentView" @back="handleBackToNavigation" />
    </div>

    <!-- Quiz Demo Pages -->
    <div v-else-if="currentView === 'quiz'">
      <div class="quiz-demo-container">
        <header class="quiz-demo-header">
          <button class="back-button" @click="handleBackToNavigation">← Back to Navigation</button>
          <h1>🎯 Interactive Quiz Demo</h1>
          <p class="demo-description">
            Complete quiz experience with our enhanced components including progress circles, 
            question cards, and interactive answer selection
          </p>
        </header>
        
        <main class="quiz-demo-content">
          <div class="quiz-demo-options">
            <div class="demo-option" @click="startSampleQuiz">
              <div class="option-icon">🚀</div>
              <h3>Start Sample Quiz</h3>
              <p>Experience a full mathematics quiz with 4 questions</p>
              <button class="demo-button">Launch Quiz</button>
            </div>
            
            <div class="demo-option" @click="viewQuizReview">
              <div class="option-icon">📊</div>
              <h3>Quiz Review Demo</h3>
              <p>See how answers are reviewed with explanations</p>
              <button class="demo-button">View Review</button>
            </div>
            
            <div class="demo-option" @click="viewComponentShowcase">
              <div class="option-icon">🧩</div>
              <h3>Component Showcase</h3>
              <p>Individual components used in the quiz system</p>
              <button class="demo-button">View Components</button>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Quiz Page Demo -->
    <div v-else-if="currentView === 'quiz-start'">
      <QuizPage :quiz-id="1" @back="() => currentView = 'quiz'" />
    </div>

    <!-- Quiz Review Demo -->
    <div v-else-if="currentView === 'quiz-review'">
      <QuizReviewPage :quiz-id="1" @back="() => currentView = 'quiz'" />
    </div>

    <!-- Original Complete Showcase (when 'all' is selected) -->
    <div v-else-if="currentView === 'all'">
      <header class="app-header">
        <button class="back-to-nav-button" @click="handleBackToNavigation">
          ← Back to Component Navigation
        </button>
        <h1>Complete Component Showcase</h1>
        <p class="subtitle">All components displayed together for comparison</p>
      </header>
      <main class="app-content">
      <!-- Tailwind CSS Test Section -->
      <section class="tailwind-test-section">
        <div class="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 class="text-xl font-semibold text-blue-800 mb-2">🎨 Tailwind CSS Integration Test</h2>
          <p class="text-blue-600 mb-4">Complete test of all custom Tailwind classes and ChapterCard styling</p>
          <details class="cursor-pointer">
            <summary class="font-semibold text-blue-700 hover:text-blue-900">Click to expand Tailwind Test Component</summary>
            <div class="mt-4 border-t pt-4">
              <TailwindTest />
            </div>
          </details>
        </div>
      </section>

      <!-- Button Showcase Section -->
      <section class="button-showcase">
        <h2>🎨 Figma Button Components Showcase</h2>
        <p class="showcase-description">
          Interactive demonstration of OutlineButton and FilledButton components created from Figma designs
        </p>
        
        <!-- Showcase Stats -->
        <div class="showcase-stats">
          <span class="stat-item">Total Clicks: {{ showcaseActions.clicks }}</span>
          <span class="stat-item" v-if="showcaseActions.lastAction">
            Last Action: {{ showcaseActions.lastAction }}
          </span>
        </div>

        <!-- Basic Examples -->
        <div class="showcase-section">
          <h3>📋 Basic Examples</h3>
          <div class="button-row">
            <OutlineButton 
              label="Outline Button" 
              @click="handleShowcaseClick('Basic Outline Click')"
            />
            <FilledButton 
              label="Filled Button" 
              @click="handleShowcaseClick('Basic Filled Click')"
            />
          </div>
        </div>

        <!-- Variants -->
        <div class="showcase-section">
          <h3>🎯 Button Variants</h3>
          <div class="button-row">
            <FilledButton 
              label="Primary" 
              variant="primary"
              @click="handleShowcaseClick('Primary Variant')"
            />
            <FilledButton 
              label="Secondary" 
              variant="secondary"
              @click="handleShowcaseClick('Secondary Variant')"
            />
            <FilledButton 
              label="Success" 
              variant="success"
              @click="handleShowcaseClick('Success Variant')"
            />
            <FilledButton 
              label="Danger" 
              variant="danger"
              @click="handleShowcaseClick('Danger Variant')"
            />
            <FilledButton 
              label="Warning" 
              variant="warning"
              @click="handleShowcaseClick('Warning Variant')"
            />
          </div>
        </div>

        <!-- States -->
        <div class="showcase-section">
          <h3>⚡ Button States</h3>
          <div class="button-row">
            <OutlineButton 
              label="Normal Outline" 
              @click="handleShowcaseClick('Normal Outline')"
            />
            <OutlineButton 
              label="Disabled Outline" 
              :disabled="true"
            />
            <FilledButton 
              label="Normal Filled" 
              @click="handleShowcaseClick('Normal Filled')"
            />
            <FilledButton 
              label="Disabled Filled" 
              :disabled="true"
            />
          </div>
        </div>

        <!-- Quiz-Specific Examples -->
        <div class="showcase-section">
          <h3>🏆 Breitling League Quiz Actions</h3>
          <div class="button-row">
            <OutlineButton 
              label="Cancel Quiz" 
              @click="handleShowcaseClick('Cancel Quiz')"
            />
            <FilledButton 
              label="Start Quiz" 
              variant="success"
              @click="handleShowcaseClick('Start Quiz')"
            />
            <FilledButton 
              label="Submit Answer" 
              variant="primary"
              @click="handleShowcaseClick('Submit Answer')"
            />
            <FilledButton 
              label="End Quiz" 
              variant="danger"
              @click="handleShowcaseClick('End Quiz')"
            />
          </div>
        </div>        <!-- Reset Button -->
        <div class="showcase-section">
          <div class="button-row">
            <OutlineButton 
              label="🔄 Reset Showcase Stats" 
              @click="resetShowcase"
            />
          </div>
        </div>
      </section>

      <!-- Chip Showcase Section -->
      <section class="chip-showcase">
        <h2>🎯 ToggleChip Components Showcase</h2>
        <p class="showcase-description">
          Interactive toggle chips with click state changes - perfect for filters, options, and selections
        </p>

        <!-- Basic Toggle Examples -->
        <div class="showcase-section">
          <h3>🔘 Basic Toggle Examples</h3>
          <div class="chip-row">
            <ToggleChip 
              label="Option 1" 
              v-model="chipToggles.option1"
              @toggle="(value) => handleChipToggle('option1', value)"
            />
            <ToggleChip 
              label="Option 2" 
              v-model="chipToggles.option2"
              @toggle="(value) => handleChipToggle('option2', value)"
            />
            <ToggleChip 
              label="Option 3" 
              v-model="chipToggles.option3"
              @toggle="(value) => handleChipToggle('option3', value)"
            />
          </div>
        </div>

        <!-- Quiz-Specific Toggle Examples -->
        <div class="showcase-section">
          <h3>🏆 Quiz Category Filters</h3>
          <div class="chip-row">
            <ToggleChip 
              label="Mathematics" 
              v-model="chipToggles.category1"
              @toggle="(value) => handleChipToggle('category1', value)"
            />
            <ToggleChip 
              label="Easy Level" 
              v-model="chipToggles.difficulty"
              @toggle="(value) => handleChipToggle('difficulty', value)"
            />
          </div>
        </div>

        <!-- Current States Display -->
        <div class="showcase-section">
          <h3>📊 Current Toggle States</h3>
          <div class="states-display">
            <div v-for="(value, key) in chipToggles" :key="key" class="state-item">
              <span class="state-label">{{ key }}:</span>
              <span :class="['state-value', value ? 'active' : 'inactive']">
                {{ value ? 'ON' : 'OFF' }}
              </span>
            </div>
          </div>        </div>
      </section>

      <!-- Unit Card Showcase Section -->
      <section class="card-showcase">
        <h2>🎴 UnitCard Components Showcase</h2>        <p class="showcase-description">
          Unit cards for displaying quiz subjects with points and action buttons
        </p>

        <!-- Individual Examples -->
        <div class="showcase-section">
          <h3>🎯 Individual Examples</h3>
          <div class="unit-cards-row">
            <UnitCard 
              title="Lorem Ipsum Dolor"
              :points-left="100300"
              button-text="Text"
              @action="handleUnitAction"
            />
            <UnitCard 
              title="Quantum Physics Advanced"
              :points-left="0"
              :disabled="true"
              button-text="DONE"
              @action="handleUnitAction"
            />          </div>
        </div>
      </section>

      <!-- Chapter Card Showcase Section -->
      <section class="card-showcase">
        <h2>📚 ChapterCard Components Showcase</h2>
        <p class="showcase-description">
          Chapter cards for displaying course chapters with bonus multipliers and time limits
        </p>        <!-- Chapter Examples -->        <div class="showcase-section">
          <h3>🎯 Chapter Examples</h3>          <div class="chapter-cards-row">            <ChapterCard 
              title="Space Mission Alpha"
              bonus-multiplier="x2"
              :time-left="{ days: '08', hours: '12', minutes: '24' }"
              points-left="45000"
              :show-time="true"
              @toggle-expanded="handleChapterToggle"
            />
            <ChapterCard 
              title="Quantum Physics"
              bonus-multiplier="x3"
              :time-left="{ days: '12', hours: '06', minutes: '30' }"
              points-left="28800"
              :show-time="true"
              @toggle-expanded="handleChapterToggle"
            />
          </div>
          
          <div class="chapter-cards-row" style="margin-top: 1.25rem;">
            <ChapterCard 
              title="Ocean Explorer"
              bonus-multiplier="x1.5"
              :time-left="{ days: '48', hours: '00', minutes: '45' }"
              points-left="9500"
              :show-time="false"
              @toggle-expanded="handleChapterToggle"
            />
            <ChapterCard 
              title="Aviation Legend"
              bonus-multiplier="x2"
              :time-left="{ days: '0', hours: '00', minutes: '00' }"
              points-left="12000"
              :show-time="false"
              @toggle-expanded="handleChapterToggle"
            />
          </div>        </div>
      </section>      <!-- TextInput Group Showcase Section -->
      <section class="input-showcase">
        <h2>📝 TextInput Components Showcase</h2>
        <p class="showcase-description">
          Four visual variants of the TextInput component displayed horizontally
        </p>
        
        <!-- Horizontal Group Display -->
        <div class="showcase-section">
          <h3>🎯 All Four Variants (Horizontal Layout)</h3>
          <TextInputGroup />
        </div>
      </section>

      <!-- TextInput Vertical Group Showcase Section -->
      <section class="input-showcase">
        <h2>📱 TextInput Vertical Components Showcase</h2>
        <p class="showcase-description">
          Four visual variants of the vertical TextInput component with image and text layout
        </p>
          <!-- Vertical Group Display -->
        <div class="showcase-section">
          <h3>📋 All Four Vertical Variants (Image + Text Layout)</h3>
          <TextInputVerticalGroup />
        </div>
      </section>

      <!-- TextInput Vertical Exact Group Showcase Section (from input.txt) -->
      <section class="input-showcase">
        <h2>🎯 TextInput Vertical Exact Components (input.txt Specifications)</h2>
        <p class="showcase-description">
          Exact implementation based on input.txt specifications with precise colors, padding, and layout
        </p>
          <!-- Exact Vertical Group Display -->
        <div class="showcase-section">
          <h3>📐 Exact Variants with Technical Specifications</h3>
          <TextInputVerticalExactGroup />
        </div>
      </section>      <!-- List Components Section -->
      <section class="showcase-section">
        <h2>📋 List Components - Based on component.txt</h2>
        <div class="showcase-section">
          <h3>🏷️ Complete List Components Showcase</h3>
          <ListGroup />
        </div>
      </section>      <!-- Table Components Section -->
      <section class="showcase-section">
        <h2>📊 Table Components - Based on component.txt</h2>
        <div class="showcase-section">
          <h3>🏆 Complete Table Components Showcase</h3>
          <TableGroup />
        </div>
      </section>      <!-- Special Components Section -->
      <section class="showcase-section">
        <h2>✨ Special Components - Based on components.txt</h2>
        <div class="showcase-section">
          <h3>🎯 Complete Special Components Showcase</h3>
          <SpecialGroup />
        </div>
      </section>      <!-- New Card Components Section -->
      <section class="showcase-section">
        <h2>🃏 New Card Components - Based on component.txt</h2>
        <div class="showcase-section">
          <h3>🎮 Interactive Card Components Showcase</h3>
          <NewCardDemo />
        </div>
      </section>

      <!-- New Bar Components Section -->
      <section class="showcase-section">
        <h2>📐 New Bar Components - Based on component.txt</h2>
        <div class="showcase-section">
          <h3>🧭 Interactive Bar Components Showcase</h3>
          <BarDemo />
        </div>
      </section>

      <!-- Original Auth Section -->
      <section class="auth-section">
        <h2>🔐 Authentication System</h2><div v-if="!authenticated">
        <LoginForm @login-success="handleLoginSuccess" />
      </div>
      <div v-else>
        <UserProfile 
          :initial-user="user"
          @logout="handleLogout"        />
      </div>
      </section>
    </main>
    </div>

    <!-- Default fallback -->
    <div v-else>
      <ComponentNavigation @navigate="handleNavigate" />
    </div>
  </div>
</template>

<style>
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-weight: 600;
  font-size: 1.8rem;
}

.app-navigation {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
}

.nav-btn {
  padding: 0.5rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-to-nav-button {
  background: #072C54;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 20px;
  transition: background 0.3s ease;
}

.back-to-nav-button:hover {
  background: #0a3a6b;
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 10px 0;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 14px;
  margin-top: auto;
}

body {
  margin: 0;
  background-color: #f8fafc;
}

/* Button Showcase Styles */
.button-showcase {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.button-showcase h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
}

.showcase-description {
  color: #6c757d;
  margin-bottom: 25px;
  font-size: 16px;
  line-height: 1.5;
}

.showcase-stats {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 25px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  background: #e9ecef;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
}

.showcase-section {
  margin-bottom: 30px;
}

.showcase-section h3 {
  color: #495057;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 8px;
}

.button-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.auth-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.auth-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

/* Chip Showcase Styles */
.chip-showcase {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.chip-showcase h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
}

.chip-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.states-display {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.state-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.state-label {
  font-weight: 500;
  color: #495057;
  text-transform: capitalize;
}

.state-value {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
}

.state-value.active {
  background: #d4edda;
  color: #155724;
}

.state-value.inactive {
  background: #f8d7da;
  color: #721c24;
}

/* Card Showcase Styles */
.card-showcase {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.card-showcase h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
}

.unit-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.unit-cards-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.chapter-cards-row {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

/* Input Showcase Styles */
.input-showcase {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.input-showcase h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
}

.input-showcase h3 {
  color: #34495e;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
}

.input-showcase .showcase-description {
  color: #7f8c8d;
  margin-bottom: 25px;
  font-size: 14px;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .button-row, .chip-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .showcase-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .states-display {
    grid-template-columns: 1fr;
  }
  
  .unit-cards-grid {
    grid-template-columns: 1fr;
  }
    .unit-cards-row {
    flex-direction: column;
  }
  
  .chapter-cards-row {
    flex-direction: column;
    align-items: center;
  }
  
  .app-container {
    padding: 15px;
  }
}

/* Quiz Demo Styles */
.quiz-demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.quiz-demo-header {
  text-align: center;
  margin-bottom: 50px;
}

.quiz-demo-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #072C54;
  margin-bottom: 15px;
}

.demo-description {
  font-size: 1.1rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
}

.quiz-demo-content {
  margin-top: 40px;
}

.quiz-demo-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.demo-option {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
}

.demo-option:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #FFC72C;
}

.option-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.demo-option h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.demo-option p {
  color: #6c757d;
  margin-bottom: 25px;
  line-height: 1.5;
}

.demo-option .demo-button {
  background: linear-gradient(135deg, #FFC72C 0%, #FFB800 100%);
  color: #072C54;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.demo-option .demo-button:hover {
  background: linear-gradient(135deg, #FFB800 0%, #FFA500 100%);
  transform: translateY(-1px);
}

.back-button {
  background: #072C54;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.back-button:hover {
  background: #0a3a6b;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .quiz-demo-options {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .quiz-demo-header h1 {
    font-size: 2rem;
  }
  
  .demo-option {
    padding: 20px;
  }
}
</style>
