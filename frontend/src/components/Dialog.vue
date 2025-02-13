<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[600px]">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>

      <div v-if="columns.length" class="grid grid-cols-2 gap-4">
        <div v-for="column in filteredColumns" :key="column.accessorKey" 
          class="flex flex-col"
          :class="{ 'col-span-2': column.accessorKey === 'address' }">
          
          <label class="text-sm font-medium text-gray-700">{{ column.header }}</label>

          <!-- Determine input type -->
          <input 
            v-model="newData[column.accessorKey]"
            class="border p-2 w-full rounded"
            :type="getInputType(column.accessorKey)"
            :placeholder="`Enter ${column.header}`"
            @input="formatDate(column.accessorKey)"/>
        </div>
      </div>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button @click="createRecord" class="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  show: Boolean,
  title: String,
  columns: Array, // Accepts columns array dynamically
});

const emits = defineEmits(["close", "create"]);

const newData = ref({});

// Filter out "no", "action", and "status" columns
const filteredColumns = computed(() => props.columns.filter(col => col.accessorKey !== "no" && col.accessorKey !== "action" && col.accessorKey !== "status"));

const getInputType = (key) => {
  if (key.toLowerCase().includes("date")) return "date";
  if (key.toLowerCase().includes("year") || key.toLowerCase().includes("mileage")) return "number";
  return "text";
};

const formatDate = (key) => {
  if (key.toLowerCase().includes("date") && newData.value[key]) {
    newData.value[key] = newData.value[key].slice(0, 10); // Ensure format YYYY-MM-DD
  }
};

const createRecord = () => {
  emits("create", newData.value);
  newData.value = {}; // Reset form after submission
};
</script>

<style scoped>
input {
  min-height: 36px;
}
</style>