<template>
  <div class="w-96 px-8 py-2 border-b border-table-border-color inline-flex justify-between items-center">
    <div class="w-6 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
      {{ columns[0] || 'C1' }}
    </div>
    <div class="w-12 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
      {{ columns[1] || 'C2' }}
    </div>
    <div class="w-24 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
      {{ columns[2] || 'C3' }}
    </div>
    <div class="w-9 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
      {{ columns[3] || 'Country' }}
    </div>
    <div class="w-11 justify-center text-table-text-color text-xs font-normal font-['Italian_Plate_No2']">
      {{ columns[4] || 'C5' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    columns: {
      type: Array,
      default: () => ['C1', 'C2', 'C3', 'Country', 'C5']
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
