<script setup>
import { ref, defineEmits, watch, defineAsyncComponent } from "vue";
import logoImg from "@/assets/images/logo.png";
import chevronLeftIcon from "@/assets/icons/chevronLeftIcon.svg";
import chevronRightIcon from "@/assets/icons/chevronRightIcon.svg";
import organizationIcon from "@/assets/icons/organization.svg";
import rolesIcon from "@/assets/icons/setting-2.svg";
import usersIcon from "@/assets/icons/profile.svg";
import workersIcon from "@/assets/icons/workers.svg";
import placesIcon from "@/assets/icons/places.svg";
import productsIcon from "@/assets/icons/products.svg";
import ordersIcon from "@/assets/icons/orders.svg";
import historyIcon from "@/assets/icons/history.svg";
const SideBarListItem = defineAsyncComponent(() => import("@/components/atom/sideBarListItem/SideBarListItem.vue"));

const props = defineProps({
  modelValue: Boolean 
});
const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
});

function toggleSidebar() {
  isOpen.value = !isOpen.value;
  emit("update:modelValue", isOpen.value);
}
</script>

<template>
  <aside :class="['sidebar', { 'sidebar--closed': !isOpen }]">
    <div class="sidebar__logo">
      <img :src="logoImg" alt="logo" />
    </div>

    <button class="sidebar__toggle" @click="toggleSidebar">
      <img v-if="isOpen" :src="chevronLeftIcon" alt="toggleIcon" />
      <img v-else :src="chevronRightIcon" alt="toggleIcon" />
    </button>

    <ul class="sidebar__list"> 
      <SideBarListItem path="/organization" title="Organization" :icon="organizationIcon" :isOpen="isOpen" />
      <SideBarListItem path="/roles" title="Roles" :icon="rolesIcon" :isOpen="isOpen" />
      <SideBarListItem path="/users" title="Users" :icon="usersIcon" :isOpen="isOpen" />
      <SideBarListItem path="/workers" title="Workers" :icon="workersIcon" :isOpen="isOpen" />
      <SideBarListItem path="/places" title="Places" :icon="placesIcon" :isOpen="isOpen" />
      <SideBarListItem path="/products" title="Products" :icon="productsIcon" :isOpen="isOpen" />
      <SideBarListItem path="/orders" title="Orders" :icon="ordersIcon" :isOpen="isOpen" />
      <SideBarListItem path="/scan-history" title="Scan history" :icon="historyIcon" :isOpen="isOpen" />
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 312px;
  height: 100vh;
  background-color: $gray-900; 
  transition: width 0.3s ease;
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;

  &--closed {
    width: 122px;
  }

  &__logo {
    width: 100%;
    transition: opacity 0.3s ease;
  }

  &__toggle {
    position: absolute;
    top: 150px;
    right: -15px;
    background-color: $orange-500;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      filter: $icon-white; 
      width: 8px;
    }
  }

  &__list {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
