<script lang="ts" setup>
  // Interfaces
  interface IEmits {
    (event: 'update:modelValue', value: string): void;
  }

  // Props
  const props = defineProps<{
    modelValue: string; // ドロップダウンの値です
    options: Array<string>; // ドロップダウンの選択肢です（総人口、年少人口、生産年齢人口、老年人口）
  }>();

  const emit = defineEmits<IEmits>();

  // 初期値を設定します
  emit('update:modelValue', props.options[0]);

  /**
   * ドロップダウンの選択が変更された時、親にバインドされている値を更新します
   * @param {any} event change event
   */
  const onChanged = (event: any): void => {
    emit('update:modelValue', event?.target?.value);
  };
</script>

<template>
  <div v-if="options.length" class="w-32 ml-8 sm:ml-14">
    <select :value="modelValue" @change="onChanged">
      <option v-for="item in options" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>
