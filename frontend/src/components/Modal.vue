<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
  
        <div v-if="data && columns.length" class="grid grid-cols-2 gap-4">
          <div v-for="column in filteredColumns" :key="column.accessorKey" 
            class="flex flex-col"
            :class="{ 'col-span-2': column.accessorKey === 'address' }">
            
            <label class="text-sm font-medium text-gray-700">{{ column.header }}</label>
  
            <!-- Dropdown for Status -->
            <select v-if="column.accessorKey === 'status'"
              v-model="editableData[column.accessorKey]"
              class="border p-2 w-full rounded"
            >
              <option :value="1">Available</option>
              <option :value="0">Booked</option>
            </select>
  
            <!-- Default Input -->
            <input v-else 
              v-model="editableData[column.accessorKey]"
              class="border p-2 w-full rounded"
              :placeholder="`Enter ${column.header}`"
            />
          </div>
        </div>
  
        <div class="flex justify-end space-x-2 mt-4">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="saveChanges" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  
  const props = defineProps({
    show: Boolean,
    title: String,
    data: Object,
    columns: Array, // Accept columns array dynamically
  });
  
  const emits = defineEmits(["close", "confirm"]);
  
  const editableData = ref({});
  
  // Filter columns to remove "no"
  const filteredColumns = computed(() => props.columns.filter(col => col.accessorKey !== "no"));
  
  watch(
    () => props.data,
    (newData) => {
      if (newData) editableData.value = { ...newData };
    },
    { deep: true, immediate: true }
  );
  
  const saveChanges = () => {
    emits("confirm", editableData.value);
  };
  </script>
  
  <style scoped>
  /* Adjust input and select styles for consistency */
  input, select {
    min-height: 36px;
  }
  </style>
  