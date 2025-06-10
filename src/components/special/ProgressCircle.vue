<template>
  <div class="progress-circle-container">
    <div class="progress-circle" :style="containerStyle">
      <!-- Progress background circle -->
      <div class="progress-background" :style="backgroundStyle"></div>
      
      <!-- Progress fill circle -->
      <div 
        class="progress-fill" 
        :style="fillStyle"
        :class="{ 'animate-progress': animateProgress }"
      ></div>
      
      <!-- Center content -->
      <div class="progress-content">
        <div class="progress-value">{{ displayValue }}</div>
        <div v-if="label" class="progress-label">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressCircle',
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
      default: 80 // 20 * 4 = 80px (w-20)
    },
    
    // Color scheme
    color: {
      type: String,
      default: '#FFC72C', // amber-400 equivalent
      validator: value => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
    },
    
    // Background color
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    
    // Stroke width
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
      animateProgress: false,
      currentValue: 0
    }
  },
  
  computed: {
    containerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    },
      backgroundStyle() {
      const radius = (this.size - this.strokeWidth) / 2;
      return {
        width: `${this.size - this.strokeWidth}px`,
        height: `${this.size - this.strokeWidth}px`,
        borderRadius: '50%',
        backgroundColor: '#f3f4f6', // gray-100
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    },
      fillStyle() {
      const radius = (this.size - this.strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (this.currentValue / 100) * circumference;
      
      return {
        width: `${this.size - this.strokeWidth}px`,
        height: `${this.size - this.strokeWidth}px`,
        borderRadius: '50%',
        border: `${this.strokeWidth}px solid ${this.color}`,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        transform: `rotate(${(this.currentValue / 100) * 360 - 90}deg)`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${(this.currentValue / 100) * 360 - 90}deg)`,
        transition: this.animated ? 'transform 0.6s ease-in-out' : 'none'
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
        const duration = 600; // 600ms
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
    },
    
    // Method to trigger animation
    animate() {
      this.animateProgress = true;
      setTimeout(() => {
        this.animateProgress = false;
      }, 600);
    }
  }
}
</script>

<style scoped>
.progress-circle-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.progress-circle {
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

.progress-background {
  background: #f3f4f6;
}

.progress-fill {
  box-sizing: border-box;
}

.progress-content {
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

.progress-value {
  color: #FFC72B; /* text-amber-400 equivalent */
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  font-family: 'Italian_Plate_No2', -webkit-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
}

.progress-label {
  color: #6b7280;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2px;
}

.animate-progress {
  animation: spin 0.6s ease-in-out;
}

@keyframes spin {
  from {
    transform: rotate(-90deg);
  }
  to {
    transform: rotate(calc(var(--progress, 0) * 3.6deg - 90deg));
  }
}

/* Alternative circular progress using SVG for more precise control */
.svg-progress {
  transform: rotate(-90deg);
}

.svg-progress circle {
  transition: stroke-dashoffset 0.6s ease-in-out;
}
</style>
