<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useVehicleMaintenanceStore } from '@store/vehicleMaintenance';
import TableLib from '@components/TableLib.vue';
import { VehicleMaintenance } from '@types/modules/vehicleMaintenance';

const vehicleMaintenanceStore = useVehicleMaintenanceStore();
const vehicleMaintenances = computed<VehicleMaintenance[]>(() => vehicleMaintenanceStore.getVehicleMaintenances);
onMounted(() => {
    vehicleMaintenanceStore.fetchVehicleMaintenances();
});
</script>

<template>
  <TableLib :data="vehicleMaintenances" dataType="Vehicle Maintenance" />
</template>
