<template>
  <div class="unit-list">    <div class="w-[1290px] h-[480px] relative rounded-[5px] border border-purple-500 overflow-hidden">
      <!-- First Row of Cards -->
      <div class="px-8 left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-5">
        <UnitCard 
          v-for="(unit, index) in firstRowUnits" 
          :key="unit.id"
          :unit="unit"
          :is-clicked="false"
          :is-blurred="false"
          @unit-click="handleUnitClick"
          @learn-unit="handleLearnUnit"
          @quiz-unit="handleQuizUnit"
        />
      </div>
      
      <!-- Second Row of Cards -->
      <div class="px-8 left-[20px] top-[250px] absolute inline-flex justify-start items-center gap-5">
        <UnitCard 
          v-for="(unit, index) in secondRowUnits" 
          :key="unit.id"
          :unit="unit"
          :is-clicked="false"
          :is-blurred="false"
          @unit-click="handleUnitClick"
          @learn-unit="handleLearnUnit"
          @quiz-unit="handleQuizUnit"
        />
        
        <!-- See More Button -->
        <div 
          v-if="showSeeMore"
          :data-disabled="seeMoreDisabled" 
          data-status="default" 
          class="h-14 max-w-80 min-w-14 p-6 outline outline-1 outline-offset-[-1px] outline-button-stroke-color-dark flex justify-center items-center gap-2.5 cursor-pointer hover:bg-button-background-hover transition-colors"
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
  },  props: {
    units: {
      type: Array,
      default: () => [
        // First Row Units
        {
          id: 1,
          title: 'Advanced Chronograph Mechanisms',
          points: "87'450",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 2,
          title: 'Breitling Heritage Foundation',
          name: 'Heritage Master',
          points: "25'300",
          badgeText: 'Certified',
          isLearned: true
        },
        {
          id: 3,
          title: 'Superocean Deep Dive Technology',
          points: "92'100",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 4,
          title: 'Navitimer Technical Excellence',
          name: 'Navigation Expert',
          points: "45'200",
          badgeText: 'Certified',
          isLearned: true
        },
        {
          id: 5,
          title: 'Premier Collection Mastery',
          points: "78'600",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 6,
          title: 'Avenger Series Expertise',
          points: "63'850",
          badgeText: 'Text',
          isLearned: false
        },
        // Second Row Units
        {
          id: 7,
          title: 'Chronomat Technical Details',
          points: "89'200",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 8,
          title: 'Professional Series Training',
          points: "94'750",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 9,
          title: 'Endurance Pro Specifications',
          points: "71'300",
          badgeText: 'Text',
          isLearned: false
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
  },  emits: ['unit-click', 'learn-unit', 'quiz-unit', 'see-more-click'],
  computed: {
    firstRowUnits() {
      return this.units.slice(0, 6); // First 6 units for top row
    },
    secondRowUnits() {
      return this.units.slice(6, 9); // Next 3 units for bottom row
    }
  },
  methods: {
    handleUnitClick(unit) {
      this.$emit('unit-click', unit);
    },
    handleLearnUnit(unit) {
      this.$emit('learn-unit', unit);
    },
    handleQuizUnit(unit) {
      this.$emit('quiz-unit', unit);
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
  max-width: 1290px;
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
