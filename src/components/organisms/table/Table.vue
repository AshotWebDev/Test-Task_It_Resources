<script setup>
import { defineAsyncComponent } from "vue";
const TableBodyRow = defineAsyncComponent(() => import("@/components/molecules/tableBodyRow/TableBodyRow.vue"));
const TableHeaderRow = defineAsyncComponent(() => import("@/components/molecules/tableHeaderRow/TableHeaderRow.vue"));

const props = defineProps({
  theadData: Array,
  paginatedData: Array,
  sort: Function,
  fetchById: Function
});

</script>

<template>

  <div class="table-wrapper">
    <table class="table">
      <thead class="table_header">
        <TableHeaderRow :theadData="theadData" :sort="props.sort"/>
      </thead>

      <tbody class="table_body">
        <TableBodyRow :paginatedData="props.paginatedData" :fetchById="props.fetchById"/>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto; 
  border: 1px solid $gray-300;
  border-radius: $radius-lg;
}

.table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;

  &_header {
    text-align: left;
    width: 100%;
  }

  &_body {
    text-align: left;
    width: 100%;
  }
}
</style>
