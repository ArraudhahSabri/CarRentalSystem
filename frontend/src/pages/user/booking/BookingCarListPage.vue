<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '@components/TextInput.vue';
import DropDown from '@components/DropDown.vue';
import Card from '@components/Card.vue'; 
import CarLogo from '@images/front-car-logo.png';
import { useVehicleStore } from '@store/vehicle';
import { Vehicle } from '@types/modules/vehicle';
import { useRouter } from 'vue-router';

const router = useRouter();

const buttonLabel :string = 'Book Car';

const inputValue = ref({
    'name': '',
    'email': '',
    'phone_no': '',
    'booking_date': '',
    'car_model': '',
});

function handleBookCar(){
    console.log('Car Confirmation Chosed:', selectedVehicle.value);
    router.push({ name: 'UserBookingConfirmationPage' });
}

const vehicleStore = useVehicleStore();
const vehicles :any = vehicleStore.getVehicles;

const selectedVehicle = ref(null);
</script>

<template>
    <hr>
    <div class="space-y-4 text-start">
        <form @submit.prevent="handleBookCar">
            <Card
                height="30vh"
                width="100%"
                class="bg-teal-50 border border-teal-200 shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
            >
                <div class="flex items-center p-4" style="height: 100%;">
                    <!-- Vehicle Image -->
                    <img class="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mr-4" :src="CarLogo" alt="Vehicle Image" />
                    <!-- Vehicle Details -->
                    <div class="space-y-2">
                    <p class="text-xl font-semibold text-gray-800">{{ selectedVehicle?.make }} {{ selectedVehicle?.model }}</p>
                    <p class="text-sm text-gray-500">{{ selectedVehicle?.vehicle_type }}</p>
                    <p class="text-sm text-gray-500">{{ selectedVehicle?.year }} - {{ selectedVehicle?.color }}</p>
                    <p class="text-sm text-gray-500">Plate No: {{ selectedVehicle?.plate_no }}</p>
                    <p class="text-sm text-gray-500">Mileage: {{ selectedVehicle?.mileage }} km</p>
                    </div>
                </div>
            </Card>
            <button type="submit" class="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg">
                Book Car
            </button>
        </form>
        <div class="product-grid">
            <div v-for="(vehicle, index) in vehicles.filter(v => v.status === 'Active')" :key="index" class="product-item">
                <Card 
                    height="30vh" 
                    width="100%" 
                    class="bg-teal-50 border border-teal-200 shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-teal-300 hover:via-teal-400 hover:to-teal-500 hover:bg-[length:200%_100%] hover:bg-[position:100%_0%] cursor-pointer"
                    @click="selectedVehicle = vehicle"
                >
                    <div class="flex items-center p-4" style="height: 100%;">
                        <!-- Vehicle Image -->
                        <img class="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mr-4" :src="CarLogo" alt="Vehicle Image" />

                        <!-- Vehicle Details -->
                        <div class="space-y-2">
                            <p class="text-xl font-semibold text-gray-800">{{ vehicle.make }} {{ vehicle.model }}</p>
                            <p class="text-sm text-gray-500">{{ vehicle.vehicle_type }}</p>
                            <p class="text-sm text-gray-500">{{ vehicle.year }} - {{ vehicle.color }}</p>
                            <p class="text-sm text-gray-500">Plate No: {{ vehicle.plate_no }}</p>
                            <p class="text-sm text-gray-500">Mileage: {{ vehicle.mileage }} km</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* Create a flexible grid */
  gap: 16px; /* Add space between items */
}

.product-item {
  /* You can add styles here to control the layout of individual items if needed */
}
</style>
