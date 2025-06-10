<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useUserStore } from "@/store/userStore";
const Control = defineAsyncComponent(() => import("@/components/molecules/control/Control.vue"));
const SearchBar = defineAsyncComponent(() => import("@/components/molecules/searchBar/SearchBar.vue"));
const Table = defineAsyncComponent(() => import("@/components/organisms/table/Table.vue"));
const CardList = defineAsyncComponent(() => import("@/components/organisms/cardList/CardList.vue"));
const Pagination = defineAsyncComponent(() => import("@/components/molecules/pagination/Pagination.vue"));
const Modal = defineAsyncComponent(() => import("@/components/molecules/modal/Modal.vue"));
import { useModalStore } from "@/store/modalStore";
const usersStore = useUserStore();
const molalStore = useModalStore();

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

const displayFields = computed(() => {
  if (!usersStore.user) return null;
  const { name, username, email, phone, website, address, company } = usersStore.user;
  return {
    Name: name,
    Username: username,
    Email: email,
    Address: `${address?.street}, ${address?.suite}, ${address?.city}, ${address?.zipcode}`,
    Phone: phone,
    Website: website,
    Company: `${company?.name}, ${company?.catchPhrase}, ${company?.bs}`
  };
});

const searchFields = [
  "All",
  "Id",
  "Name",
  "Username",
  "Email",
  "Phone",
  "Website",
  "Address",
  "Company",
];

const usersCountfields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

const mapUserData = (user) => {
  const { name, username, email, phone, website, address, company, id } = user;
  return {
    id: id,
    Name: name,
    Username: username,
    Email: email,
    Address: `${address?.street}, ${address?.suite}, ${address?.city}, ${address?.zipcode}`,
    Phone: phone,
    Website: website,
    Company: `${company?.name}, ${company?.catchPhrase}, ${company?.bs}`
  };
};

const users = computed(() => usersStore.paginatedUsers.map(mapUserData));
</script>

<template>
  <div class="users_page">
    <div class="container">
      <SearchBar :searchFields="searchFields" :searchFunc="usersStore.searchUsers"/>
      <Control :fields="usersCountfields" :paginationFuck="usersStore.setItemsPerPage" :changeViewType="usersStore.setViewType" buttonTxt="Create Users" :viewType="usersStore.usersViewType"/>

      <Table v-if="usersStore.usersViewType === 'table'" :theadData="theadData"  :paginatedData="usersStore.paginatedUsers" :sort="usersStore.sortUsers" :fetchById="usersStore.fetchUserById"/>
      <CardList v-if="usersStore.usersViewType === 'list'" :items="users" :fetchById="usersStore.fetchUserById"/>
      <Pagination v-if="usersStore.itemsPerPage !== 10" :store="usersStore"/>
    </div>
  </div>

  <Modal size="large" v-if="molalStore.isOpen" :info="displayFields"/>
</template>

<style lang="scss" scoped>
.users_page {
  padding: 30px;
}
</style>