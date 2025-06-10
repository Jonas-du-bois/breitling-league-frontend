<template>
  <div class="special-components-demo p-8 space-y-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Special Components Demo</h1>
    
    <!-- Carousel Slides Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Carousel Slides</h2>
      <div class="flex flex-wrap gap-6">
        <div class="bg-white p-4 rounded-lg shadow-lg">
          <h3 class="text-lg font-medium mb-2">First Prize</h3>
          <CarouselSlide
            prize-label="First prize"
            prize-description="Avenger B01 Chronograph 44 Night Mission"
            :active-slide="1"
            :total-slides="3"
          />
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-lg">
          <h3 class="text-lg font-medium mb-2">Second Prize</h3>
          <CarouselSlide
            prize-label="Second prize"
            prize-description="Top Time B01 Triumph"
            :active-slide="1"
            :total-slides="3"
          />
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-lg">
          <h3 class="text-lg font-medium mb-2">Third Prize</h3>
          <CarouselSlide
            prize-label="Third prize"
            prize-description="Avenger B01 Chronograph 44 Night Mission"
            :active-slide="2"
            :total-slides="3"
          />
        </div>
      </div>
    </section>

    <!-- Bonus Tickets Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Bonus Tickets</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center gap-4">
          <div class="text-center">
            <p class="text-sm text-gray-600 mb-2">Default Size</p>
            <BonusTicket size="default" bonus-value="+5" />
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-600 mb-2">Small Size</p>
            <BonusTicket size="small" bonus-value="+2" />
          </div>
        </div>
      </div>
    </section>

    <!-- Streak Steps Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Streak Steps</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center gap-4">
          <div class="text-center">
            <p class="text-sm text-gray-600 mb-2">Done State</p>
            <StreakStep state="done" />
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-600 mb-2">Non-Done State</p>
            <StreakStep state="non-done" />
          </div>
        </div>
      </div>
    </section>

    <!-- Streak Component Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Streak Component</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 mb-2">Default Streak (3 done, 2 pending)</p>
            <Streak />
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-2">Full Streak (all done)</p>
            <Streak :steps="fullStreakSteps" />
          </div>
        </div>
      </div>
    </section>

    <!-- Streak Global Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Streak Global Component</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <StreakGlobal />
      </div>    </section>

    <!-- Progress Circles Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Progress Circles</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Basic Progress Circle -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">Basic Progress (56%)</h3>
          <ProgressCircle :value="56" />
        </div>
        
        <!-- SVG Progress Circle -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">SVG Progress (75%)</h3>
          <SVGProgressCircle :value="75" color="#FFC72C" />
        </div>
        
        <!-- Different Sizes -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">Different Sizes</h3>
          <div class="flex justify-center items-center gap-4">
            <ProgressCircle :value="40" :size="60" />
            <ProgressCircle :value="56" :size="80" />
            <ProgressCircle :value="80" :size="100" />
          </div>
        </div>
        
        <!-- With Labels -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">With Labels</h3>
          <div class="flex justify-center gap-4">
            <ProgressCircle :value="65" label="Complete" :show-percentage="true" />
            <SVGProgressCircle :value="30" label="Loading" />
          </div>
        </div>
        
        <!-- Different Colors -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">Different Colors</h3>
          <div class="flex justify-center gap-4">
            <ProgressCircle :value="56" color="#22c55e" />
            <ProgressCircle :value="75" color="#ef4444" />
            <ProgressCircle :value="90" color="#3b82f6" />
          </div>
        </div>
        
        <!-- Interactive Progress -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">Interactive Progress</h3>
          <div class="space-y-4">
            <ProgressCircle :value="interactiveProgress" :animated="true" />
            <div class="flex justify-center gap-2">
              <button
                @click="decreaseProgress"
                class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                -10
              </button>
              <button
                @click="increaseProgress"
                class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                +10
              </button>
              <button
                @click="resetProgress"
                class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
            <p class="text-sm text-gray-600">Current: {{ interactiveProgress }}%</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Interactive Demo</h2>
      <div class="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div class="flex flex-wrap gap-4">
          <button
            @click="toggleStreakStep"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Toggle Streak Progress
          </button>
          <button
            @click="changeCarouselSlide"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Next Carousel Slide
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 mb-2">Interactive Carousel</p>
            <CarouselSlide
              :prize-label="currentPrize.label"
              :prize-description="currentPrize.description"
              :active-slide="currentSlideIndex"
              :total-slides="3"
            />
          </div>
          
          <div>
            <p class="text-sm text-gray-600 mb-2">Interactive Streak</p>
            <Streak :steps="interactiveStreakSteps" />
          </div>
        </div>
      </div>
    </section>

    <!-- Question Cards with Progress Circles Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-700">Question Cards with Progress Circles</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">        <!-- Question Card Example 1 - New Layout Design -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">New Layout - Center Progress Circle</h3>
          <QuestionCard 
            current-question="13"
            total-questions="20"
            time-remaining="56"
            :progress-value="65"
            question-text="What is the capital of France?"
            correct-answers="07"
            incorrect-answers="07"
          />
        </div>
          <!-- Question Card Example 2 -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">Mid-Progress Quiz</h3>
          <QuestionCard 
            current-question="8"
            total-questions="15"
            time-remaining="42"
            :progress-value="55"
            question-text="Which planet is known as the Red Planet?"
            correct-answers="05"
            incorrect-answers="02"
          />
        </div>
        
        <!-- Question Card Example 3 -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-lg font-medium mb-4">Early Stage Quiz</h3>
          <QuestionCard 
            current-question="3"
            total-questions="10"
            time-remaining="30"
            :progress-value="25"
            question-text="What is 2 + 2?"
            correct-answers="02"
            incorrect-answers="01"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CarouselSlide from './CarouselSlide.vue'
