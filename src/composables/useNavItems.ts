import { computed } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useRoutePages } from "./useRoutePages";

interface _CdvNavItemBase {
  label: string;
}

export interface CdvNavItemTo extends _CdvNavItemBase {
  to: string;
}

export interface CdvNavItemHref extends _CdvNavItemBase {
  href: string;
  target?: string;
}

export type CdvNavItem = CdvNavItemTo | CdvNavItemHref;

export function useNavItems(route: RouteLocationNormalizedLoaded) {
  const pages = useRoutePages(route);
  const navItems = computed((): CdvNavItem[] => {
    return pages.value.map((page) => ({
      label: page.meta!.label!,
      to: page.path,
    }));
  });

  return navItems;
}
