<script setup>
import { defineAsyncComponent } from "vue";
import { useUserStore } from "../../../store/userStore";

const Card = defineAsyncComponent(() =>
  import("@/components/molecules/card/Card.vue")
);
const props = defineProps({
  items: Array,
  fetchById: Function
});

const usersStore = useUserStore();

</script>

<template>
  <div class="card_list">
    <Card
      v-for="item in props.items"
      :key="item.id"
      :item="item"
      :fetchById="props.fetchById"
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
