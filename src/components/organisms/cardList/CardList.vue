<script setup>
import { defineAsyncComponent } from "vue";
import { useUserStore } from "../../../store/userStore";

const Card = defineAsyncComponent(() =>
  import("@/components/molecules/card/Card.vue")
);

const usersStore = useUserStore();

</script>

<template>
  <div class="card_list">
    <Card
      v-for="item in usersStore.paginatedUsers"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.card_list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
