<template>
  <div class="component-navigation">
    <header class="navigation-header">
      <h1>🎨 Breitling League - Component Library</h1>
      <p class="subtitle">Interactive demonstration of all Vue.js components</p>
    </header>

    <main class="navigation-content">
      <!-- Component Categories Grid -->
      <div class="categories-grid">
        
        <!-- Bar Components -->
        <div class="category-card">
          <div class="category-icon">🧭</div>
          <h2>Bar Components</h2>
          <p>Navigation bars, search bars, progress indicators, and header components</p>
          <div class="component-count">7 Components</div>
          <button class="demo-button" @click="navigateToDemo('bar')">
            View Bar Components
          </button>
          <div class="component-list">
            <span class="component-tag">HeaderBar</span>
            <span class="component-tag">NavBar</span>
            <span class="component-tag">BottomBar</span>
            <span class="component-tag">SearchBar</span>
            <span class="component-tag">TimerBoosterBar</span>
            <span class="component-tag">HorizontalScrollingBar</span>
            <span class="component-tag">BarDemo</span>
          </div>
        </div>

        <!-- Button Components -->
        <div class="category-card">
          <div class="category-icon">🎯</div>
          <h2>Button Components</h2>
          <p>Interactive buttons with various styles, states, and behaviors</p>
          <div class="component-count">2 Components</div>
          <button class="demo-button" @click="navigateToDemo('button')">
            View Button Components
          </button>
          <div class="component-list">
            <span class="component-tag">OutlineButton</span>
            <span class="component-tag">FilledButton</span>
          </div>
        </div>

        <!-- Card Components -->
        <div class="category-card">
          <div class="category-icon">🃏</div>
          <h2>Card Components</h2>
          <p>Information cards for displaying course content, quizzes, and modules</p>
          <div class="component-count">5 Components</div>
          <button class="demo-button" @click="navigateToDemo('card')">
            View Card Components
          </button>
          <div class="component-list">
            <span class="component-tag">UnitCard</span>
            <span class="component-tag">ChapterCard</span>
            <span class="component-tag">QuestionCard</span>
            <span class="component-tag">TimerModuleCard</span>
            <span class="component-tag">NewCardDemo</span>
          </div>
        </div>

        <!-- Chip Components -->
        <div class="category-card">
          <div class="category-icon">🏷️</div>
          <h2>Chip Components</h2>
          <p>Toggle chips for filters, categories, and selection options</p>
          <div class="component-count">1 Component</div>
          <button class="demo-button" @click="navigateToDemo('chip')">
            View Chip Components
          </button>
          <div class="component-list">
            <span class="component-tag">ToggleChip</span>
          </div>
        </div>

        <!-- Input Components -->
        <div class="category-card">
          <div class="category-icon">📝</div>
          <h2>Input Components</h2>
          <p>Text input fields with various layouts and styling options</p>
          <div class="component-count">3 Component Groups</div>
          <button class="demo-button" @click="navigateToDemo('input')">
            View Input Components
          </button>
          <div class="component-list">
            <span class="component-tag">TextInputGroup</span>
            <span class="component-tag">TextInputVerticalGroup</span>
            <span class="component-tag">TextInputVerticalExactGroup</span>
          </div>
        </div>

        <!-- List Components -->
        <div class="category-card">
          <div class="category-icon">📋</div>
          <h2>List Components</h2>
          <p>Lists for displaying collections of items, categories, and content</p>
          <div class="component-count">4 Components</div>
          <button class="demo-button" @click="navigateToDemo('list')">
            View List Components
          </button>
          <div class="component-list">
            <span class="component-tag">ChipList</span>
            <span class="component-tag">UnitList</span>
            <span class="component-tag">ChapterList</span>
            <span class="component-tag">ListGroup</span>
          </div>
        </div>

        <!-- Table Components -->
        <div class="category-card">
          <div class="category-icon">📊</div>
          <h2>Table Components</h2>
          <p>Data tables for leaderboards, statistics, and structured information</p>
          <div class="component-count">7 Components</div>
          <button class="demo-button" @click="navigateToDemo('table')">
            View Table Components
          </button>
          <div class="component-list">
            <span class="component-tag">DataTable</span>
            <span class="component-tag">TableHeader</span>
            <span class="component-tag">TableBody</span>
            <span class="component-tag">TableRow</span>
            <span class="component-tag">TableRowPlayer</span>
            <span class="component-tag">TableRowCurrentUser</span>
            <span class="component-tag">TableGroup</span>
          </div>
        </div>

        <!-- Special Components -->
        <div class="category-card">
          <div class="category-icon">✨</div>
          <h2>Special Components</h2>
          <p>Unique components for streaks, bonuses, and specialized functionality</p>
          <div class="component-count">6 Components</div>
          <button class="demo-button" @click="navigateToDemo('special')">
            View Special Components
          </button>
          <div class="component-list">
            <span class="component-tag">CarouselSlide</span>
            <span class="component-tag">BonusTicket</span>
            <span class="component-tag">StreakStep</span>
            <span class="component-tag">Streak</span>
            <span class="component-tag">StreakGlobal</span>
            <span class="component-tag">SpecialGroup</span>
          </div>
        </div>        <!-- Utility Components -->
        <div class="category-card">
          <div class="category-icon">🔧</div>
          <h2>Utility Components</h2>
          <p>Testing and utility components for development and debugging</p>
          <div class="component-count">3 Components</div>
          <button class="demo-button" @click="navigateToDemo('utility')">
            View Utility Components
          </button>
          <div class="component-list">
            <span class="component-tag">TailwindTest</span>
            <span class="component-tag">LoginForm</span>
            <span class="component-tag">UserProfile</span>
          </div>
        </div>

        <!-- Interactive Quiz Demo -->
        <div class="category-card quiz-demo-card">
          <div class="category-icon">🎮</div>
          <h2>Interactive Quiz Demo</h2>
          <p>Complete quiz experience with enhanced QuestionCard, progress circles, and review system</p>
          <div class="component-count">Live Demo</div>
          <div class="quiz-demo-buttons">
            <button class="demo-button primary" @click="navigateToQuizStart()">
              🚀 Start Sample Quiz
            </button>
            <button class="demo-button secondary" @click="navigateToQuizReview()">
              📊 View Quiz Review
            </button>
            <button class="demo-button outline" @click="navigateToComponentShowcase()">
              🧩 Component Showcase
            </button>
          </div>
          <div class="component-list">
            <span class="component-tag highlight">Enhanced QuestionCard</span>
            <span class="component-tag highlight">ProgressCircle</span>
            <span class="component-tag highlight">SVGProgressCircle</span>
            <span class="component-tag">QuizPage</span>
            <span class="component-tag">QuizReviewPage</span>
          </div>
        </div>

      </div>

      <!-- Quick Stats -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-number">35+</div>
          <div class="stat-label">Total Components</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">9</div>
          <div class="stat-label">Component Categories</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">100%</div>
          <div class="stat-label">Figma Compliant</div>
        </div>
      </div>

      <!-- Back to Full Demo -->
      <div class="back-section">
        <button class="back-button" @click="navigateToDemo('all')">
          🏠 View Complete Component Showcase
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ComponentNavigation',  methods: {
    navigateToDemo(category) {
      // Emit event to parent component to handle navigation
      this.$emit('navigate', category);
      
      // Alternative: use Vue Router if available
      // this.$router.push(`/demo/${category}`);
      
      // For now, we'll scroll to the relevant section in the main app
      if (category === 'all') {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Find and scroll to the specific section
        const sectionMap = {
          'bar': 'New Bar Components',
          'button': 'Figma Button Components',
          'card': 'UnitCard Components',
          'chip': 'ToggleChip Components',
          'input': 'TextInput Components',
          'list': 'List Components',
          'table': 'Table Components',
          'special': 'Special Components',
          'utility': 'Tailwind CSS Integration'
        };
        
        const sectionTitle = sectionMap[category];
        if (sectionTitle) {
          const element = document.querySelector(`h2:contains("${sectionTitle}")`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    },

    // Quiz demo navigation methods
    navigateToQuizStart() {
      this.$emit('navigate', 'quiz-start');
    },

    navigateToQuizReview() {
      this.$emit('navigate', 'quiz-review');
    },    navigateToComponentShowcase() {
      this.$emit('navigate', 'special');
    }
  }
}
</script>

<style scoped>
.component-navigation {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.navigation-header {
  text-align: center;
  margin-bottom: 50px;
}

.navigation-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #072C54;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.category-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.category-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.category-card p {
  color: #6c757d;
  margin-bottom: 15px;
  line-height: 1.5;
}

.component-count {
  background: #072C54;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 20px;
}

.demo-button {
  width: 100%;
  background: linear-gradient(135deg, #FFC72C 0%, #FFB800 100%);
  color: #072C54;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.demo-button:hover {
  background: linear-gradient(135deg, #FFB800 0%, #FFA500 100%);
  transform: translateY(-1px);
}

.component-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.component-tag {
  background: #f8f9fa;
  color: #495057;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: linear-gradient(135deg, #072C54 0%, #0a3a6b 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

.back-section {
  text-align: center;
}

.back-button {
  background: #072C54;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #0a3a6b;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .navigation-header h1 {
    font-size: 2rem;
  }
  
  .category-card {
    padding: 20px;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
}

/* Quiz Demo Card Specific Styles */
.quiz-demo-card {
  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
  border: 2px solid #FFC72C;
  position: relative;
}

.quiz-demo-card::before {
  content: "🆕";
  position: absolute;
  top: 15px;
  right: 15px;
  background: #FFC72C;
  color: #072C54;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.quiz-demo-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(255, 199, 44, 0.2);
}

.quiz-demo-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.quiz-demo-buttons .demo-button {
  margin-bottom: 0;
}

.quiz-demo-buttons .demo-button.primary {
  background: linear-gradient(135deg, #FFC72C 0%, #FFB800 100%);
  color: #072C54;
  font-weight: 700;
}

.quiz-demo-buttons .demo-button.secondary {
  background: linear-gradient(135deg, #072C54 0%, #0a3a6b 100%);
  color: white;
}

.quiz-demo-buttons .demo-button.outline {
  background: transparent;
  color: #072C54;
  border: 2px solid #072C54;
}

.quiz-demo-buttons .demo-button.outline:hover {
  background: #072C54;
  color: white;
}

.component-tag.highlight {
  background: linear-gradient(135deg, #FFC72C 0%, #FFB800 100%);
  color: #072C54;
  font-weight: 600;
}
</style>
