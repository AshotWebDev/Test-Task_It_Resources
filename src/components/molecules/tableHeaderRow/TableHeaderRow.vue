<script setup>
import sortIconAsc from "@/assets/icons/icon_sort.svg";
import sortIconDesc from "@/assets/icons/icon_sort2.svg";
import { ref } from "vue";

const props = defineProps({
  theadData: Array,
  sort: Function,
});

const currentSortField = ref("id");
const currentSortOrder = ref("asc");

props.sort(currentSortField.value, currentSortOrder.value);

function toggleSort(field) {
  if (currentSortField.value === field) {
    currentSortOrder.value = currentSortOrder.value === "asc" ? "desc" : "asc";
  } else {
    currentSortField.value = field;
    currentSortOrder.value = "asc";
  }
  props.sort(field, currentSortOrder.value);
}

function getSortIcon(field) {
  if (currentSortField.value === field.toLowerCase()) {
    return currentSortOrder.value === "asc" ? sortIconAsc : sortIconDesc;
  }
  return sortIconDesc;
}

function getAriaSort(field) {
  const normalized = field.toLowerCase();
  if (currentSortField.value !== normalized) return "none";
  return currentSortOrder.value === "asc" ? "ascending" : "descending";
}
</script>


<template>
  <tr class="table_header_row">
    <th
      class="table_header_cell body2-bold"
      :class="index === 0 ? 'table_header_cell_first' : ''"
      v-for="(head, index) in theadData"
      :key="index"
      :aria-sort="getAriaSort(head)"
    >
      <span
        class="table_header_cell_content"
         v-if="head !== 'Phone' && head !== 'UserId'"
        role="button"
        tabindex="0"
        @click="toggleSort(head.toLowerCase())"
        @keydown.enter.prevent="toggleSort(head.toLowerCase())"
        @keydown.space.prevent="toggleSort(head.toLowerCase())"
      >
        {{ head }}
        <img
          :src="getSortIcon(head)"
          :alt="`Sort by ${head}`"
          :aria-label="`Sort by ${head}, ${getAriaSort(head)}`"
        />
      </span>

      <span v-else class="table_header_cell_content">
        {{ head }}
      </span>
    </th>

    <th class="table_header_cell table_header_cell_last body2-bold">
      <span class="table_header_cell_content">
        Actions
      </span>
    </th>
  </tr>
</template>



<style lang="scss" scoped>
.table_header_row {
  background-color: $gray-100;
  text-align: left;
  width: 100%;

 .table_header_cell {
  width: 14%;
  padding: 16px 12px;
  
  &_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $blue-900;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }           
}


  .table_header_cell_first {
    width: 5%;
  }

  .table_header_cell_last {
    text-align: right;
    width: 80px;

    .table_header_cell_content {
      flex-direction: row-reverse;
    }
  }
}
</style>
