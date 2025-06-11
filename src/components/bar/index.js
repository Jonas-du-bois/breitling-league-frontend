/**
 * Bar Components - Based on component.txt specifications
 * 
 * Linear components that display progress, navigation, or structured information.
 * Used for headers, footers, progress tracking, and navigation elements.
 */

// ===== NEW BAR COMPONENTS (Based on component.txt) =====

// Header bar with back navigation and page title
export { default as HeaderBar } from './HeaderBar.vue'

// Main navigation bar with icon navigation
export { default as NavBar } from './NavBar.vue'

// Bottom navigation bar with indicator
export { default as BottomBar } from './BottomBar.vue'

// Bottom navigation with tabs and home indicator
export { default as BottomNavigation } from './BottomNavigation.vue'

// Horizontal scrolling category chips
export { default as HorizontalScrollingBar } from './HorizontalScrollingBar.vue'

// Search input bar with icon
export { default as SearchBar } from './SearchBar.vue'

// Timer bar with booster badge
export { default as TimerBoosterBar } from './TimerBoosterBar.vue'

// Demo component showcasing all bar components
export { default as BarDemo } from './BarDemo.vue'

// ===== LEGACY NAVIGATION BARS =====

// Main application navigation bar
// export { default as NavigationBar } from './NavigationBar.vue'

// Bottom footer bar
// export { default as FooterBar } from './FooterBar.vue'

// Sidebar navigation bar
// export { default as SideBar } from './SideBar.vue'

// ===== PROGRESS BARS =====

// Linear progress bar
// export { default as ProgressBar } from './ProgressBar.vue'

// Circular progress bar
// export { default as CircularProgressBar } from './CircularProgressBar.vue'

// Multi-step progress bar
// export { default as StepProgressBar } from './StepProgressBar.vue'

// Quiz progress bar
// export { default as QuizProgressBar } from './QuizProgressBar.vue'

// ===== ACTION BARS =====

// Toolbar with actions
// export { default as ToolBar } from './ToolBar.vue'

// Action bar with buttons
// export { default as ActionBar } from './ActionBar.vue'

// Filter bar
// export { default as FilterBar } from './FilterBar.vue'

// ===== INFORMATION BARS =====

// Notification bar
// export { default as NotificationBar } from './NotificationBar.vue'

// Alert bar
// export { default as AlertBar } from './AlertBar.vue'

// Status bar
// export { default as StatusBar } from './StatusBar.vue'

// Breadcrumb bar
// export { default as BreadcrumbBar } from './BreadcrumbBar.vue'

// ===== QUIZ-SPECIFIC BARS =====

// Quiz timer bar
// export { default as TimerBar } from './TimerBar.vue'

// Score display bar
// export { default as ScoreBar } from './ScoreBar.vue'

/**
 * ===== USAGE EXAMPLES =====
 * 
 * // HeaderBar - Navigation header with back button and title
 * <HeaderBar 
 *   page-title="Settings"
 *   direction="back"
 *   icon-color="black"
 *   @back-click="goBack"
 * />
 * 
 * // NavBar - Main navigation with icons
 * <NavBar 
 *   :active-item="currentSection"
 *   :navigation-items="navItems"
 *   @item-click="handleNavigation"
 * />
 * 
 * // BottomBar - Footer navigation with indicator
 * <BottomBar 
 *   :active-item="activeTab"
 *   :show-indicator="true"
 *   @item-click="switchTab"
 * />
 * 
 * // HorizontalScrollingBar - Category chips
 * <HorizontalScrollingBar 
 *   :categories="categoryList"
 *   :active-category="selectedCategory"
 *   @category-click="selectCategory"
 * />
 * 
 * // SearchBar - Search input with clear functionality
 * <SearchBar 
 *   v-model="searchQuery"
 *   placeholder="Search courses..."
 *   :clearable="true"
 *   @search="performSearch"
 *   @clear="clearSearch"
 * />
 * 
 * // TimerBoosterBar - Countdown timer with booster
 * <TimerBoosterBar 
 *   :timer="{ days: 5, hours: 12, minutes: 30 }"
 *   :has-booster="true"
 *   booster-multiplier="x3"
 *   :auto-update="true"
 *   @booster-click="activateBooster"
 *   @timer-update="updateGameTimer"
 * />
 *  * // BarDemo - Interactive showcase of all bar components
 * <BarDemo />
 */
