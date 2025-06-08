<script setup>
import { defineAsyncComponent, ref } from "vue";
import { RouterView } from "vue-router";
const Header = defineAsyncComponent(() => import("@/components/molecules/header/Header.vue"));
const SideBar = defineAsyncComponent(() => import("@/components/organisms/sideBar/SideBar.vue"));

const sidebarOpen = ref(false);
</script>

<template>
  <div class="site-layout">
    <SideBar v-model="sidebarOpen" />
    <div 
      class="site-layout__body" 
      :style="{ 
        marginLeft: sidebarOpen ? '312px' : '122px',
        width: sidebarOpen ? 'calc(100vw - 312px)' : 'calc(100vw - 122px)'
      }"
    >
      <main class="site-layout__main">
        <Header />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  &__body {
    display: flex;
    flex: 1;
    transition: margin-left 0.3s ease, width 0.3s ease;
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto; 
    height: 100vh;
  }
}
</style>
