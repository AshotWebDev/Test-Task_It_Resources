<script setup>
import { defineAsyncComponent, ref } from "vue";
import listIcon from "@/assets/icons/listIcon.svg";
import plusIcon from "@/assets/icons/plus.svg";
import { useUserStore } from "@/store/userStore";

const Button = defineAsyncComponent(() =>
  import("@/components/atom/button/Button.vue")
);

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

const selectField = (field) => {
  selectedField.value = field;
  viewList.value = false;
};

const handleSearch = (field, query) => {
  usersStore.searchUsers(field.toLowerCase(), query);
};
</script>

<template>
  <div class="search_bar">
    <div class="search_bar_content">
      <div class="search_bar_content_select">
        <div
          aria-label="Select"
          role="listbox"
          class="search_bar_content_select_default"
          @click="viewList = !viewList"
          tabindex="0"
          @keydown.enter.prevent="viewList = !viewList"
          @keydown.space.prevent="viewList = !viewList"
        >
          <span class="body2-medium">{{ selectedField }}</span>
          <img :src="listIcon" alt="list icon" />
        </div>
        <ul
          v-if="viewList"
          class="search_bar_content_select_list"
          role="listbox"
          tabindex="-1"
        >
          <li
            class="search_bar_content_select_list_item"
            v-for="item in searchFields"
            :key="item"
            role="option"
            @click="selectField(item)"
            @keydown.enter.prevent="selectField(item)"
            tabindex="0"
          >
            <span class="body2-medium">{{ item }}</span>
          </li>
        </ul>
      </div>
      <input
        aria-label="Search"
        class="search_bar_content_input"
        type="text"
        :placeholder="
          selectedField === 'All' ? 'Search' : `Search by ${selectedField}`
        "
        @input="handleSearch(selectedField, $event.target.value)"
      />
    </div>
    <Button
      variant="primary"
      size="medium"
      type="button"
      :icon="plusIcon"
      ariaLabel="Add"
    />
  </div>
</template>

<style scoped lang="scss">
.search_bar {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;

  &_content {
    border: 1px solid $gray-300 ;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    width: 396px;
    height: 36px;

    &_select {
      display: flex;
      align-items: center;
      position: relative;

      &_default {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 7px 15px;
        border-right: 1px solid $gray-300;
        color: $gray-700 ;
        user-select: none;

        
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
        z-index: 10;

        li {
          padding: 5px 16px;
          cursor: pointer;
          border-bottom: 1px solid #d1d5db;

          &:hover,
          &:focus-visible {
            background-color: $gray-100;
            outline: none;
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
      font-size: 14px;

    }
  }
}
</style>
