import {
  unrefElement,
  type ElementSize,
  type MaybeComputedRef,
  type MaybeElement,
  type UseResizeObserverOptions,
  resolveUnref,
} from "@vueuse/core";
import { useResizeObserverMulti } from "./useResizeObserverMulti";
import { ref, watch } from "vue";
import { useIndexMap } from "./useIndexMap";

export function useElementSizeMulti(
  targets: MaybeComputedRef<MaybeElement[]>,
  initialSize: ElementSize | ElementSize[] | Map<any, ElementSize> = {
    width: 0,
    height: 0,
  },
  options: UseResizeObserverOptions = {}
) {
  const { box = "content-box" } = options;
  const getInitialSize = (element: any, index: number) =>
    (Array.isArray(initialSize)
      ? initialSize[index]
      : initialSize instanceof Map
      ? initialSize.get(element)
      : initialSize) ?? { width: 0, height: 0 };

  const indexMap = useIndexMap(targets, unrefElement);
  const result = ref<ElementSize[]>(
    resolveUnref(targets).map((t, i) => {
      const element = unrefElement(t);
      const size = getInitialSize(element, i);
      return size;
    })
  );

  useResizeObserverMulti(
    targets,
    (entries) => {
      for (const entry of entries) {
        const element = entry.target;
        const index = indexMap.value.get(element);

        if (index != null) {
          const boxSize =
            box === "border-box"
              ? entry.borderBoxSize
              : box === "content-box"
              ? entry.contentBoxSize
              : entry.devicePixelContentBoxSize;

          let size: ElementSize;

          if (boxSize) {
            size = {
              width: boxSize.reduce(
                (acc, { inlineSize }) => acc + inlineSize,
                0
              ),
              height: boxSize.reduce(
                (acc, { blockSize }) => acc + blockSize,
                0
              ),
            };
          } else {
            size = {
              width: entry.contentRect.width,
              height: entry.contentRect.height,
            };
          }

          result.value[index] = size;
        }
      }
    },
    options
  );

  watch(
    () => resolveUnref(targets).map(unrefElement),
    (elements) => {
      result.value = elements.map((ele, i) => {
        const size = getInitialSize(ele, i);
        const width = ele ? size.width : 0;
        const height = ele ? size.height : 0;
        return { width, height };
      });
    }
  );

  return result;
}
