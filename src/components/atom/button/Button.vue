<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "medium",
  },
  txt: String,
  ariaLabel: String,
  icon: [Object, String],
  iconPosition: {
    type: String,
    default: "left",
  },
  onClick: Function,
  type: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isIconString = computed(() => typeof props.icon === "string");

const handleClick = (e) => {
  if (!props.disabled && props.onClick) {
    props.onClick(e);
  }
};
</script>

<template>
  <button
    :aria-label="ariaLabel"
    :class="['button', variant, size, { disabled }]"
    :disabled="disabled"
    @click="handleClick"
    :type="type || 'button'"
  >
    <!-- Icon Left -->
    <span v-if="icon && iconPosition === 'left' && txt" class="icon">
      <img v-if="isIconString" :src="icon" alt="icon" />
      <component v-else :is="icon" />
    </span>

    <!-- Label -->
    <span v-if="txt" class="label">
      {{ txt }}
    </span>

    <!-- Icon Right -->
    <span v-if="icon && iconPosition === 'right' && txt" class="icon">
      <img v-if="isIconString" :src="icon" alt="icon" />
      <component v-else :is="icon" />
    </span>

    <!-- Icon Only -->
    <span v-if="icon && !txt" class="icon-only">
      <img v-if="isIconString" :src="icon" alt="icon" />
      <component v-else :is="icon" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border: none;
  border-radius: $radius-md;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  // primary button styles

  &.primary {
    background-color: $orange-500;
    color: white;

    &:hover {
      background-color: $orange-400;
    }

    &:active {
      background-color: $orange-700;
    }

    &.disabled {
      background-color: $gray-100;
      color: $gray-300;
      cursor: not-allowed;
    }

    .icon img,
    .icon-only img {
      filter: $icon-white;
    }
  }

  // secondary button styles

  &.secondary {
    background-color: #fff;
    color: $blue-400;
    border: 1px solid $blue-400;

    &:hover {
      color: $orange-400;
      border: 1px solid $orange-400;
      .icon img,
      .icon-only img {
        filter: $icon-orange-400;
      }
    }

    &:active {
      color: $orange-800;
      border: 1px solid $orange-800;
      .icon img,
      .icon-only img {
        filter: $icon-orange-800;
      }
    }

    &.disabled {
      background-color: $gray-100;
      border: 1px solid $gray-400;
      color: $gray-300;
      cursor: not-allowed;
      .icon img,
      .icon-only img {
        filter: $icon-gray-300;
      }
    }

    .icon img,
    .icon-only img {
      filter: $icon-blue-400;
    }
  }

  // minimal button styles

  &.minimal {
    background-color: transparent;
    color: $blue-400;

    &:hover {
      color: $orange-400;
      background-color: #fff;
      .icon img,
      .icon-only img {
        filter: $icon-orange-400;
      }
    }

    &:active {
      color: $orange-800;
      background-color: $gray-200;

      .icon img,
      .icon-only img {
        filter: $icon-orange-800;
      }
    }

    &.disabled {
      color: $gray-400;
      cursor: not-allowed;
      .icon img,
      .icon-only img {
        filter: $icon-gray-300;
      }
    }

    .icon img,
    .icon-only img {
      filter: $icon-blue-400;
    }
  }

  // button sizes

  &.small {
    height: 28px;
    font-size: $font-size-caption;
    padding: 5px 16px;
  }

  &.medium {
    height: 36px;
    font-size: $font-size-body2;
    padding: 7.5px 16px;
  }

  &.large {
    height: 44px;
    font-size: $font-size-body1;
    padding: 13px 24px;
  }

  // button icon styles

  .icon,
  .icon-only {
    display: flex;
    align-items: center;
  }

  .icon img,
  .icon-only img {
    transition: all 0.2s ease-in-out;
  }

  &.disabled .icon img,
  &.disabled .icon-only img {
    filter: $icon-gray-300;
  }

  .icon-only {
    padding: 0;
  }
}
</style>
