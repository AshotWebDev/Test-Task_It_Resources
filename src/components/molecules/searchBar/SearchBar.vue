<script setup>
import { defineAsyncComponent, ref } from "vue";
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));   
import listIcon from "@/assets/icons/listIcon.svg";
import plusIcon from "@/assets/icons/plus.svg";
import { useUserStore } from "@/store/userStore";
const viewList = ref(false);
const selectedField = ref("All");
const usersStore = useUserStore();

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

const selectField = (filed) => {
  selectedField.value = filed;
  viewList.value = false;
};

const handleSearche = (field, query) => {
  usersStore.searchUsers(field.toLowerCase(), query);
};

</script>

<template>
  <div class="search_bar">
    <div class="search_bar_content">
      <div class="search_bar_content_select">
        <div
          class="search_bar_content_select_deafult"
          @click="viewList = !viewList"
        >
          <span class="body2-medium">{{ selectedField }}</span>
          <img :src="listIcon" alt="search" />
        </div>
        <ul v-if="viewList" class="search_bar_content_select_list">
          <li
            class="search_bar_content_select_list_item"
            v-for="item in searchFields"
            :key="item"
            @click="selectField(item)"
          >
            <span class="body2-medium">{{ item }}</span>
          </li>
        </ul>
      </div>
      <input
          class="search_bar_content_input"
          type="text"
          :placeholder="
            selectedField === 'All' ? 'Search' : `Search by ${selectedField}`
          "
          @input="handleSearche(selectedField, $event.target.value)"
        />
    </div>
    <Button variant="primary" size="medium" type="button" :icon="plusIcon" />
  </div>
</template>

<style lang="scss" scoped>
.search_bar {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;

  &_content {
    border: 1px solid $gray-300;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    width: 396px;
    height: 36px;

    &_select {
      display: flex;
      align-items: center;
      position: relative;

      &_deafult {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 7px 15px;
        border-right: 1px solid $gray-300;
        color: $gray-700;
      }

      &_list {
        position: absolute;
        top: 40px;
        left: 0;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        padding: 8px 0;
        z-index: 1;

        li {
          padding: 5px 16px;
          cursor: pointer;
          border-bottom: 1px solid $gray-300;

          &:hover {
            background-color: $gray-100;
          }
        }
      }
    }

    &_input {
      border: none;
      outline: none;
      padding: 0 16px;
      width: 100%;
      height: 100%;
      border-radius: $radius-lg;
    }
  }
}
</style>
