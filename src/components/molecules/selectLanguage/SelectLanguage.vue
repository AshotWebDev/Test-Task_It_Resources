<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import armFlagImg from "@/assets/images/armFlag.png"
import rusFlagImg from "@/assets/images/rusFlag.png"
import engFlagImg from "@/assets/images/engFlag.png"
import listIcon from "@/assets/icons/listIcon.svg"

const isOpen = ref(false)
const dropdownRef = ref(null)

function toggleList() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})


</script>


<template>
  <div class="select_language" ref="dropdownRef">
    <div class="select_language_selected" @click="toggleList">
      <img class="select_language_selected_flag" :src="engFlagImg" alt="engFlag">
      <span class="h3-medium">ENG</span>
      <img class="select_language_selected_icon" :src="listIcon" alt="listIcon">
    </div>

    <ul v-if="isOpen" class="select_language_list">
      <li class="select_language_list_item">
        <img :src="armFlagImg" alt="armFlag">
        <span class="body2-medium">ARM</span>
      </li>

      <li class="select_language_list_item">
        <img class="select_language_selected_flag" :src="rusFlagImg" alt="rusFlag">
        <span class="body2-medium">RUS</span>
      </li>
    </ul>
  </div>
</template>


<style lang="scss" scoped>
.select_language {
  position: relative;
  width: 100px;

  &_selected {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &_flag {
      width: 24px;
      height: 17px;
    }

    span {
      color: $blue-600;
    }

    &_icon {
      filter: $icon-blue-600;
      font-size: 7px;
    }
  }

  &_list {
    position: absolute;
    top: 32px;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid $gray-200;
    border-radius: $radius-lg;
    z-index: 10;

    &_item {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 20px;

      &_flag {
        width: 24px;
        height: 17px;
      }

      span {
        color: $blue-300;
      }
    }
  }
}
</style>
