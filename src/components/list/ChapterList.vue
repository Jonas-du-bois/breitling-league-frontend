<template>
  <div class="chapter-list">
    <div class="w-96 inline-flex flex-col justify-start items-start">
      <ChapterCard 
        v-for="(chapter, index) in chapters" 
        :key="index"
        :data-status="chapter.status || 'default'"
        :data-with-highlight="chapter.withHighlight !== false"
        :title="chapter.title"
        :points-left="chapter.pointsLeft"
        :image-url="chapter.imageUrl"
        :show-time="chapter.showTime"
        :time-left="chapter.timeLeft"
        :bonus-multiplier="chapter.bonusMultiplier"
        :with-booster="chapter.withBooster"
        class="chapter-list-item"
        @chapter-click="handleChapterClick"
      />
    </div>
  </div>
</template>

<script>
import { ChapterCard } from '../card'

export default {
  name: 'ChapterList',
  components: {
    ChapterCard
  },
  props: {
    chapters: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          pointsLeft: "45'000",
          imageUrl: 'https://placehold.co/402x130',
          showTime: true,
          timeLeft: {
            days: 8,
            hours: 12,
            minutes: 24
          },
          bonusMultiplier: 'x2',
          withBooster: true,
          status: 'default',
          withHighlight: true
        },
        {
          id: 2,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          pointsLeft: "45'000",
          imageUrl: 'https://placehold.co/402x130',
          showTime: true,
          timeLeft: {
            days: 8,
            hours: 12,
            minutes: 24
          },
          bonusMultiplier: 'x2',
          withBooster: true,
          status: 'default',
          withHighlight: true
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          pointsLeft: "45'000",
          imageUrl: 'https://placehold.co/402x130',
          showTime: true,
          timeLeft: {
            days: 8,
            hours: 12,
            minutes: 24
          },
          bonusMultiplier: 'x2',
          withBooster: true,
          status: 'default',
          withHighlight: true
        },
        {
          id: 4,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          pointsLeft: "45'000",
          imageUrl: 'https://placehold.co/402x130',
          showTime: false,
          withBooster: false,
          status: 'default',
          withHighlight: true
        },
        {
          id: 5,
          title: 'Lorem ipsum dolor sit amet, consectetur adipisci.',
          pointsLeft: "45'000",
          imageUrl: 'https://placehold.co/402x130',
          showTime: false,
          withBooster: false,
          status: 'default',
          withHighlight: true
        }
      ]
    }
  },
  emits: ['chapter-click'],
  methods: {
    handleChapterClick(chapter) {
      this.$emit('chapter-click', chapter);
    }
  }
}
</script>

<style scoped>
.chapter-list {
  width: 100%;
  max-width: 384px; /* w-96 */
}

.chapter-list-item {
  width: 100%;
  padding-bottom: 2rem; /* pb-8 */
  background-color: var(--card-background-color-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem; /* gap-8 */
}

.chapter-list-item:not(:last-child) {
  border-bottom: 1px solid var(--color-primary-blue-100);
}

/* Custom properties for exact color matching */
:root {
  --card-background-color-light: #FFFFFF;
  --card-text-color-dark: #09091A;
  --color-primary-yellow-100: #FFC72C;
  --color-primary-blue-100: #072C54;
  --color-secondary-black: #000000;
}
</style>
