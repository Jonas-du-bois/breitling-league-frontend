<template>
  <div 
    class="unit-card"
    :class="{ 'blurred': isBlurred }"
    @click="handleUnitClick"
  >    <div class="unit-content" v-if="unit">
      <div class="unit-title">{{ unit.title }}</div>
      <div class="unit-points">
        <span class="unit-points-number">{{ unit.points }}</span>
        <span class="unit-points-label">pts left</span>
      </div>
      <div class="unit-badge">
        <div class="unit-badge-icon">
          <div class="icon-shape-1"></div>
          <div class="icon-shape-2"></div>
          <div class="icon-shape-3"></div>
          <div class="icon-shape-4"></div>
          <div class="icon-shape-5"></div>
        </div>
        <div class="unit-badge-text">{{ unit.badgeText }}</div>
      </div>
    </div>
    
    <!-- Debug info when unit is undefined -->
    <div v-else class="unit-error">
      <p>Error: Unit prop is undefined</p>
    </div>    <!-- Overlay when unit is clicked -->
    <div v-if="isClicked && unit" class="unit-overlay">
      <div class="overlay-buttons">
        <OutlineButton 
          label="Learn"
          class="learn-button-component"
          @click="(event) => { event.stopPropagation(); handleLearnClick(); }"
        />
        <OutlineButton 
          label="Quiz"
          class="quiz-button-component"
          :disabled="!unit.isLearned"
          @click="(event) => { event.stopPropagation(); handleQuizClick(); }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { OutlineButton } from '../button'

export default {
  name: 'UnitCard',
  components: {
    OutlineButton
  },  props: {
    unit: {
      type: Object,
      required: false, // Temporarily changed from true to false for debugging
      default: null,
      validator(value) {
        if (!value) {
          console.warn('UnitCard: unit prop is null/undefined');
          return true; // Allow null/undefined for debugging
        }
        const isValid = value && 
          typeof value.id !== 'undefined' &&
          typeof value.title === 'string' &&
          typeof value.points === 'string' &&
          typeof value.badgeText === 'string' &&
          typeof value.isLearned === 'boolean';
        
        if (!isValid) {
          console.error('UnitCard: Invalid unit prop structure:', value);
        }
        return isValid;
      }
    },
    isClicked: {
      type: Boolean,
      default: false
    },
    isBlurred: {
      type: Boolean,
      default: false
    }
  },
  emits: ['unit-click', 'learn-unit', 'quiz-unit'],  methods: {
    handleUnitClick() {
      if (this.unit) {
        this.$emit('unit-click', this.unit);
      } else {
        console.error('UnitCard: Cannot handle unit click - unit is undefined');
      }
    },
    handleLearnClick() {
      if (this.unit) {
        this.$emit('learn-unit', this.unit);
      } else {
        console.error('UnitCard: Cannot handle learn click - unit is undefined');
      }
    },
    handleQuizClick() {
      if (this.unit && this.unit.isLearned) {
        this.$emit('quiz-unit', this.unit);
      } else if (!this.unit) {
        console.error('UnitCard: Cannot handle quiz click - unit is undefined');
      }
    }
  }
}
</script>

<style scoped>
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
  width: 160px;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
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

/* Error display styling */
.unit-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #ff0000;
  background: #ffeeee;
  border: 1px dashed #ff0000;
  padding: 8px;
  text-align: center;
}

.unit-error p {
  margin: 0;
  font-size: 12px;
  font-weight: bold;
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

/* Responsive Design */
@media (max-width: 640px) {
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
