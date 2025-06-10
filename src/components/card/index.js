/**
 * Card Components
 * 
 * Container components that group related information in a visually distinct way.
 * Essential for displaying structured content, data, and interactive elements.
 */

// ===== QUIZ-SPECIFIC CARDS =====

// Unit card for quiz units/chapters
export { default as UnitCard } from './UnitCard.vue'

// Chapter card for displaying chapter information with bonus and time
export { default as ChapterCard } from './ChapterCard.vue'

// ===== INTERACTIVE CARDS =====

// Question card for quiz questions with timer and stats
export { default as QuestionCard } from './QuestionCard.vue'

// Timer module card for events with countdown and boosters
export { default as TimerModuleCard } from './TimerModuleCard.vue'

// ===== DEMO COMPONENTS =====

// Demo showcase for new card components
export { default as NewCardDemo } from './NewCardDemo.vue'

/**
 * Usage Examples:
 * 
 * import { UnitCard, ChapterCard, QuestionCard, TimerModuleCard } from '@/components/card'
 * 
 * <UnitCard title="Mathematics" :points-left="450" @action="startUnit" />
 * <ChapterCard 
 *   title="Advanced Physics" 
 *   image-url="/images/physics.jpg"
 *   :bonus-multiplier="3"
 *   :time-left="24"
 *   time-unit="HOURS LEFT"
 *   :points-left="1500"
 * />
 * <QuestionCard
 *   :current-question="13"
 *   :total-questions="20"
 *   :time-remaining="56"
 *   question-text="What is the answer to this question?"
 *   :correct-answers="7"
 *   :incorrect-answers="6"
 * />
 * <TimerModuleCard
 *   event-label="new event"
 *   event-title="Father's day"
 *   button-text="go to event"
 *   :button-disabled="false"
 *   :timer="{ days: '08', hours: '12', minutes: '24' }"
 *   :has-booster="true"
 *   booster-multiplier="x2"
 *   @event-click="handleEventClick"
 * />
 */
