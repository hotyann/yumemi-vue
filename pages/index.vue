<script lang="ts" setup>
  import { getPrefectures, getPopulationPerYear } from '~/apis';

  // Interfaces
  interface IParams {
    prefCode: number;
    prefName: string;
    isChecked: boolean;
  }
  interface IGraphData {
    prefCode: number;
    prefName: string;
    data: IPopulationPerYear;
  }

  // 人口構成データです
  const graphData: Array<IGraphData> = reactive([]);

  // 都道府県データを取得します
  const res = await getPrefectures().catch(() => {});
  let result: Array<IPrefecture> = [];
  if (Array.isArray(res?.data?.result)) {
    result = res.data.result;
  }

  /**
   * チェックボックスの選択が変更された時のデータ処理についてです
   * @param {IParams} params prefCode、prefName、isCheckedを含んでいます
   */
  const onCheckboxChanged = async (params: IParams) => {
    // 選択が変更された時、既存データを削除します
    const index = graphData.findIndex(
      (item) => item.prefCode === params.prefCode
    );
    if (index > -1) {
      graphData.splice(index, 1);
    }
    if (params.isChecked) {
      // チェックボックスが選択された時、人口構成データを取得します
      const res = await getPopulationPerYear(params.prefCode?.toString()).catch(
        () => {}
      );
      if (res?.data?.result) {
        graphData.push({
          prefCode: params.prefCode,
          prefName: params.prefName,
          data: res.data.result,
        });
      }
    }
  };
</script>

<template>
  <NuxtLayout name="header">
    <!-- 都道府県リスト -->
    <div class="flex justify-center mt-8">
      <PrefectureContent :data="result" @checkbox-change="onCheckboxChanged" />
    </div>
    <!-- 人口構成グラフ -->
    <div class="my-8 px-4 md:px-8 lg:px-12 xl:px-16">
      <PopulationGraph :data="graphData" />
    </div>
  </NuxtLayout>
</template>
