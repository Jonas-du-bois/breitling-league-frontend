<template>
  <div class="text-input-vertical-group">
    <h2 class="group-title">TextInput Vertical Variants</h2>
    
    <!-- Horizontal Group Container for Vertical Components -->
    <div class="horizontal-group">
      <!-- Default Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Default</h3>
        <TextInputVertical 
          v-model="defaultValue"
          placeholder="Response"
          :image-url="sampleImages.default"
          @click="handleVerticalClick('default', $event)"
        />
      </div>

      <!-- Selected Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Selected</h3>
        <TextInputVertical 
          v-model="selectedValue"
          :isSelected="true"
          :image-url="sampleImages.selected"
        />
      </div>

      <!-- Correct Answer Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Correct</h3>
        <TextInputVertical 
          v-model="correctValue"
          :isCorrectAnswer="true"
          :points="1500"
          :image-url="sampleImages.correct"
        />
      </div>

      <!-- Wrong Answer Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Wrong</h3>
        <TextInputVertical 
          v-model="wrongValue"
          :isWrongAnswer="true"
          :image-url="sampleImages.wrong"
        />
      </div>
    </div>

    <!-- Mobile Responsive Stack (shown only on small screens) -->
    <div class="mobile-stack">
      <!-- Default Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Default</h3>
        <TextInputVertical 
          v-model="defaultValue"
          placeholder="Response"
          :image-url="sampleImages.default"
          @click="handleVerticalClick('default', $event)"
        />
      </div>

      <!-- Selected Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Selected</h3>
        <TextInputVertical 
          v-model="selectedValue"
          :isSelected="true"
          :image-url="sampleImages.selected"
        />
      </div>

      <!-- Correct Answer Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Correct</h3>
        <TextInputVertical 
          v-model="correctValue"
          :isCorrectAnswer="true"
          :points="1500"
          :image-url="sampleImages.correct"
        />
      </div>

      <!-- Wrong Answer Vertical Variant -->
      <div class="variant-container">
        <h3 class="variant-label">Wrong</h3>
        <TextInputVertical 
          v-model="wrongValue"
          :isWrongAnswer="true"
          :image-url="sampleImages.wrong"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextInputVertical from './TextInputVertical.vue'

export default {
  name: 'TextInputVerticalGroup',
  components: {
    TextInputVertical
  },
  data() {
    return {
      defaultValue: '',
      selectedValue: 'My Selected Response',
      correctValue: 'Correct Answer Text',
      wrongValue: 'Wrong Answer Text',
      sampleImages: {
        default: 'https://placehold.co/143x97/e1e5e9/6c757d?text=Default',
        selected: 'https://placehold.co/143x97/F6E291/072C54?text=Selected',
        correct: 'https://placehold.co/143x97/ECFEF2/39A05D?text=Correct',
        wrong: 'https://placehold.co/143x97/FFEBE9/B9473B?text=Wrong'
      }
    }
  },
  methods: {
    handleVerticalClick(type, value) {
      console.log('Vertical input clicked:', { type, value })
    }
  }
}
</script>

<style scoped>
.text-input-vertical-group {
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
  gap: 32px;
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
  gap: 20px;
  padding: 24px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.variant-container:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
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
    gap: 24px;
  }
  
  .variant-container {
    padding: 20px;
  }
}

@media (max-width: 992px) {
  .horizontal-group {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .text-input-vertical-group {
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
    gap: 24px;
  }
  
  .variant-container {
    padding: 16px;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .variant-label {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .text-input-vertical-group {
    padding: 16px;
  }
  
  .group-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
  }
  
  .mobile-stack {
    gap: 20px;
  }
  
  .variant-container {
    padding: 12px;
    max-width: 280px;
  }
}

/* Animation for smooth transitions */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
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
  TEXTINPUT VERTICAL GROUP COMPONENT - HORIZONTAL LAYOUT:
  
  WHAT WAS ACCOMPLISHED:
  ✅ Created TextInputVerticalGroup component to showcase all 4 vertical variants horizontally
  ✅ Implemented responsive design with horizontal layout for desktop/tablet
  ✅ Added mobile-responsive vertical stack for small screens
  ✅ Applied beautiful styling with hover effects and staggered animations
  ✅ Added proper spacing, shadows, and visual hierarchy
  ✅ Included all 4 vertical variants: Default, Selected, Correct Answer, Wrong Answer
  ✅ Added sample images with appropriate colors for each variant
  
  LAYOUT FEATURES:
  ✅ Horizontal flexbox layout for desktop (4 vertical items side by side)
  ✅ Responsive breakpoints for different screen sizes
  ✅ Mobile-first approach with vertical stacking on small screens
  ✅ Hover effects and smooth transitions
  ✅ Staggered animations for visual appeal
  ✅ Card-style containers with shadows and rounded corners
  
  VERTICAL COMPONENT STRUCTURE:
  Each vertical component contains:
  ┌─────────────────────┐
  │                     │
  │    [IMAGE 144×96]   │
  │                     │
  │    Response Text    │
  │   (+ Points if      │
  │    correct)         │
  └─────────────────────┘
  
  STYLING IMPLEMENTATION:
  ✅ Italian Plate No2 font family consistent with other components
  ✅ Color scheme matching the individual component variants
  ✅ Proper spacing and padding for visual balance
  ✅ Background color contrast for better visibility
  ✅ Responsive gap adjustments for different screen sizes
  ✅ Sample placeholder images with variant-specific colors
  
  RESPONSIVE BREAKPOINTS:
  ✅ Desktop (1200px+): 4 columns horizontal with larger gaps
  ✅ Tablet (992px-1200px): 4 columns horizontal with medium gaps
  ✅ Mobile (768px and below): Vertical stack layout
  ✅ Small mobile (480px and below): Compact vertical layout
  
  IMAGE IMPLEMENTATION:
  ✅ Default: Gray placeholder with "Default" text
  ✅ Selected: Yellow background with blue text "Selected"
  ✅ Correct: Green background with green text "Correct"
  ✅ Wrong: Red background with red text "Wrong"
  
  USAGE:
  Import and use this component to display all vertical TextInput variants:
  <TextInputVerticalGroup />
-->
