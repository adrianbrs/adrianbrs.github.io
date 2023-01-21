import { watch, type Ref, shallowRef } from "vue";
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";

export function useRouteChildren(
  route: RouteLocationNormalizedLoaded
): Ref<RouteRecordRaw[]> {
  const children = shallowRef<RouteRecordRaw[]>([]);

  watch(
    () => route.matched[0].children,
    (newChildren) => {
      children.value = newChildren;
    },
    {
      immediate: true,
    }
  );

  return children;
}
