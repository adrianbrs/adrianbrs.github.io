import { usePageRefs } from "./usePageRefs";
import {
  type MaybeComputedRef,
  type VueInstance,
  resolveUnref,
  tryOnUnmounted,
} from "@vueuse/core";
import type { CdvRoutePage } from "./useRoutePages";
import { ref, watchEffect } from "vue";

const components = ref<(VueInstance | undefined)[]>([]);

export function usePageComponents(pages: MaybeComputedRef<CdvRoutePage[]>) {
  const { pageRefs } = usePageRefs();

  watchEffect(() => {
    components.value = resolveUnref(pages).map(
      (page) =>
        pageRefs.value.find((ref) => ref.page.path === page.path)?.component
    );
  });

  tryOnUnmounted(() => {
    components.value = [];
  });

  return components;
}
