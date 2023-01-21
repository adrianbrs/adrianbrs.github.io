import { computed } from "vue";
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import { useRouteChildren } from "./useRouteChildren";

export type CdvRoutePage = RouteRecordRaw & {
  meta: {
    label: string;
    hidden: false;
  };
};

export function useRoutePages(route: RouteLocationNormalizedLoaded) {
  const children = useRouteChildren(route);
  return computed(() =>
    children.value.filter(
      (route): route is CdvRoutePage =>
        !!(route.meta?.label && !route.meta?.hidden)
    )
  );
}
