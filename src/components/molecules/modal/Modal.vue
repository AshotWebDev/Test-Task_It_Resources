<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useModalStore } from "@/store/modalStore";

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
  },
  variant: {
    type: String,
    default: '',
  },
  info: {
    type: Object,
    default: () => null,
  },
  title: {
    type: String,
    default: '',
  },
  button: {
    type: Object,
    default: () => null,
  },
});

const modalStore = useModalStore();
const closeModal = () => {
  modalStore.toggleModal();
};

// Accessibility: Escape key support
const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
  nextTick(() => {
    closeButton.value?.focus();
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});

// Ref for focus
const closeButton = ref(null);

console.log(props.info,99);

</script>

<template>
  <div
    class="modal_wrapper"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="title ? 'modal-title' : null"
    :aria-describedby="info ? 'modal-description' : null"
    @click.self="closeModal"
  >
    <div class="modal_wrapper_content" :class="[size, variant]">
      <div class="modal_wrapper_content_header">
        <h3 id="modal-title" class="h3-bold">{{ title }}</h3>
        <button
          ref="closeButton"
          class="close_btn"
          @click="closeModal"
          aria-label="Close modal"
        >
          ✖
        </button>
      </div>

      <div class="modal_wrapper_content_body" id="modal-description">
        <div v-if="info" class="modal_wrapper_content_body_info">
          <div
            class="modal_wrapper_content_body_info_item"
            v-for="(value, key) in info"
            :key="key"
          >
            <h4 class="h3-bold">{{ key }}</h4>
            <p class="body2-medium">{{ value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &_content {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;

    &_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      background-color: $blue-50;
      padding: 10px 20px;
      border-radius: 12px 12px 0 0;

      h3 {
        color: $blue-900;
      }

      .close_btn {
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 20px;
        color: $blue-900;
      }
    }

    &_body {
      padding: 20px;

      &_info {
        display: flex;
        flex-direction: column;
        gap: 10px;

        &_item {
          display: flex;
          justify-content: space-between;

          h4 {
            width: 50%;
          }

          p {
            width: 50%;
          }
        }
      }
    }

    &.small {
      width: 300px;
    }

    &.medium {
      width: 600px;
    }

    &.large {
      width: 900px;
    }

    &.xlarge {
      width: 1200px;
    }

    &.danger {
      border-left: 5px solid red;
    }

    &.success {
      border-left: 5px solid green;
    }
  }
}
</style>
