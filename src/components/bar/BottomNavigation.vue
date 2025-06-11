<template>
  <div class="w-96 py-4 bg-white inline-flex flex-col justify-start items-center gap-5 bottom-navigation">
    <div class="w-80 inline-flex justify-between items-center">      <!-- Success Tab -->
      <div 
        data-state="default" 
        class="inline-flex flex-col justify-start items-start cursor-pointer transition-all duration-200 hover:opacity-80"
        @click="$emit('navigate', 'success')"
      >
        <div data-device="mobile" class="min-w-11 min-h-11 flex flex-col justify-center items-center gap-2">
          <div class="w-6 h-6 relative overflow-hidden">
            <div class="w-3.5 h-5 left-[5px] top-[2px] absolute bg-icon-color-dark-default"></div>
          </div>
          <div class="justify-start text-color-secondary-black text-sm font-semibold font-['Italian_Plate_No2']">Success</div>
        </div>
      </div>

      <!-- Docs Tab -->
      <div 
        data-state="default" 
        class="inline-flex flex-col justify-start items-start cursor-pointer transition-all duration-200 hover:opacity-80"
        @click="$emit('navigate', 'docs')"
      >
        <div data-device="mobile" class="min-w-11 min-h-11 flex flex-col justify-center items-center gap-2">
          <div class="w-6 h-6 relative overflow-hidden">
            <div class="w-2.5 h-1 left-[7px] top-[5px] absolute bg-icon-color-dark-default"></div>
            <div class="w-4 h-5 left-[4px] top-[2px] absolute bg-icon-color-dark-default"></div>
          </div>
          <div class="justify-start text-color-secondary-black text-sm font-semibold font-['Italian_Plate_No2']">Docs</div>
        </div>
      </div>

      <!-- Playzone Tab (Highlighted) -->
      <div 
        data-state="highlighted" 
        class="inline-flex flex-col justify-start items-start cursor-pointer"
        @click="$emit('navigate', 'playzone')"
      >
        <div data-device="mobile" class="min-w-11 min-h-11 flex flex-col justify-center items-center gap-2">
          <div class="w-6 h-6 relative overflow-hidden">
            <div class="w-5 h-3.5 left-[2px] top-[5.25px] absolute bg-icon-color-highlighted border border-icon-color-highlighted"></div>
          </div>
          <div class="justify-start text-color-primary-yellow-100 text-sm font-semibold font-['Italian_Plate_No2']">Playzone</div>
        </div>
      </div>

      <!-- News Tab -->
      <div 
        data-state="default" 
        class="inline-flex flex-col justify-start items-start cursor-pointer transition-all duration-200 hover:opacity-80"
        @click="$emit('navigate', 'news')"
      >
        <div data-device="mobile" class="min-w-11 min-h-11 flex flex-col justify-center items-center gap-2">
          <div class="w-6 h-6 relative overflow-hidden">
            <div class="w-5 h-5 left-[3.25px] top-[2px] absolute bg-icon-color-dark-default"></div>
          </div>
          <div class="justify-start text-color-secondary-black text-sm font-semibold font-['Italian_Plate_No2']">News</div>
        </div>
      </div>

      <!-- Profile Tab -->
      <div 
        data-state="default" 
        class="inline-flex flex-col justify-start items-start cursor-pointer transition-all duration-200 hover:opacity-80"
        @click="$emit('navigate', 'profile')"
      >
        <div data-device="mobile" class="min-w-11 min-h-11 flex flex-col justify-center items-center gap-2">
          <div class="w-6 h-6 relative overflow-hidden">
            <div class="w-3.5 h-1.5 left-[5px] top-[15px] absolute outline outline-2 outline-offset-[-1px] outline-icon-color-dark-default"></div>
            <div class="w-2 h-2 left-[8px] top-[3px] absolute outline outline-2 outline-offset-[-1px] outline-icon-color-dark-default"></div>
          </div>
          <div class="justify-start text-color-secondary-black text-sm font-semibold font-['Italian_Plate_No2']">Profile</div>
        </div>
      </div>
    </div>

    <!-- Home Indicator -->
    <div class="w-48 inline-flex justify-between items-center">
      <div class="w-24 h-1 bg-zinc-500 rounded-[100px]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNavigation',
  props: {
    activeTab: {
      type: String,
      default: 'playzone'
    }
  },
  emits: ['navigate']
}
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px 16px 0 0;
}

/* Custom icon positioning for different tab types */
[data-state="highlighted"] .w-6 {
  background: var(--color-primary-yellow-100, #FFC72C);
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .bottom-navigation {
    width: 100%;
    border-radius: 0;
  }
  
  .w-96 {
    width: 100%;
    max-width: 100%;
  }
  
  .w-80 {
    width: 100%;
    max-width: 100%;
    padding: 0 1rem;
  }
}

/* Icon color variants */
.bg-icon-color-dark-default {
  background-color: var(--icon-color-dark-default, #09091A);
}

.bg-icon-color-highlighted {
  background-color: var(--color-primary-yellow-100, #FFC72C);
}

.outline-icon-color-dark-default {
  outline-color: var(--icon-color-dark-default, #09091A);
}

.border-icon-color-highlighted {
  border-color: var(--color-primary-yellow-100, #FFC72C);
}

/* Tab state styling */
[data-state="highlighted"] {
  opacity: 1;
}

[data-state="default"]:hover {
  opacity: 0.8;
}

/* Navigation tabs active state styling */
[data-state="highlighted"] .bg-icon-color-highlighted {
  background-color: var(--color-primary-yellow-100, #FFC72C);
}
</style>
