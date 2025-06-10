<template>
  <div class="w-80 inline-flex justify-between items-center">
    <!-- Bonus tickets -->
    <BonusTicket 
      v-for="(ticket, index) in bonusTickets" 
      :key="'bonus-' + index"
      :size="ticket.size"
      :bonus-value="ticket.value"
    />
    
    <!-- Streak steps -->
    <div class="flex justify-start items-center gap-1">
      <StreakStep 
        v-for="(step, index) in streakSteps" 
        :key="'step-' + index"
        :state="step.state"
      />
    </div>
    
    <!-- Main bonus ticket -->
    <BonusTicket 
      :size="mainBonus.size"
      :bonus-value="mainBonus.value"
    />
    
    <!-- Additional bonus tickets -->
    <BonusTicket 
      v-for="(ticket, index) in additionalTickets" 
      :key="'additional-' + index"
      :size="ticket.size"
      :bonus-value="ticket.value"
    />
  </div>
</template>

<script>
import BonusTicket from './BonusTicket.vue'
import StreakStep from './StreakStep.vue'

export default {
  name: 'StreakGlobal',
  components: {
    BonusTicket,
    StreakStep
  },
  props: {
    bonusTickets: {
      type: Array,
      default: () => [
        { size: 'small', value: '+1' },
        { size: 'small', value: '+2' }
      ]
    },
    streakSteps: {
      type: Array,
      default: () => [
        { state: 'done' },
        { state: 'done' },
        { state: 'done' },
        { state: 'non-done' },
        { state: 'non-done' }
      ]
    },
    mainBonus: {
      type: Object,
      default: () => ({ size: 'default', value: '+3' })
    },
    additionalTickets: {
      type: Array,
      default: () => [
        { size: 'small', value: '+4' },
        { size: 'small', value: '+5' },
        { size: 'small', value: '+6' },
        { size: 'small', value: '+7' }
      ]
    }
  }
}
</script>
