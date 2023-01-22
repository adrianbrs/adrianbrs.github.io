import type { MaybeComputedRef, UseElementBoundingOptions } from "@vueuse/core";
import type { CdvRoutePage } from "./useRoutePages";
import { usePageComponents } from "./usePageComponents";
import { useElementBoundingMulti } from "./useElementBoundingMulti";

export function usePageBoundings(
  pages: MaybeComputedRef<CdvRoutePage[]>,
  options?: UseElementBoundingOptions
) {
  const pageComponents = usePageComponents(pages);
  return useElementBoundingMulti(pageComponents, options);
}
