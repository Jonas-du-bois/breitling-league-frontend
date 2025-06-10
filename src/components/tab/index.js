/**
 * Tab Components
 * 
 * Navigation components that allow switching between different views or content sections.
 * Essential for organizing content and providing clear navigation.
 */

// ===== CORE TAB COMPONENTS =====

// Main tab container
export { default as TabContainer } from './TabContainer.vue'

// Individual tab button
export { default as TabButton } from './TabButton.vue'

// Tab content panel
export { default as TabPanel } from './TabPanel.vue'

// ===== TAB VARIATIONS =====

// Horizontal tab navigation
export { default as HorizontalTabs } from './HorizontalTabs.vue'

// Vertical tab navigation
export { default as VerticalTabs } from './VerticalTabs.vue'

// Pill-style tabs
export { default as PillTabs } from './PillTabs.vue'

// Underlined tabs
export { default as UnderlineTabs } from './UnderlineTabs.vue'

// ===== SPECIALIZED TABS =====

// Icon tabs with icons
export { default as IconTabs } from './IconTabs.vue'

// Scrollable tabs for many options
export { default as ScrollableTabs } from './ScrollableTabs.vue'

// Closeable tabs (like browser tabs)
export { default as CloseableTabs } from './CloseableTabs.vue'

// ===== QUIZ-SPECIFIC TABS =====

// Quiz navigation tabs
export { default as QuizTabs } from './QuizTabs.vue'

// Results section tabs
export { default as ResultsTabs } from './ResultsTabs.vue'

// Dashboard section tabs
export { default as DashboardTabs } from './DashboardTabs.vue'

// ===== TAB UTILITIES =====

// Tab indicator for active state
export { default as TabIndicator } from './TabIndicator.vue'

// Tab badge for notifications
export { default as TabBadge } from './TabBadge.vue'

/**
 * Usage Examples:
 * 
 * import { TabContainer, TabButton, TabPanel } from '@/components/tab'
 * 
 * <TabContainer>
 *   <TabButton :active="activeTab === 'quiz'" @click="setActiveTab('quiz')">
 *     Quiz
 *   </TabButton>
 *   <TabPanel :active="activeTab === 'quiz'">
 *     Quiz content here
 *   </TabPanel>
 * </TabContainer>
 */
