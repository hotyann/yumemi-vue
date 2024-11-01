<script lang="ts" setup>
  const currentCode = useState('currentCode', () => 0);
  const currentName = useState('currentName', () => '');

  const prefData: any = {};

  watch(currentCode, async () => {
    const { data } = await useFetch('/api/population', {
      query: {
        prefCode: currentCode.value,
        cityCode: '-',
      },
    });
    prefData.value = data.value;
  });
</script>

<template>
  <div>
    <h2>{{ currentName }} の人口構成</h2>
    <p>※実績値と推計値の区切り年：{{ prefData.result?.boundaryYear }}</p>
    <div class="flex">
      <table v-for="item1 in prefData.result?.data" :key="item1.label">
        <caption>
          {{
            item1.label
          }}
        </caption>
        <tbody>
          <tr>
            <th>年</th>
            <th>人口</th>
            <th>率</th>
          </tr>
          <tr v-for="item2 in item1.data" :key="item2.year">
            <td>{{ item2.year }}</td>
            <td>{{ item2.value }}</td>
            <td>{{ item2.rate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
  .flex {
    display: flex;
  }
  .flex > table {
    flex: 1;
    border: solid 1px;
  }
  td,
  th {
    text-align: right;
  }
</style>
