<script setup lang="ts">
// import { loadFull } from "tsparticles";
import { useScroll } from "@vueuse/core";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useScrollTarget } from "@/composables/useScrollTarget";
import { useIsMobile } from "@/composables/useIsMobile";
import { useRoute, useRouter } from "vue-router";
import { useNavItems } from "@/composables/useNavItems";
import { usePageRefs } from "@/composables/usePageRefs";
import { useRoutePages } from "@/composables/useRoutePages";
import { usePageSizes } from "@/composables/usePageSizes";
import { useActivePage } from "@/composables/useActivePage";
import CdvNavbar from "../organisms/CdvNavbar.vue";
import CdvPageIndicator from "../molecules/CdvPageIndicator.vue";
import CdvFooter from "../organisms/CdvFooter.vue";
import CdvNavLink from "../atoms/CdvNavLink.vue";

// const particlesInit = async (engine: any) => {
//   await loadFull(engine);
// };
const router = useRouter();
const route = useRoute();

const { pageRefs, updatePageRef } = usePageRefs();
const navItems = useNavItems(route);
const pages = useRoutePages(route);
const pagePaths = computed(() => new Set(pages.value.map((page) => page.path)));
const pageSizes = usePageSizes(pages);
const pageHeights = computed(() => pageSizes.value.map(({ height }) => height));
const activePage = useActivePage(pages);
const currentPage = computed(() =>
  pageRefs.value.find((ref) => ref.page.path === route.path)
);
const scrollTarget = useScrollTarget();
const pageReady = ref(false);

function scrollToCurrentPage() {
  const target = currentPage.value?.component.$el as HTMLElement;
  if (target) {
    const top = target.offsetTop;
    scrollTarget.value?.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}

watch(activePage, () => {
  if (
    activePage.value &&
    route.path !== activePage.value.path &&
    pageReady.value
  ) {
    router.push(activePage.value);
  }
});

watch(currentPage, () => {
  scrollToCurrentPage();
});

onMounted(() => {
  scrollToCurrentPage();

  // Allow scrolling to the current page on first load
  nextTick(() => {
    pageReady.value = true;
  });
});

const container = useScrollTarget();
const { y: scrollTop } = useScroll(container);

const isMobile = useIsMobile();
const scrollTreshold = ref(50);
const isScrollingDown = computed(() => scrollTop.value > scrollTreshold.value);
const inlineNavbar = computed(() => !isMobile.value && !isScrollingDown.value);
</script>

<template>
  <div class="cdv-app">
    <CdvPageIndicator
      :items="navItems.map((item) => item.label)"
      :heights="pageHeights"
      :scrollTop="scrollTop"
    ></CdvPageIndicator>

    <CdvNavbar :inline="inlineNavbar" :items="navItems">
      Adrian Cerbaro
    </CdvNavbar>

    <main class="cdv-content" ref="container">
      <RouterView v-slot="{ Component, route }">
        <template v-if="pagePaths.has(route.path)">
          <component
            v-for="page in pages"
            :key="page.path"
            :is="page.component!"
            :id="page.path"
            :ref="(component: any) => updatePageRef(page, component)"
          ></component>
        </template>
        <component v-else :is="Component" />
      </RouterView>

      <CdvFooter>
        <template #nav>
          <CdvNavLink
            v-for="item in navItems"
            v-bind="item"
            :key="item.label"
            >{{ item.label }}</CdvNavLink
          >
        </template>
      </CdvFooter>
    </main>

    <!-- <Particles
      class="fixed z-[-1]"
      id="app-particles"
      url="/particles.json"
      :particlesInit="particlesInit"
    /> -->
  </div>
</template>

<style scoped lang="scss">
.cdv-app {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 0;
  overflow: hidden;

  .cdv-content {
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    // scroll-snap-type: y proximity;
    // scroll-snap-stop: always !important;
    scroll-behavior: smooth;

    > .cdv-page {
      scroll-snap-align: start;
      max-width: var(--app-max-width);
      min-width: min(100%, var(--app-max-width));
      margin: 0 auto;
      padding: var(--app-navbar-height) var(--app-spacing) var(--app-spacing)
        var(--app-spacing);
      min-height: 100vh;
    }

    > .cdv-footer {
      scroll-snap-align: end;
    }
  }
}

@media screen and (max-width: 768px) {
  .cdv-app {
    .cdv-content {
      > .cdv-page {
        padding-bottom: calc(var(--app-spacing) * 3);
      }
    }
  }
}
</style>
