<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

interface Props {
  open: boolean;
  title?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const modalRef = ref<HTMLDivElement | null>(null);

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    emit('close');
  }
}

function handleBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
    emit('close');
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : undefined"
        @click="handleBackdropClick"
      >
        <div
          ref="modalRef"
          class="card w-full max-w-md max-h-[90vh] overflow-auto"
          tabindex="-1"
        >
          <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2
              v-if="title"
              id="modal-title"
              class="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {{ title }}
            </h2>
            <button
              type="button"
              class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cerrar modal"
              @click="emit('close')"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-4">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="p-4 border-t border-gray-200 dark:border-gray-700">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
