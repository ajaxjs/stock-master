<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :data-source="data"
      :row-key="(row) => row.id"
      ref="actionRef"
      :scroll-x="1360"
      :pagination="pagination"
    />
  </n-card>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { getStockBasicApi } from '@/api/stock/basic';

  const data = ref([]);
  interface Column {
    title: string;
    key: string;
    helpMessage?: string;
  }

  const columns = ref<Column[]>([]);
  // 分页
  const pagination = reactive({
    page: 2,
    pageSize: 100,
    showSizePicker: true,
    pageSizes: [100, 300, 500],
    onChange: (page: number) => {
      pagination.page = page;
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
    },
  });
  // 加载
  function loadDataTable() {
    return getStockBasicApi().then((res) => {
      const { fields, items, field_map } = res;
      columns.value = [];
      fields.forEach((key: string) => {
        const fieldKey = field_map[key];
        columns.value.push({
          title: fieldKey[0],
          key,
          helpMessage: fieldKey[1]
        });
      });
      console.log(columns.value);

      console.log(items);
      data.value = items.splice(0, 50);
      return [];
    });
  }
  onMounted(loadDataTable);
</script>

<style lang="scss" scoped></style>
