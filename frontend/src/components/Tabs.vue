<template>
  <div class="w-2/5 h-[30vh] mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg flex flex-col">
    <div class="flex justify-center border-b border-gray-300">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="px-6 py-2 text-lg font-medium focus:outline-none transition-colors duration-300"
        :class="activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="flex-1 p-6 text-center border border-gray-300 rounded-b-lg bg-gray-50">
      <slot :name="tabs[activeTab]?.slot"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

type Tab = {
  name: string;
  slot: string;
};

const props = defineProps<{ tabs: Tab[] }>();

const activeTab = ref(0);
</script>
