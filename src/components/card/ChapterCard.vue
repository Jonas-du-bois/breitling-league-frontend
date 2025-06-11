<template>
  <div class="chapter-card">
    <div class="chapter-image" :style="{ backgroundImage: `url(${imageUrl || '/breitling-watch.jpg'})` }">

      <div v-if="showTime" class="time-boost-bar">
      <div class="time-display">
        {{ timeLeft.days }}D {{ timeLeft.hours }}H {{ timeLeft.minutes }}M
      </div>
      <div class="multiplier-circle">
        {{ bonusMultiplier }}
      </div>
    </div>

    </div>
    
    
    
    <div class="content-box">
      <div class="chapter-title">
        {{ title }}
      </div>
      
      <div class="points-action-row">
        <div class="points-section">
          <span class="points-number">{{ pointsLeft }}</span>
          <span class="points-label">pts left</span>
        </div>        <div class="action-icon" @click="toggleExpanded">
          <Icon 
            :name="isExpanded ? 'dropdown-close' : 'dropdown-open'" 
            size="lg" 
            :alt="isExpanded ? 'Collapse chapter' : 'Expand chapter'"
            class="expand-icon"
          />
        </div>
      </div>
    </div>      <div v-if="isExpanded" class="units-container">
        <UnitCard
          v-for="unit in units"
          :key="unit.id"
          :unit="unit"
          :isClicked="clickedUnit === unit.id"
          :isBlurred="clickedUnit !== null && clickedUnit !== unit.id"
          @unit-click="handleUnitClick"
          @learn-unit="handleLearnClick"
          @quiz-unit="handleQuizClick"
        />
      </div>
    
    <div class="bottom-divider"></div>
  </div>
</template>

<script>
import { OutlineButton, FilledButton } from '../button'
import UnitCard from './UnitCard.vue'
import Icon from '../Icon.vue'

export default {
  name: 'ChapterCard',
  components: {
    OutlineButton,
    FilledButton,
    UnitCard,
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    bonusMultiplier: {
      type: String,
      default: 'x2'
    },
    timeLeft: {
      type: Object,
      default: () => ({
        days: '08',
        hours: '12',
        minutes: '24'
      })
    },
    pointsLeft: {
      type: String,
      required: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    imageUrl: {
      type: String,
      default: null
    },    units: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: true
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        },
        {
          id: 4,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: true
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          points: "100'300",
          badgeText: 'Text',
          isLearned: false
        }
      ]
    }
  },  data() {
    return {
      isExpanded: false,
      clickedUnit: null
    }
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
      this.clickedUnit = null; // Reset clicked unit when collapsing
      this.$emit('toggle-expanded', {
        expanded: this.isExpanded,
        title: this.title
      });
    },    handleUnitClick(unit) {
      // Allow clicking on both learned and unlearned units
      this.clickedUnit = this.clickedUnit === unit.id ? null : unit.id;
    },    handleLearnClick(unit) {
      // Learn is always available (for both new learning and re-learning)
      this.$emit('learn-unit', unit);
      this.clickedUnit = null;
    },handleQuizClick(unit) {
      // Quiz is available for learned units
      if (unit.isLearned) {
        this.$emit('quiz-unit', unit);
        this.clickedUnit = null;
      }
    }
  }
}
</script>

<style scoped>
/* CSS Custom Properties */
:root {
  --dimensions-width-full: 402px;
  --dimensions-width-full-bothmargins: 338px;
  --spacing-32: 32px;
  --card-background-color-light: #FFF;
  --color-secondary-black: #09091A;
  --card-text-color-dark: #072C54;
  --color-primary-yellow-100: #FFC72C;
  --color-primary-blue-100: #072C54;
  --color-secondary-grey-100: #09091A;
  --badge-label-color-light: #76787B;
  --fontfamily-default: "Italian Plate No2";
  --fontsize-32: 32px;
  --fontsize-20: 20px;
  --card-stroke-color: #072C54;
  --button-stroke-color: #072C54;
  --button-stroke-color-disabled: #8693A8;
  --button-label-color-dark: #072C54;
  --button-label-color-dark-disabled: #8693A8;
  --icon-color-dark: #072C54;
}

/* Main Container */
.chapter-card {
  display: inline-flex;
  padding-bottom: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-32, 32px);
  background: var(--card-background-color-light, #FFF);
  width: var(--dimensions-width-full, 402px);
  min-width: var(--dimensions-width-full, 402px);
}

