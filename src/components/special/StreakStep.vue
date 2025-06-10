<template>
  <div class="w-4 h-4 relative">
    <div 
      class="w-4 h-4 left-0 top-0 absolute rounded-full"
      :class="stateClass"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'StreakStep',
  props: {
    state: {
      type: String,
      default: 'non-done',
      validator: value => ['done', 'non-done'].includes(value)
    }
  },
  computed: {
    stateClass() {
      return this.state === 'done' 
        ? 'bg-color-primary-yellow-100' 
        : 'bg-color-primary-yellow-25'
    }
  }
}
</script>

<style scoped>
.bg-color-primary-yellow-100 {
  background-color: #FFC72C;
}

.bg-color-primary-yellow-25 {
  background-color: #FAF0C7;
}
</style>
