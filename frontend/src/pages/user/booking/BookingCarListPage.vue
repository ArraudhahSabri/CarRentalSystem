<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import TextInput from '@components/TextInput.vue';
import DropDown from '@components/DropDown.vue';
import Card from '@components/Card.vue'; 
import CarLogo from '@images/front-car-logo.png';
import { useRouter } from 'vue-router';
import { useToast } from '@lib/ui/toast/use-toast';
import { Vehicle } from '@types/modules/vehicle';
import { Customer } from '@types/modules/customer';
import { Booking } from '@types/modules/booking';
import { useVehicleStore } from '@store/vehicle';
import { useCustomerStore } from '@store/customer';
import { useBookingStore } from '@store/booking';

const router = useRouter();
const { toast } = useToast();

const buttonLabel :string = 'Book Car';

const inputValue = ref({
    'name': '',
    'email': '',
    'phone_no': '',
    'booking_date': '',
    'car_model': '',
});

const carPrices: Record<string, number> = {
  Toyota: 100,
  Mazda: 120,
  BMW: 200,
  Mercedes: 300,
  Honda: 110,
  Porsche: 700,
  Perodua: 60,
  Proton: 80,
  Cherry: 90,
  Subaru: 170
};

const selectedVehicle = ref<Vehicle>({
  vehicle_id: "",
  make: "",
  vehicle_model: "",
  model_year: 0,
  vehicle_type: "",
  color: "",
  plate_number: "",
  mileage: 0,
  current_service_date: null,
  current_condition: "",
  status: null,
});

async function handleBookCar(){
    // console.log('Car Confirmation Chosed:', selectedVehicle.value);
    for (const key in selectedVehicle.value) {
        if (selectedVehicle.value[key as keyof typeof selectedVehicle.value] === "") {
            toast({
                description: 'Please complete all the information before continue',
                variant: 'destructive',
            });
            return false;
        }
    }

    const currBookingData = { ...booking.value, status: 1, total_price: price.value, customer: 1, vehicle: 1, discount: 1 };
    console.log(currBookingData);

    try{
        const response = await vehicleStore.setSelectedVehicle(selectedVehicle.value);
        await bookingStore.setCurrentBooking(currBookingData);
        // toast({
        //     description: 'Customer created',
        //     variant: 'default',
        // });
        router.push({ name: 'UserBookingConfirmationPage' });
    }catch(error){
        console.error(error)
        toast({
            description: error.message,
            variant: 'destructive',
        });
    }
}

const vehicleStore = useVehicleStore();
const customerStore = useCustomerStore();
const bookingStore = useBookingStore();

const vehicles = computed<Vehicle[]>(() => vehicleStore.getVehicles);
const customer = computed<Customer | null>(() => customerStore.currentCustomer);
const booking = computed<Partial<Booking> | null>(() => bookingStore.currentBooking);

const price = ref(0); 

const updatePrice = () => {
  if (!selectedVehicle.value.make || !booking.value.pickup_date || !booking.value.return_date) {
    price.value = 0;
    return;
  }

  const pickupDate = new Date(booking.value.pickup_date);
  const returnDate = new Date(booking.value.return_date);
  const numDays = Math.max(1, (returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24));

  price.value = (carPrices[selectedVehicle.value.make] ?? 0) * numDays;
};

// Watch for changes in `make`, `pickup_date`, or `return_date`
watch(
  () => [selectedVehicle.value.make, booking.value.pickup_date, booking.value.return_date], 
  updatePrice
);

onMounted(() => {
  customerStore.getCurrentCust;
  bookingStore.getCurrentBooking;
  vehicleStore.fetchVehicles();
  updatePrice();
});

</script>

<template>
  <!-- {{ selectedVehicle }}
  {{ booking }} -->
    <div class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Customer Details</h2>
      
      <div class="flex flex-col space-y-3">
        <div class="flex items-center space-x-3">
          <span class="text-gray-500 font-medium">👤 Name:</span>
          <span class="text-gray-800 font-semibold uppercase">{{ customer.first_name }} {{ customer.last_name }}</span>
        </div>
        
        <div class="flex items-center space-x-3">
          <span class="text-gray-500 font-medium">👤 Phone No:</span>
          <span class="text-gray-800 font-semibold uppercase">{{ customer.phone_number }}</span>
        </div>

        <div class="flex items-center space-x-3">
          <span class="text-gray-500 font-medium">📧 Email:</span>
          <span class="text-blue-600">{{ customer.email }}</span>
        </div>
      </div>
    </div>
    <div class="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
      
      <div class="flex flex-col space-y-3">
        <div class="flex items-center space-x-3">
          <span class="text-gray-500 font-medium">Pickup Date:</span>
          <span class="text-gray-800 font-semibold uppercase">{{ booking.pickup_date }}</span>
          <span class="text-gray-500 font-medium">Return Date:</span>
          <span class="text-gray-800 font-semibold uppercase">{{ booking.return_date }}</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-gray-500 font-medium">Pickup Location:</span>
          <span class="text-gray-800 font-semibold uppercase">{{ booking.pickup_location }}</span>
          <span class="text-gray-500 font-medium">Return Location:</span>
          <span class="text-gray-800 font-semibold uppercase">{{ booking.return_location }}</span>
        </div>
      </div>
    </div>
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
                    <p class="text-xl font-semibold text-gray-800">{{ selectedVehicle?.make }} {{ selectedVehicle?.vehicle_model }}</p>
                    <p class="text-sm text-gray-500">{{ selectedVehicle?.vehicle_type }}</p>
                    <p class="text-sm text-gray-500">{{ selectedVehicle?.model_year }} - {{ selectedVehicle?.color }}</p>
                    <p class="text-sm text-gray-500">Plate No: {{ selectedVehicle?.plate_number }}</p>
                    <p class="text-sm text-gray-500">Mileage: {{ selectedVehicle?.mileage }} km</p>
                    <p class="text-sm text-gray-500">Price: RM {{ price }}</p>
                    </div>
                </div>
            </Card>
            <button type="submit" class="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg">
                Book Car
            </button>
        </form>
        <div class="product-grid">
            <div v-for="(vehicle, index) in vehicles.filter(v => v.status === 1)" :key="index" class="product-item">
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
                            <p class="text-xl font-semibold text-gray-800">{{ vehicle.make }} {{ vehicle.vehicle_model }}</p>
                            <p class="text-sm text-gray-500">{{ vehicle.vehicle_type }}</p>
                            <p class="text-sm text-gray-500">{{ vehicle.model_year }} - {{ vehicle.color }}</p>
                            <p class="text-sm text-gray-500">Plate No: {{ vehicle.plate_number }}</p>
                            <p class="text-sm text-gray-500">Mileage: {{ vehicle.mileage }} km</p>
                            <!-- <p class="text-sm text-gray-500">Price: RM {{ price }}</p> -->
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
