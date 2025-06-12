<template>
  <div class="specialist-card">
    <div class="card-content">
      <!-- Main Title Section -->
      <div class="title-section">
        <div class="main-title">
          <span class="become-text">Become</span>
          <span class="specialist-text"> Breitling Specialist</span>
        </div>
        <div class="subtitle">And build the watch of the year</div>
      </div>      <!-- Progress Bar Section -->
      <div class="progress-section">
        <!-- Progress Bar Container -->
        <div class="progress-bar-container">
          <div class="progress-bar-background"></div>
          <div class="progress-bar-fill" :style="{ width: progressBarWidth }"></div>
        </div>
        
        <!-- Progress Dots -->
        <div class="progress-dots">
          <div 
            v-for="(dot, index) in totalDots" 
            :key="index"
            class="progress-dot"
            :class="{ 'completed': index < completedDots }"
          ></div>
        </div>
      </div><!-- Stats Section -->
      <div class="stats-section">        <div class="specialist-icon">
          <Icon 
            name="specialist-full"
            size="sm"
            :alt="'Specialist certification'"
            class="cert-icon"
          />
        </div>
        <div class="stats-text">
          <div class="stats-numbers">{{ unitsLearned }}/{{ totalUnits }}</div>
          <div class="stats-label">units learned</div>
        </div>
      </div>

      <!-- Decorative Line -->
      <div class="decorative-line"></div>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon.vue'

export default {
  name: 'SpecialistCard',
  components: {
    Icon
  },
  props: {
    unitsLearned: {
      type: Number,
      default: 7
    },
    totalUnits: {
      type: Number,
      default: 15
    },
    totalDots: {
      type: Number,
      default: 6
    },
    backgroundImage: {
      type: String,
      default: null
    }
  },
  computed: {
    completedDots() {
      // Calculate how many dots should be filled based on progress
      return Math.floor((this.unitsLearned / this.totalUnits) * this.totalDots);
    },
    progressBarWidth() {
      // Calculate progress bar width as percentage
      const progressPercentage = (this.unitsLearned / this.totalUnits) * 100;
      return `${Math.min(progressPercentage, 100)}%`;
    },
    progressPercentage() {
      return Math.round((this.unitsLearned / this.totalUnits) * 100);
    }
  },
  methods: {
    handleCardClick() {
      this.$emit('card-click', {
        unitsLearned: this.unitsLearned,
        totalUnits: this.totalUnits,
        progressPercentage: this.progressPercentage
      });
    }
  },
  emits: ['card-click']
}
</script>

<style scoped>
.specialist-card {
  width: 100%; /* Fill parent width */
  height: 100%; /* Fill parent height */
  min-width: 320px; /* Minimum width for content readability */
  min-height: 208px; /* Minimum height to maintain proportions */
  max-width: 100%; /* Don't exceed parent */
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.specialist-card:hover {
  transform: translateY(-2px);
}

.card-content {
  width: 100%; /* Fill parent width */
  height: 100%; /* Fill parent height */
  align-self: stretch;
  flex: 1;
  padding: 32px; /* p-8 */
  background: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
    url('/breitling specialist.png') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Title Section */
.title-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px; /* gap-3 */
}

.main-title {
  text-align: center;
  justify-content: flex-start;
}

.become-text {
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 30px; /* text-3xl */
  font-weight: 600; /* font-semibold */
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
}

.specialist-text {
  color: #FFC72C; /* text-color-primary-yellow-100 */
  font-size: 30px; /* text-3xl */
  font-weight: 600; /* font-semibold */
  font-family: 'Italian_Plate_No2', sans-serif;
  text-transform: uppercase;
}

.subtitle {
  text-align: center;
  color: #FFFFFF; /* text-color-secondary-white */
  font-size: 20px; /* text-xl */
  font-weight: 600; /* font-semibold */
  font-family: 'Italian_Plate_No2', sans-serif;
}

/* Progress Section */
.progress-section {
  width: 100%; /* Use full available width */
  max-width: 320px; /* Maximum width for optimal appearance */
  min-width: 280px; /* Minimum width for functionality */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}

.progress-bar-container {
  width: 100%; /* Fill the progress section */
  height: 8px; /* h-2 */
  position: relative;
  z-index: 1;
}

.progress-bar-background {
  width: 100%;
  height: 100%;
  background: #FFFFFF; /* bg-color-secondary-white */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.progress-bar-fill {
  height: 100%;
  background: #FFC72C; /* bg-color-primary-yellow-100 */
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
  z-index: 2;
}

.progress-dots {
  width: 100%; /* Fill the progress section */
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.progress-dot {
  width: 16px; /* w-4 */
  height: 16px; /* h-4 */
  border-radius: 50%; /* rounded-full */
  background: #FFFFFF; /* bg-color-secondary-white */
  border: 1px solid #FFC72C; /* border border-color-primary-yellow-100 */
  transition: background-color 0.3s ease;
  position: relative;
  z-index: 11;
}

.progress-dot.completed {
  background: #FFC72C; /* bg-color-primary-yellow-100 */
  border: 1px solid #FFC72C;
}

/* Stats Section */
.stats-section {
  padding: 4px; /* p-1 */
  background: #FFFFFF; /* bg-color-secondary-white */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px; /* gap-1 */
  position: relative;
  z-index: 15;
}

.specialist-icon {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.cert-icon {
  width: 16px; /* w-4 */
  height: 16px; /* h-4 */
  position: relative;
  overflow: hidden;
}

.cert-icon :deep(.icon-shape) {
  width: 16px; /* w-4 */
  height: 16px; /* h-4 */
  left: 1.42px;
  top: 1.42px;
  position: absolute;
  background: #072C54; /* bg-color-primary-blue-100 */
}

.stats-text {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px; /* gap-1 */
}

.stats-numbers {
  color: #072C54; /* text-color-primary-blue-100 */
  font-size: 14px; /* text-sm */
  font-weight: 400; /* font-normal */
  font-family: 'Italian_Plate_No2', sans-serif;
}

.stats-label {
  color: #072C54; /* text-color-primary-blue-100 */
  font-size: 8px; /* text-[8px] */
  font-weight: 400; /* font-normal */
  font-family: 'Italian_Plate_No2', sans-serif;
}

/* Decorative Line */
.decorative-line {
  width: 12px; /* w-3 */
  height: 0;
  transform-origin: top left;
  transform: rotate(-90deg);
  border: 2px solid #FFFFFF; /* outline outline-2 outline-offset-[-1px] outline-color-secondary-white */
  position: relative;
  z-index: 15;
}

/* Color Variables */
:root {
  --color-primary-blue-100: #072C54;
  --color-primary-yellow-100: #FFC72C;
  --color-secondary-white: #FFFFFF;
}

/* Responsive Design */
@media (max-width: 640px) {
  .specialist-card {
    min-width: 280px;
    min-height: 180px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .progress-section {
    min-width: 240px;
    max-width: 280px;
  }
  
  .main-title {
    text-align: center;
  }
  
  .become-text,
  .specialist-text {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 16px;
  }
}

/* Very small containers */
@media (max-width: 400px) {
  .specialist-card {
    min-width: 240px;
    min-height: 160px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .progress-section {
    min-width: 200px;
    max-width: 240px;
  }
  
  .become-text,
  .specialist-text {
    font-size: 20px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>
