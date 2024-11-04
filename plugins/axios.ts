import axios from 'axios';

import { axiosErrorHandler } from '~/utils/errorHandler';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.baseURL,
    timeout: 5000,
    headers: {
      'X-API-KEY': config.public.apiKey,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  // リクエスト インターセプターを追加します
  instance.interceptors.request.use(
    (config) => {
      // リクエストが送信される前の処理
      return config;
    },
    (error) => {
      // リクエスト エラーの処理
      return Promise.reject(error);
    }
  );

  // レスポンス インターセプターを追加します
  instance.interceptors.response.use(
    (response) => {
      // ステータスコードが 2xx の範囲にある場合、この関数が起動します
      // レスポンス データの処理
      return response.data;
    },
    (error) => {
      // ステータスコードが 2xx の範囲外の場合、この関数が起動します
      // レスポンス エラーの処理
      axiosErrorHandler(error);
      return Promise.reject(error);
    }
  );

  nuxtApp.provide('axios', instance);
});
