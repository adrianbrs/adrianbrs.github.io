import { ref, type ComputedRef, type Ref, watch } from "vue";
import { useScrollTarget } from "./useScrollTarget";
import { useElementVisibility } from "@vueuse/core";

export function useShowAnim(
  page:
    | Ref<HTMLElement | undefined>
    | ComputedRef<HTMLElement | undefined>
    | HTMLElement
    | undefined,
  once = true
) {
  const show = ref(true);
  const scrollTarget = useScrollTarget();
  const isVisible = useElementVisibility(page, {
    scrollTarget,
  });

  const unwatch = watch(
    () => isVisible.value,
    (visible) => {
      if (once) {
        if (visible) {
          show.value = true;
          unwatch();
        }
      } else {
        show.value = visible;
      }
    },
    {}
  );

  return show;
}
