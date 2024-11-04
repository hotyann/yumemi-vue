import { describe, test, expect } from 'vitest';

describe('Population Graph Component', () => {
  const selectValue = ref('');

  // Sample test data
  const props = {
    data: [
      {
        prefCode: 1,
        prefName: 'Tokyo',
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                { year: 1960, value: 1000 },
                { year: 1965, value: 1500 },
                { year: 1970, value: 1800 },
              ],
            },
          ],
        },
      },
      {
        prefCode: 2,
        prefName: 'Osaka',
        data: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                { year: 1960, value: 900 },
                { year: 1965, value: 1200 },
                { year: 1970, value: 1600 },
              ],
            },
          ],
        },
      },
    ],
  };

  // Computed properties for tests
  const selectOptions = computed(() => {
    if (Array.isArray(props.data) && props.data.length) {
      if (Array.isArray(props.data[0].data.data)) {
        return props.data[0].data.data.map((item) => item.label);
      }
    }
    return [];
  });

  const chartOptions = computed(() => {
    let pointStart = 1960;
    let pointInterval = 5;
    let series: Array<object> = [];

    if (Array.isArray(props.data)) {
      series = props.data.reduce((prev: Array<object>, current) => {
        let population: Array<IPopulation> = [];
        const find = current.data.data.find(
          (elem) => elem.label === selectValue.value
        );

        if (Array.isArray(find?.data)) {
          population = find.data.filter(
            (item) => item.year <= current.data.boundaryYear
          );
        }

        if (population.length > 1) {
          pointStart = population[0].year;
          pointInterval = population[1].year - population[0].year;
        }

        const data = [];
        for (
          let year = pointStart;
          year <= current.data.boundaryYear;
          year += pointInterval
        ) {
          const foundData = population.find((elem) => elem.year === year);
          data.push(foundData?.value || null);
        }

        prev.push({
          name: current.prefName,
          data,
        });

        return prev;
      }, []);
    }

    return {
      plotOptions: {
        series: {
          pointStart,
          pointInterval,
        },
      },
      series,
    };
  });

  test('should compute correct select options based on props.data', () => {
    expect(selectOptions.value).toEqual(['総人口']);
  });

  test('should compute correct graph series when selectValue is empty', () => {
    selectValue.value = '総人口';
    const expectedSeries = [
      {
        name: 'Tokyo',
        data: [
          1000,
          1500,
          1800,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      },
      {
        name: 'Osaka',
        data: [
          900,
          1200,
          1600,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      },
    ];
    expect(chartOptions.value.series).toEqual(expectedSeries);
  });

  test('should compute correct graph series with different pointStart and pointInterval', () => {
    selectValue.value = '総人口';
    const { pointStart, pointInterval } = chartOptions.value.plotOptions.series;
    expect(pointStart).toBe(1960);
    expect(pointInterval).toBe(5);
  });
});
