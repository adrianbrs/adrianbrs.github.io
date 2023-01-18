<script setup lang="ts">
import { RouterView } from "vue-router";
import { loadFull } from "tsparticles";
import { useScroll, useWindowSize } from "@vueuse/core";
import CdvNavbar, {
  type CdvNavbarItem,
} from "./components/organisms/CdvNavbar.vue";
import CdvNavLink from "./components/atoms/CdvNavLink.vue";
import CdvPageIndicator from "./components/molecules/CdvPageIndicator.vue";
import { computed, ref } from "vue";

const navItems: CdvNavbarItem[] = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Stack", to: "/stack" },
  { text: "Projects", to: "/projects" },
  { text: "Contact", to: "/contact" },
];

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const { width } = useWindowSize();
const { y } = useScroll(window);

const isMobile = computed(() => width.value < 768);
const scrollTreshold = ref(150);
const inlineNavbar = computed(
  () => !isMobile.value && y.value < scrollTreshold.value
);
</script>

<template>
  <div class="cdv-app">
    <Particles
      id="app-particles"
      url="/particles.json"
      :particlesInit="particlesInit"
    />

    <CdvPageIndicator
      :items="navItems.map(({ text }) => text)"
    ></CdvPageIndicator>

    <CdvNavbar :inline="inlineNavbar" :items="navItems"> </CdvNavbar>

    <main class="cdv-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.cdv-app {
  position: relative;
  max-width: var(--app-max-width);
  min-width: min(100vw, var(--app-max-width));
  min-height: 100vh;
  margin: 0 auto;
  padding: var(--app-navbar-height) var(--app-spacing) var(--app-spacing)
    var(--app-spacing);

  .cdv-content {
    width: 100%;
    min-height: var(--app-content-height);
    position: relative;
  }
}
</style>
