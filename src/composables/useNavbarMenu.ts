import { ref } from "vue";

const isOpen = ref(false);

export function useNavbarMenu() {
  function toggle() {
    isOpen.value = !isOpen.value;
  }

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, toggle, open, close };
}
