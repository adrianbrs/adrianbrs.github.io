import { usePageComponents } from "./usePageComponents";
import { useElementSizeMulti } from "./useElementSizeMulti";

export function usePageSizes() {
  const pageComponents = usePageComponents();
  return useElementSizeMulti(pageComponents, undefined, { box: "border-box" });
}
