<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useBillingStore } from '@store/billing';
import TableLib from '@components/TableLib.vue';
import { Billing } from '@types/modules/billing';
import InvoicePDF from "@components/InvoicePDF.vue";

const billingStore = useBillingStore();
const billings = computed<Billing[]>(() => billingStore.getBillings);
onMounted(() => {
  billingStore.fetchBillings();
});

// Reference to the InvoicePDF component
const invoiceRef = ref<{ downloadPDF: () => void } | null>(null);

// Function to trigger the invoice download
const handleDownload = () => {
  invoiceRef.value?.downloadPDF();
};
</script>

<template>
  <!-- Button to trigger the PDF download -->
  <!-- <button @click="handleDownload" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
      Download Invoice
    </button> -->

    <!-- Hidden Invoice Component -->
    <InvoicePDF ref="invoiceRef" />
  <TableLib :data="billings" dataType="Billing" />
</template>
