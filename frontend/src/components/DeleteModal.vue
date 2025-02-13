<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 class="text-lg font-bold mb-4">Confirm Deletion</h2>
      
      <p class="text-md" v-if="rowData">
        Are you sure you want to delete this data?
      </p>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="$emit('cancel')" class="px-2 py-1 text-sm bg-gray-300 rounded">Cancel</button>
        <button @click="$emit('confirm')" class="px-2 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  rowData: Object, // Accepts row data
});

defineEmits(["confirm", "cancel"]);
</script>
