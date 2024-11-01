<script lang="ts" setup>
  const currentCode = useState('currentCode', () => 0);
  const currentName = useState('currentName', () => '');

  const { data } = useFetch('/api/prefectures');
</script>

<template>
  <div>
    <h1>都道府県の人口構成</h1>
    <h2>都道府県</h2>
    <div class="flex">
      <PrefectureItem
        v-for="item in data.result"
        :key="item.prefCode"
        :pref-code="item.prefCode"
        :pref-name="item.prefName"
        @click="
          currentCode = item.prefCode;
          currentName = item.prefName;
        "
      />
    </div>
    <PopulationGraph />
  </div>
</template>

<style scoped>
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
</style>
