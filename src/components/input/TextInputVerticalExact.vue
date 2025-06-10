<template>
  <div class="text-input-vertical-exact-container">
    <!-- Input Vertical Status True (Correct Answer) -->
    <div 
      v-if="isCorrectAnswer"
      class="w-40 h-32 p-6 bg-color-functional-success-10 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-functional-success-100 inline-flex justify-center items-center gap-2.5 flex-wrap content-center overflow-hidden"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <img 
        class="w-36 h-24" 
        :src="imageUrl || 'https://placehold.co/143x97'" 
        :alt="imageAlt || 'Response Image'"
      />
      
      <!-- Response text -->
      <div class="flex-1 justify-start text-color-functional-success-100 text-base font-medium font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
      
      <!-- Points display -->
      <div class="justify-start text-color-functional-success-100 text-base font-medium font-['Italian_Plate_No2']">
        + {{ points || '1000' }}
      </div>
    </div>

    <!-- Input Vertical Status False (Wrong Answer) -->
    <div 
      v-if="isWrongAnswer"
      class="w-40 h-32 px-6 py-2.5 bg-color-functional-error-10 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-functional-error-100 inline-flex justify-center items-center gap-2.5 flex-wrap content-center overflow-hidden"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <img 
        class="w-36 h-24" 
        :src="imageUrl || 'https://placehold.co/143x97'" 
        :alt="imageAlt || 'Response Image'"
      />
      
      <!-- Response text -->
      <div class="flex-1 justify-start text-color-functional-error-100 text-base font-medium font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>

    <!-- Input Vertical Status Selected -->
    <div 
      v-if="isSelected && !isCorrectAnswer && !isWrongAnswer"
      class="w-40 h-32 p-6 bg-color-primary-yellow-25 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-primary-blue-100 inline-flex justify-center items-center gap-2.5 flex-wrap content-center overflow-hidden"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <img 
        class="w-36 h-24" 
        :src="imageUrl || 'https://placehold.co/143x97'" 
        :alt="imageAlt || 'Response Image'"
      />
      
      <!-- Response text -->
      <div class="flex-1 justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>

    <!-- Default State (when no other state is active) -->
    <div 
      v-if="!isCorrectAnswer && !isWrongAnswer && !isSelected"
      class="w-40 h-32 p-6 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-color-primary-blue-100 inline-flex justify-center items-center gap-2.5 flex-wrap content-center overflow-hidden"
      @click="handleClick"
    >
      <!-- Image placeholder -->
      <img 
        class="w-36 h-24" 
        :src="imageUrl || 'https://placehold.co/143x97'" 
        :alt="imageAlt || 'Response Image'"
      />
      
      <!-- Response text -->
      <div class="flex-1 justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>

    <!-- Alternative Text-Only Displays -->
    <!-- Correct Answer Text Only -->
    <div v-if="showTextOnly && isCorrectAnswer" 
         class="self-stretch justify-start text-color-functional-success-100 text-base font-medium font-['Italian_Plate_No2']">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>

    <!-- Wrong Answer Text Only -->
    <div v-if="showTextOnly && isWrongAnswer" 
         class="self-stretch justify-start text-color-functional-error-100 text-base font-medium font-['Italian_Plate_No2']">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>

    <!-- Selected Text Only -->
    <div v-if="showTextOnly && isSelected && !isCorrectAnswer && !isWrongAnswer" 
         class="self-stretch justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2']">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInputVerticalExact',
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
    showTextOnly: {
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
/* Exact CSS Custom Properties from input.txt */
:root {
  --color-primary-blue-100: #072C54;
  --color-secondary-black: #09091A;
  --color-white: #FFFFFF;
  --color-primary-yellow-25: #FAF0C7;
  --color-functional-success-100: #39A05D;
  --color-functional-success-10: #ECFEF2;
  --color-functional-error-100: #B9473B;
  --color-functional-error-10: #FFEBE9;
}

.text-input-vertical-exact-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Tailwind Class Implementations */
.w-40 {
  width: 10rem; /* 160px */
}

.h-32 {
  height: 8rem; /* 128px */
}

.p-6 {
  padding: 1.5rem; /* 24px */
}

.px-6 {
  padding-left: 1.5rem; /* 24px */
  padding-right: 1.5rem; /* 24px */
}

.py-2\.5 {
  padding-top: 0.625rem; /* 10px */
  padding-bottom: 0.625rem; /* 10px */
}

.bg-color-functional-success-10 {
  background-color: var(--color-functional-success-10, #ECFEF2);
}

.bg-color-functional-error-10 {
  background-color: var(--color-functional-error-10, #FFEBE9);
}

.bg-color-primary-yellow-25 {
  background-color: var(--color-primary-yellow-25, #FAF0C7);
}

.bg-white {
  background-color: var(--color-white, #FFFFFF);
}

.rounded-lg {
  border-radius: 0.5rem; /* 8px */
}

.outline {
  outline-style: solid;
}

.outline-1 {
  outline-width: 1px;
}

.outline-offset-\[-1px\] {
  outline-offset: -1px;
}

.outline-color-functional-success-100 {
  outline-color: var(--color-functional-success-100, #39A05D);
}

.outline-color-functional-error-100 {
  outline-color: var(--color-functional-error-100, #B9473B);
}

.outline-color-primary-blue-100 {
  outline-color: var(--color-primary-blue-100, #072C54);
}

.inline-flex {
  display: inline-flex;
}

.justify-center {
  justify-content: center;
}

.justify-start {
  justify-content: flex-start;
}

.items-center {
  align-items: center;
}

.gap-2\.5 {
  gap: 0.625rem; /* 10px */
}

.flex-wrap {
  flex-wrap: wrap;
}

.content-center {
  align-content: center;
}

.overflow-hidden {
  overflow: hidden;
}

.flex-1 {
  flex: 1 1 0%;
}

.w-36 {
  width: 9rem; /* 144px */
}

.h-24 {
  height: 6rem; /* 96px */
}

.text-color-functional-success-100 {
  color: var(--color-functional-success-100, #39A05D);
}

.text-color-functional-error-100 {
  color: var(--color-functional-error-100, #B9473B);
}

.text-color-secondary-black {
  color: var(--color-secondary-black, #09091A);
}

.text-base {
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-\[\'Italian_Plate_No2\'\] {
  font-family: 'Italian_Plate_No2', sans-serif;
}

.self-stretch {
  align-self: stretch;
}

/* Image styling */
img {
  border-radius: 4px;
  object-fit: cover;
  transition: opacity 0.2s ease;
}

img:hover {
  opacity: 0.9;
}

/* Hover effects */
.w-40:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Responsive Design */
@media (max-width: 640px) {
  .w-40 {
    width: 100%;
    max-width: 10rem;
  }
  
  .text-input-vertical-exact-container {
    gap: 12px;
  }
  
  .w-36 {
    width: 100%;
    max-width: 9rem;
  }
  
  .h-24 {
    height: auto;
    min-height: 6rem;
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

.w-40 {
  animation: fadeInScale 0.3s ease-out;
  cursor: pointer;
}
</style>

<!-- 
  TEXTINPUT VERTICAL EXACT - BASED ON INPUT.TXT SPECIFICATIONS:
  
  IMPLEMENTATION DETAILS:
  ✅ Three main states exactly as specified in input.txt:
      1. Status True (Correct) - #39A05D colors, #ECFEF2 background, with points
      2. Status False (Wrong) - #B9473B colors, #FFEBE9 background, px-6 py-2.5 padding
      3. Status Selected - #FAF0C7 background, #072C54 outline, #09091A text
  
  KEY DIFFERENCES FROM ORIGINAL:
  ✅ Selected state uses bg-color-primary-yellow-25 (#FAF0C7) instead of yellow-50
  ✅ Wrong answer uses px-6 py-2.5 instead of p-6 padding
  ✅ Points display positioned differently (separate div, not full width)
  ✅ All color values match input.txt exactly
  
  COLOR SPECIFICATIONS:
  - Success: #39A05D (text/outline), #ECFEF2 (background)
  - Error: #B9473B (text/outline), #FFEBE9 (background)  
  - Selected: #072C54 (outline), #09091A (text), #FAF0C7 (background)
  - Default: #072C54 (outline), #09091A (text), #FFFFFF (background)
  
  LAYOUT STRUCTURE (from input.txt):
  ┌─────────────────────┐ 160px (w-40)
  │  ┌───────────────┐  │
  │  │  IMAGE 144×96 │  │ w-36 h-24
  │  └───────────────┘  │
  │  Response Text      │ flex-1
  │  + Points (correct) │ separate div
  └─────────────────────┘ 128px (h-32)
  
  USAGE EXAMPLES:
  
  Correct Answer:
  <TextInputVerticalExact 
    :isCorrectAnswer="true"
    :points="1000"
    v-model="response"
  />
  
  Wrong Answer:
  <TextInputVerticalExact 
    :isWrongAnswer="true"
    v-model="response"
  />
  
  Selected State:
  <TextInputVerticalExact 
    :isSelected="true"
    v-model="response"
  />
  
  Text Only Mode:
  <TextInputVerticalExact 
    :showTextOnly="true"
    :isCorrectAnswer="true"
    v-model="response"
  />
-->
