<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/userStore'
import chevronLeftIcon from "@/assets/icons/chevronLeftIcon.svg";
import chevronRightIcon from "@/assets/icons/chevronRightIcon.svg";
import { defineAsyncComponent } from 'vue';
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));
const usersStore = useUserStore()

const pages = computed(() => {
  const arr = []
  for(let i = 1; i <= usersStore.totalPages; i++) {
    arr.push(i)
  }
  return arr
})

const goToPage = (page) => {
  usersStore.goToPage(page)
}
</script>

<template>
  <nav class="pagination">
    <Button  variant="primary" size="small" type="button"  :icon="chevronLeftIcon" :disabled="usersStore.currentPage === 1" :onclick="usersStore.prevPage"  ariaLabel="Previous"/>

    <Button
      v-for="page in pages"
      :key="page"
      :variant="page === usersStore.currentPage ? 'primary' : 'secondary'"
      size="small"
      type="button"
      :txt="page"
      :onclick="() => goToPage(page)"
      :ariaLabel="`Go to page ${page}`"
    />

    <Button  variant="primary" size="small" type="button"  :icon="chevronRightIcon" :disabled="usersStore.currentPage === usersStore.totalPages" :onclick="usersStore.nextPage" ariaLabel="Next"/>
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
