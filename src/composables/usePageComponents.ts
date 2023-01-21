import type { ComputedRef } from "vue";
import { usePageRefs } from "./usePageRefs";
import type { CdvRoutePage } from "./useRoutePages";
import { useArrayMap } from "@vueuse/core";

export function usePageComponents(
  pages: CdvRoutePage[] | ComputedRef<CdvRoutePage[]>
) {
  const { pageRefs } = usePageRefs();
  return useArrayMap(pages, (page) => {
    return pageRefs.value.find((ref) => ref.page.path === page.path)?.component;
  });
}
