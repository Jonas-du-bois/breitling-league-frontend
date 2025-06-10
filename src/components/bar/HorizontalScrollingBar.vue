<template>
  <div class="w-96 inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden font-italian-plate">
    <div class="self-stretch px-8 inline-flex justify-start items-center gap-3 overflow-x-auto scrollbar-hide">
      <div 
        v-for="(category, index) in categories" 
        :key="category.id || index"
        :data-status="category.status || 'default'"
        :class="getCategoryClass(category)"
        class="h-11 min-w-11 p-3 outline outline-[1.50px] outline-offset-[-1.50px] outline-[#072C54] flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors whitespace-nowrap"
        @click="handleCategoryClick(category, index)"
      >
        <div class="justify-start text-[#072C54] text-base font-semibold font-['Italian_Plate_No2']">
          {{ category.label || category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalScrollingBar',
  props: {
    categories: {
      type: Array,
      default: () => [
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4'
      ]
    },
    activeCategory: {
      type: [String, Number],
      default: null
    },
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['category-click'],
  methods: {
    handleCategoryClick(category, index) {
      this.$emit('category-click', { category, index })
    },
    getCategoryClass(category) {
      const isActive = typeof category === 'object' 
        ? category.id === this.activeCategory || category.active
        : category === this.activeCategory
      
      return isActive 
        ? 'bg-[#072C54] text-white' 
        : 'bg-transparent text-[#072C54]'
    }
  }
}
</script>

<style scoped>
.font-italian-plate {
  font-family: 'Italian_Plate_No2', 'Inter', sans-serif;
}

/* Hide scrollbar for WebKit browsers */
.scrollbar-hide {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* WebKit */
}

/* Color system based on component.txt specifications */
.text-chip-label-color-dark {
  color: #072C54;
}

.outline-chip-stroke-color {
  outline-color: #072C54;
}
</style>
