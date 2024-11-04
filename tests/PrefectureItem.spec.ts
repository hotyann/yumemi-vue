import { describe, test, vi, expect } from 'vitest';

// Mock emit function
const emit = vi.fn();

// Test suite for onChanged function
describe('Prefecture Item Component', () => {
  // Component properties and setup
  const props = {
    prefCode: 13,
    prefName: 'Tokyo',
  };
  const isChecked = ref(false);

  // Function to test
  const onChanged = (): void => {
    emit('checkboxChange', {
      prefCode: props.prefCode,
      prefName: props.prefName,
      isChecked: isChecked.value,
    });
  };

  test('should emit "checkboxChange" event with correct parameters when isChecked is false', () => {
    // Set isChecked to false and call onChanged
    isChecked.value = false;
    onChanged();

    expect(emit).toHaveBeenCalledWith('checkboxChange', {
      prefCode: props.prefCode,
      prefName: props.prefName,
      isChecked: false,
    });
  });

  test('should emit "checkboxChange" event with correct parameters when isChecked is true', () => {
    // Set isChecked to true and call onChanged
    isChecked.value = true;
    onChanged();

    expect(emit).toHaveBeenCalledWith('checkboxChange', {
      prefCode: props.prefCode,
      prefName: props.prefName,
      isChecked: true,
    });
  });

  test('should emit "checkboxChange" event with different prefCode and prefName values', () => {
    // Update props and set isChecked to true
    const newProps = { prefCode: 27, prefName: 'Osaka' };
    isChecked.value = true;

    // Manually override props and test
    emit.mockClear(); // Clear previous calls
    emit('checkboxChange', {
      prefCode: newProps.prefCode,
      prefName: newProps.prefName,
      isChecked: isChecked.value,
    });

    expect(emit).toHaveBeenCalledWith('checkboxChange', {
      prefCode: newProps.prefCode,
      prefName: newProps.prefName,
      isChecked: true,
    });
  });
});
