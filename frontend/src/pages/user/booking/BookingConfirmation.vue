<script setup lang="ts">
import Card from '@components/Card.vue'; 
import CarLogo from '@images/front-car-logo.png';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '@lib/ui/toast/use-toast'; 
import { useVehicleStore } from '@store/vehicle';
import { useCustomerStore } from '@store/customer';
import { useBookingStore } from '@store/booking';
import { useBillingStore } from '@store/billing';
import { Vehicle } from '@types/modules/vehicle';
import { Customer } from '@types/modules/customer';
import { Booking } from '@types/modules/booking';
import { Billing } from '@types/modules/billing';

const router = useRouter();
const { toast } = useToast();

// const vehicle = {
//     make: "Toyota",
//     model: "Corolla",
//     vehicle_type: "Sedan",
//     year: "2022",
//     color: "White",
//     plate_no: "ABC1234",
//     mileage: "15,000 km",
// };

const inputValue = ref({
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'phone_no': '+1234567890',
    'booking_date': '2025-01-15',
    'car_model': 'Toyota',
});

const vehicleStore = useVehicleStore();
const customerStore = useCustomerStore();
const bookingStore = useBookingStore();
const billingStore = useBillingStore();

const vehicles = computed<Vehicle[]>(() => vehicleStore.getVehicles);
const customer = computed<Customer | null>(() => customerStore.currentCustomer);
const vehicle = computed<Vehicle | null>(() => vehicleStore.currentVehicle);
const booking = computed<Partial<Booking> | null>(() => bookingStore.currentBooking);
const todayDate = ref(new Date().toISOString().split("T")[0]);

// const vehicleStatus = {status:0} as Vehicle

onMounted(() => {
  customerStore.getCurrentCust;
  vehicleStore.fetchVehicles();
  bookingStore.getCurrentBooking;
});

async function handleBookCar(){
    try{
        
        const bkData = {...booking.value, created_by: "customer" , updated_by: "customer", booking_date: todayDate.value}
        console.log(bkData)
        await bookingStore.createBooking(bkData);
        vehicle.value.status = 0
        await vehicleStore.updateVehicle(1,vehicle.value)
        //   await bookingStore.fetchBookings();
        toast({
            title: 'Create Successfully',
            description: 'Booking data has been created successfuly',
            variant: 'default',
        });
        router.push({ name: 'HomePage' });
    }catch(error){
      toast({
          title: 'Booking Create failed',
          description: error.message,
          variant: 'destructive',
      });
    }
    // try {
    //     console.log('Car Booked');
    //     router.push({ name: 'HomePage' });
    //     toast({
    //         title: 'Booking successful !',
    //         // description: 'Thank you',
    //         variant: 'default',
    //     });
    // } catch (error) {
    //     toast({
    //         title: 'Booking failed !',
    //         description: 'Please try again later',
    //         variant: 'destructive',
    //     });
    //     console.error("Edit Profile failed:", error);
    // }
}

</script>

<template>
    <!-- {{ customer }} -->
    <!-- {{ vehicle }}
     {{ booking }} -->
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
                            <p class="text-xl font-semibold">{{ vehicle.make }} {{ vehicle.vehicle_model }}</p>
                            <p class="text-lg">{{ vehicle.vehicle_type }}</p>
                            <p class="text-sm">Year: {{ vehicle.model_year }} - Color: {{ vehicle.color }}</p>
                            <p class="text-sm">Plate No: {{ vehicle.plate_number }}</p>
                            <p class="text-sm">Mileage: {{ vehicle.mileage }}</p>
                        </div>
                    </div>
                    <div class="mt-2">
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Name:</strong> {{ customer.first_name }} {{ customer.last_name }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Email:</strong> {{ customer.email }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Phone:</strong> {{ customer.phone_number }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Car Type:</strong> {{ vehicle.vehicle_type }}
                        </p>
                        <p class="mt-2 text-sm text-gray-700">
                            <strong>Booking Date:</strong> {{ new Date().toISOString().split('T')[0] }}
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
