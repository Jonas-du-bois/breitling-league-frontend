<template>
  <div class="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Bar Components Demo</h1>
    
    <!-- Header Bar Demo -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">🔝 Header Bar</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm mb-4">
        <HeaderBar 
          :page-title="headerTitle"
          @back-click="handleBackClick"
        />
      </div>
      <div class="flex gap-4 mb-4">
        <input 
          v-model="headerTitle" 
          placeholder="Page Title" 
          class="px-3 py-2 border rounded"
        />
        <button 
          @click="headerTitle = 'Custom Title'"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set Custom Title
        </button>
      </div>
    </section>

    <!-- Navigation Bar Demo -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">🧭 Navigation Bar</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm mb-4">
        <NavBar 
          :active-item="activeNavItem"
          @item-click="handleNavClick"
        />
      </div>
      <div class="flex gap-2 flex-wrap">
        <button 
          v-for="item in navItems" 
          :key="item"
          @click="activeNavItem = item"
          :class="activeNavItem === item ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          class="px-3 py-1 rounded text-sm hover:bg-opacity-80"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <!-- Bottom Bar Demo -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">⬇️ Bottom Bar</h2>
      <div class="bg-gray-100 p-6 rounded-lg shadow-sm mb-4">
        <BottomBar 
          :active-item="activeBottomItem"
          @item-click="handleBottomClick"
        />
      </div>
      <div class="flex gap-2 flex-wrap">
        <button 
          v-for="item in navItems" 
          :key="item"
          @click="activeBottomItem = item"
          :class="activeBottomItem === item ? 'bg-green-500 text-white' : 'bg-gray-200'"
          class="px-3 py-1 rounded text-sm hover:bg-opacity-80"
        >
          {{ item }}
        </button>
      </div>
    </section>

    <!-- Horizontal Scrolling Bar Demo -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">↔️ Horizontal Scrolling Bar</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm mb-4">
        <HorizontalScrollingBar 
          :categories="categories"
          :active-category="activeCategory"
          @category-click="handleCategoryClick"
        />
      </div>
      <div class="flex gap-4 mb-4">
        <input 
          v-model="newCategory" 
          placeholder="New Category" 
          class="px-3 py-2 border rounded"
          @keyup.enter="addCategory"
        />
        <button 
          @click="addCategory"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Category
        </button>
        <button 
          @click="resetCategories"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </section>

    <!-- Search Bar Demo -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">🔍 Search Bar</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm mb-4">
        <SearchBar 
          v-model="searchQuery"
          :placeholder="searchPlaceholder"
          @search="handleSearch"
          @focus="handleSearchFocus"
          @blur="handleSearchBlur"
          @clear="handleSearchClear"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="font-semibold mb-2">Current Search:</h4>
          <p class="text-gray-600">{{ searchQuery || 'No search query' }}</p>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Search Events:</h4>
          <div class="max-h-32 overflow-y-auto">
            <p v-for="(event, index) in searchEvents" :key="index" class="text-sm text-gray-500">
              {{ event }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timer Booster Bar Demo -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">⏱️ Timer Booster Bar</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm mb-4">
        <TimerBoosterBar 
          :timer="timerData"
          :has-booster="showBooster"
          :booster-multiplier="boosterMultiplier"
          :auto-update="autoUpdateTimer"
          @booster-click="handleBoosterClick"
          @timer-update="handleTimerUpdate"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="font-semibold mb-2">Timer Controls:</h4>
          <div class="space-y-2">
            <div class="flex gap-2">
              <label class="w-16 text-sm">Days:</label>
              <input 
                v-model.number="timerData.days" 
                type="number" 
                min="0" 
                class="px-2 py-1 border rounded w-20"
              />
            </div>
            <div class="flex gap-2">
              <label class="w-16 text-sm">Hours:</label>
              <input 
                v-model.number="timerData.hours" 
                type="number" 
                min="0" 
                max="23" 
                class="px-2 py-1 border rounded w-20"
              />
            </div>
            <div class="flex gap-2">
              <label class="w-16 text-sm">Minutes:</label>
              <input 
                v-model.number="timerData.minutes" 
                type="number" 
                min="0" 
                max="59" 
                class="px-2 py-1 border rounded w-20"
              />
            </div>
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-2">Booster Controls:</h4>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                v-model="showBooster" 
                type="checkbox" 
                class="mr-2"
              />
              Show Booster
            </label>
            <div class="flex gap-2">
              <label class="w-20 text-sm">Multiplier:</label>
              <input 
                v-model="boosterMultiplier" 
                class="px-2 py-1 border rounded w-16"
              />
            </div>
            <label class="flex items-center">
              <input 
                v-model="autoUpdateTimer" 
                type="checkbox" 
                class="mr-2"
              />
              Auto Update Timer
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Log -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">📋 Events Log</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="max-h-48 overflow-y-auto">
          <p v-for="(event, index) in eventLog" :key="index" class="text-sm text-gray-600 mb-1">
            {{ event }}
          </p>
          <p v-if="eventLog.length === 0" class="text-gray-400 italic">
            No events yet. Interact with the components above to see events here.
          </p>
        </div>
        <button 
          @click="clearEventLog"
          class="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Log
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue'
import NavBar from './NavBar.vue'
import BottomBar from './BottomBar.vue'
import HorizontalScrollingBar from './HorizontalScrollingBar.vue'
import SearchBar from './SearchBar.vue'
import TimerBoosterBar from './TimerBoosterBar.vue'

export default {
  name: 'BarDemo',
  components: {
    HeaderBar,
    NavBar,
    BottomBar,
    HorizontalScrollingBar,
    SearchBar,
    TimerBoosterBar
  },
  data() {
    return {
      // Header Bar
      headerTitle: 'Demo Page',
      
      // Navigation
      activeNavItem: 'success',
      activeBottomItem: 'playzone',
      navItems: ['success', 'docs', 'playzone', 'news', 'profile'],
      
      // Categories
      categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'],
      activeCategory: 'Category 1',
      newCategory: '',
      
      // Search
      searchQuery: '',
      searchPlaceholder: 'Rechercher',
      searchEvents: [],
      
      // Timer
      timerData: {
        days: 8,
        hours: 12,
        minutes: 24
      },
      showBooster: true,
      boosterMultiplier: 'x2',
      autoUpdateTimer: false,
      
      // Events
      eventLog: []
    }
  },
  methods: {
    // Event handlers
    handleBackClick() {
      this.addEvent('Header: Back button clicked')
    },
    
    handleNavClick(item) {
      this.activeNavItem = item.id
      this.addEvent(`Navigation: Clicked on ${item.label}`)
    },
    
    handleBottomClick(item) {
      this.activeBottomItem = item.id
      this.addEvent(`Bottom Bar: Clicked on ${item.label}`)
    },
    
    handleCategoryClick({ category, index }) {
      this.activeCategory = category
      this.addEvent(`Category: Selected "${category}" at index ${index}`)
    },
    
    handleSearch(query) {
      this.searchEvents.unshift(`Search: "${query}" at ${new Date().toLocaleTimeString()}`)
      if (this.searchEvents.length > 5) this.searchEvents.pop()
      this.addEvent(`Search: Query "${query}"`)
    },
    
    handleSearchFocus() {
      this.addEvent('Search: Input focused')
    },
    
    handleSearchBlur() {
      this.addEvent('Search: Input blurred')
    },
    
    handleSearchClear() {
      this.addEvent('Search: Query cleared')
    },
    
    handleBoosterClick(data) {
      this.addEvent(`Timer: Booster clicked (${data.multiplier})`)
    },
    
    handleTimerUpdate(timer) {
      this.addEvent(`Timer: Updated to ${timer.days}d ${timer.hours}h ${timer.minutes}m`)
    },
    
    // Utility methods
    addCategory() {
      if (this.newCategory.trim()) {
        this.categories.push(this.newCategory.trim())
        this.addEvent(`Category: Added "${this.newCategory.trim()}"`)
        this.newCategory = ''
      }
    },
    
    resetCategories() {
      this.categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4']
      this.activeCategory = 'Category 1'
      this.addEvent('Categories: Reset to default')
    },
    
    addEvent(message) {
      const timestamp = new Date().toLocaleTimeString()
      this.eventLog.unshift(`[${timestamp}] ${message}`)
      if (this.eventLog.length > 50) {
        this.eventLog.pop()
      }
    },
    
    clearEventLog() {
      this.eventLog = []
    }
  }
}
</script>

<style scoped>
/* Demo styling */
section {
  scroll-margin-top: 2rem;
}

h1, h2 {
  font-family: 'Italian_Plate_No2', 'Inter', sans-serif;
}
</style>
