<script lang="ts" setup>
  import { debounce } from '~/utils/common';

  // Interfaces
  interface IParams {
    prefCode: number;
    prefName: string;
    isChecked: boolean;
  }
  interface IEmits {
    (event: 'checkboxChange', params: IParams): void;
  }

  // Props
  const props = defineProps<{
    prefCode: number; // 都道府県コードです
    prefName: string; // 都道府県名です
  }>();

  // チェックボックスの値です
  const isChecked = ref(false);

  const emit = defineEmits<IEmits>();

  // チェックボックスの選択が変更された時、親へ値を渡します
  const fn = debounce(() => {
    emit('checkboxChange', {
      prefCode: props.prefCode,
      prefName: props.prefName,
      isChecked: isChecked.value,
    });
  }, 300);
  const onChanged = (): void => {
    fn();
  };
</script>

<template>
  <label
    class="flex items-center cursor-pointer text-gray-600 hover:text-gray-800"
  >
    <input
      v-model="isChecked"
      type="checkbox"
      :value="prefCode"
      class="mr-1 cursor-pointer"
      @change="onChanged"
    />
    {{ prefName }}
  </label>
</template>
