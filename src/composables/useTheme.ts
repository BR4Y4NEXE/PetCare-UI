import { ref, onMounted } from 'vue';

const isDark = ref(false);

export function useTheme() {
  function toggleTheme(): void {
    isDark.value = !isDark.value;
    applyTheme();
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  }

  function applyTheme(): void {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function initTheme(): void {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark.value = saved ? saved === 'dark' : prefersDark;
    applyTheme();
  }

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme,
    initTheme,
  };
}
