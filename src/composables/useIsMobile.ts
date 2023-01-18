import { useWindowSize } from "@vueuse/core";
import { type ComputedRef, type Ref, unref, computed } from "vue";

export function useIsMobile(
  maxWidth: Ref<number> | ComputedRef<number> | number = 768
) {
  const { width } = useWindowSize();
  return computed(() => unref(width) < unref(maxWidth));
}
