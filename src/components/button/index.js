/**
 * Button Components
 * 
 * Interactive button components for user actions and form submissions.
 * Based on Figma design system with consistent styling and behavior.
 */

// ===== FIGMA DESIGN BUTTONS =====

// Outline button (empty style from Figma)
export { default as OutlineButton } from './OutlineButton.vue'

// Filled button (filled style from Figma)
export { default as FilledButton } from './FilledButton.vue'

/**
 * Usage Examples:
 * 
 * import { OutlineButton, FilledButton } from '@/components/button'
 * 
 * <OutlineButton label="Cancel" @click="handleCancel" />
 * <FilledButton label="Submit" variant="primary" @click="handleSubmit" />
 */