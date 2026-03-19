<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  hover: false,
});

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};
</script>

<template>
  <div
    :class="[
      'card',
      paddingClasses[padding],
      hover && 'hover:shadow-lg transition-shadow duration-200 cursor-pointer',
    ]"
  >
    <slot />
  </div>
</template>
