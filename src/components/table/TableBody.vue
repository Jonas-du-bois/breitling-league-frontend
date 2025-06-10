<template>
  <div class="inline-flex flex-col justify-start items-start">
    <!-- Current User Row -->
    <div 
      v-if="currentUser" 
      data-status="current-user" 
      class="bg-table-current-user-bg inline-flex justify-start items-start"
      @click="handleRowClick(currentUser, 'current-user')"
    >
      <div class="w-96 px-8 py-1 flex justify-between items-center">
        <div class="w-6 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
          {{ currentUser.rank || '####' }}
        </div>
        <div class="w-9 h-12 relative">
          <div class="w-9 h-12 left-0 top-0 absolute bg-table-avatar-bg" :style="{ backgroundImage: currentUser.avatar ? `url(${currentUser.avatar})` : 'none' }"></div>
        </div>
        <div class="w-24 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
          {{ currentUser.username || 'pseudo user can take more place' }}
        </div>
        <div class="w-9 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
          {{ currentUser.country || '###' }}
        </div>
        <div class="w-11 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
          {{ currentUser.score || "#'###'###" }}
        </div>
      </div>
    </div>

    <!-- Regular Player Rows -->
    <div 
      v-for="(player, index) in players" 
      :key="index"
      data-status="default" 
      class="inline-flex justify-start items-start"
      @click="handleRowClick(player, 'default')"
    >
      <div class="w-96 px-8 py-1 flex justify-between items-center">
        <div class="w-6 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
          {{ player.rank || '####' }}
        </div>
        <div class="w-9 h-12 relative">
          <div class="w-9 h-12 left-0 top-0 absolute bg-table-avatar-bg" :style="{ backgroundImage: player.avatar ? `url(${player.avatar})` : 'none' }"></div>
        </div>
        <div class="w-24 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
          {{ player.username || 'pseudo user can take more place' }}
        </div>
        <div class="w-9 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
          {{ player.country || '###' }}
        </div>
        <div class="w-11 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
          {{ player.score || "#'###'###" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
    players: {
      type: Array,
      default: () => [
        {
          rank: '1',
          avatar: null,
          username: 'Top Player',
          country: 'FR',
          score: '1,234,567'
        },
        {
          rank: '2',
          avatar: null,
          username: 'Second Place',
          country: 'US',
          score: '987,654'
        },
        {
          rank: '3',
          avatar: null,
          username: 'Third Place',
          country: 'DE',
          score: '765,432'
        }
      ]
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['row-click'],
  methods: {
    handleRowClick(player, type) {
      this.$emit('row-click', { player, type });
    }
  }
}
</script>

<style scoped>
/* Custom properties for exact color matching */
:root {
  --table-text-color: #09091A;
  --table-avatar-bg: #09091A;
  --table-current-user-bg: #FFC72C;
}

/* Hover effect for rows */
[data-status="default"]:hover {
  background-color: rgba(9, 9, 26, 0.02);
}

[data-status="current-user"]:hover {
  background-color: rgba(255, 199, 44, 0.8);
}
</style>
