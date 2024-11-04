<script lang="ts" setup>
  // Interfaces
  interface IGraphData {
    prefCode: number;
    prefName: string;
    data: IPopulationPerYear;
  }

  // Props
  const props = defineProps<{
    data: Array<IGraphData>; // 人口構成データです
  }>();

  // ドロップダウンの値です
  const selectValue = ref('');

  // ドロップダウンの選択肢です（総人口、年少人口、生産年齢人口、老年人口）
  const selectOptions = computed(() => {
    if (Array.isArray(props.data) && props.data.length) {
      if (Array.isArray(props.data[0].data.data)) {
        return props.data[0].data.data.map((item) => item.label);
      }
    }
    return [];
  });

  // Configuration options from https://api.highcharts.com/highcharts/
  const chartOptions = computed(() => {
    // データの開始年
    let pointStart = 1960;
    // データの間隔
    let pointInterval = 5;
    // グラフ用のデータシリーズ
    let series: Array<object> = [];

    if (Array.isArray(props.data)) {
      // データをreduceで処理し、シリーズデータを構築します
      series = props.data.reduce((prev: Array<object>, current) => {
        let population: Array<IPopulation> = [];

        if (Array.isArray(current.data.data)) {
          // 選択されたジャンルに一致するデータを検索します
          const find = current.data.data.find(
            (elem) => elem.label === selectValue.value
          );

          if (Array.isArray(find?.data)) {
            // 見つかったデータのうち、境界年以下のデータのみをフィルターします
            population = find.data.filter(
              (item) => item.year <= current.data.boundaryYear
            );
          }
        }

        // populationが複数のデータを持つ場合、pointStartとpointIntervalを再計算します
        if (population.length > 1) {
          pointStart = population[0].year;
          pointInterval = population[1].year - population[0].year;
        }

        const data: Array<number | null> = [];

        // 境界年まで指定の間隔でデータを生成します
        for (
          let year = pointStart;
          year <= current.data.boundaryYear;
          year += pointInterval
        ) {
          const find = population.find((elem) => elem.year === year);
          data.push(find?.value || null);
        }

        prev.push({
          name: current.prefName,
          data,
        });

        return prev;
      }, []);
    }

    return {
      title: {
        text: '',
      },

      yAxis: {
        title: {
          align: 'high',
          text: '人口数',
          rotation: 0,
        },
      },

      xAxis: {
        title: {
          align: 'high',
          text: '年度',
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart,
          pointInterval,
        },
      },

      series,

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                title: {
                  rotation: 270,
                },
              },
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        enabled: false,
      },
    };
  });
</script>

<template>
  <article v-if="data.length">
    <PopulationSelect v-model="selectValue" :options="selectOptions" />
    <section>
      <ClientOnly>
        <highcharts :options="chartOptions" />
      </ClientOnly>
    </section>
  </article>
</template>
