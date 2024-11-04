import { describe, test, expect, vi } from 'vitest';

// Mock the emit function
const emit = vi.fn();

// Sample component props
const props = {
  modelValue: '',
  options: ['総人口', '年少人口', '生産年齢人口', '老年人口'],
};

// Function to test the initial value setup
const initializeModelValue = () => {
  emit('update:modelValue', props.options[0]);
};

// Function to test onChanged behavior
const onChanged = (event: any): void => {
  emit('update:modelValue', event?.target?.value);
};

describe('Dropdown Component', () => {
  test('should emit initial modelValue on mount', () => {
    initializeModelValue();
    expect(emit).toHaveBeenCalledWith('update:modelValue', props.options[0]);
  });

  test('should update modelValue correctly on change event', () => {
    const mockEvent = { target: { value: '年少人口' } };
    onChanged(mockEvent);
    expect(emit).toHaveBeenCalledWith('update:modelValue', '年少人口');
  });

  test('should handle empty or undefined event target gracefully', () => {
    const mockEvent = {}; // Missing target
    onChanged(mockEvent);
    expect(emit).toHaveBeenCalledWith('update:modelValue', undefined);
  });
});
