<template>
  <div class="inline-flex justify-start items-center gap-1">
    <StreakStep 
      v-for="(step, index) in steps" 
      :key="index"
      :state="step.state"
    />
  </div>
</template>

<script>
import StreakStep from './StreakStep.vue'

export default {
  name: 'Streak',
  components: {
    StreakStep
  },
  props: {
    steps: {
      type: Array,
      default: () => [
        { state: 'done' },
        { state: 'done' },
        { state: 'done' },
        { state: 'non-done' },
        { state: 'non-done' }
      ]
    }
  }
}
</script>
