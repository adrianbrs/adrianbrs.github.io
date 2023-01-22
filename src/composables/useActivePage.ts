import type { CdvRoutePage } from "./useRoutePages";
import {
  type MaybeComputedRef,
  resolveUnref,
  useCached,
  useScroll,
  useWindowSize,
} from "@vueuse/core";
import { computed, ref, watchEffect, type Ref, toRefs, watch } from "vue";
import { usePageBoundings } from "./usePageBoundings";
import { useScrollTarget } from "./useScrollTarget";

export interface UseActivePageOptions {
  treshold?: number;
}

export function useActivePage(
  pages: MaybeComputedRef<CdvRoutePage[]>,
  options: UseActivePageOptions = {}
): Ref<CdvRoutePage | null> {
  const { treshold = 0.55 } = options;
  const boundingsRef = usePageBoundings(pages);
  const { isScrolling } = useScroll(useScrollTarget());
  const { height } = useWindowSize();

  const activePage = ref<CdvRoutePage | null>(null);

  watchEffect(
    () => {
      if (isScrolling.value) {
        return;
      }

      for (let i = 0; i < boundingsRef.value.length; i++) {
        const b = boundingsRef.value[i];
        const heightInView = Math.max(
          Math.min(
            b.bottom - Math.max(b.top, 0),
            Math.min(b.bottom, height.value) - b.top,
            height.value
          ),
          0
        );
        const percentInView = heightInView / height.value;
        if (percentInView > treshold) {
          activePage.value = resolveUnref(pages)[i];
          return;
        }
      }

      activePage.value = null;
    },
    { flush: "post" }
  );

  return activePage;
}
