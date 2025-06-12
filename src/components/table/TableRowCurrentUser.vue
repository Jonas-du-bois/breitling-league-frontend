<template>
  <div class="bg-color-primary-yellow-100 inline-flex justify-start items-start" @click="handleRowClick">
    <div class="w-96 px-8 py-1 flex justify-between items-center">
      <div class="w-6 justify-center text-color-secondary-black text-xs font-semibold font-['Italian_Plate_No2']">
        {{ rank || '####' }}
      </div>
      <div class="w-9 h-12 relative">
        <div class="w-9 h-12 left-0 top-0 absolute bg-color-secondary-black"></div>
      </div>
      <div class="w-20 justify-center text-color-secondary-black text-xs font-semibold font-['Italian_Plate_No2']">
        {{ name || 'pseudo user can take more place' }}
      </div>
      <div class="w-20 justify-center text-color-secondary-black text-xs font-semibold font-['Italian_Plate_No2']">
        {{ country || '###' }}
      </div>
      <div class="w-11 justify-center text-color-secondary-black text-xs font-semibold font-['Italian_Plate_No2']">
        {{ score || "#'###'###" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableRowCurrentUser',
  props: {
    rank: {
      type: [String, Number],
      default: '####'
    },
    name: {
      type: String,
      default: 'pseudo user can take more place'
    },
    country: {
      type: String,
      default: '###'
    },
    score: {
      type: [String, Number],
      default: "#'###'###"
    }
  },
  emits: ['row-click'],
  methods: {
    handleRowClick() {
      this.$emit('row-click', {
        rank: this.rank,
        name: this.name,
        country: this.country,
        score: this.score
      });
    }
  }
}
</script>

<style scoped>
/* Custom properties for exact color matching */
.bg-color-primary-yellow-100 {
  background-color: #FFC72C;
}

.text-color-secondary-black {
  color: #09091A;
}

.bg-color-secondary-black {
  background-color: #09091A;
}
</style>
