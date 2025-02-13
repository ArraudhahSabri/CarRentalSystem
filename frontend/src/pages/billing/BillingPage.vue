<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useBillingStore } from '@store/billing';
import TableLib from '@components/TableLib.vue';
import { Billing } from '@types/modules/billing';

const billingStore = useBillingStore();
const billings = computed<Billing[]>(() => billingStore.getBillings);
onMounted(() => {
  billingStore.fetchBillings();
});
</script>

<template>
  <TableLib :data="billings" dataType="Billing" />
</template>
