<script setup lang="ts">
import Layout from '@layouts/auth/Layout.vue';

import { useVehicleStore } from '@store/vehicle';
import Card from '@components/Card.vue'; 
import TableLib from '@components/TableLib.vue';

const vehicleStore = useVehicleStore();

</script>

<template>
  <Layout>
    <template #content>
        <div style="margin-top: 4rem;"></div>
        <div class="max-w-screen-xl mx-auto px-4">
            <Card title="Vehicle" footer="vehicles">
                <TableLib/>
            </Card>
        </div>
    </template>
  </Layout>
</template>
