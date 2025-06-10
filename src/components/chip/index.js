/**
 * Chip Components
 * 
 * Small, compact elements that represent information, selections, or actions.
 * Used for filtering, tags, selection states, and compact data display.
 */

// ===== AVAILABLE CHIP COMPONENTS =====

// Toggle chip that changes state on click
export { default as ToggleChip } from './ToggleChip.vue'

// ===== PLACEHOLDER FOR FUTURE COMPONENTS =====
// TODO: Add more chip components as needed:
// - InfoChip: Basic chip for displaying information
// - SelectableChip: Interactive chip that can be selected/deselected  
// - RemovableChip: Chip with close/remove functionality
// - FilterChip: Filter chips for search and filtering interfaces
// - TagChip: Tag chips for categorization
// - UserChip: User avatar chip with profile information
// - StatusChip: Status indicator chip
// - CategoryChip: Category chip for quiz topics
// - DifficultyChip: Difficulty level chip
// - ScoreChip: Score range chip
// - ChipGroup: Container for multiple chips
// - FilterChipGroup: Filter chip group for multiple filters

/**
 * Usage Examples:
 * 
 * import { ToggleChip } from '@/components/chip'
 * 
 * <ToggleChip label="Option" v-model="isToggled" @toggle="handleToggle" />
 */
