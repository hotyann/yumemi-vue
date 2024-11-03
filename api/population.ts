/**
 * 地域単位、年単位の年齢構成のデータを取得します
 * @param prefCode 都道府県コード
 * @returns AxiosResponse
 */
export const getPopulationPerYear = (prefCode: string) => {
  const { $axios } = useNuxtApp();

  return $axios({
    url: '/api/v1/population/composition/perYear',
    method: 'get',
    params: {
      prefCode,
    },
  });
};
