<script lang="ts" setup>
  import { getPrefectures, getPopulationPerYear } from '~/api';

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
  const res: any = await getPrefectures();

  /**
   * チェックボックスの選択が変更された時のデータ処理についてです
   * @param {IParams} params prefCode、prefName、isCheckedを含んでいます
   */
  const onCheckboxChanged = async (params: IParams) => {
    if (params.isChecked) {
      // チェックボックスが選択された時、人口構成データを取得します
      const res: any = await getPopulationPerYear(params.prefCode.toString());
      graphData.push({
        prefCode: params.prefCode,
        prefName: params.prefName,
        data: res.result,
      });
    } else {
      // 選択が解除された時、データを削除します
      const index = graphData.findIndex(
        (item: IGraphData) => item.prefCode === params.prefCode
      );
      if (index > -1) {
        graphData.splice(index, 1);
      }
    }
  };
</script>

<template>
  <NuxtLayout name="header">
    <!-- 都道府県リスト -->
    <PrefectureContent
      :data="res.result"
      @checkbox-change="onCheckboxChanged"
    />
    <!-- 人口構成グラフ -->
    <PopulationGraph :data="graphData" />
  </NuxtLayout>
</template>
