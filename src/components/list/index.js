/**
 * List Components
 * 
 * Components for displaying collections of items in various formats.
 * Essential for showing data sets, navigation menus, and content collections.
 */

// ===== EXISTING LIST COMPONENTS =====

// Chip list for category filtering
export { default as ChipList } from './ChipList.vue'

// Unit list for course units grid
export { default as UnitList } from './UnitList.vue'

// Chapter list for course chapters
export { default as ChapterList } from './ChapterList.vue'

// Complete list group demo
export { default as ListGroup } from './ListGroup.vue'

/**
 * Usage Examples:
 * 
 * import { ChipList, UnitList, ChapterList } from '@/components/list'
 * 
 * <ChipList :chips="categoryChips" @select="selectCategory" />
 * <UnitList :units="courseUnits" />
 * <ChapterList :chapters="courseChapters" />
 */