/* Image Section */
.chapter-image {
  width: var(--dimensions-width-full, 402px);
  height: 130px;
  background: lightgray 50% / cover no-repeat;
  position: relative;
}

/* Time Boost Bar */
.time-boost-bar {
  display: flex;
  width: var(--dimensions-width-full, 402px);
  height: 26px;
  justify-content: center;
  align-items: center;
  gap: -20px;
  background: #FFC72C;
  position: absolute;
  bottom: 0;
  left: 0;
}

/* Time Display */
.time-display {
  color: var(--color-secondary-black, #09091A);
  font-family: "Italian Plate No2";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* Multiplier Circle */
.multiplier-circle {
  display: flex;
  width: 52px;
  height: 52px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 45px;
  top: -13px;
  border-radius: 50%;
  background: #FFC72C;
  color: #000;
  font-family: "Italian Plate No2";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* Content Box */
.content-box {
  display: flex;
  width: var(--dimensions-width-full-bothmargins, 338px);
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

/* Chapter Title */
.chapter-title {
  width: 266px;
  color: var(--card-text-color-dark, #072C54);
  font-family: var(--fontfamily-default, "Italian Plate No2");
  font-size: var(--fontsize-32, 32px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}

/* Points and Action Row */
.points-action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

/* Points Section */
.points-section {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.points-number {
  color: var(--color-primary-yellow-100, #FFC72C);
  font-family: var(--fontfamily-default, "Italian Plate No2");
  font-size: var(--fontsize-32, 32px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.points-label {
  color: var(--color-primary-blue-100, #072C54);
  font-family: var(--fontfamily-default, "Italian Plate No2");
  font-size: var(--fontsize-20, 20px);
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* Action Icon */
.action-icon {
  display: flex;
  align-items: flex-start;
  aspect-ratio: 1/1;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.2s;
  border-radius: 4px;
}

.action-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.expand-icon {
  transition: transform 0.3s ease;
}

.expand-icon:hover {
  transform: scale(1.1);
}

.icon-container {
  width: 24px;
  height: 24px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-line-horizontal {
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: #000;
}

.icon-line-vertical {
  position: absolute;
  width: 2px;
  height: 16px;
  background-color: #000;
}

/* Units Container */
.units-container {
  width: var(--dimensions-width-full, 402px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  padding: 0 32px 48px 32px;
  overflow-x: auto;
  box-sizing: border-box;
}

/* Modern Scrollbar Styles for Units Container */
.units-container::-webkit-scrollbar {
  height: 6px;
}

.units-container::-webkit-scrollbar-track {
  background: rgba(7, 44, 84, 0.05);
  border-radius: 3px;
}

.units-container::-webkit-scrollbar-thumb {
  background: rgba(7, 44, 84, 0.2);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.units-container::-webkit-scrollbar-thumb:hover {
  background: rgba(7, 44, 84, 0.4);
}

.units-container::-webkit-scrollbar-thumb:active {
  background: var(--color-primary-blue-100, #072C54);
}

/* Firefox scrollbar styles */
.units-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(7, 44, 84, 0.2) rgba(7, 44, 84, 0.05);
}

/* Unit Card */
.unit-card {
  height: 208px;
  padding: 16px;
  background: var(--card-background-color-light, #FFF);
  box-shadow: 0px 0px 8px 0px rgba(193, 200, 210, 1.00);
  border: 1px solid var(--card-text-color-dark, #072C54);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 32px;
  overflow: hidden;
  min-width: 160px;
  width: 160px;  flex-shrink: 0;  position: relative;  cursor: pointer;
  transition: filter 0.3s ease;
}

/* Blur effect for non-clicked units */
.unit-card.blurred {
  filter: blur(2px);
}

.unit-card.blurred::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  pointer-events: none;
}

.unit-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.unit-title {
  width: 128px;
  color: var(--card-text-color-dark, #072C54);
  font-family: "Italian Plate No2";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  text-align: left;
  align-self: flex-start;
}

.unit-points {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.unit-points-number {
  color: var(--color-primary-yellow-100, #FFC72C);
  font-family: "Italian Plate No2";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}

.unit-points-label {
  color: var(--color-primary-blue-100, #072C54);
  font-family: "Italian Plate No2";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

/* Unit Badge */
.unit-badge {
  padding: 4px;
  background: var(--color-secondary-grey-100, #09091A);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: flex-end;
}

.unit-badge-icon {
  width: 16px;
  height: 16px;
  position: relative;
  overflow: hidden;
}

.icon-shape-1 {
  width: 8px;
  height: 8px;
  position: absolute;
  left: 1.5px;
  top: 6.75px;
  border: 2px solid #072C54;
}

.icon-shape-2 {
  width: 12px;
  height: 12px;
  position: absolute;
  left: 1.5px;
  top: 3.75px;
  border: 2px solid #072C54;
}

.icon-shape-3 {
  width: 14px;
  height: 12px;
  position: absolute;
  left: 1.5px;
  top: 3.75px;
  border: 2px solid #072C54;
}

.icon-shape-4 {
  width: 0.83px;
  height: 1.65px;
  position: absolute;
  left: 13.5px;
  top: 2.25px;
  border: 2px solid #072C54;
}

.icon-shape-5 {
  width: 0.83px;
  height: 1.65px;
  position: absolute;
  left: 15.68px;
  top: 2.25px;
  border: 2px solid #072C54;
}

.unit-badge-text {
  color: var(--badge-label-color-light, #76787B);
  font-family: "Italian Plate No2";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* Unit Overlay */
.unit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  z-index: 10;
}

.overlay-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Custom styles for button components in overlay */
.learn-button-component,
.quiz-button-component {
  width: 80px !important;
  height: 56px !important;
  min-width: 56px !important;
  max-width: 80px !important;
  padding: 12px !important;
  font-size: 14px !important;
  font-weight: 700 !important;
}

/* Bottom Divider */
.bottom-divider {
  width: var(--dimensions-width-full-bothmargins, 338px);
  height: 1px;
  background: var(--color-primary-blue-100, #072C54);
}

/* Responsive Design */
@media (max-width: 640px) {
  .chapter-card {
    gap: 24px;
    padding-bottom: 24px;
    width: 320px;
    min-width: 320px;
  }
  
  .chapter-image,
  .time-boost-bar,
  .units-container {
    width: 320px;
  }
  
  .content-box,
  .bottom-divider {
    width: 288px;
  }
  
  .chapter-title {
    width: 240px;
    font-size: 24px;
  }
  
  .points-number {
    font-size: 24px;
  }
  
  .points-label {
    font-size: 16px;
  }
    .units-container {
    gap: 16px;
    padding: 0 16px 32px 16px;
  }

  /* Mobile scrollbar styles */
  .units-container::-webkit-scrollbar {
    height: 4px;
  }

  .units-container::-webkit-scrollbar-track {
    background: rgba(7, 44, 84, 0.03);
    border-radius: 2px;
  }

  .units-container::-webkit-scrollbar-thumb {
    background: rgba(7, 44, 84, 0.15);
    border-radius: 2px;
  }

  .units-container::-webkit-scrollbar-thumb:hover {
    background: rgba(7, 44, 84, 0.3);
  }
  
  .unit-card {
    height: 160px;
    min-width: 112px;
    width: 112px;
    gap: 16px;
  }
  
  .unit-title {
    width: 112px;
    font-size: 16px;
  }
  
  .unit-points-number,
  .unit-points-label {
    font-size: 16px;
  }
}
</style>

<!-- 
  CURRENT ISSUE & REMINDER:
  
  We successfully extracted unit functionality from ChapterCard into a separate UnitCard component
  for better separation of concerns. However, there's currently a runtime error:
  "Cannot read properties of undefined (reading 'title')" in UnitCard.vue
  
  WHAT WAS ACCOMPLISHED:
  ✅ Replaced custom div buttons with OutlineButton components
  ✅ Updated button colors from blue to orange
  ✅ Implemented unit state management (learned/unlearned variants)
  ✅ Added black overlay effects and blur for non-clicked units
  ✅ Created separate UnitCard.vue component
  
  WHAT NEEDS TO BE FIXED:
  ❌ The UnitCard component is receiving undefined `unit` props, causing template errors
  ❌ Need to verify the units array structure and prop passing from ChapterCard to UnitCard
  ❌ Ensure proper component registration and event handling
  
  EXPECTED UNIT STRUCTURE:
  {
    id: number,
    title: string,
    points: string,
    badgeText: string,
    isLearned: boolean
  }
-->