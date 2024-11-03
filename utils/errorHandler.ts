/**
 * レスポンス エラーの処理
 * @param error
 */
export const axiosErrorHandler = (error: any) => {
  switch (error?.response?.status) {
    case 400: // 400 Bad Request
      alert(
        '[400 Bad Request] 必須パラメータの設定が漏れていないか、正しいフォーマットで設定できているか、等をご確認ください。'
      );
      break;
    case 403: // 403 Forbidden
      alert('[403 Forbidden] API キーが正しく設定されているかご確認ください。');
      break;
    case 404: // 404 Not Found
      alert('[404 Not Found] API のアドレスが正しいかをご確認ください。');
      break;
    case 500: // 500 Internal Server Error
      alert(
        '[500 Internal Server Error] しばらく時間をおいて再度お試しください。'
      );
      break;
    default:
      break;
  }
};
