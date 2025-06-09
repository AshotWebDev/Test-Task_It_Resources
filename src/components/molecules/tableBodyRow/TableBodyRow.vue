<script setup>
import eyeIcon from "@/assets/icons/eye.svg";
import editIcon from "@/assets/icons/Union.svg";
import { useUserStore } from "../../../store/userStore";
import { useModalStore } from "../../../store/modalStore";
const usersStore = useUserStore();
const molalStore = useModalStore();

function getDisplayValue(value) {
  if (value == null) return "";

  if (typeof value === "object") {
    const firstKey = Object.keys(value)[0];
    const firstValue = value[firstKey];
    const stringValue = String(firstValue);
    return stringValue;
  }

  const stringValue = String(value);
  return stringValue;
}

const viewUser = async(id) => {
  await usersStore.fetchUserById(id)
   molalStore.toggleModal()
}
</script>

<template>
  <tr
    class="table_body_row"
    v-for="(item, index) in usersStore.paginatedUsers"
    :key="item.id || index"
  >
    <td
      class="table_body_cell body2-medium"
      v-for="(value, key) in item"
      :key="key"
    >
      {{ getDisplayValue(value) }}
    </td>
    <td class="table_body_cell table_body_cell_last">
  <div class="table_body_cell_last_icons">
    <img
      :src="eyeIcon"
      alt="View"
      role="button"
      tabindex="0"
      aria-label="View user details"
      @click="() => viewUser(item.id)"
      @keydown.enter.prevent="viewUser(item.id)"
      @keydown.space.prevent="viewUser(item.id)"
    />
    <img
      :src="editIcon"
      alt="Edit"
      role="button"
      tabindex="0"
      aria-label="Edit user"
      @click="() => handleEditClick(item.id)"
      @keydown.enter.prevent="handleEditClick(item.id)"
      @keydown.space.prevent="handleEditClick(item.id)"
    />
  </div>
</td>
  </tr>
</template>

<style scoped lang="scss">
.table_body_row {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid $blue-50;

  &:hover {
    background-color: $gray-50;
  }
}
.table_body_cell {
  width: 14%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 16px 12px;
  color: $blue-900;

  .table_body_cell_last_icons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 80px;

    img {
      cursor: pointer;
    }
  }
}
</style>
