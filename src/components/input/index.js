// Input Components Export
// Form input components for user data entry

// Export input components
export { default as TextInput } from './TextInput.vue'
export { default as TextInputGroup } from './TextInputGroup.vue'
export { default as TextInputDemo } from './TextInputDemo.vue'
export { default as TextInputVertical } from './TextInputVertical.vue'
export { default as TextInputVerticalGroup } from './TextInputVerticalGroup.vue'
export { default as TextInputVerticalExact } from './TextInputVerticalExact.vue'
export { default as TextInputVerticalExactGroup } from './TextInputVerticalExactGroup.vue'

// Future components to be added:
// export { default as SelectInput } from './SelectInput.vue'
// export { default as CheckboxInput } from './CheckboxInput.vue'
// export { default as RadioInput } from './RadioInput.vue'
// export { default as FileUpload } from './FileUpload.vue'
// export { default as SearchInput } from './SearchInput.vue'

export default {
  TextInput: () => import('./TextInput.vue'),
  TextInputGroup: () => import('./TextInputGroup.vue'),
  TextInputDemo: () => import('./TextInputDemo.vue'),
  TextInputVertical: () => import('./TextInputVertical.vue'),
  TextInputVerticalGroup: () => import('./TextInputVerticalGroup.vue'),
  TextInputVerticalExact: () => import('./TextInputVerticalExact.vue'),
  TextInputVerticalExactGroup: () => import('./TextInputVerticalExactGroup.vue')
}