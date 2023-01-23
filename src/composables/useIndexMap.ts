import { resolveUnref, type MaybeComputedRef } from "@vueuse/core";
import { computed } from "vue";

export function useIndexMap<T extends any[]>(
  targets: MaybeComputedRef<T>,
  mapFn: (t: T[number], i: number, arr: T) => any = resolveUnref
) {
  return computed(
    () =>
      new Map(
        resolveUnref(targets).map((t, i, arr) => [mapFn(t, i, arr as T), i])
      )
  );
}
