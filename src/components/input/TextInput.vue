<template>
  <div class="text-input-container">
    <!-- Default Interactive Input Field -->
    <div 
      v-if="!isCorrectAnswer && !isWrongAnswer && !isSelected"
      class="input-wrapper w-80 h-12 p-6 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-color-primary-blue-100 inline-flex justify-start items-center gap-2.5 flex-wrap content-center overflow-hidden"
    >
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex-1 justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2'] bg-transparent border-none outline-none"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <!-- Selected Variant -->
    <div 
      v-if="isSelected && !isCorrectAnswer && !isWrongAnswer"
      class="w-80 h-12 p-6 bg-color-primary-yellow-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-primary-blue-100 inline-flex justify-start items-center gap-2.5 flex-wrap content-center overflow-hidden"
    >
      <div class="flex-1 justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>

    <!-- Correct Answer Variant with Points -->
    <div 
      v-if="isCorrectAnswer"
      class="w-80 h-12 p-6 bg-color-functional-success-10 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-functional-success-100 inline-flex justify-start items-center gap-2.5 flex-wrap content-center overflow-hidden"
    >
      <div class="flex-1 justify-start text-color-functional-success-100 text-base font-medium font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
      <div class="justify-start text-color-functional-success-100 text-base font-medium font-['Italian_Plate_No2']">
        + {{ points || '1000' }}
      </div>
    </div>

    <!-- Wrong Answer Variant -->
    <div 
      v-if="isWrongAnswer"
      class="w-80 h-12 p-6 bg-color-functional-error-10 rounded-lg outline outline-1 outline-offset-[-1px] outline-color-functional-error-100 inline-flex justify-start items-center gap-2.5 flex-wrap content-center overflow-hidden"
    >
      <div class="flex-1 justify-start text-color-functional-error-100 text-base font-medium font-['Italian_Plate_No2']">
        {{ displayValue || modelValue || placeholder || 'Response' }}
      </div>
    </div>
    
    <!-- Alternative display structure (read-only display) -->
    <div v-if="showDisplay && !isCorrectAnswer && !isWrongAnswer && !isSelected" class="self-stretch justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2']">
      {{ displayValue || placeholder || 'Response' }}
    </div>

    <!-- Alternative selected display structure -->
    <div v-if="showDisplay && isSelected && !isCorrectAnswer && !isWrongAnswer" class="self-stretch justify-start text-color-secondary-black text-base font-semibold font-['Italian_Plate_No2']">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>

    <!-- Alternative correct answer display structure -->
    <div v-if="showDisplay && isCorrectAnswer" class="self-stretch justify-start text-color-functional-success-100 text-base font-medium font-['Italian_Plate_No2']">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>

    <!-- Alternative wrong answer display structure -->
    <div v-if="showDisplay && isWrongAnswer" class="self-stretch justify-start text-color-functional-error-100 text-base font-medium font-['Italian_Plate_No2']">
      {{ displayValue || modelValue || placeholder || 'Response' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Response'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showDisplay: {
      type: Boolean,
      default: false
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
    }
  },
  emits: ['update:modelValue', 'input', 'focus', 'blur'],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
    handleFocus(event) {
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.$emit('blur', event);
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

.text-input-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-wrapper {
  transition: outline-color 0.2s ease;
}

.input-wrapper:focus-within {
  outline-color: var(--color-primary-blue-100, #072C54);
  outline-width: 2px;
}

.input-wrapper input {
  width: 100%;
}

.input-wrapper input::placeholder {
  color: rgba(9, 9, 26, 0.6); /* Lighter version of secondary-black */
  opacity: 1;
}

.input-wrapper input:disabled {
  color: rgba(9, 9, 26, 0.4);
  cursor: not-allowed;
}

/* Tailwind equivalent classes converted to CSS */
.w-80 {
  width: 20rem; /* 320px */
}

.h-12 {
  height: 3rem; /* 48px */
}

.p-6 {
  padding: 1.5rem; /* 24px */
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

.outline-color-primary-blue-100 {
  outline-color: var(--color-primary-blue-100, #072C54);
}

.inline-flex {
  display: inline-flex;
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

.text-color-secondary-black {
  color: var(--color-secondary-black, #09091A);
}

.text-base {
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
}

.font-semibold {
  font-weight: 600;
}

.font-\[\'Italian_Plate_No2\'\] {
  font-family: 'Italian_Plate_No2', sans-serif;
}

.bg-color-functional-success-10 {
  background-color: var(--color-functional-success-10, #ECFEF2);
}

.outline-color-functional-success-100 {
  outline-color: var(--color-functional-success-100, #39A05D);
}

.text-color-functional-success-100 {
  color: var(--color-functional-success-100, #39A05D);
}

.bg-color-functional-error-10 {
  background-color: var(--color-functional-error-10, #FFEBE9);
}

.outline-color-functional-error-100 {
  outline-color: var(--color-functional-error-100, #B9473B);
}

.text-color-functional-error-100 {
  color: var(--color-functional-error-100, #B9473B);
}

.bg-color-primary-yellow-50 {
  background-color: var(--color-primary-yellow-50, #F6E291);
}

.font-medium {
  font-weight: 500;
}

.self-stretch {
  align-self: stretch;
}

/* Responsive Design */
@media (max-width: 640px) {
  .w-80 {
    width: 100%; /* Full width on mobile */
    max-width: 20rem;
  }
  
  .text-input-container {
    gap: 12px;
  }
}
</style>

<!-- 
  INPUT COMPONENT WITH FOUR VISUAL VARIANTS - COMPLETED:
  
  WHAT WAS ACCOMPLISHED:
  ✅ Created TextInput component with default "Response" choice styling
  ✅ Added selected variant with yellow background styling
  ✅ Added correct answer variant with green success styling
  ✅ Added wrong answer variant with red error styling
  ✅ Implemented all four styling variants:
      - Default: Blue outline (#072C54), white background, black text (#09091A)
      - Selected: Yellow background (#F6E291), blue outline (#072C54), black text (#09091A) 
      - Correct: Green outline (#39A05D), light green background (#ECFEF2), green text (#39A05D)
      - Wrong: Red outline (#B9473B), light red background (#FFEBE9), red text (#B9473B)
  ✅ Added points display functionality for correct answers
  ✅ Applied text styling with Italian Plate No2 font family
  ✅ Made component interactive with v-model support for Vue 3
  ✅ Added conditional rendering based on isSelected, isCorrectAnswer and isWrongAnswer props
  
  COMPONENT FEATURES:
  ✅ Default "Response" placeholder text as requested
  ✅ Proper Vue 3 composition with modelValue prop and events
  ✅ Selected variant with yellow background highlighting
  ✅ Correct answer variant with points display (+ 1000 format)
  ✅ Wrong answer variant with error styling (no points display)
  ✅ Focus states and disabled functionality for interactive mode
  ✅ Responsive design for mobile compatibility
  ✅ Multiple layout options: interactive input, read-only display, correct/wrong answer display
  
  STYLING IMPLEMENTATION:
  
  DEFAULT VARIANT:
  ✅ Dimensions: 320px width (w-80), 48px height (h-12), 24px padding (p-6)
  ✅ Colors: White background, blue outline (#072C54), black text (#09091A)
  ✅ Typography: Base font size (16px), semibold weight (600), Italian Plate No2 family
  
  SELECTED VARIANT:
  ✅ Dimensions: Same as default (320px × 48px with 24px padding)
  ✅ Colors: Yellow background (#F6E291), blue outline (#072C54), black text (#09091A)
  ✅ Typography: Base font size (16px), semibold weight (600), Italian Plate No2 family
  ✅ Layout: Read-only display of selected response text
  
  CORRECT ANSWER VARIANT:
  ✅ Dimensions: Same as default (320px × 48px with 24px padding)
  ✅ Colors: Light green background (#ECFEF2), green outline (#39A05D), green text (#39A05D)
  ✅ Typography: Base font size (16px), medium weight (500), Italian Plate No2 family
  ✅ Points display: Shows "+ {points}" value (default: + 1000)
  ✅ Layout: Response text with flex-1, points text aligned to right
  
  WRONG ANSWER VARIANT:
  ✅ Dimensions: Same as default (320px × 48px with 24px padding)
  ✅ Colors: Light red background (#FFEBE9), red outline (#B9473B), red text (#B9473B)
  ✅ Typography: Base font size (16px), medium weight (500), Italian Plate No2 family
  ✅ Layout: Response text with flex-1 (no points display)
  
  USAGE EXAMPLES:
  
  Default Input:
  <TextInput 
    v-model="responseText" 
    placeholder="Response" 
    :disabled="false"
    @input="handleInput"
  />
  
  Selected Response:
  <TextInput 
    v-model="responseText" 
    :isSelected="true"
  />
  
  Correct Answer Display:
  <TextInput 
    v-model="responseText" 
    :isCorrectAnswer="true"
    :points="1500"
  />
  
  Wrong Answer Display:
  <TextInput 
    v-model="responseText" 
    :isWrongAnswer="true"
  />
-->
    :points="1000"
    placeholder="Response"
  />
-->
