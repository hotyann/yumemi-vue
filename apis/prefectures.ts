/**
 * 都道府県に関する一覧データを取得します
 * @returns AxiosResponse
 */
export const getPrefectures = () => {
  const { $axios } = useNuxtApp();

  return $axios({
    url: '/api/v1/prefectures',
    method: 'get',
  });
};
