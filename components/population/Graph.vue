<script lang="ts" setup>
  // Interfaces
  interface IGraphData {
    prefCode: number;
    prefName: string;
    data: IPopulationPerYear;
  }

  // Props
  defineProps<{
    data: Array<IGraphData>;
  }>();
</script>

<template>
  <div v-for="item in data" :key="item.prefCode">{{ item.data }}</div>
</template>
