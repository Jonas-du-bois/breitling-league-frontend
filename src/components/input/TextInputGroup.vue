<template>
  <div class="text-input-group">
    <h2 class="group-title">TextInput Component Variants</h2>
    
    <!-- Horizontal Group Container -->
    <div class="horizontal-group">
      <!-- Default Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Default</h3>
        <TextInput 
          v-model="defaultValue"
          placeholder="Response"
          @input="handleDefaultInput"
        />
      </div>

      <!-- Selected Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Selected</h3>
        <TextInput 
          v-model="selectedValue"
          :isSelected="true"
        />
      </div>

      <!-- Correct Answer Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Correct</h3>
        <TextInput 
          v-model="correctValue"
          :isCorrectAnswer="true"
          :points="1500"
        />
      </div>

      <!-- Wrong Answer Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Wrong</h3>
        <TextInput 
          v-model="wrongValue"
          :isWrongAnswer="true"
        />
      </div>
    </div>

    <!-- Mobile Responsive Stack (shown only on small screens) -->
    <div class="mobile-stack">
      <!-- Default Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Default</h3>
        <TextInput 
          v-model="defaultValue"
          placeholder="Response"
          @input="handleDefaultInput"
        />
      </div>

      <!-- Selected Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Selected</h3>
        <TextInput 
          v-model="selectedValue"
          :isSelected="true"
        />
      </div>

      <!-- Correct Answer Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Correct</h3>
        <TextInput 
          v-model="correctValue"
          :isCorrectAnswer="true"
          :points="1500"
        />
      </div>

      <!-- Wrong Answer Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Wrong</h3>
        <TextInput 
          v-model="wrongValue"
          :isWrongAnswer="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue'

export default {
  name: 'TextInputGroup',
  components: {
    TextInput
  },
  data() {
    return {
      defaultValue: '',
      selectedValue: 'My Selected Response',
      correctValue: 'Correct Answer Text',
      wrongValue: 'Wrong Answer Text'
    }
  },
  methods: {
    handleDefaultInput(value) {
      console.log('Default input changed:', value)
    }
  }
}
</script>

<style scoped>
.text-input-group {
  padding: 32px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.group-title {
  font-family: 'Italian_Plate_No2', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #072C54;
  text-align: center;
  margin-bottom: 48px;
}

/* Horizontal Layout for Desktop */
.horizontal-group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

/* Hide mobile stack on desktop */
.mobile-stack {
  display: none;
}

.variant-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.variant-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.variant-label {
  font-family: 'Italian_Plate_No2', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #072C54;
  margin: 0;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .horizontal-group {
    gap: 16px;
  }
  
  .variant-container {
    padding: 20px;
  }
}

@media (max-width: 992px) {
  .horizontal-group {
    justify-content: center;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .text-input-group {
    padding: 20px;
  }
  
  .group-title {
    font-size: 1.75rem;
    margin-bottom: 32px;
  }
  
  /* Hide horizontal layout on mobile */
  .horizontal-group {
    display: none;
  }
  
  /* Show mobile stack on small screens */
  .mobile-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .variant-container {
    padding: 16px;
    width: 100%;
  }
  
  .variant-label {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .text-input-group {
    padding: 16px;
  }
  
  .group-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
  
  .mobile-stack {
    gap: 16px;
  }
  
  .variant-container {
    padding: 12px;
  }
}

/* Additional spacing utilities */
.mt-8 {
  margin-top: 2rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

/* Animation for smooth transitions */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.variant-container {
  animation: fadeInUp 0.6s ease-out;
}

.variant-container:nth-child(1) { animation-delay: 0.1s; }
.variant-container:nth-child(2) { animation-delay: 0.2s; }
.variant-container:nth-child(3) { animation-delay: 0.3s; }
.variant-container:nth-child(4) { animation-delay: 0.4s; }
</style>

<!-- 
  TEXTINPUT GROUP COMPONENT - HORIZONTAL LAYOUT:
  
  WHAT WAS ACCOMPLISHED:
  ✅ Created TextInputGroup component to showcase all 4 TextInput variants horizontally
  ✅ Implemented responsive design with horizontal layout for desktop/tablet
  ✅ Added mobile-responsive vertical stack for small screens
  ✅ Applied beautiful styling with hover effects and animations
  ✅ Added proper spacing, shadows, and visual hierarchy
  ✅ Included all 4 variants: Default, Selected, Correct Answer, Wrong Answer
  
  LAYOUT FEATURES:
  ✅ Horizontal flexbox layout for desktop (4 items side by side)
  ✅ Responsive breakpoints for different screen sizes
  ✅ Mobile-first approach with vertical stacking on small screens
  ✅ Hover effects and smooth transitions
  ✅ Staggered animations for visual appeal
  ✅ Card-style containers with shadows and rounded corners
  
  STYLING IMPLEMENTATION:
  ✅ Italian Plate No2 font family consistent with TextInput
  ✅ Color scheme matching the component variants
  ✅ Proper spacing and padding for visual balance
  ✅ Background color contrast for better visibility
  ✅ Responsive gap adjustments for different screen sizes
  
  RESPONSIVE BREAKPOINTS:
  ✅ Desktop (1200px+): 4 columns horizontal with larger gaps
  ✅ Tablet (992px-1200px): 4 columns horizontal with medium gaps
  ✅ Mobile (768px and below): Vertical stack layout
  ✅ Small mobile (480px and below): Compact vertical layout
  
  USAGE:
  Import and use this component to display all TextInput variants:
  <TextInputGroup />
-->
