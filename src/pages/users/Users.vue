<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useUserStore } from "@/store/userStore";
const UsersControl = defineAsyncComponent(() => import("@/components/molecules/usersControl/UsersControl.vue"));
const SearchBar = defineAsyncComponent(() => import("@/components/molecules/searchBar/SearchBar.vue"));
const Table = defineAsyncComponent(() => import("@/components/organisms/table/Table.vue"));
const CardList = defineAsyncComponent(() => import("@/components/organisms/cardList/CardList.vue"));
const usersStore = useUserStore();
const theadData = ref([]);


onMounted(async () => {
  const cachedUsers = localStorage.getItem("users");

  if (cachedUsers) {
    const parsedUsers = JSON.parse(cachedUsers);
    usersStore.users = parsedUsers;
    usersStore.originalUsers = [...parsedUsers];
  } else {
    await usersStore.fetchUser();
    localStorage.setItem("users", JSON.stringify(usersStore.users));
  }

  if (usersStore.users.length > 0) {
    theadData.value = Object.keys(usersStore.users[0]).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );
  }
});
</script>

<template>
  <div class="users_page">
    <div class="container">
      <SearchBar/>
      <UsersControl />

      <Table v-if="usersStore.usersViewType === 'table'" :tbodyData="usersStore.users" :theadData="theadData" />
      <CardList v-if="usersStore.usersViewType === 'list'" :cardData="usersStore.users"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users_page {
  padding: 30px;
}
</style>