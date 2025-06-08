<script setup>
import { defineAsyncComponent } from "vue";

const Card = defineAsyncComponent(() => import("@/components/molecules/card/Card.vue"));

    const props = defineProps({
        cardData: Array
    })
</script>

<template>
    <div class="card_list">
        <Card v-for="item in cardData" :key="item.id" :item="item" />
    </div>
</template>



<style lang="scss" scoped>
.card_list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>