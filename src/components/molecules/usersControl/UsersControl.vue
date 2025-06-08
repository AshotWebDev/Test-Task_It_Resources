<script setup>
import { defineAsyncComponent, ref } from "vue";
import listIcon from "@/assets/icons/listIcon.svg";
import exportIcon from "@/assets/icons/export.svg";
import tableViewIcon from "@/assets/icons/barc.svg";
import cardsViewIcon from "@/assets/icons/category.svg";
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));
import { useUserStore } from "@/store/userStore";

const usersStore = useUserStore();
const viewList = ref(false);
const selectedField = ref(10);
const fields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

const selectField = (field) => {
  selectedField.value = field;
  usersStore.setItemsPerPage(field);
  viewList.value = false;
};

const changeViewType = (type) => {
  usersStore.setViewType(type);
};
</script>

<template>
  <div class="users_control">
    <div class="users_control_left">
      <div class="users_control_left_show">
        <div class="users_control_left_show_selected">
          <span class=" body2-medium">Show</span>
          <div class="users_control_left_show_selected_icon" @click="viewList = !viewList">
            <span>{{ selectedField }}</span>
            <img :src="listIcon" alt="listIcon">
          </div>
        </div>
        <ul v-if="viewList" class="users_control_left_show_list">
          <li class="users_control_left_show_list_item" v-for="item in fields" :key="item" @click="selectField(item)">
            <span class="body2-medium">Show {{ item }}</span>
          </li>
        </ul>
      </div>
      <Button
        txt="Export PDF"
        variant="secondary"
        size="small"
        type="button"
        :icon="exportIcon"
        iconPosition="left"
      />
    </div>

    <div class="users_control_right">
      <div class="users_control_right_select_viewType">
        <div
          class="users_control_right_select_viewType_table"
          :class="{ active: usersStore.usersViewType === 'table' }"
          @click="changeViewType('table')"
        >
          <img :src="tableViewIcon" alt="tableView" />
        </div>
        <div
          class="users_control_right_select_viewType_cards"
          @click="changeViewType('list')"
          :class="{ active: usersStore.usersViewType === 'list' }"
        >
          <img :src="cardsViewIcon" alt="cardsView" />
        </div>
      </div>

      <Button txt="Create User" variant="primary" size="medium" type="button" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users_control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &_left {
    @include flex-center;

    &_show {
      @include flex-center;
      gap: 8px;
      position: relative;

      &_selected {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        &_icon {
          display: flex;
          align-items: center;
          border: 1px solid $gray-300;
          border-radius: $radius-lg;
          padding: 7px 8px;
        }

        span {
          color: $blue-600;

        }

      }
       
      &_list {
        position: absolute;
        top: 40px;
        left: 40px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background-color: #fff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        border-radius: $radius-lg;
        padding: 8px 0;
        z-index: 1;
        width: 80px;

        &_item {
          padding: 8px;
          cursor: pointer;

          &:hover {
            background-color: $blue-50;
          }
        }
      }
    }
  }

  &_right {
    @include flex-center;

    &_select_viewType {
      display: flex;
      justify-content: center;
      align-items: center;

      &_table,
      &_cards {
        width: 36px;
        height: 36px;
        background-color: $blue-50;
        @include flex-center;
        cursor: pointer;

        img {
          filter: $icon-blue-300;
        }

        &:hover {
          background-color: $blue-100;

          img {
            filter: $icon-blue-600;
          }
        }
      }

      &_table {
        border-top-left-radius: $radius-lg;
        border-bottom-left-radius: $radius-lg;
      }

      &_cards {
        border-top-right-radius: $radius-lg;
        border-bottom-right-radius: $radius-lg;
      }

      &_table.active,
      &_cards.active {
        background-color: $orange-400;
        img {
          filter: $icon-white;
        }
      }
    }
  }
}
</style>
