import {
  unrefElement,
  type MaybeComputedRef,
  type MaybeElement,
  type UseElementBoundingOptions,
  type UseElementBoundingReturn,
  resolveUnref,
  tryOnMounted,
  useEventListener,
} from "@vueuse/core";
import { useIndexMap } from "./useIndexMap";
import { ref, type Ref, type UnwrapNestedRefs, type UnwrapRef } from "vue";
import { useResizeObserverMulti } from "./useResizeObserverMulti";

export function useElementBoundingMulti(
  targets: MaybeComputedRef<MaybeElement[]>,
  options: UseElementBoundingOptions = {}
) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
  } = options;

  const indexMap = useIndexMap(targets, unrefElement);
  const result = ref<UnwrapRef<UseElementBoundingMultiReturn>>(
    resolveUnref(targets).map((_, i) => ({
      height: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
      update: () => update(i),
    }))
  );

  function update(index: number) {
    const el = unrefElement(resolveUnref(targets)[index]);
    const res = result.value[index];

    if (!el) {
      if (reset) {
        res.height = 0;
        res.bottom = 0;
        res.left = 0;
        res.right = 0;
        res.top = 0;
        res.width = 0;
        res.x = 0;
        res.y = 0;
      }
      return;
    }

    const rect = el.getBoundingClientRect();

    res.height = rect.height;
    res.bottom = rect.bottom;
    res.left = rect.left;
    res.right = rect.right;
    res.top = rect.top;
    res.width = rect.width;
    res.x = rect.x;
    res.y = rect.y;
  }

  function updateAll() {
    resolveUnref(targets).forEach((_, i) => update(i));
  }

  useResizeObserverMulti(targets, (entries) => {
    for (const entry of entries) {
      const index = indexMap.value.get(entry.target);
      typeof index === "number" && update(index);
    }
  });

  if (windowScroll) {
    useEventListener("scroll", updateAll, { capture: true, passive: true });
  }

  if (windowResize) {
    useEventListener("resize", updateAll, { passive: true });
  }

  tryOnMounted(() => {
    if (immediate) {
      updateAll();
    }
  });

  return result;
}

export type UseElementBoundingMultiReturn = Ref<
  UnwrapNestedRefs<UseElementBoundingReturn[]>
>;
