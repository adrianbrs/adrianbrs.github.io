import { ref, type ComputedRef, type Ref, watch } from "vue";
import { useScrollTarget } from "./useScrollTarget";
import { useElementVisibility } from "@vueuse/core";

export function useShowOnce(
  page:
    | Ref<HTMLElement | undefined>
    | ComputedRef<HTMLElement | undefined>
    | HTMLElement
    | undefined
) {
  const show = ref(false);
  const scrollTarget = useScrollTarget();
  const isVisible = useElementVisibility(page, {
    scrollTarget,
  });

  const unwatch = watch(
    () => isVisible.value,
    (visible) => {
      if (visible && !show.value) {
        show.value = true;
        unwatch();
      }
    },
    {}
  );

  return show;
}
