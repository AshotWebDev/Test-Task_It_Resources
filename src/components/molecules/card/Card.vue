<script setup>
import eyeIcon from "@/assets/icons/eye.svg";
import editIcon from "@/assets/icons/Union.svg";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/modalStore";

const props = defineProps({
  item: Object,
  fetchById: Function
});
const usersStore = useUserStore();
const molalStore = useModalStore();

const viewUser = async (id) => {
  await props.fetchById(id);
  molalStore.toggleModal();
};
</script>

<template>
  <div class="card" role="region" :aria-label="`User: ${props.item.name}`">
    <div class="card_head">
      <button
        @click="viewUser(props.item.id)"
        @keydown.enter.prevent="viewUser(props.item.id)"
        @keydown.space.prevent="viewUser(props.item.id)"
        aria-label="View user"
        class="card_head_icon-button"
      >
        <img :src="eyeIcon" alt="" role="presentation" />
      </button>
      <button aria-label="Edit user" class="card_head_icon-button">
        <img :src="editIcon" alt="" role="presentation" />
      </button>
    </div>

    <ul class="card_body">
      <li class="card_body_item" v-for="(value, key) in props.item" :key="key">
        <span class="card_body_item_title body2-bold">{{ key }}</span>
        <span class="card_body_item_value body2-medium">{{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 372px;
  border: 1px solid $gray-300;
  border-radius: $radius-lg;

  &_head {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 10px 20px;
    background-color: $gray-100;

    &_icon-button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }

  &_body {
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    width: 100%;

    &_item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      width: 100%;

      &_title,
      &_value {
        color: $blue-900;
        width: 50%;
      }
    }
  }
}
</style>
