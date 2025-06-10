<template>
  <div class="bar-demo-page">
    <header class="demo-header">
      <button class="back-button" @click="$emit('back')">← Back to Navigation</button>
      <h1>🧭 Bar Components Demo</h1>
      <p class="demo-description">
        Navigation bars, search bars, progress indicators, and header components based on Figma specifications
      </p>
    </header>

    <main class="demo-content">
      <!-- Interactive Bar Demo -->
      <BarDemo />
      
      <!-- Individual Component Examples -->
      <section class="component-section">
        <h2>📐 Individual Component Examples</h2>
        
        <!-- HeaderBar Examples -->
        <div class="example-group">
          <h3>HeaderBar - Navigation Headers</h3>
          <div class="example-row">
            <div class="example-item">
              <h4>Settings Page</h4>
              <HeaderBar 
                page-title="Settings"
                direction="back"
                icon-color="black"
                @back-click="handleBackClick('Settings')"
              />
            </div>
            <div class="example-item">
              <h4>Profile Page</h4>
              <HeaderBar 
                page-title="My Profile"
                direction="back"
                icon-color="primary"
                @back-click="handleBackClick('Profile')"
              />
            </div>
          </div>
        </div>

        <!-- NavBar Examples -->
        <div class="example-group">
          <h3>NavBar - Main Navigation</h3>
          <div class="example-row">
            <div class="example-item">
              <h4>Main Navigation</h4>
              <NavBar 
                :active-item="activeNavItem"
                @item-click="handleNavClick"
              />
            </div>
          </div>
        </div>

        <!-- BottomBar Examples -->
        <div class="example-group">
          <h3>BottomBar - Footer Navigation</h3>
          <div class="example-row">
            <div class="example-item">
              <h4>Bottom Navigation with Indicator</h4>
              <BottomBar 
                :active-item="activeBottomItem"
                :show-indicator="true"
                @item-click="handleBottomClick"
              />
            </div>
          </div>
        </div>

        <!-- SearchBar Examples -->
        <div class="example-group">
          <h3>SearchBar - Search Input</h3>
          <div class="example-row">
            <div class="example-item">
              <h4>Course Search</h4>
              <SearchBar 
                v-model="searchQuery1"
                placeholder="Search courses..."
                :clearable="true"
                @search="handleSearch('courses', $event)"
                @clear="handleClear('courses')"
              />
            </div>
            <div class="example-item">
              <h4>User Search</h4>
              <SearchBar 
                v-model="searchQuery2"
                placeholder="Search users..."
                :clearable="true"
                @search="handleSearch('users', $event)"
                @clear="handleClear('users')"
              />
            </div>
          </div>
        </div>

        <!-- HorizontalScrollingBar Examples -->
        <div class="example-group">
          <h3>HorizontalScrollingBar - Category Chips</h3>
          <div class="example-row">
            <div class="example-item">
              <h4>Course Categories</h4>
              <HorizontalScrollingBar 
                :categories="courseCategories"
                :active-category="activeCourseCategory"
                @category-click="handleCategoryClick"
              />
            </div>
          </div>
        </div>

        <!-- TimerBoosterBar Examples -->
        <div class="example-group">
          <h3>TimerBoosterBar - Timer with Booster</h3>
          <div class="example-row">
            <div class="example-item">
              <h4>Quiz Timer with Booster</h4>
              <TimerBoosterBar 
                :timer="quizTimer"
                :has-booster="true"
                booster-multiplier="x3"
                :auto-update="true"
                @booster-click="handleBoosterClick"
                @timer-update="handleTimerUpdate"
              />
            </div>
            <div class="example-item">
              <h4>Event Countdown</h4>
              <TimerBoosterBar 
                :timer="eventTimer"
                :has-booster="false"
                :auto-update="false"
                @timer-update="handleTimerUpdate"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Event Log -->
      <section class="event-log">
        <h3>🎯 Event Log</h3>
        <div class="log-container">
          <div v-for="(event, index) in eventLog" :key="index" class="log-entry">
            <span class="log-time">{{ event.time }}</span>
            <span class="log-message">{{ event.message }}</span>
          </div>
        </div>
        <button class="clear-log-button" @click="clearLog">Clear Log</button>
      </section>
    </main>
  </div>
</template>

<script>
import { HeaderBar, NavBar, BottomBar, HorizontalScrollingBar, SearchBar, TimerBoosterBar, BarDemo } from './bar'

export default {
  name: 'BarDemoPage',
  components: {
    HeaderBar,
    NavBar,
    BottomBar,
    HorizontalScrollingBar,
    SearchBar,
    TimerBoosterBar,
    BarDemo
  },
  data() {
    return {
      // Navigation states
      activeNavItem: 'success',
      activeBottomItem: 'playzone',
      
      // Search states
      searchQuery1: '',
      searchQuery2: '',
      
      // Category states
      activeCourseCategory: 'mathematics',
      courseCategories: [
        { id: 'mathematics', label: 'Mathematics' },
        { id: 'physics', label: 'Physics' },
        { id: 'chemistry', label: 'Chemistry' },
        { id: 'biology', label: 'Biology' },
        { id: 'history', label: 'History' },
        { id: 'literature', label: 'Literature' }
      ],
      
      // Timer states
      quizTimer: { days: 2, hours: 14, minutes: 37 },
      eventTimer: { days: 5, hours: 8, minutes: 22 },
      
      // Event logging
      eventLog: []
    }
  },
  methods: {
    handleBackClick(page) {
      this.logEvent(`Back button clicked from ${page} page`);
    },
    
    handleNavClick(item) {
      this.activeNavItem = item;
      this.logEvent(`Navigation clicked: ${item}`);
    },
    
    handleBottomClick(item) {
      this.activeBottomItem = item;
      this.logEvent(`Bottom navigation clicked: ${item}`);
    },
    
    handleSearch(type, query) {
      this.logEvent(`Search performed (${type}): "${query}"`);
    },
    
    handleClear(type) {
      this.logEvent(`Search cleared (${type})`);
    },
    
    handleCategoryClick(category) {
      this.activeCourseCategory = category.id;
      this.logEvent(`Category selected: ${category.label}`);
    },
    
    handleBoosterClick() {
      this.logEvent('Booster activated!');
    },
    
    handleTimerUpdate(timer) {
      this.logEvent(`Timer updated: ${timer.days}d ${timer.hours}h ${timer.minutes}m`);
    },
    
    logEvent(message) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      this.eventLog.unshift({ time, message });
      
      // Keep only last 20 events
      if (this.eventLog.length > 20) {
        this.eventLog = this.eventLog.slice(0, 20);
      }
    },
    
    clearLog() {
      this.eventLog = [];
    }
  }
}
</script>

<style scoped>
.bar-demo-page {
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

.example-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.example-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.example-item h4 {
  margin-bottom: 15px;
  color: #343a40;
  font-size: 1rem;
  font-weight: 600;
}

.event-log {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.event-log h3 {
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

.log-message {
  color: #495057;
  font-size: 0.9rem;
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
  
  .example-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .component-section {
    padding: 20px;
  }
}
</style>
