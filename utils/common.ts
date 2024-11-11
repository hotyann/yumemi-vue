/**
 * debounce関数
 * 指定した待機時間内に呼び出された場合、最後の1回のみ関数を実行します。
 * これにより、頻繁なイベントを制御し、パフォーマンスを向上させることができます。
 *
 * @param func - 実行したい関数
 * @param delay - 待機時間（ミリ秒単位）
 * @returns デバウンスされた関数
 */
export const debounce = <T extends (...args: Array<any>) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
