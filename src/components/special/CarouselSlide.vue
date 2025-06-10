<template>
  <div class="w-96 h-64 relative">
    <div class="w-96 h-64 p-8 left-0 top-0 absolute bg-gradient-to-l from-black to-black/0 inline-flex flex-col justify-end items-start gap-6">
      <div class="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div class="self-stretch justify-start text-color-primary-yellow-100 text-xl font-bold font-['Inter'] uppercase">{{ prizeLabel }}</div>
        <div class="w-40 justify-start text-color-primary-yellow-10 text-xs font-bold font-['Inter']">{{ prizeDescription }}</div>
      </div>
      <div class="inline-flex justify-center items-end gap-1">
        <div 
          v-for="(slide, index) in totalSlides" 
          :key="index"
          :data-state="index === activeSlide ? 'current' : 'default'"
          class="w-7 h-1 relative"
        >
          <div 
            class="w-7 h-1 left-0 top-0 absolute"
            :class="index === activeSlide ? 'bg-color-primary-yellow-100' : 'bg-color-primary-yellow-10'"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselSlide',
  props: {
    prizeLabel: {
      type: String,
      required: true
    },
    prizeDescription: {
      type: String,
      required: true
    },
    activeSlide: {
      type: Number,
      default: 0
    },
    totalSlides: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style scoped>
.text-color-primary-yellow-100 {
  color: #FFC72C;
}

.text-color-primary-yellow-10 {
  color: #FDF8E9;
}

.bg-color-primary-yellow-100 {
  background-color: #FFC72C;
}

.bg-color-primary-yellow-10 {
  background-color: #FDF8E9;
}
</style>
