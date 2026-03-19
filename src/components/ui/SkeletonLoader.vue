<script setup lang="ts">
interface Props {
  variant?: 'text' | 'card' | 'avatar' | 'chart';
  lines?: number;
}

withDefaults(defineProps<Props>(), {
  variant: 'text',
  lines: 1,
});
</script>

<template>
  <div class="animate-pulse">
    <template v-if="variant === 'text'">
      <div
        v-for="i in lines"
        :key="i"
        class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 last:mb-0"
        :style="{ width: i === lines ? '60%' : '100%' }"
      />
    </template>
    
    <template v-else-if="variant === 'card'">
      <div class="space-y-4">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </template>
    
    <template v-else-if="variant === 'avatar'">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </template>
    
    <template v-else-if="variant === 'chart'">
      <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
    </template>
  </div>
</template>
