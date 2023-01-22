import { computed } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useRoutePages } from "./useRoutePages";
import { useI18n } from "vue-i18n";

interface _CdvNavItemBase {
  name: string;
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
  const { t } = useI18n();
  const navItems = computed((): CdvNavItem[] => {
    return pages.value.map((page) => ({
      name: page.name,
      to: page.path,
      label: t(`pages.${page.name}.label`),
    }));
  });

  return navItems;
}
