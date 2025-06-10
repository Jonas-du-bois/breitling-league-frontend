<template>
  <div class="data-table">
    <!-- Table Header -->
    <div class="w-96 px-8 py-2 border-b-2 border-table-border-color inline-flex justify-between items-center">
      <div class="w-6 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
        Rank
      </div>
      <div class="w-12 opacity-0 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
        Avatar
      </div>
      <div class="w-24 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
        Pseudo
      </div>
      <div class="w-9 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
        Country
      </div>
      <div class="w-11 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
        Score
      </div>
    </div>

    <!-- Table Body -->
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
            <div 
              class="w-9 h-12 left-0 top-0 absolute bg-table-avatar-bg rounded-full"
              :style="{ 
                backgroundImage: currentUser.avatar ? `url(${currentUser.avatar})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
            ></div>
          </div>
          <div class="w-24 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
            {{ currentUser.username || 'pseudo user can take more place' }}
          </div>
          <div class="w-9 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
            {{ currentUser.country || '###' }}
          </div>
          <div class="w-11 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
            {{ formatScore(currentUser.score) || "#'###'###" }}
          </div>
        </div>
      </div>

      <!-- Regular Player Rows -->
      <div 
        v-for="(player, index) in players" 
        :key="index"
        data-status="default" 
        class="inline-flex justify-start items-start hover:bg-table-row-hover cursor-pointer"
        @click="handleRowClick(player, 'default')"
      >
        <div class="w-96 px-8 py-1 flex justify-between items-center">
          <div class="w-6 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
            {{ player.rank || '####' }}
          </div>
          <div class="w-9 h-12 relative">
            <div 
              class="w-9 h-12 left-0 top-0 absolute bg-table-avatar-bg rounded-full"
              :style="{ 
                backgroundImage: player.avatar ? `url(${player.avatar})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }"
            ></div>
          </div>
          <div class="w-24 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
            {{ player.username || 'pseudo user can take more place' }}
          </div>
          <div class="w-9 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
            {{ player.country || '###' }}
          </div>
          <div class="w-11 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
            {{ formatScore(player.score) || "#'###'###" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    players: {
      type: Array,
      default: () => [
        {
          rank: '1',
          avatar: null,
          username: 'TopPlayer123',
          country: 'FR',
          score: 1234567
        },
        {
          rank: '2',
          avatar: null,
          username: 'SecondPlace',
          country: 'US',
          score: 987654
        },
        {
          rank: '3',
          avatar: null,
          username: 'ThirdPlace',
          country: 'DE',
          score: 765432
        },
        {
          rank: '4',
          avatar: null,
          username: 'FourthRank',
          country: 'JP',
          score: 654321
        },
        {
          rank: '5',
          avatar: null,
          username: 'FifthPosition',
          country: 'UK',
          score: 543210
        }
      ]
    },
    currentUser: {
      type: Object,
      default: () => ({
        rank: '15',
        avatar: null,
        username: 'CurrentUser',
        country: 'FR',
        score: 123456
      })
    },
    showCurrentUser: {
      type: Boolean,
      default: true
    }
  },
  emits: ['row-click', 'user-click'],
  methods: {
    handleRowClick(player, type) {
      this.$emit('row-click', { player, type });
      if (type === 'current-user') {
        this.$emit('user-click', player);
      }
    },
    formatScore(score) {
      if (!score) return "#'###'###";
      if (typeof score === 'number') {
        return score.toLocaleString().replace(/,/g, "'");
      }
      return score;
    }
  }
}
</script>

<style scoped>
.data-table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Custom properties for exact color matching */
:root {
  --table-border-color: #09091A;
  --table-text-color: #09091A;
  --table-avatar-bg: #09091A;
  --table-current-user-bg: #FFC72C;
  --table-row-hover: rgba(9, 9, 26, 0.02);
}

/* Hover effects */
[data-status="current-user"]:hover {
  background-color: rgba(255, 199, 44, 0.8) !important;
}

/* Avatar placeholder styling */
.bg-table-avatar-bg {
  background-color: var(--table-avatar-bg);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .data-table {
    overflow-x: auto;
  }
}
</style>
