<script setup>
import { defineAsyncComponent, ref } from "vue";
import listIcon from "@/assets/icons/listIcon.svg";
import exportIcon from "@/assets/icons/export.svg";
import tableViewIcon from "@/assets/icons/barc.svg";
import cardsViewIcon from "@/assets/icons/category.svg";
const Button = defineAsyncComponent(() => import("@/components/atom/button/Button.vue"));
import { useUserStore } from "@/store/userStore";

const props = defineProps({
  fields: Array,
  paginationFuck: Function,
  changeViewType: Function,
  buttonTxt: String,
  viewType: String
})
const usersStore = useUserStore();
const viewList = ref(false);
const selectedField = ref(10);


const selectField = (field) => {
  selectedField.value = field;
  props.paginationFuck(field);
  viewList.value = false;
};

const changeViewType = (type) => {
  props.changeViewType(type);
};
</script>

<template>
  <div class="control">
    <div class="control_left">
      <div class="control_left_show">
        <div class="control_left_show_selected">
          <span class="body2-medium">Show</span>
          <div
            class="control_left_show_selected_icon"
            role="button"
            tabindex="0"
            aria-haspopup="listbox"
            :aria-expanded="viewList.toString()"
            @click="viewList = !viewList"
            @keydown.enter.prevent="viewList = !viewList"
            @keydown.space.prevent="viewList = !viewList"
          >
            <span>{{ selectedField }}</span>
            <img :src="listIcon" alt="List icon" aria-hidden="true" />
          </div>
        </div>

        <ul
          v-if="viewList"
          class="control_left_show_list"
          role="listbox"
          tabindex="-1"
        >
          <li
            v-for="item in props.fields"
            :key="item"
            class="control_left_show_list_item"
            role="option"
            :aria-selected="selectedField === item"
            tabindex="0"
            @click="selectField(item)"
            @keydown.enter.prevent="selectField(item)"
            @keydown.space.prevent="selectField(item)"
          >
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
        ariaLabel="Export PDF"
      />
    </div>

    <div class="control_right">
      <div class="control_right_select_viewType">
        <div
          class="control_right_select_viewType_table"
          :class="{ active: props.viewType === 'table' }"
          role="button"
          tabindex="0"
          aria-pressed="usersStore.usersViewType === 'table'"
          @click="changeViewType('table')"
          @keydown.enter.prevent="changeViewType('table')"
          @keydown.space.prevent="changeViewType('table')"
        >
          <img :src="tableViewIcon" alt="Table view icon" />
        </div>
        <div
          class="control_right_select_viewType_cards"
          :class="{ active: props.viewType === 'list' }"
          role="button"
          tabindex="0"
          aria-pressed="usersStore.usersViewType === 'list'"
          @click="changeViewType('list')"
          @keydown.enter.prevent="changeViewType('list')"
          @keydown.space.prevent="changeViewType('list')"
        >
          <img :src="cardsViewIcon" alt="Cards view icon" />
        </div>
      </div>

      <Button
        :txt="props.buttonTxt"
        variant="primary"
        size="medium"
        type="button"
        :ariaLabel="props.buttonTxt"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &_left {
    display: flex;
    align-items: center;
    gap: 16px;

    &_show {
      display: flex;
      align-items: center;
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
          border: 1px solid  $gray-300;
          border-radius: $radius-lg;
          padding: 7px 8px;
          user-select: none;
          outline-offset: 2px;
          gap: 4px;

          &:focus-visible {
            outline: 3px solid black;
          }

          span {
            color: $blue-600 
          }
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
        z-index: 10;
        width: 80px;

        &_item {
          padding: 8px;
          cursor: pointer;

          &:hover,
          &:focus-visible {
            background-color: $blue-50;
            outline: none;
          }
        }
      }
    }
  }

  &_right {
    display: flex;
    align-items: center;
    gap: 16px;

    &_select_viewType {
      display: flex;
      justify-content: center;
      align-items: center;

      &_table,
      &_cards {
        width: 36px;
        height: 36px;
        background-color: $blue-50 ;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        outline-offset: 2px;

        img {
          filter: $icon-blue-300;
        }

        &:hover {
          background-color: $blue-100;

          img {
            filter: $icon-blue-600;
          }
        }

        &:focus-visible {
          outline: 2px solid black
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
