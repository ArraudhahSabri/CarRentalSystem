<script setup lang="ts">
import Card from '@components/Card.vue'; 
import CarLogo from '@images/front-car-logo.png';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@lib/ui/toast/use-toast'; 

const router = useRouter();
const { toast } = useToast();

const vehicle = {
    make: "Toyota",
    model: "Corolla",
    vehicle_type: "Sedan",
    year: "2022",
    color: "White",
    plate_no: "ABC1234",
    mileage: "15,000 km",
};

const inputValue = ref({
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'phone_no': '+1234567890',
    'booking_date': '2025-01-15',
    'car_model': 'Toyota',
});

async function handleBookCar(){
    try {
        console.log('Car Booked');
        router.push({ name: 'HomePage' });
        toast({
            title: 'Booking successful !',
            // description: 'Thank you',
            variant: 'default',
        });
    } catch (error) {
        toast({
            title: 'Booking failed !',
            description: 'Please try again later',
            variant: 'destructive',
        });
        console.error("Edit Profile failed:", error);
    }
}

</script>

<template>
    <hr>
    <div class="flex justify-center items-center bg-white">
        <!-- Confirmation Card -->
        <Card height="auto" width="80%" class="bg-teal-50 border border-teal-200 shadow-lg rounded-lg overflow-hidden p-6">
            <form @submit.prevent="handleBookCar">
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">
                    Booking Confirmation
                </h2>
                <hr class="mb-4">
                <div class="flex justify-center">
                    <div class="flex items-center justify-center space-x-6 me-10">
                        <!-- Vehicle Image -->
                        <img class="w-32 h-32 object-cover rounded-full border-4 border-teal-200" :src="CarLogo" alt="Car Image" />
                        <!-- Vehicle Details -->
                        <div class="space-y-2 text-gray-800">
                            <p class="text-xl font-semibold">{{ vehicle.make }} {{ vehicle.model }}</p>
                            <p class="text-lg">{{ vehicle.vehicle_type }}</p>
                            <p class="text-sm">Year: {{ vehicle.year }} - Color: {{ vehicle.color }}</p>
                            <p class="text-sm">Plate No: {{ vehicle.plate_no }}</p>
                            <p class="text-sm">Mileage: {{ vehicle.mileage }}</p>
                        </div>
                    </div>
                    <div class="mt-2">
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Name:</strong> {{ inputValue.name }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Email:</strong> {{ inputValue.email }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Phone:</strong> {{ inputValue.phone_no }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Car Model:</strong> {{ inputValue.car_model }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Booking Date:</strong> {{ inputValue.booking_date }}
                        </p>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button type="submit" class="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-teal-600">
                        Book
                    </button>
                </div>
            </form>
        </Card>
    </div>
</template>

<style scoped>
/* Custom Styles */
</style>
