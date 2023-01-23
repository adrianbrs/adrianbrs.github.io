<script setup lang="ts">
// import { loadFull } from "tsparticles";
import { useElementSize, useScroll, useTitle } from "@vueuse/core";
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useScrollTarget } from "@/composables/useScrollTarget";
import { useIsMobile } from "@/composables/useIsMobile";
import { useRoute, useRouter } from "vue-router";
import { useNavItems } from "@/composables/useNavItems";
import { usePageRefs } from "@/composables/usePageRefs";
import { useRoutePages } from "@/composables/useRoutePages";
import { usePageSizes } from "@/composables/usePageSizes";
import { useActivePage } from "@/composables/useActivePage";
import { useI18n } from "vue-i18n";
import CdvNavbar from "../organisms/CdvNavbar.vue";
import CdvPageIndicator from "../molecules/CdvPageIndicator.vue";
import CdvFooter from "../organisms/CdvFooter.vue";
import CdvNavLink from "../atoms/CdvNavLink.vue";

const { t } = useI18n();

// const particlesInit = async (engine: any) => {
//   await loadFull(engine);
// };

const scrollTarget = useScrollTarget();
const { y: scrollTop, isScrolling } = useScroll(scrollTarget);
const { height: scrollHeight } = useElementSize(scrollTarget);
const scrollBottom = computed(() => scrollTop.value + scrollHeight.value);

const router = useRouter();
const route = useRoute();

const { pageRefs, updatePageRef } = usePageRefs();
const navItems = useNavItems();
const pages = useRoutePages();
const pagePaths = computed(() => new Set(pages.value.map((page) => page.path)));
const pageSizes = usePageSizes();
const pageHeights = computed(() => pageSizes.value.map(({ height }) => height));
const { activePage } = useActivePage();
const currentPage = computed(() =>
  pageRefs.value.find((ref) => ref?.page.path === route.path)
);
const pageReady = ref(false);
const navigating = ref(false);

useTitle(
  computed(() => {
    const page = currentPage.value;
    const pageName = page ? t(`pages.${page.page.name}.title`) : null;
    return `${pageName ? pageName + t("head.page_sep") : ""}${t("head.title")}`;
  })
);

function getScrollAlign(threshold = 100) {
  const target = currentPage.value?.component.$el as HTMLElement;
  if (target && !isScrolling.value) {
    let top = target.offsetTop;
    let bottom = top + target.offsetHeight;

    if (scrollTop.value < top + threshold) {
      return "top";
    } else if (scrollBottom.value > bottom - threshold) {
      return "bottom";
    }
  }
  return "none";
}

function scrollToCurrentPage(
  align: "top" | "bottom" | "auto" | "none" = "auto",
  threshold = -151
) {
  const target = currentPage.value?.component.$el as HTMLElement;
  if (target && !isScrolling.value) {
    let top = target.offsetTop;
    const height = target.offsetHeight;

    if (align === "auto") {
      align = getScrollAlign(threshold);
    }

    if (align === "bottom") {
      top += height - scrollHeight.value;
    } else if (align === "none") {
      return;
    }

    scrollTarget.value?.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}

watch(activePage, async () => {
  if (
    activePage.value &&
    route.path !== activePage.value.path &&
    pageReady.value
  ) {
    navigating.value = true;
    await router.push(activePage.value);
    navigating.value = false;

    scrollToCurrentPage();
  }
});

watch(currentPage, () => {
  if (!navigating.value) {
    scrollToCurrentPage();
  }
});

onMounted(() => {
  scrollToCurrentPage("top");

  // Allow scrolling to the current page on first load
  nextTick(() => {
    pageReady.value = true;
  });
});

const isMobile = useIsMobile();
const scrollTreshold = ref(50);
const isScrollingDown = computed(() => scrollTop.value > scrollTreshold.value);
const inlineNavbar = computed(() => !isMobile.value && !isScrollingDown.value);
</script>

<template>
  <div class="cdv-app">
    <CdvPageIndicator
      :items="navItems"
      :heights="pageHeights"
      :scrollTop="scrollTop"
    ></CdvPageIndicator>

    <CdvNavbar :inline="inlineNavbar" :items="navItems">
      {{ t("general.name") }}
    </CdvNavbar>

    <main class="cdv-content" ref="scrollTarget">
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
          <CdvNavLink v-for="item in navItems" v-bind="item" :key="item.name">{{
            item.label
          }}</CdvNavLink>
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
    scroll-behavior: smooth;

    > .cdv-page {
      scroll-snap-align: none;
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
