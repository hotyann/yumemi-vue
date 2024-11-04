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
    <h1
      class="bg-gray-400 text-white inline-block px-3 py-1.5 rounded-sm tracking-widest"
    >
      都道府県
    </h1>
    <section
      class="grid grid-cols-4 gap-x-4 gap-y-0.5 md:gap-x-16 lg:gap-x-28 xl:gap-x-40 mt-4"
    >
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
