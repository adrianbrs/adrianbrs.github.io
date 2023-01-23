import { useRoutePages, type CdvRoutePage } from "./useRoutePages";
import { resolveUnref, useScroll, useWindowSize } from "@vueuse/core";
import { ref, type Ref, watch } from "vue";
import { usePageBoundings } from "./usePageBoundings";
import { useScrollTarget } from "./useScrollTarget";

export interface UseActivePageOptions {
  threshold?: number;
}

export function useActivePage(
  options: UseActivePageOptions = {}
): UseActivePageReturn {
  const { threshold = 0.45 } = options;
  const { isScrolling } = useScroll(useScrollTarget());
  const { height } = useWindowSize();
  const pages = useRoutePages();
  const boundingsRef = usePageBoundings();

  const activePage = ref<CdvRoutePage | null>(null);
  const activePageIndex = ref(-1);

  watch(
    [isScrolling, boundingsRef],
    () => {
      if (isScrolling.value) {
        return;
      }

      // Do a binary search to find the active page
      let start = 0;
      let end = boundingsRef.value.length - 1;
      let middle = Math.floor((start + end) / 2);
      const targetOffset = height.value * threshold;

      do {
        const b = boundingsRef.value[middle];
        const heightInView = Math.max(
          Math.min(
            b.bottom - Math.max(b.top, 0),
            Math.min(b.bottom, height.value) - b.top,
            height.value
          ),
          0
        );
        const percentInView = heightInView / height.value;
        const page = resolveUnref(pages)[middle];

        if (percentInView > threshold && activePage.value?.path !== page.path) {
          activePage.value = page;
          activePageIndex.value = middle;
          // New page that has reached the minimum percentage of visibility
          // on the screen found
          return;
        }

        if (b.top > targetOffset) {
          end = middle - 1;
        } else if (height.value - b.bottom > targetOffset) {
          start = middle + 1;
        } else {
          // No new page that reached the threshold found
          break;
        }

        middle = Math.floor((start + end) / 2);
      } while (start <= end);
    },
    { flush: "post" }
  );

  return { activePage, activePageIndex };
}

export type UseActivePageReturn = {
  activePage: Ref<CdvRoutePage | null>;
  activePageIndex: Ref<number>;
};
