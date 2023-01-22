import type { MaybeComputedRef } from "@vueuse/core";
import type { CdvRoutePage } from "./useRoutePages";
import { usePageComponents } from "./usePageComponents";
import { useElementSizeMulti } from "./useElementSizeMulti";

export function usePageSizes(pages: MaybeComputedRef<CdvRoutePage[]>) {
  const pageComponents = usePageComponents(pages);
  return useElementSizeMulti(pageComponents, undefined, { box: "border-box" });
}
