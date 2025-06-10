<template>
  <div class="button-demo-page">
    <header class="demo-header">
      <button class="back-button" @click="$emit('back')">← Back to Navigation</button>
      <h1>🎯 Button Components Demo</h1>
      <p class="demo-description">
        Interactive buttons with various styles, states, and behaviors based on Figma designs
      </p>
    </header>

    <main class="demo-content">
      <!-- Action Stats -->
      <section class="stats-section">
        <div class="stat-card">
          <div class="stat-number">{{ actionStats.totalClicks }}</div>
          <div class="stat-label">Total Clicks</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ actionStats.outlineClicks }}</div>
          <div class="stat-label">Outline Clicks</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ actionStats.filledClicks }}</div>
          <div class="stat-label">Filled Clicks</div>
        </div>
        <div class="stat-card" v-if="actionStats.lastAction">
          <div class="stat-number">{{ actionStats.lastAction }}</div>
          <div class="stat-label">Last Action</div>
        </div>
      </section>

      <!-- Component Examples -->
      <section class="component-section">
        <h2>🎨 Button Examples</h2>
        
        <!-- Basic Buttons -->
        <div class="example-group">
          <h3>Basic Buttons</h3>
          <div class="button-grid">
            <OutlineButton 
              label="Outline Button" 
              @click="handleClick('outline', 'Basic Outline')"
            />
            <FilledButton 
              label="Filled Button" 
              @click="handleClick('filled', 'Basic Filled')"
            />
          </div>
        </div>

        <!-- Button Variants -->
        <div class="example-group">
          <h3>Filled Button Variants</h3>
          <div class="button-grid">
            <FilledButton 
              label="Primary" 
              variant="primary"
              @click="handleClick('filled', 'Primary Variant')"
            />
            <FilledButton 
              label="Secondary" 
              variant="secondary"
              @click="handleClick('filled', 'Secondary Variant')"
            />
            <FilledButton 
              label="Success" 
              variant="success"
              @click="handleClick('filled', 'Success Variant')"
            />
            <FilledButton 
              label="Danger" 
              variant="danger"
              @click="handleClick('filled', 'Danger Variant')"
            />
            <FilledButton 
              label="Warning" 
              variant="warning"
              @click="handleClick('filled', 'Warning Variant')"
            />
          </div>
        </div>

        <!-- Button States -->
        <div class="example-group">
          <h3>Button States</h3>
          <div class="button-grid">
            <OutlineButton 
              label="Normal Outline" 
              @click="handleClick('outline', 'Normal Outline')"
            />
            <OutlineButton 
              label="Disabled Outline" 
              :disabled="true"
            />
            <FilledButton 
              label="Normal Filled" 
              @click="handleClick('filled', 'Normal Filled')"
            />
            <FilledButton 
              label="Disabled Filled" 
              :disabled="true"
            />
          </div>
        </div>

        <!-- Quiz Actions -->
        <div class="example-group">
          <h3>🏆 Breitling League Quiz Actions</h3>
          <div class="button-grid">
            <OutlineButton 
              label="Cancel Quiz" 
              @click="handleClick('outline', 'Cancel Quiz')"
            />
            <FilledButton 
              label="Start Quiz" 
              variant="success"
              @click="handleClick('filled', 'Start Quiz')"
            />
            <FilledButton 
              label="Submit Answer" 
              variant="primary"
              @click="handleClick('filled', 'Submit Answer')"
            />
            <FilledButton 
              label="End Quiz" 
              variant="danger"
              @click="handleClick('filled', 'End Quiz')"
            />
          </div>
        </div>

        <!-- Interactive Section -->
        <div class="example-group">
          <h3>Interactive Testing</h3>
          <div class="interactive-section">
            <div class="control-panel">
              <h4>Button Configuration</h4>
              <div class="controls">
                <label>
                  Button Label:
                  <input v-model="customLabel" type="text" placeholder="Enter button text">
                </label>
                <label>
                  Button Type:
                  <select v-model="customType">
                    <option value="outline">Outline</option>
                    <option value="filled">Filled</option>
                  </select>
                </label>
                <label v-if="customType === 'filled'">
                  Variant:
                  <select v-model="customVariant">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="success">Success</option>
                    <option value="danger">Danger</option>
                    <option value="warning">Warning</option>
                  </select>
                </label>
                <label>
                  <input v-model="customDisabled" type="checkbox"> Disabled
                </label>
              </div>
            </div>
            <div class="preview-panel">
              <h4>Preview</h4>
              <div class="button-preview">
                <OutlineButton 
                  v-if="customType === 'outline'"
                  :label="customLabel || 'Custom Button'"
                  :disabled="customDisabled"
                  @click="handleClick('outline', 'Custom ' + customLabel)"
                />
                <FilledButton 
                  v-else
                  :label="customLabel || 'Custom Button'"
                  :variant="customVariant"
                  :disabled="customDisabled"
                  @click="handleClick('filled', 'Custom ' + customLabel)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Reset Section -->
        <div class="example-group">
          <h3>Actions</h3>
          <div class="button-grid">
            <OutlineButton 
              label="🔄 Reset Stats" 
              @click="resetStats"
            />
            <FilledButton 
              label="📊 Show Stats" 
              variant="primary"
              @click="showStats"
            />
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
        </div>
        <button class="clear-log-button" @click="clearLog">Clear Log</button>
      </section>
    </main>
  </div>
