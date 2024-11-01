<script lang="ts" setup>
  defineProps<{
    prefName: string;
    prefCode: number;
  }>();
  const isChecked = ref(false);
</script>

<template>
  <div class="flex-child">
    <input v-model="isChecked" type="checkbox" :value="prefCode" />
    <label>{{ prefName }}</label>
  </div>
</template>

<style scoped>
  .flex-child {
    flex: none;
  }
</style>
