<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useVehicleStore } from '@store/vehicle';
import TableLib from '@components/TableLib.vue';
import { Vehicle } from '@types/modules/vehicle';

const vehicleStore = useVehicleStore();
const vehicles = computed<Vehicle[]>(() => vehicleStore.getVehicles);
onMounted(() => {
  vehicleStore.fetchVehicles();
});
</script>

<template>
  <!-- {{ vehicles }} -->
  <TableLib :data="vehicles" dataType="Vehicle" />
</template>
