<template>
  <div class="text-input-vertical-container">
    <!-- Vertical Default View with Image (160px × 128px) -->
    <div 
      v-if="!isCorrectAnswer && !isWrongAnswer && !isSelected"
      class="input-wrapper vertical-default"
      @click="handleClick"
    >
      <!-- Image placeholder (144px × 96px) -->
      <div class="image-container">
        <img 
          class="response-image" 
          :src="imageUrl || 'https://placehold.co/144x96/E5E7EB/9CA3AF?text=Image'" 
          :alt="imageAlt || 'Response Image'"
        />
      </div>
      
      <!-- Response text below image -->
      <div class="text-container">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>

    <!-- Selected Vertical View with Image -->
    <div 
      v-if="isSelected && !isCorrectAnswer && !isWrongAnswer"
      class="input-wrapper vertical-selected"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <div class="image-container">
        <img 
          class="response-image" 
          :src="imageUrl || 'https://placehold.co/144x96/F6E291/D97706?text=Selected'" 
          :alt="imageAlt || 'Response Image'"
        />
      </div>
      
      <!-- Response text below image -->
      <div class="text-container">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>

    <!-- Correct Answer Vertical View with Image and Points -->
    <div 
      v-if="isCorrectAnswer"
      class="input-wrapper vertical-correct"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <div class="image-container">
        <img 
          class="response-image" 
          :src="imageUrl || 'https://placehold.co/144x96/ECFEF2/39A05D?text=Correct'" 
          :alt="imageAlt || 'Response Image'"
        />
      </div>
      
      <!-- Response text -->
      <div class="text-container text-correct">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
      
      <!-- Points display -->
      <div class="points-container">
        + {{ points || '1000' }}
      </div>
    </div>

    <!-- Wrong Answer Vertical View with Image -->
    <div 
      v-if="isWrongAnswer"
      class="input-wrapper vertical-wrong"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <div class="image-container">
        <img 
          class="response-image" 
          :src="imageUrl || 'https://placehold.co/144x96/FFEBE9/B9473B?text=Wrong'" 
          :alt="imageAlt || 'Response Image'"
        />
      </div>
      
      <!-- Response text below image -->
      <div class="text-container text-wrong">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>
    
    <!-- Alternative simple text display (without image) -->
    <div v-if="showSimpleDisplay && !isCorrectAnswer && !isWrongAnswer && !isSelected" 
         class="simple-text-container text-default">
      {{ displayValue || placeholder || 'Response' }}
    </div>

    <!-- Alternative selected simple text display -->
    <div v-if="showSimpleDisplay && isSelected && !isCorrectAnswer && !isWrongAnswer" 
         class="simple-text-container text-default">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>

    <!-- Alternative correct answer simple text display -->
    <div v-if="showSimpleDisplay && isCorrectAnswer" 
         class="simple-text-container text-correct">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>

    <!-- Alternative wrong answer simple text display -->
    <div v-if="showSimpleDisplay && isWrongAnswer" 
         class="simple-text-container text-wrong">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInputVertical',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Response'
    },
    imageUrl: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: 'Response Image'
    },
    displayValue: {
      type: String,
      default: ''
    },
    isCorrectAnswer: {
      type: Boolean,
      default: false
    },
    isWrongAnswer: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    points: {
      type: [String, Number],
      default: '1000'
    },
    showSimpleDisplay: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'select'],
  methods: {
    handleClick() {
      this.$emit('click', this.modelValue);
      this.$emit('select', {
        value: this.modelValue,
        isSelected: !this.isSelected
      });
    }
  }
}
</script>

<style scoped>
/* CSS Custom Properties */
:root {
  --color-primary-blue-100: #072C54;
  --color-secondary-black: #09091A;
  --color-white: #FFFFFF;
  --color-primary-yellow-50: #F6E291;
  --color-functional-success-100: #39A05D;
  --color-functional-success-10: #ECFEF2;
  --color-functional-error-100: #B9473B;
  --color-functional-error-10: #FFEBE9;
}

/* Main Container */
.text-input-vertical-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Base Input Wrapper - 160px × 128px */
.input-wrapper {
  width: 160px;
  height: 128px;
  padding: 8px;
  border-radius: 8px;
  outline: 1px solid;
  outline-offset: -1px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  position: relative;
}

/* Correct Answer - Slightly Taller for Points */
.vertical-correct {
  height: 144px; /* Extra space for points */
}

/* Image Container - 144px × 96px */
.image-container {
  width: 144px;
  height: 96px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
}

.response-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: opacity 0.2s ease;
}

.response-image:hover {
  opacity: 0.9;
}

/* Text Container */
.text-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Italian Plate No2', sans-serif;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 600;
  padding: 0 4px;
  min-height: 20px;
}

/* Points Container */
.points-container {
  width: 100%;
  text-align: center;
  font-family: 'Italian Plate No2', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-functional-success-100);
  margin-top: 4px;
}

/* Text Color Variants */
.text-default {
  color: var(--color-secondary-black);
  font-weight: 600;
}

.text-correct {
  color: var(--color-functional-success-100);
  font-weight: 500;
}

.text-wrong {
  color: var(--color-functional-error-100);
  font-weight: 500;
}

/* Background and Border Variants */
.vertical-default {
  background-color: var(--color-white);
  outline-color: var(--color-primary-blue-100);
}

.vertical-selected {
  background-color: var(--color-primary-yellow-50);
  outline-color: var(--color-primary-blue-100);
}

