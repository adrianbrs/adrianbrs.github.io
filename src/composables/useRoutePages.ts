import { computed } from "vue";
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import { useRouteChildren } from "./useRouteChildren";

export type CdvRoutePage = RouteRecordRaw & {
  name: string;
  meta: {
    hidden: false;
  };
};

export function useRoutePages(route: RouteLocationNormalizedLoaded) {
  const children = useRouteChildren(route);
  return computed(() =>
    children.value.filter(
      (route): route is CdvRoutePage => !!(route.name && !route.meta?.hidden)
    )
  );
}
