import { watch, type Ref, shallowRef } from "vue";
import { type RouteRecordRaw, useRoute } from "vue-router";

export function useRouteChildren(): Ref<RouteRecordRaw[]> {
  const route = useRoute();
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
