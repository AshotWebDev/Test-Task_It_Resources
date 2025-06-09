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
    <!-- Dropdown button -->
    <div
      class="select_language_selected"
      role="button"
      tabindex="0"
      aria-haspopup="listbox"
      :aria-expanded="isOpen.toString()"
      @click="toggleList"
      @keydown.enter.prevent="toggleList"
      @keydown.space.prevent="toggleList"
    >
      <img
        class="select_language_selected_flag"
        :src="engFlagImg"
        alt="English Flag"
      />
      <span class="h3-medium">ENG</span>
      <img
        class="select_language_selected_icon"
        :src="listIcon"
        alt="language list icon"
        aria-hidden="true"
      />
    </div>

    <!-- Dropdown list -->
    <ul
      v-if="isOpen"
      class="select_language_list"
      role="listbox"
      tabindex="-1"
    >
      <li
        class="select_language_list_item"
        role="option"
        tabindex="0"
        aria-label="Select Armenian"
        @click="isOpen = false"
        @keydown.enter.prevent="isOpen = false"
        @keydown.space.prevent="isOpen = false"
      >
        <img :src="armFlagImg" alt="Armenian Flag" />
        <span class="body2-medium">ARM</span>
      </li>

      <li
        class="select_language_list_item"
        role="option"
        tabindex="0"
        aria-label="Select Russian"
        @click="isOpen = false"
        @keydown.enter.prevent="isOpen = false"
        @keydown.space.prevent="isOpen = false"
      >
        <img
          class="select_language_selected_flag"
          :src="rusFlagImg"
          alt="Russian Flag"
        />
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
    user-select: none;
    outline-offset: 2px;

    &:focus-visible {
      outline: 2px solid black; 
    }

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
      user-select: none;
      outline-offset: 2px;

      &:hover,
      &:focus-visible {
        background-color: $blue-50;
        outline: none;
      }

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