</template>

<script>
import { OutlineButton, FilledButton } from './button'

export default {
  name: 'ButtonDemoPage',
  components: {
    OutlineButton,
    FilledButton
  },
  data() {
    return {
      // Stats tracking
      actionStats: {
        totalClicks: 0,
        outlineClicks: 0,
        filledClicks: 0,
        lastAction: ''
      },
      
      // Custom button configuration
      customLabel: '',
      customType: 'outline',
      customVariant: 'primary',
      customDisabled: false,
      
      // Action logging
      actionLog: []
    }
  },
  methods: {
    handleClick(type, action) {
      // Update stats
      this.actionStats.totalClicks++;
      if (type === 'outline') {
        this.actionStats.outlineClicks++;
      } else {
        this.actionStats.filledClicks++;
      }
      this.actionStats.lastAction = action;
      
      // Log action
      this.logAction(type, action);
    },
    
    logAction(type, message) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      this.actionLog.unshift({ time, type, message });
      
      // Keep only last 30 actions
      if (this.actionLog.length > 30) {
        this.actionLog = this.actionLog.slice(0, 30);
      }
    },
    
    resetStats() {
      this.actionStats = {
        totalClicks: 0,
        outlineClicks: 0,
        filledClicks: 0,
        lastAction: ''
      };
      this.logAction('system', 'Stats reset');
    },
    
    showStats() {
      const stats = `Total: ${this.actionStats.totalClicks}, Outline: ${this.actionStats.outlineClicks}, Filled: ${this.actionStats.filledClicks}`;
      this.logAction('system', `Current stats - ${stats}`);
    },
    
    clearLog() {
      this.actionLog = [];
    }
  }
}
</script>

<style scoped>
.button-demo-page {
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

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #FFC72C 0%, #FFB800 100%);
  color: #072C54;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.8;
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

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  align-items: center;
}

.interactive-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
}

.control-panel h4,
.preview-panel h4 {
  margin-bottom: 15px;
  color: #343a40;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.controls label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 500;
  color: #495057;
}

.controls input,
.controls select {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-family: inherit;
}

.controls input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}

.button-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
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
  min-width: 60px;
  text-align: center;
}

.log-type.outline {
  background: #e9ecef;
  color: #495057;
}

.log-type.filled {
  background: #FFC72C;
  color: #072C54;
}

.log-type.system {
  background: #072C54;
  color: white;
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
  
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .button-grid {
    grid-template-columns: 1fr;
  }
  
  .interactive-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .component-section {
    padding: 20px;
  }
}
</style>
