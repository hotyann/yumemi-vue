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
  defineProps<{
    data: Array<IPrefecture>; // 都道府県データです
  }>();

  const emit = defineEmits<IEmits>();

  /**
   * チェックボックスの選択が変更された時、親へ値を渡します
   * @param {IParams} params prefCode、prefName、isCheckedを含んでいます
   */
  const onCheckboxChanged = (params: IParams): void => {
    emit('checkboxChange', params);
  };
</script>

<template>
  <article>
    <h1>都道府県</h1>
    <section class="flex flex-wrap">
      <PrefectureItem
        v-for="item in data"
        :key="item.prefCode"
        :pref-code="item.prefCode"
        :pref-name="item.prefName"
        @checkbox-change="onCheckboxChanged"
      />
    </section>
  </article>
</template>
