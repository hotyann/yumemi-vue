<script lang="ts" setup>
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

  // 都道府県データです
  let res: any = await $fetch('/api/prefectures');
  // 人口構成データです
  const graphData: Array<IGraphData> = reactive([]);

  /**
   * チェックボックスの選択が変更された時のデータ処理についてです
   * @param {IParams} params prefCode、prefName、isCheckedを含んでいます
   */
  const onCheckboxChanged = async (params: IParams) => {
    if (params.isChecked) {
      // チェックボックスが選択された時、人口構成データを取得します
      const res: any = await $fetch('/api/population', {
        query: {
          prefCode: params.prefCode,
        },
      });
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
  <div>
    <!-- 都道府県リスト -->
    <PrefectureContent
      :data="res.result"
      @checkbox-change="onCheckboxChanged"
    />
    <!-- 人口構成グラフ -->
    <PopulationGraph :data="graphData" />
  </div>
</template>
