import { describe, test, vi, expect } from 'vitest';

interface IParams {
  prefCode: number;
  prefName: string;
  isChecked: boolean;
}

// Mock function for `emit`
const emit = vi.fn();

describe('Prefecture List Component', () => {
  // Function to test
  const onCheckboxChanged = (params: IParams): void => {
    emit('checkboxChange', params);
  };

  test('should emit "checkboxChange" event with correct parameters', () => {
    const params: IParams = { prefCode: 1, prefName: 'Tokyo', isChecked: true };
    onCheckboxChanged(params);

    expect(emit).toHaveBeenCalledWith('checkboxChange', params);
  });

  test('should correctly emit event when isChecked is false', () => {
    const params: IParams = {
      prefCode: 2,
      prefName: 'Osaka',
      isChecked: false,
    };
    onCheckboxChanged(params);

    expect(emit).toHaveBeenCalledWith('checkboxChange', params);
  });

  test('should emit event with different prefCode and prefName values', () => {
    const params: IParams = {
      prefCode: 3,
      prefName: 'Hokkaido',
      isChecked: true,
    };
    onCheckboxChanged(params);

    expect(emit).toHaveBeenCalledWith('checkboxChange', params);
  });
});
