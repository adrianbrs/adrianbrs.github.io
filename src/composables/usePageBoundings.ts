import type { UseElementBoundingOptions } from "@vueuse/core";
import { usePageComponents } from "./usePageComponents";
import { useElementBoundingMulti } from "./useElementBoundingMulti";

export function usePageBoundings(options?: UseElementBoundingOptions) {
  const pageComponents = usePageComponents();
  return useElementBoundingMulti(pageComponents, options);
}
