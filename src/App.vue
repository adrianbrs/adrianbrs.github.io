<script setup lang="ts">
import { loadFull } from "tsparticles";
import { useElementBounding, useScroll, useWindowSize } from "@vueuse/core";
import CdvNavbar, {
  type CdvNavbarItem,
} from "./components/organisms/CdvNavbar.vue";
import CdvPageIndicator from "./components/molecules/CdvPageIndicator.vue";
import { computed, ref } from "vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import StackView from "./views/StackView.vue";
import ProjectsVuew from "./views/ProjectsView.vue";
import ContactView from "./views/ContactView.vue";
import CdvFooter from "./components/organisms/CdvFooter.vue";
import { useScrollTarget } from "./composables/useScrollTarget";

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const homeRef = ref<HTMLElement>();
const aboutRef = ref<HTMLElement>();
const stackRef = ref<HTMLElement>();
const projectsRef = ref<HTMLElement>();
const contactRef = ref<HTMLElement>();

const { height: homeHeight } = useElementBounding(homeRef);
const { height: aboutHeight } = useElementBounding(aboutRef);
const { height: stackHeight } = useElementBounding(stackRef);
const { height: projectsHeight } = useElementBounding(projectsRef);
const { height: contactHeight } = useElementBounding(contactRef);

const heights = computed(() => [
  homeHeight.value,
  aboutHeight.value,
  stackHeight.value,
  projectsHeight.value,
  contactHeight.value,
]);

const navItems: CdvNavbarItem[] = [
  { text: "Home", to: "#home" },
  { text: "About", to: "#about" },
  { text: "Stack", to: "#stack" },
  { text: "Projects", to: "#projects" },
  { text: "Contact", to: "#contact" },
];

const container = useScrollTarget();
// const container = ref<HTMLDivElement | undefined>();
const { width } = useWindowSize();
const { y: scrollTop } = useScroll(container);

const isMobile = computed(() => width.value < 768);
const scrollTreshold = ref(50);
const inlineNavbar = computed(
  () => !isMobile.value && scrollTop.value < scrollTreshold.value
);
</script>

<template>
  <div class="cdv-app">
    <CdvPageIndicator
      :items="navItems.map(({ text }) => text)"
      :heights="heights"
      :scrollTop="scrollTop"
    ></CdvPageIndicator>

    <CdvNavbar :inline="inlineNavbar" :items="navItems"> </CdvNavbar>

    <main class="cdv-content" ref="container">
      <HomeView id="home" ref="homeRef" />
      <AboutView id="about" ref="aboutRef" />
      <StackView id="stack" ref="stackRef" />
      <ProjectsVuew id="projects" ref="projectsRef" />
      <ContactView id="contact" ref="contactRef" />
      <CdvFooter :items="navItems"></CdvFooter>
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
    scroll-snap-type: y mandatory;
    scroll-snap-stop: always !important;
    scroll-behavior: smooth;

    > .cdv-page {
      scroll-snap-align: start;
      max-width: var(--app-max-width);
      min-width: min(100vw, var(--app-max-width));
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