import BonusTicket from './BonusTicket.vue'
import StreakStep from './StreakStep.vue'
import Streak from './Streak.vue'
import StreakGlobal from './StreakGlobal.vue'
import ProgressCircle from './ProgressCircle.vue'
import SVGProgressCircle from './SVGProgressCircle.vue'
import QuestionCard from '../card/QuestionCard.vue'

export default {
  name: 'SpecialGroup',  components: {
    CarouselSlide,
    BonusTicket,
    StreakStep,
    Streak,
    StreakGlobal,
    ProgressCircle,
    SVGProgressCircle,
    QuestionCard
  },
  data() {
    return {
      currentSlideIndex: 0,
      prizes: [
        {
          label: 'First prize',
          description: 'Avenger B01 Chronograph 44 Night Mission'
        },
        {
          label: 'Second prize',
          description: 'Top Time B01 Triumph'
        },
        {
          label: 'Third prize',
          description: 'Avenger B01 Chronograph 44 Night Mission'
        }
      ],
      interactiveStreakSteps: [
        { state: 'done' },
        { state: 'done' },
        { state: 'non-done' },
        { state: 'non-done' },
        { state: 'non-done' }
      ],      fullStreakSteps: [
        { state: 'done' },
        { state: 'done' },
        { state: 'done' },
        { state: 'done' },
        { state: 'done' }
      ],
      interactiveProgress: 56
    }
  },
  computed: {
    currentPrize() {
      return this.prizes[this.currentSlideIndex]
    }
  },
  methods: {
    changeCarouselSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % 3
    },    toggleStreakStep() {
      const nextNonDoneIndex = this.interactiveStreakSteps.findIndex(step => step.state === 'non-done')
      if (nextNonDoneIndex !== -1) {
        this.interactiveStreakSteps[nextNonDoneIndex].state = 'done'
      } else {
        // Reset all to non-done if all are done
        this.interactiveStreakSteps.forEach(step => {
          step.state = 'non-done'
        })
        this.interactiveStreakSteps[0].state = 'done'
      }
    },
    increaseProgress() {
      this.interactiveProgress = Math.min(100, this.interactiveProgress + 10)
    },
    decreaseProgress() {
      this.interactiveProgress = Math.max(0, this.interactiveProgress - 10)
    },
    resetProgress() {
      this.interactiveProgress = 56
    }
  }
}
</script>

<style scoped>
.special-components-demo {
  font-family: 'Italian_Plate_No2', Arial, sans-serif;
}
</style>
