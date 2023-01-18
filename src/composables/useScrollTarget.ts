import { ref } from "vue";

const scrollTarget = ref<HTMLElement>();

export function useScrollTarget() {
  return scrollTarget;
}
