<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps({
  path: String,
  title: String,
  icon: [String, Object],
  isOpen: Boolean
});
const route = useRoute();
const isActive = computed(() => route.path === props.path);

</script>

<template>
  <li class="sidebar_list_item">
    <RouterLink
      :to="path"
      class="sidebar_link"
      :class="{ active: isActive, open: isOpen, closed: !isOpen }"
    >
      <img class="sidebar_list_icon" :src="icon" :alt="title" />
      <span class="sidebar_list_title h3-medium">{{ title }}</span>
    </RouterLink>
  </li>
</template>



<style lang="scss" scoped>
.sidebar_link {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 100%;
  padding: 10px 16px;
  border-radius: $radius-lg;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff4d;
  }

  &.open {
    justify-content: flex-start;

    .sidebar_list_title {
      display: inline;
      opacity: 1;
      margin-left: 4px;
    }
  }

  &.closed {
    .sidebar_list_title {
      display: none; 
    }
  }

  &.active {
    background-color: #fff;

    .sidebar_list_title {
      color: $orange-500;
    }

    .sidebar_list_icon {
      filter: $icon-orange-500;
    }
  }

  .sidebar_list_icon {
    width: 30px;
    height: 30px;
    filter: brightness(0) invert(1);
  }

  .sidebar_list_title {
    color: #fff;
    transition: opacity 0.2s ease;
  }
}
</style>

