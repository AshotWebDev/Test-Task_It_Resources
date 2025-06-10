<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useModalStore } from "../../store/modalStore";
import { usePostStore } from "../../store/postsStore";
const Control = defineAsyncComponent(() => import("@/components/molecules/control/Control.vue"));
const SearchBar = defineAsyncComponent(() => import("@/components/molecules/searchBar/SearchBar.vue"));
const Table = defineAsyncComponent(() => import("@/components/organisms/table/Table.vue"));
const CardList = defineAsyncComponent(() => import("@/components/organisms/cardList/CardList.vue"));
const Pagination = defineAsyncComponent(() => import("@/components/molecules/pagination/Pagination.vue"));
const Modal = defineAsyncComponent(() => import("@/components/molecules/modal/Modal.vue"));

const molalStore = useModalStore();
const postsStore = usePostStore();
const theadData = ref([]);


onMounted(async () => {
  const cachedPosts = localStorage.getItem("posts");

  if (cachedPosts) {
    const parsedPosts = JSON.parse(cachedPosts);
    postsStore.posts = parsedPosts;
    postsStore.originalPosts = [...parsedPosts];
  } else {
    await postsStore.fetchPosts();
    localStorage.setItem("posts", JSON.stringify(postsStore.posts));
  }

  if (postsStore.posts.length > 0) {
    theadData.value = Object.keys(postsStore.posts[0]).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    );
  }
});


const displayFields = computed(() => {
  if (!postsStore.post) return null;
  const { userId, id, title, body } = postsStore.post;
  return {
    UserId: userId,
    Id: id,
    Title: title,
    Body: body
  };
});


const searchFields = [
  "All",
  "UserId",
  "Id",
  "Title",
  "Body",
];

const postsCountfields = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; 

const mapPostsData = (user) => {
  const { userId, id, title, body } = user;
  return {
    UserId: userId,
    id: id,
    Title: title,
    Body: body
  };
};


const posts = computed(() => {
  return postsStore.paginatedPosts.map(mapPostsData);
});


</script>

<template>
  <div class="posts_page">
    <div class="container">
      <SearchBar :searchFields="searchFields" :searchFunc="postsStore.searchPosts"/>
      <Control :fields="postsCountfields" :paginationFuck="postsStore.setItemsPerPage" :changeViewType="postsStore.setViewType" buttonTxt="Create Posts" :viewType="postsStore.postsViewType"/>

      <Table v-if="postsStore.postsViewType === 'table'" :theadData="theadData"  :paginatedData="postsStore.paginatedPosts" :sort="postsStore.sortPosts" :fetchById="postsStore.fetchPostById"/>
      <CardList v-if="postsStore.postsViewType === 'list'" :items="posts" :fetchById="postsStore.fetchPostById"/>
      <Pagination  :store="postsStore"/>
    </div>
  </div>

  <Modal size="large" v-if="molalStore.isOpen" :info="displayFields"/>
</template>

<style lang="scss" scoped>
.posts_page {
  padding: 30px;
}
</style>