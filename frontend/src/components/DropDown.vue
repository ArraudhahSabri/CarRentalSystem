<script setup lang="ts">
import { defineModel } from 'vue'

const model = defineModel({
    required: true,
});
defineProps({
    labelName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: 'Please Select ..'
    },
    items: {
        type: Array,
        required: true,
    },
    message: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <div class="flex">
        <label class="text-black me-2 w-1/5 !important">{{ labelName }}</label>
        <select v-model="model" :class="[
            'border focus:outline-none focus:ring-2 focus:ring-black', // Default black border
            message ? '!ring-2 ring-red-500' : 'border-black' // Red ring when there's a message
        ]"
        class="rounded w-4/5">
            <option class="text-black !important" disabled value="">{{ name }}</option>
            <option class="text-black !important" v-for="(item, index) in items" :key="index" :value="item">
                {{ item }}
            </option>
        </select>
        <small class="error text-red-500" v-if="message">{{ message }}</small>
    </div>
</template>
