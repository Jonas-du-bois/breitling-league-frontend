<template>
  <div class="other-demo-page">
    <header class="demo-header">
      <button class="back-button" @click="$emit('back')">← Back to Navigation</button>
      <h1>{{ getPageTitle() }}</h1>
      <p class="demo-description">
        {{ getPageDescription() }}
      </p>
    </header>

    <main class="demo-content">
      <!-- Chip Components Demo -->
      <section v-if="componentType === 'chip'" class="component-section">
        <h2>🏷️ Chip Components</h2>
        
        <div class="example-group">
          <h3>Toggle Chips</h3>
          <div class="chip-grid">
            <ToggleChip 
              label="Mathematics" 
              v-model="chipStates.math"
              @toggle="handleChipToggle('mathematics', $event)"
            />
            <ToggleChip 
              label="Physics" 
              v-model="chipStates.physics"
              @toggle="handleChipToggle('physics', $event)"
            />
            <ToggleChip 
              label="Chemistry" 
              v-model="chipStates.chemistry"
              @toggle="handleChipToggle('chemistry', $event)"
            />
            <ToggleChip 
              label="Biology" 
              v-model="chipStates.biology"
              @toggle="handleChipToggle('biology', $event)"
            />
          </div>
        </div>

        <div class="example-group">
          <h3>Current States</h3>
          <div class="states-display">
            <div v-for="(value, key) in chipStates" :key="key" class="state-item">
              <span class="state-label">{{ key }}:</span>
              <span :class="['state-value', value ? 'active' : 'inactive']">
                {{ value ? 'ON' : 'OFF' }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Input Components Demo -->
      <section v-if="componentType === 'input'" class="component-section">
        <h2>📝 Input Components</h2>
        
        <div class="example-group">
          <h3>Horizontal Text Input Group</h3>
          <TextInputGroup />
        </div>

        <div class="example-group">
          <h3>Vertical Text Input Group</h3>
          <TextInputVerticalGroup />
        </div>

        <div class="example-group">
          <h3>Vertical Exact Text Input Group</h3>
          <TextInputVerticalExactGroup />
        </div>
      </section>

      <!-- List Components Demo -->
      <section v-if="componentType === 'list'" class="component-section">
        <h2>📋 List Components</h2>
        <ListGroup />
      </section>

      <!-- Table Components Demo -->
      <section v-if="componentType === 'table'" class="component-section">
        <h2>📊 Table Components</h2>
        <TableGroup />
      </section>

      <!-- Special Components Demo -->
      <section v-if="componentType === 'special'" class="component-section">
        <h2>✨ Special Components</h2>
        <SpecialGroup />
      </section>

      <!-- Utility Components Demo -->
      <section v-if="componentType === 'utility'" class="component-section">
        <h2>🔧 Utility Components</h2>
        
        <div class="example-group">
          <h3>Tailwind CSS Test</h3>
          <TailwindTest />
        </div>

        <div class="example-group">
          <h3>Authentication Components</h3>
          <div class="auth-demo">
            <div v-if="!authenticated">
              <LoginForm @login-success="handleLoginSuccess" />
            </div>
            <div v-else>
              <UserProfile 
                :initial-user="user"
                @logout="handleLogout"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Testing Section -->
      <section class="interactive-section">
        <h2>🎮 Interactive Testing</h2>
        
        <div class="test-controls">
          <div class="control-group">
            <h4>Test Actions</h4>
            <button class="test-button" @click="runRandomTest">
              🎲 Run Random Test
            </button>
            <button class="test-button" @click="resetAllStates">
              🔄 Reset All States
            </button>
            <button class="test-button" @click="simulateUserInteraction">
              👤 Simulate User Interaction
            </button>
          </div>
          
          <div class="metrics-display">
            <h4>Metrics</h4>
            <div class="metric-item">
              <span>Total Interactions:</span>
              <span class="metric-value">{{ metrics.totalInteractions }}</span>
            </div>
            <div class="metric-item">
              <span>Last Action:</span>
              <span class="metric-value">{{ metrics.lastAction || 'None' }}</span>
            </div>
            <div class="metric-item">
              <span>Component Type:</span>
              <span class="metric-value">{{ componentType }}</span>
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
            <span class="log-type" :class="componentType">{{ componentType }}</span>
            <span class="log-message">{{ action.message }}</span>
          </div>
        </div>
        <button class="clear-log-button" @click="clearLog">Clear Log</button>
      </section>
    </main>
  </div>
</template>

<script>
import { ToggleChip } from './chip'
import { TextInputGroup, TextInputVerticalGroup, TextInputVerticalExactGroup } from './input'
import { ListGroup } from './list'
import { TableGroup } from './table'
import { SpecialGroup } from './special'
import TailwindTest from './TailwindTest.vue'
import LoginForm from './LoginForm.vue'
import UserProfile from './UserProfile.vue'

export default {
  name: 'OtherDemoPage',
  components: {
    ToggleChip,
    TextInputGroup,
    TextInputVerticalGroup,
    TextInputVerticalExactGroup,
    ListGroup,
    TableGroup,
    SpecialGroup,
    TailwindTest,
    LoginForm,
    UserProfile
  },
  props: {
    componentType: {
      type: String,
      required: true,
      validator: value => ['chip', 'input', 'list', 'table', 'special', 'utility'].includes(value)
    }
  },
  data() {
    return {
      // Chip states
      chipStates: {
        math: false,
        physics: true,
        chemistry: false,
        biology: false
      },
      
      // Auth states
      authenticated: false,
      user: null,
      
      // Metrics
      metrics: {
        totalInteractions: 0,
        lastAction: null
      },
      
      // Action logging
      actionLog: []
    }
  },
  methods: {
    getPageTitle() {
      const titles = {
        chip: '🏷️ Chip Components Demo',
        input: '📝 Input Components Demo',
        list: '📋 List Components Demo',
        table: '📊 Table Components Demo',
        special: '✨ Special Components Demo',
        utility: '🔧 Utility Components Demo'
      };
      return titles[this.componentType] || 'Component Demo';
    },
    
    getPageDescription() {
      const descriptions = {
        chip: 'Toggle chips for filters, categories, and selection options with interactive state management',
        input: 'Text input fields with various layouts and styling options for form interactions',
        list: 'Lists for displaying collections of items, categories, and structured content',
        table: 'Data tables for leaderboards, statistics, and structured information display',
        special: 'Unique components for streaks, bonuses, and specialized quiz functionality',
        utility: 'Testing and utility components for development, debugging, and authentication'
      };
      return descriptions[this.componentType] || 'Interactive component demonstrations';
    },
    
    handleChipToggle(chipName, value) {
      this.metrics.totalInteractions++;
      this.metrics.lastAction = `Toggle ${chipName}: ${value ? 'ON' : 'OFF'}`;
      this.logAction(`Chip toggled: ${chipName} = ${value ? 'ON' : 'OFF'}`);
    },
    
    handleLoginSuccess(data) {
      this.authenticated = true;
      this.user = data.user;
      this.metrics.totalInteractions++;
      this.metrics.lastAction = 'User logged in';
      this.logAction('User successfully logged in');
    },
    
    handleLogout() {
      this.authenticated = false;
      this.user = null;
      this.metrics.totalInteractions++;
      this.metrics.lastAction = 'User logged out';
      this.logAction('User logged out');
    },
    
    runRandomTest() {
      const tests = [
        () => {
          const chips = Object.keys(this.chipStates);
          const randomChip = chips[Math.floor(Math.random() * chips.length)];
          this.chipStates[randomChip] = !this.chipStates[randomChip];
          this.logAction(`Random test: Toggled ${randomChip} chip`);
        },
        () => {
          this.logAction('Random test: Simulated component interaction');
        },
        () => {
          this.logAction('Random test: Checked component state');
        }
      ];
      
      const randomTest = tests[Math.floor(Math.random() * tests.length)];
      randomTest();
      this.metrics.totalInteractions++;
      this.metrics.lastAction = 'Random test executed';
    },
    
    resetAllStates() {
      this.chipStates = {
        math: false,
        physics: false,
        chemistry: false,
        biology: false
      };
      this.metrics.totalInteractions++;
      this.metrics.lastAction = 'All states reset';
      this.logAction('All component states reset');
    },
    
    simulateUserInteraction() {
      const interactions = [
        'User clicked on component',
        'User hovered over element',
        'User focused input field',
        'User selected option',
        'User scrolled content'
      ];
      
      const randomInteraction = interactions[Math.floor(Math.random() * interactions.length)];
      this.metrics.totalInteractions++;
      this.metrics.lastAction = randomInteraction;
      this.logAction(`Simulated: ${randomInteraction}`);
    },
    
    logAction(message) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      this.actionLog.unshift({ time, message });
      
      // Keep only last 20 actions
      if (this.actionLog.length > 20) {
        this.actionLog = this.actionLog.slice(0, 20);
      }
    },
    
    clearLog() {
      this.actionLog = [];
    }
  }
}
</script>

