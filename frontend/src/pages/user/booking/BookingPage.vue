<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '@components/TextInput.vue';
import DropDown from '@components/DropDown.vue';
import { useRouter } from 'vue-router';
import { useToast } from '@lib/ui/toast/use-toast';

const { toast } = useToast();
const router = useRouter();

const buttonLabel :string = 'Search Car';

const inputValue = ref({
    'name': '',
    'email': '',
    'phone_no': '',
    'booking_date': '',
    'car_model': '',
});

function handleCheckCarList(){
    router.push({ name: 'UserCarListBookingPage' });
}

</script>

<template>
    <hr>
    <div class="space-y-4 text-start">
        <form @submit.prevent="handleCheckCarList">
            <TextInput
                labelName="Name"
                v-model="inputValue.name"
                type="text"
                class="pb-4"
            />
            <TextInput
                labelName="Email"
                v-model="inputValue.email"
                type="email"
                class="pb-4"
            />
            <TextInput
                labelName="Phone Number"
                v-model="inputValue.phone_no"
                type="text"
                class="pb-4"
            />
            <DropDown 
                labelName="Car Model" 
                :items="['Toyota', 'Mazda', 'BMW']" 
                v-model="inputValue.car_model"
                class="pb-4"
            />
            <TextInput
                labelName="Booking Date"
                v-model="inputValue.booking_date"
                type="date"
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

