import { type Ref, ref, computed, onUnmounted } from "vue";
import { useRoutePages, type CdvRoutePage } from "./useRoutePages";
import type { VueInstance } from "@vueuse/core";

export interface PageRef {
  component: VueInstance;
  page: CdvRoutePage;
}

export interface UsePageRefsReturn {
  pageRefs: Ref<(PageRef | undefined)[]>;
  updatePageRef: (page: CdvRoutePage, component?: VueInstance | null) => void;
}

let pages: Ref<CdvRoutePage[]>;
let pageRefs: Ref<(PageRef | undefined)[]>;
let pageIndexMap: Ref<Map<string, number>>;

export function usePageRefs(): UsePageRefsReturn {
  if (!pageRefs) {
    pages = useRoutePages();
    pageRefs = ref(pages.value.map(() => undefined));
    pageIndexMap = computed(
      () => new Map(pages.value.map((page, i) => [page.path, i]))
    );

    onUnmounted(() => {
      pageRefs.value = [];
    });
  }

  function updatePageRef(page: CdvRoutePage, component?: VueInstance | null) {
    const currentRefIndex = pageIndexMap.value.get(page.path);
    if (currentRefIndex != null) {
      const exists = !!pageRefs.value[currentRefIndex];

      if (component) {
        if (exists) {
          pageRefs.value[currentRefIndex]!.component = component;
        } else {
          pageRefs.value[currentRefIndex] = { page, component };
        }
      } else if (exists) {
        pageRefs.value[currentRefIndex] = undefined;
      }
    }
  }

  return { pageRefs, updatePageRef };
}
