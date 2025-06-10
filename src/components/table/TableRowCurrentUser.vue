<template>
  <div class="bg-table-current-user-bg inline-flex justify-start items-start" @click="handleRowClick">
    <div class="w-96 px-8 py-1 flex justify-between items-center">
      <div class="w-6 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
        {{ player.rank || '####' }}
      </div>
      <div class="w-9 h-12 relative">
        <div class="w-9 h-12 left-0 top-0 absolute bg-table-avatar-bg" :style="{ backgroundImage: player.avatar ? `url(${player.avatar})` : 'none' }"></div>
      </div>
      <div class="w-24 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
        {{ player.username || 'pseudo user can take more place' }}
      </div>
      <div class="w-9 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
        {{ player.country || '###' }}
      </div>
      <div class="w-11 justify-center text-table-text-color text-xs font-semibold font-['Italian_Plate_No2']">
        {{ player.score || "#'###'###" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableRowCurrentUser',
  props: {
    player: {
      type: Object,
      default: () => ({
        rank: '####',
        avatar: null,
        username: 'pseudo user can take more place',
        country: '###',
        score: "#'###'###"
      })
    }
  },
  emits: ['row-click'],
  methods: {
    handleRowClick() {
      this.$emit('row-click', this.player);
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
</style>
