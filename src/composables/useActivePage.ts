import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useScrollTarget } from "./useScrollTarget";
import { useScroll } from "@vueuse/core";
import { usePageComponents } from "./usePageComponents";
import type { ComputedRef } from "vue";
import type { CdvRoutePage } from "./useRoutePages";

// TODO: This is a work in progress
export function useActivePage(
  pages: CdvRoutePage[] | ComputedRef<CdvRoutePage[]>,
  route: RouteLocationNormalizedLoaded
) {
  const scrollTarget = useScrollTarget();
  const { y } = useScroll(scrollTarget);
  const pageComponents = usePageComponents(pages);
}
