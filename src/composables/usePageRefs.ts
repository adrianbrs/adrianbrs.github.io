import { type Ref, ref, onUnmounted } from "vue";
import type { CdvRoutePage } from "./useRoutePages";
import type { VueInstance } from "@vueuse/core";

export interface PageRef {
  component: VueInstance;
  page: CdvRoutePage;
}

export interface UsePageRefsReturn {
  pageRefs: Ref<PageRef[]>;
  updatePageRef: (page: CdvRoutePage, component?: VueInstance | null) => void;
}

const pageRefs = ref<PageRef[]>([]);
const pageIndexMap = new Map<string, number>();

export function usePageRefs(): UsePageRefsReturn {
  const updatePageRef = (
    page: CdvRoutePage,
    component?: VueInstance | null
  ) => {
    const currentRefIndex = pageIndexMap.get(page.path);
    if (currentRefIndex != null) {
      if (component) {
        pageRefs.value[currentRefIndex].component = component;
      } else {
        pageRefs.value.splice(currentRefIndex, 1);
        pageIndexMap.delete(page.path);
      }
    } else {
      pageRefs.value.push({ page, component: component! });
      pageIndexMap.set(page.path, pageRefs.value.length - 1);
    }
  };

  onUnmounted(() => {
    pageRefs.value = [];
    pageIndexMap.clear();
  });

  return { pageRefs, updatePageRef };
}
