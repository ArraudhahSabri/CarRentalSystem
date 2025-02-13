<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useBookingStore } from '@store/booking';
import TableLib from '@components/TableLib.vue';
import { Booking } from '@types/modules/booking';

const bookingStore = useBookingStore();
const bookings = computed<Booking[]>(() => bookingStore.getBookings);
onMounted(() => {
  bookingStore.fetchBookings();
});
</script>

<template>
  <TableLib :data="bookings" dataType="Booking" />
</template>
