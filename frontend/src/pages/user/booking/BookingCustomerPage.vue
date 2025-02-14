<template>
    <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Register Customer</h2>
  
      <form @submit.prevent="submitForm">
        <!-- First Name -->
        <TextInput labelName="First Name" v-model="inputValue.first_name" type="text" class="pb-4" required />
  
        <!-- Last Name -->
        <TextInput labelName="Last Name" v-model="inputValue.last_name" type="text" class="pb-4" required />
  
        <!-- Email -->
        <TextInput labelName="Email" v-model="inputValue.email" type="email" class="pb-4" required />
  
        <!-- Phone Number -->
        <TextInput labelName="Phone Number" v-model="inputValue.phone_number" type="tel" class="pb-4" required />
  
        <!-- Address -->
        <TextInput labelName="Address" v-model="inputValue.address" type="text" class="pb-4" required />
  
        <!-- License Type (Dropdown) -->
        <DropDown 
          labelName="License Type" 
          :items="['D', 'DA']" 
          v-model="inputValue.license_type"
          class="pb-4"
        />
  
        <!-- Date of Birth -->
        <TextInput labelName="Date of Birth" v-model="inputValue.date_of_birth" type="date" class="pb-4" required />
  
        <!-- Submit Button -->
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import TextInput from "@components/TextInput.vue";
  import DropDown from "@components/DropDown.vue";
  import { useToast } from '@lib/ui/toast/use-toast';
  import { useCustomerStore } from '@store/customer';
  import { useRouter } from 'vue-router';

  const { toast } = useToast();
  const customerStore = useCustomerStore();
  const router = useRouter();
  
  const inputValue = ref({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    license_type: "",
    date_of_birth: "",
  });
  
  // Handle form submission
  const submitForm = async () => {
    for (const key in inputValue.value) {
        if (inputValue.value[key]?.trim() === "") {  // ✅ Remove TypeScript syntax
            toast({
                description: 'Please complete all the information before continue',
                variant: 'destructive',
            });
            return false;
        }
    }

    const today = new Date().toISOString().split("T")[0];
  
    const customerData = {
      ...inputValue.value,
      register_date: today, // Auto-append today's date
    };
  
    console.log("Submitted Data:", customerData);

    try{
        const response = await customerStore.checkOrCreateCustomer(customerData);
        toast({
            description: 'Customer created',
            variant: 'default',
        });
        router.push({ name: 'UserCarListBookingPage' });
    }catch(error){
        console.error(error)
        toast({
            description: error.message,
            variant: 'destructive',
        });
    }
  };
  </script>
  