<style scoped>
.other-demo-page {
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
  margin-bottom: 30px;
}

.example-group h3 {
  color: #495057;
  margin-bottom: 20px;
  font-size: 1.3rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 8px;
}

.chip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
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

.auth-demo {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.interactive-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.interactive-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.test-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.control-group h4,
.metrics-display h4 {
  margin-bottom: 15px;
  color: #343a40;
  font-size: 1.1rem;
}

.test-button {
  display: block;
  width: 100%;
  background: #FFC72C;
  color: #072C54;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.test-button:hover {
  background: #FFB800;
}

.metric-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.metric-item:last-child {
  border-bottom: none;
}

.metric-value {
  font-weight: 600;
  color: #072C54;
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
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.log-entry {
  display: flex;
  gap: 15px;
  padding: 6px 0;
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
  min-width: 60px;
  text-align: center;
  background: #e9ecef;
  color: #495057;
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

/* Responsive Design */
@media (max-width: 768px) {
  .demo-header h1 {
    font-size: 2rem;
  }
  
  .back-button {
    position: relative;
    margin-bottom: 20px;
  }
  
  .chip-grid {
    grid-template-columns: 1fr;
  }
  
  .states-display {
    grid-template-columns: 1fr;
  }
  
  .test-controls {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .component-section {
    padding: 20px;
  }
}
</style>
