<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useDiscountStore } from '@store/discount';
import TableLib from '@components/TableLib.vue';
import { Discount } from '@types/modules/discount';

const discountStore = useDiscountStore();
const discounts = computed<Discount[]>(() => discountStore.getDiscounts);
onMounted(() => {
  discountStore.fetchDiscounts();
});
</script>

<template>
  <TableLib :data="discounts" dataType="Discount" />
</template>
