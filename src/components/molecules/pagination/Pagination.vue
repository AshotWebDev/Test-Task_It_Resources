<script setup>
import { computed } from 'vue'
import chevronLeftIcon from "@/assets/icons/chevronLeftIcon.svg";
import chevronRightIcon from "@/assets/icons/chevronRightIcon.svg";
import { defineAsyncComponent } from 'vue';
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));
const props = defineProps({
  store: Object
})

const pages = computed(() => {
  const arr = []
  for(let i = 1; i <= props.store.totalPages; i++) {
    arr.push(i)
  }
  return arr
})

const goToPage = (page) => {
  props.store.goToPage(page)
}
</script>

<template>
  <nav class="pagination">
    <Button  variant="primary" size="small" type="button"  :icon="chevronLeftIcon" :disabled="props.store.currentPage === 1" :onclick="props.store.prevPage"  ariaLabel="Previous"/>

    <Button
      v-for="page in pages"
      :key="page"
      :variant="page === props.store.currentPage ? 'primary' : 'secondary'"
      size="small"
      type="button"
      :txt="page"
      :onclick="() => goToPage(page)"
      :ariaLabel="`Go to page ${page}`"
    />

    <Button  variant="primary" size="small" type="button"  :icon="chevronRightIcon" :disabled="props.store.currentPage === props.store.totalPages" :onclick="props.store.nextPage" ariaLabel="Next"/>
  </nav>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 8px;
  justify-content: end;
  margin-top: 30px;
}


</style>
