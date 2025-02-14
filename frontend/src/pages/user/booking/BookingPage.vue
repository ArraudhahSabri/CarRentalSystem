<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TextInput from '@components/TextInput.vue';
import DropDown from '@components/DropDown.vue';
import { useRouter } from 'vue-router';
import { useToast } from '@lib/ui/toast/use-toast';
import { Customer } from '@types/modules/customer';
import { useCustomerStore } from '@store/customer';
import { useBookingStore } from '@store/booking';

const { toast } = useToast();
const router = useRouter();
const customerStore = useCustomerStore();
const bookingStore = useBookingStore();

const buttonLabel :string = 'Search Car';

const inputValue = ref({
    // 'name': '',
    'email': '',
    // 'phone_number': '',
    // 'booking_date': '',
    'car_model': '',
    'pickup_date': null,
    'return_date': null,
    'pickup_location': '',
    'return_location': '',
});

async function handleCheckCarList(){
    for (const key in inputValue.value) {
        if (inputValue.value[key as keyof typeof inputValue.value].trim() === "") {
            toast({
                description: 'Please complete all the information before continue',
                variant: 'destructive',
            });
            return false;
        }
    }

    try {
        console.log("popo")
        await bookingStore.setCurrentBooking(inputValue.value);
        console.log("popo1")
        const response = await customerStore.getCurrentCustomer(inputValue.value.email)
        if(response){
            router.push({ name: 'UserCarListBookingPage' });
        }else{
            router.push({ name: 'UserCustomerBooking' });
        }
    } catch (error) {
        toast({
            description: error.message,
            variant: 'destructive',
        });
    }
}

</script>

<template>
    <hr>
    <div class="space-y-4 text-start">
        <form @submit.prevent="handleCheckCarList">
            <!-- <TextInput
                labelName="Name"
                v-model="inputValue.name"
                type="text"
                class="pb-4"
            /> -->
            <TextInput
                labelName="Email"
                v-model="inputValue.email"
                type="email"
                class="pb-4"
            />
            <!-- <TextInput
                labelName="Phone Number"
                v-model="inputValue.phone_number"
                type="text"
                class="pb-4"
            /> -->
            <DropDown 
                labelName="Car Model" 
                :items="['Toyota', 'Mazda', 'BMW', 'Mercedes', 'Honda', 'Porsche', 'Perodua', 'Proton', 'Cherry', 'Subaru']" 
                v-model="inputValue.car_model"
                class="pb-4"
            />
            <!-- <TextInput
                labelName="Booking Date"
                v-model="inputValue.booking_date"
                type="date"
                class="pb-4"
            /> -->
            <TextInput
                labelName="Pickup Date"
                v-model="inputValue.pickup_date"
                type="date"
                class="pb-4"
            />
            <TextInput
                labelName="Return Date"
                v-model="inputValue.return_date"
                type="date"
                class="pb-4"
            />
            <TextInput
                labelName="Pickup Location"
                v-model="inputValue.pickup_location"
                type="text"
                class="pb-4"
            />
            <TextInput
                labelName="Return Location"
                v-model="inputValue.return_location"
                type="text"
                class="pb-4"
            />
            <hr class="pb-4">
        <!-- <router-link 
            to="/" 
            class="flex gap-2 justify-center rounded-full"
            tag="button"
        > -->
        <div class="flex justify-center">
            <button type="submit" class="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-lightblue-700">
                {{ buttonLabel }}
            </button>
        </div>
        <!-- </router-link> -->
        </form>
    </div>
</template>

<style>
form{
  all: unset;
}
</style>

