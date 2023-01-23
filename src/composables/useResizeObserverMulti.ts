import {
  type UseResizeObserverOptions,
  type MaybeComputedRef,
  type MaybeElement,
  defaultWindow,
  useSupported,
  unrefElement,
  resolveUnref,
  tryOnScopeDispose,
} from "@vueuse/core";
import { watch } from "vue";

export function useResizeObserverMulti(
  targets: MaybeComputedRef<MaybeElement[]>,
  callback: ResizeObserverCallback,
  options: UseResizeObserverOptions = {}
) {
  const { window = defaultWindow, ...observerOptions } = options;
  let observer: ResizeObserver | undefined;
  const isSupported = useSupported(() => window && "ResizeObserver" in window);

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () =>
      resolveUnref(targets)
        .map(unrefElement)
        .filter((el): el is NonNullable<typeof el> => !!el),
    (elements, prevElements) => {
      const elementSet = new Set(elements);
      const prevElementSet = new Set(prevElements);
      const addedElements = elements.filter((el) => !prevElementSet.has(el));
      const removedElements = (prevElements ?? []).filter(
        (el) => !elementSet.has(el)
      );

      if (!addedElements.length) {
        cleanup();
        return;
      }

      if (isSupported.value && window) {
        for (const el of removedElements) {
          observer?.unobserve(el);
        }

        observer = observer ?? new ResizeObserver(callback);

        for (const el of addedElements) {
          observer.observe(el, observerOptions);
        }
      } else {
        cleanup();
      }
    },
    { immediate: true, flush: "post" }
  );

  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop,
  };
}
