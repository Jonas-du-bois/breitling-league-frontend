<template>
  <div class="svg-progress-circle-container">
    <div class="svg-progress-circle" :style="containerStyle">
      <!-- SVG Progress Circle -->
      <svg 
        :width="size" 
        :height="size" 
        class="progress-svg"
        viewBox="0 0 100 100"
      >
        <!-- Background circle -->
        <circle
          cx="50"
          cy="50"
          :r="radius"
          stroke="#f3f4f6"
          :stroke-width="strokeWidthPercent"
          fill="none"
          class="progress-background-circle"
        />
        
        <!-- Progress circle -->
        <circle
          cx="50"
          cy="50"
          :r="radius"
          :stroke="color"
          :stroke-width="strokeWidthPercent"
          fill="none"
          class="progress-fill-circle"
          :style="progressStyle"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
      
      <!-- Center content -->
      <div class="svg-progress-content">
        <div class="svg-progress-value">{{ displayValue }}</div>
        <div v-if="label" class="svg-progress-label">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SVGProgressCircle',
  props: {
    // Progress value (0-100)
    value: {
      type: Number,
      default: 56,
      validator: value => value >= 0 && value <= 100
    },
    
    // Size of the circle in pixels
    size: {
      type: Number,
      default: 80
    },
    
    // Color scheme
    color: {
      type: String,
      default: '#FFC72C'
    },
    
    // Background color
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    
    // Stroke width as percentage of radius
    strokeWidth: {
      type: Number,
      default: 8
    },
    
    // Optional label below the value
    label: {
      type: String,
      default: ''
    },
    
    // Show percentage sign
    showPercentage: {
      type: Boolean,
      default: false
    },
    
    // Animation enabled
    animated: {
      type: Boolean,
      default: true
    },
    
    // Custom format function for the display value
    formatValue: {
      type: Function,
      default: null
    }
  },
  
  data() {
    return {
      currentValue: 0
    }
  },
  
  computed: {
    containerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        backgroundColor: this.backgroundColor
      }
    },
    
    radius() {
      return 50 - this.strokeWidthPercent / 2;
    },
    
    strokeWidthPercent() {
      return (this.strokeWidth / this.size) * 100;
    },
    
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    
    strokeDashoffset() {
      return this.circumference - (this.currentValue / 100) * this.circumference;
    },
    
    progressStyle() {
      return {
        transition: this.animated ? 'stroke-dashoffset 0.6s ease-in-out' : 'none',
        transform: 'rotate(-90deg)',
        transformOrigin: '50% 50%'
      }
    },
    
    displayValue() {
      if (this.formatValue && typeof this.formatValue === 'function') {
        return this.formatValue(this.currentValue);
      }
      
      const value = Math.round(this.currentValue);
      return this.showPercentage ? `${value}%` : value.toString();
    }
  },
  
  watch: {
    value: {
      handler(newValue) {
        this.updateProgress(newValue);
      },
      immediate: true
    }
  },
  
  mounted() {
    this.updateProgress(this.value);
  },
  
  methods: {
    updateProgress(targetValue) {
      if (this.animated) {
        // Animate from current value to target value
        const startValue = this.currentValue;
        const difference = targetValue - startValue;
        const duration = 600;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (ease-in-out)
          const easeInOut = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          this.currentValue = startValue + (difference * easeInOut);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            this.currentValue = targetValue;
          }
        };
        
        requestAnimationFrame(animate);
      } else {
        this.currentValue = targetValue;
      }
    }
  }
}
</script>

<style scoped>
.svg-progress-circle-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.svg-progress-circle {
  position: relative;
  background: #FFFFFF;
  border-radius: 9999px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.progress-svg {
  transform: rotate(-90deg);
}

.progress-background-circle {
  opacity: 0.2;
}

.progress-fill-circle {
  stroke-linecap: round;
}

.svg-progress-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.svg-progress-value {
  color: #FFC72B;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
}

.svg-progress-label {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2px;
}
</style>
