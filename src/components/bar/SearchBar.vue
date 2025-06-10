<template>
  <div class="w-80 h-14 p-3 rounded-lg outline outline-2 outline-offset-[-2px] outline-[#76787B] inline-flex justify-between items-center">
    <div class="w-32 flex justify-start items-center gap-3.5">
      <!-- Search Icon -->
      <div class="w-6 h-6 relative overflow-hidden cursor-pointer" @click="handleSearchClick">
        <div class="w-4 h-4 left-[3px] top-[3px] absolute outline outline-2 outline-offset-[-1px] outline-black"></div>
        <div class="w-1 h-1 left-[16.70px] top-[16.70px] absolute outline outline-2 outline-offset-[-1px] outline-black"></div>
      </div>
      
      <!-- Input Field -->
      <input
        v-model="searchValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="flex-1 justify-start text-black text-base font-normal font-['Inter'] bg-transparent border-none outline-none placeholder-gray-500"
        @input="handleInput"
        @keyup.enter="handleEnter"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    
    <!-- Clear Button (optional) -->
    <div 
      v-if="searchValue && clearable"
      class="w-6 h-6 cursor-pointer hover:bg-gray-100 rounded-full flex items-center justify-center"
      @click="clearSearch"
    >
      <div class="w-3 h-3 text-gray-400">×</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'Rechercher'
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'search', 'focus', 'blur', 'clear'],
  data() {
    return {
      searchValue: this.modelValue
    }
  },
  watch: {
    modelValue(newValue) {
      this.searchValue = newValue
    },
    searchValue(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  },
  methods: {
    handleInput(event) {
      this.searchValue = event.target.value
      this.$emit('search', this.searchValue)
    },
    handleEnter() {
      this.$emit('search', this.searchValue)
    },
    handleFocus(event) {
      this.$emit('focus', event)
    },
    handleBlur(event) {
      this.$emit('blur', event)
    },
    handleSearchClick() {
      this.$emit('search', this.searchValue)
    },
    clearSearch() {
      this.searchValue = ''
      this.$emit('clear')
      this.$emit('search', '')
    }
  }
}
</script>

<style scoped>
/* Color system based on component.txt specifications */
.outline-color-secondary-grey-100 {
  outline-color: #76787B;
}

/* Remove input field default styling */
input {
  background: transparent;
  border: none;
  outline: none;
}

input::placeholder {
  color: #6B7280;
  opacity: 1;
}

input:focus {
  outline: none;
}
</style>
