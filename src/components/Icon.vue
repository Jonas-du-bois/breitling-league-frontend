<template>
  <img 
    :src="iconPath" 
    :alt="alt || name"
    :class="['icon', sizeClass, customClass]"
    :style="combinedStyle"
    @error="handleError"
  />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => [
        // SVG icons (preferred)
        'arrow-back', 'arrow-forward', 'book', 'certified-empty', 'download', 
        'dropdown-close', 'dropdown-open', 'flame', 'notification', 'playground',
        'share', 'specialist-empty', 'specialist-full', 'ticket', 'user',
        // PNG fallbacks (legacy)
        'certified-full', 'expand-close', 'expand-open', 'head', 'left-arrow', 
        'manette', 'medaille', 'right-arrow', 'searchIcon', 'torso', 'user-icon'
      ].includes(value)
    },
    size: {
      type: [String, Number],
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value) || typeof value === 'number'
    },
    alt: {
      type: String,
      default: ''
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: () => ({})
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    iconPath() {
      // Prefer SVG icons, fallback to PNG
      const svgIcons = [
        'arrow-back', 'arrow-forward', 'book', 'certified-empty', 'download', 
        'dropdown-close', 'dropdown-open', 'flame', 'notification', 'playground',
        'share', 'specialist-empty', 'specialist-full', 'ticket', 'user'
      ]
      
      if (svgIcons.includes(this.name)) {
        return `/icons/${this.name}.svg`
      }
      return `/icons/${this.name}.png`
    },
    sizeClass() {
      if (typeof this.size === 'number') {
        return ''
      }
      return `icon-${this.size}`
    },
    combinedStyle() {
      const style = { ...this.customStyle }
      
      // Add custom size if numeric
      if (typeof this.size === 'number') {
        style.width = `${this.size}px`
        style.height = `${this.size}px`
      }
      
      // Add color filter for SVG icons
      if (this.color && this.iconPath.endsWith('.svg')) {
        style.filter = `brightness(0) saturate(100%) ${this.getColorFilter(this.color)}`
      }
      
      return style
    }
  },
  methods: {
    handleError(event) {
      console.warn(`Icon not found: ${this.iconPath}`)
      this.$emit('error', event)
    },
    getColorFilter(color) {
      // Convert common colors to CSS filters for SVG icons
      const colorFilters = {
        'white': 'invert(100%)',
        'black': 'invert(0%)',
        'blue': 'invert(30%) sepia(100%) saturate(1000%) hue-rotate(200deg)',
        'red': 'invert(30%) sepia(100%) saturate(1000%) hue-rotate(0deg)',
        'green': 'invert(30%) sepia(100%) saturate(1000%) hue-rotate(90deg)',
        'yellow': 'invert(30%) sepia(100%) saturate(1000%) hue-rotate(60deg)',
        '#FFC72C': 'invert(85%) sepia(85%) saturate(1320%) hue-rotate(3deg) brightness(103%) contrast(101%)',
        '#072C54': 'invert(12%) sepia(45%) saturate(2332%) hue-rotate(204deg) brightness(94%) contrast(96%)'
      }
      return colorFilters[color] || ''
    }
  },
  emits: ['error']
}
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Size variations */
.icon-xs {
  width: 12px;
  height: 12px;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.icon-md {
  width: 24px;
  height: 24px;
}

.icon-lg {
  width: 32px;
  height: 32px;
}

.icon-xl {
  width: 40px;
  height: 40px;
}

.icon-2xl {
  width: 48px;
  height: 48px;
}

/* Custom size from number prop */
.icon[style*="width"] {
  height: auto;
}
</style>
