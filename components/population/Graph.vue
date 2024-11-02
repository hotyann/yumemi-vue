<script lang="ts" setup>
  // Interfaces
  interface IGraphData {
    prefCode: number;
    prefName: string;
    data: IPopulationPerYear;
  }

  // Props
  const props = defineProps<{
    data: Array<IGraphData>;
  }>();

  // Configuration options from https://api.highcharts.com/highcharts/
  const chartOptions = computed(() => {
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
          // TODO: データに基づいて数値を取得する必要があります
          pointStart: 1960,
          pointInterval: 5,
        },
      },

      // TODO: ある年のデータがない場合を考慮しなければなりません
      // TODO: 総人口だけでなく、他の種類も表示できるようにします
      series: props.data.map((item: IGraphData) => {
        return {
          name: item.prefName,
          data: item.data.data[0].data
            .filter((elem: IPopulation) => elem.year <= item.data.boundaryYear)
            .map((elem: IPopulation) => elem.value),
        };
      }),

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
    };
  });
</script>

<template>
  <article>
    <section>
      <highcharts :options="chartOptions" />
    </section>
  </article>
</template>
