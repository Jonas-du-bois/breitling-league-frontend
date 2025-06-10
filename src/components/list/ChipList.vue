<template>
  <div class="chip-list">
    <div class="px-8 inline-flex justify-start items-center gap-3">
      <div 
        v-for="(chip, index) in chips" 
        :key="index"
        :data-status="chip.status || 'default'"
        class="h-11 min-w-11 p-3 outline outline-[1.50px] outline-offset-[-1.50px] outline-chip-stroke-color flex justify-center items-center cursor-pointer hover:bg-chip-background-hover transition-colors"
        @click="handleChipClick(chip, index)"
      >
        <div class="justify-start text-chip-label-color-dark text-base font-semibold font-['Italian_Plate_No2']">
          {{ chip.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChipList',
  props: {
    chips: {
      type: Array,
      default: () => [
        { label: 'Category 1', status: 'default' },
        { label: 'Category 2', status: 'default' },
        { label: 'Category 3', status: 'default' },
        { label: 'Category 4', status: 'default' }
      ]
    }
  },
  emits: ['chip-click'],
  methods: {
    handleChipClick(chip, index) {
      this.$emit('chip-click', { chip, index });
    }
  }
}
</script>

<style scoped>
.chip-list {
  display: flex;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: thin;
}

.chip-list::-webkit-scrollbar {
  height: 4px;
}

.chip-list::-webkit-scrollbar-track {
  background: transparent;
}

.chip-list::-webkit-scrollbar-thumb {
  background: var(--chip-stroke-color);
  border-radius: 2px;
}

/* Custom properties for exact color matching */
:root {
  --chip-stroke-color: #072C54;
  --chip-label-color-dark: #072C54;
  --chip-background-hover: rgba(7, 44, 84, 0.05);
}
</style>
