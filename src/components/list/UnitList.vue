<template>
  <div class="unit-list">
    <div class="w-[1017px] h-[480px] relative rounded-[5px] border border-purple-500 overflow-hidden">
      <div class="px-8 left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-8">
        <UnitCard 
          v-for="(unit, index) in units" 
          :key="index"
          :unit="unit"
          :data-state="unit.state || 'default'"
          @unit-click="handleUnitClick"
        />
        
        <!-- See More Button -->
        <div 
          v-if="showSeeMore"
          :data-disabled="seeMoreDisabled" 
          data-status="default" 
          class="h-14 max-w-80 min-w-14 p-6 outline outline-2 outline-offset-[-2px] outline-button-stroke-color-dark flex justify-center items-center gap-2.5 cursor-pointer hover:bg-button-background-hover transition-colors"
          @click="handleSeeMoreClick"
        >
          <div class="justify-start text-button-label-color-dark text-base font-bold font-['Italian_Plate_No2'] uppercase">
            See more
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UnitCard } from '../card'

export default {
  name: 'UnitList',
  components: {
    UnitCard
  },
  props: {
    units: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          state: 'default'
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          state: 'default'
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          state: 'default'
        }
      ]
    },
    showSeeMore: {
      type: Boolean,
      default: true
    },
    seeMoreDisabled: {
      type: Boolean,
      default: true
    }
  },
  emits: ['unit-click', 'see-more-click'],
  methods: {
    handleUnitClick(unit) {
      this.$emit('unit-click', unit);
    },
    handleSeeMoreClick() {
      if (!this.seeMoreDisabled) {
        this.$emit('see-more-click');
      }
    }
  }
}
</script>

<style scoped>
.unit-list {
  position: relative;
  width: 100%;
  max-width: 1017px;
}

/* Custom properties for exact color matching */
:root {
  --button-stroke-color-dark: #072C54;
  --button-label-color-dark: #072C54;
  --button-background-hover: rgba(7, 44, 84, 0.05);
  --card-text-color-dark: #09091A;
  --color-primary-yellow-100: #FFC72C;
  --color-primary-blue-100: #072C54;
  --badge-label-color-light: #76787B;
  --card-background-color-light: #FFFFFF;
  --card-stroke-color: #072C54;
}
</style>
