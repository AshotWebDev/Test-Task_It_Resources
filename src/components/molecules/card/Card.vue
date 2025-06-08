<script setup>
import eyeIcon from '@/assets/icons/eye.svg'
import editIcon from '@/assets/icons/Union.svg'

const props = defineProps({
    item: Object
})
</script>

<template>
  <div class="card" role="region" :aria-label="`User: ${item.name}`">
    <div class="card_head">
      <button @click="viewUser" aria-label="View user" class="card_head_icon-button">
        <img :src="eyeIcon" alt="" role="presentation" />
      </button>
      <button @click="editUser" aria-label="Edit user" class="card_head_icon-button">
        <img :src="editIcon" alt="" role="presentation" />
      </button>
    </div>

    <ul class="card_body">
      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Name</span>
        <span class="card_body_item_value body2-medium">{{ item.name }}</span>
      </li>

      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Username</span>
        <span class="card_body_item_value body2-medium">{{ item.username }}</span>
      </li>

      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Email</span>
        <span class="card_body_item_value body2-medium">{{ item.email }}</span>
      </li>

      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Address</span>
        <span class="card_body_item_value body2-medium">{{ item.address.street }}</span>
      </li>

      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Phone</span>
        <span class="card_body_item_value body2-medium">{{ item.phone }}</span>
      </li>

      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Website</span>
        <span class="card_body_item_value body2-medium">{{ item.website }}</span>
      </li>

      <li class="card_body_item">
        <span class="card_body_item_title body2-bold">Company</span>
        <span class="card_body_item_value body2-medium">{{ item.company.name }}</span>
      </li>
    </ul>
  </div>
</template>




<style lang="scss" scoped>
    .card {
        width: 372px;
        border: 1px solid $gray-300;
        border-radius: $radius-lg;

        &_head {
            display: flex;
            justify-content: end;
            align-items: center;
            padding: 10px 20px;
            background-color: $gray-100;

            &_icon-button {
                border: none;
                background-color: transparent;
                cursor: pointer;
            }

        }

        &_body {
            padding: 10px 16px;
            display: flex;
            flex-direction: column;
            width: 100%;

            &_item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                width: 100%;
                
                &_title, &_value {
                    color: $blue-900;
                    width: 50%;
                }

            }
        }
    }
</style>