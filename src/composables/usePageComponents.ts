import { usePageRefs } from "./usePageRefs";
import { type VueInstance, resolveUnref, tryOnUnmounted } from "@vueuse/core";
import { useRoutePages } from "./useRoutePages";
import { ref, watchEffect } from "vue";

const components = ref<(VueInstance | undefined)[]>([]);

export function usePageComponents() {
  const pages = useRoutePages();
  const { pageRefs } = usePageRefs();

  watchEffect(() => {
    components.value = resolveUnref(pages).map(
      (page) =>
        pageRefs.value.find((ref) => ref?.page.path === page.path)?.component
    );
  });

  tryOnUnmounted(() => {
    components.value = [];
  });

  return components;
}