.vertical-correct {
  background-color: var(--color-functional-success-10);
  outline-color: var(--color-functional-success-100);
}

.vertical-wrong {
  background-color: var(--color-functional-error-10);
  outline-color: var(--color-functional-error-100);
}

/* Hover Effects */
.input-wrapper:hover {
  outline-width: 2px;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.vertical-default:hover {
  outline-color: var(--color-primary-blue-100);
}

.vertical-selected:hover {
  outline-color: var(--color-primary-blue-100);
}

.vertical-correct:hover {
  outline-color: var(--color-functional-success-100);
}

.vertical-wrong:hover {
  outline-color: var(--color-functional-error-100);
}

/* Simple Text Display (without image) */
.simple-text-container {
  font-family: 'Italian Plate No2', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  padding: 8px 0;
}

/* Responsive Design */
@media (max-width: 640px) {
  .input-wrapper {
    width: 100%;
    max-width: 160px;
    margin: 0 auto;
  }
  
  .image-container {
    width: 100%;
    max-width: 144px;
    height: auto;
    min-height: 96px;
  }
  
  .text-input-vertical-container {
    gap: 12px;
  }
}

/* Animation for smooth transitions */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.input-wrapper {
  animation: fadeInScale 0.3s ease-out;
}
</style>

<!-- 
  VERTICAL TEXTINPUT COMPONENT WITH IMAGE - DEFAULT VIEW DESIGN:
  
  DESIGN SPECIFICATIONS:
  ✅ Component Dimensions: 160px width × 128px height (144px for correct variant with points)
  ✅ Image Placeholder: 144px × 96px positioned above text
  ✅ Typography: Italian Plate No2 font family, 16px base size
  ✅ Layout: Vertical structure with image on top, text below
  ✅ Padding: 8px internal padding for optimal spacing
  
  VARIANT STYLING:
  
  DEFAULT VARIANT:
  ✅ Background: White (#FFFFFF)
  ✅ Border: 1px solid blue outline (#072C54)
  ✅ Text: Black color (#09091A), font-weight 600 (semibold)
  ✅ Dimensions: 160px × 128px with 8px padding
  
  SELECTED VARIANT:
  ✅ Background: Yellow (#F6E291)
  ✅ Border: 1px solid blue outline (#072C54)
  ✅ Text: Black color (#09091A), font-weight 600 (semibold)
  ✅ Dimensions: 160px × 128px with 8px padding
  
  CORRECT ANSWER VARIANT:
  ✅ Background: Light green (#ECFEF2)
  ✅ Border: 1px solid green outline (#39A05D)
  ✅ Text: Green color (#39A05D), font-weight 500 (medium)
  ✅ Dimensions: 160px × 144px with 8px padding (extra height for points)
  ✅ Points: Centered at bottom with green color
  
  WRONG ANSWER VARIANT:
  ✅ Background: Light red (#FFEBE9)
  ✅ Border: 1px solid red outline (#B9473B)
  ✅ Text: Red color (#B9473B), font-weight 500 (medium)
  ✅ Dimensions: 160px × 128px with 8px padding
  
  LAYOUT STRUCTURE:
  ┌─────────────────────┐ 160px width
  │  ┌───────────────┐  │
  │  │  IMAGE AREA   │  │ 144px × 96px
  │  │   144×96px    │  │
  │  └───────────────┘  │
  │                     │
  │    Response Text    │ Centered text area
  │                     │
  │   + Points (if      │ Points (correct only)
  │   correct variant)  │
  └─────────────────────┘ 128px height (144px for correct)
  
  COMPONENT FEATURES:
  ✅ Interactive click handling with events
  ✅ Hover effects with smooth transitions
  ✅ Responsive design for mobile compatibility
  ✅ Image placeholder with proper aspect ratio
  ✅ Alternative simple text display mode (without image)
  ✅ Smooth animations and visual feedback
  ✅ Proper accessibility with alt text
  
  USAGE EXAMPLES:
  
  Default Vertical Input:
  <TextInputVertical 
    v-model="responseText" 
    placeholder="Response"
    image-url="https://example.com/image.jpg"
    @click="handleClick"
  />
  
  Selected Vertical Response:
  <TextInputVertical 
    v-model="responseText" 
    :isSelected="true"
    image-url="https://example.com/image.jpg"
  />
  
  Correct Answer Vertical Display:
  <TextInputVertical 
    v-model="responseText" 
    :isCorrectAnswer="true"
    :points="1500"
    image-url="https://example.com/image.jpg"
  />
  
  Wrong Answer Vertical Display:
  <TextInputVertical 
    v-model="responseText" 
    :isWrongAnswer="true"
    image-url="https://example.com/image.jpg"
  />
  
  Simple Text Display (without image):
  <TextInputVertical 
    v-model="responseText" 
    :showSimpleDisplay="true"
  />
  
  PROPS:
  - modelValue: String - The input value
  - placeholder: String - Placeholder text (default: 'Response')
  - imageUrl: String - URL for the image placeholder
  - imageAlt: String - Alt text for the image
  - displayValue: String - Override display value
  - isCorrectAnswer: Boolean - Show as correct answer
  - isWrongAnswer: Boolean - Show as wrong answer  
  - isSelected: Boolean - Show as selected state
  - points: String/Number - Points to display for correct answers
  - showSimpleDisplay: Boolean - Show text-only version without image
  
  EVENTS:
  - @click: Emitted when component is clicked
  - @select: Emitted when component state changes
-->
