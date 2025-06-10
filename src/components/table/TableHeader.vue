<template>
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
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    headers: {
      type: Array,
      default: () => ['Rank', 'Avatar', 'Pseudo', 'Country', 'Score']
    }
  }
}
</script>

<style scoped>
/* Custom properties for exact color matching */
:root {
  --table-border-color: #09091A;
  --table-text-color: #09091A;
}
</style>
