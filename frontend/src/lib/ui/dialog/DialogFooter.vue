<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
// import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
  >
    <slot />
  </div>
</template>
