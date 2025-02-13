<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCustomerStore } from '@store/customer';
import TableLib from '@components/TableLib.vue';
import { Customer } from '@types/modules/customer';

const customerStore = useCustomerStore();
const customers = computed<Customer[]>(() => customerStore.getCustomers);
onMounted(() => {
  customerStore.fetchCustomers();
});
</script>

<template>
  <TableLib :data="customers" dataType="Customer" />
</template>
