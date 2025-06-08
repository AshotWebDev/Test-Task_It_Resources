<script setup>
import sortIcon from '@/assets/icons/icon_sort.svg'
import { useUserStore } from '@/store/userStore'
import { ref } from 'vue'

const props = defineProps({
  theadData: Array
})

const userStore = useUserStore()

const currentSortField = ref('')
const currentSortOrder = ref('asc')

function toggleSort(field) {
  if (currentSortField.value === field) {
    currentSortOrder.value = currentSortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSortField.value = field
    currentSortOrder.value = 'asc'
  }
  userStore.sortUsers(field, currentSortOrder.value)
}
</script>

<template>
  <tr class="table_header_row">
    <th
      class="table_header_cell body2-bold"
      :class="index === 0 ? 'table_header_cell_first' : ''"
      v-for="(head, index) in theadData"
      :key="index"
    >
      <span class="table_header_cell_content">
        {{ head }}
        <img :src="sortIcon" alt="sort icon" @click="toggleSort(head.toLowerCase())" />
      </span>
    </th>
    <th class="table_header_cell table_header_cell_last body2-bold">
      <span class="table_header_cell_content">
        Actions
        <img :src="sortIcon" alt="sort" @click="userStore.resetSort()" />
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
