<template>
  <div class="w-96 py-4 bg-white inline-flex flex-col justify-start items-center gap-5 font-italian-plate">
    <!-- Navigation Items -->
    <div class="w-80 inline-flex justify-between items-center">
      <div 
        v-for="item in navigationItems" 
        :key="item.id"
        :data-state="item.state || 'default'"
        :class="getItemClass(item)"
        class="inline-flex flex-col justify-start items-start cursor-pointer hover:opacity-75 transition-opacity"
        @click="handleItemClick(item)"
      >
        <div class="min-w-11 min-h-11 flex flex-col justify-center items-center gap-2">
          <!-- Icon Container -->
          <div class="w-6 h-6 relative overflow-hidden">
            <component :is="getIconComponent(item.icon)" />
          </div>
          
          <!-- Label -->
          <div class="justify-start text-[#09091A] text-sm font-semibold font-['Italian_Plate_No2']">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Indicator -->
    <div class="w-48 inline-flex justify-between items-center">
      <div class="w-24 h-1 bg-zinc-500 rounded-[100px]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
    activeItem: {
      type: String,
      default: null
    },
    navigationItems: {
      type: Array,
      default: () => [
        { id: 'success', label: 'Success', icon: 'success', state: 'default' },
        { id: 'docs', label: 'Docs', icon: 'docs', state: 'default' },
        { id: 'playzone', label: 'Playzone', icon: 'playzone', state: 'default' },
        { id: 'news', label: 'News', icon: 'news', state: 'default' },
        { id: 'profile', label: 'Profile', icon: 'profile', state: 'default' }
      ]
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  emits: ['item-click'],
  methods: {
    handleItemClick(item) {
      this.$emit('item-click', item)
    },
    getItemClass(item) {
      return item.id === this.activeItem ? 'opacity-100' : 'opacity-75'
    },
    getIconComponent(iconType) {
      const iconComponents = {
        success: 'SuccessIcon',
        docs: 'DocsIcon',
        playzone: 'PlayzoneIcon',
        news: 'NewsIcon',
        profile: 'ProfileIcon'
      }
      return iconComponents[iconType] || 'div'
    }
  },
  components: {
    SuccessIcon: {
      template: '<div class="w-3.5 h-5 left-[5px] top-[2px] absolute bg-[#09091A]"></div>'
    },
    DocsIcon: {
      template: `
        <div>
          <div class="w-2.5 h-1 left-[7px] top-[5px] absolute bg-[#09091A]"></div>
          <div class="w-4 h-5 left-[4px] top-[2px] absolute bg-[#09091A]"></div>
        </div>
      `
    },
    PlayzoneIcon: {
      template: '<div class="w-5 h-3.5 left-[2px] top-[5.25px] absolute bg-[#09091A]"></div>'
    },
    NewsIcon: {
      template: '<div class="w-5 h-5 left-[3.25px] top-[2px] absolute bg-[#09091A]"></div>'
    },
    ProfileIcon: {
      template: `
        <div>
          <div class="w-3.5 h-1.5 left-[5px] top-[15px] absolute outline outline-2 outline-offset-[-1px] outline-[#09091A]"></div>
          <div class="w-2 h-2 left-[8px] top-[3px] absolute outline outline-2 outline-offset-[-1px] outline-[#09091A]"></div>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.font-italian-plate {
  font-family: 'Italian_Plate_No2', 'Inter', sans-serif;
}

/* Color system based on component.txt specifications */
.text-color-secondary-black {
  color: #09091A;
}

.bg-zinc-500 {
  background-color: #71717B;
}
</style>
