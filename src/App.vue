<script setup lang="ts">
// import { loadFull } from "tsparticles";
// import { useElementBounding, useScroll, useWindowSize } from "@vueuse/core";
// import CdvNavbar, {
//   type CdvNavbarItem,
// } from "./components/organisms/CdvNavbar.vue";
// import CdvPageIndicator from "./components/molecules/CdvPageIndicator.vue";
// import { computed, ref } from "vue";
// import CdvFooter from "./components/organisms/CdvFooter.vue";
// import { useScrollTarget } from "./composables/useScrollTarget";

// const particlesInit = async (engine: any) => {
//   await loadFull(engine);
// };

// const homeRef = ref<HTMLElement>();
// const aboutRef = ref<HTMLElement>();
// const stackRef = ref<HTMLElement>();
// const projectsRef = ref<HTMLElement>();
// const contactRef = ref<HTMLElement>();

// const { height: homeHeight } = useElementBounding(homeRef);
// const { height: aboutHeight } = useElementBounding(aboutRef);
// const { height: stackHeight } = useElementBounding(stackRef);
// const { height: projectsHeight } = useElementBounding(projectsRef);
// const { height: contactHeight } = useElementBounding(contactRef);

// const heights = computed(() => [
//   homeHeight.value,
//   aboutHeight.value,
//   stackHeight.value,
//   projectsHeight.value,
//   contactHeight.value,
// ]);

// const navItems: CdvNavbarItem[] = [
//   { text: "Home", to: "#home" },
//   { text: "About", to: "#about" },
//   { text: "Stack", to: "#stack" },
//   { text: "Projects", to: "#projects" },
//   { text: "Contact", to: "#contact" },
// ];

// const container = useScrollTarget();
// const { width } = useWindowSize();
// const { y: scrollTop } = useScroll(container);

// const isMobile = computed(() => width.value < 768);
// const scrollTreshold = ref(50);
// const isScrollingDown = computed(() => scrollTop.value > scrollTreshold.value);
// const inlineNavbar = computed(() => !isMobile.value && !isScrollingDown.value);
</script>

<template>
  <RouterView />
</template>
