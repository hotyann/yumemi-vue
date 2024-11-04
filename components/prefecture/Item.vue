<script lang="ts" setup>
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
  const onChanged = (): void => {
    emit('checkboxChange', {
      prefCode: props.prefCode,
      prefName: props.prefName,
      isChecked: isChecked.value,
    });
  };
</script>

<template>
  <div class="flex items-center">
    <input
      :id="prefName"
      v-model="isChecked"
      class="peer cursor-pointer"
      type="checkbox"
      :value="prefCode"
      @change="onChanged"
    />
    <label
      class="ml-1 cursor-pointer text-gray-600 hover:text-gray-800 peer-hover:text-gray-800"
      :for="prefName"
      >{{ prefName }}</label
    >
  </div>
</template>
