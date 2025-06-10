/**
 * Special Components
 * 
 * Unique, complex, or application-specific components that don't fit into standard categories.
 * These are often custom-built components for specific features or advanced functionality.
 */

// ===== EXISTING SPECIAL COMPONENTS =====

// Carousel slide component with prize information
export { default as CarouselSlide } from './CarouselSlide.vue'

// Bonus ticket component for streak rewards
export { default as BonusTicket } from './BonusTicket.vue'

// Individual streak step component
export { default as StreakStep } from './StreakStep.vue'

// Streak progress component
export { default as Streak } from './Streak.vue'

// Global streak component with bonus tickets
export { default as StreakGlobal } from './StreakGlobal.vue'

// Progress circle components
export { default as ProgressCircle } from './ProgressCircle.vue'
export { default as SVGProgressCircle } from './SVGProgressCircle.vue'

// Special components demo group
export { default as SpecialGroup } from './SpecialGroup.vue'

/**
 * Usage Examples:
 * 
 * import { CarouselSlide, BonusTicket, Streak, ProgressCircle } from '@/components/special'
 * 
 * <CarouselSlide :prize="prizeData" />
 * <BonusTicket :multiplier="2" :streakCount="5" />
 * <Streak :currentStep="3" :totalSteps="7" />
 * <ProgressCircle :value="75" :animated="true" />
 */
