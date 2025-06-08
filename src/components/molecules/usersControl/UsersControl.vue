<script setup>
import { defineAsyncComponent } from "vue";
import listIcon from "@/assets/icons/listIcon.svg";
import exportIcon from "@/assets/icons/export.svg";
import tableViewIcon from "@/assets/icons/barc.svg";
import cardsViewIcon from "@/assets/icons/category.svg";
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));
import { useUserStore } from "@/store/userStore";

const usersStore = useUserStore();

const changeViewType = (type) => {
  usersStore.setViewType(type);
};
</script>

<template>
  <div class="users_control">
    <div class="users_control_left">
      <div class="users_control_left_show">
        <span class="caption-regular">Show</span>
        <Button
          txt="10"
          variant="secondary"
          size="small"
          type="button"
          :icon="listIcon"
          iconPosition="right"
        />
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
