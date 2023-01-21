import { createRouter, createWebHistory } from "vue-router";
import CdvNotFoundPage from "@/components/pages/CdvNotFoundPage.vue";
import CdvDefaultTemplate from "@/components/templates/CdvDefaultTemplate.vue";
import CdvHomePage from "@/components/pages/CdvHomePage.vue";
import CdvAboutPage from "@/components/pages/CdvAboutPage.vue";
import CdvStackPage from "@/components/pages/CdvStackPage.vue";
import CdvProjectsPage from "@/components/pages/CdvProjectsPage.vue";
import CdvContactPage from "@/components/pages/CdvContactPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/test",
      component: CdvNotFoundPage,
    },
    {
      path: "/",
      component: CdvDefaultTemplate,
      children: [
        {
          path: "/",
          component: CdvHomePage,
          name: "Home",
          meta: {
            label: "Home",
          },
        },
        {
          path: "/about",
          component: CdvAboutPage,
          name: "About",
          meta: {
            label: "About",
          },
        },
        {
          path: "/stack",
          component: CdvStackPage,
          name: "Stack",
          meta: {
            label: "Stack",
          },
        },
        {
          path: "/projects",
          component: CdvProjectsPage,
          name: "Projects",
          meta: {
            label: "Projects",
          },
        },
        {
          path: "/contact",
          component: CdvContactPage,
          name: "Contact",
          meta: {
            label: "Contact",
          },
        },
        {
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          component: CdvNotFoundPage,
        },
      ],
    },
  ],
});

export default router;

declare module "vue-router" {
  interface RouteMeta {
    label?: string;
    hidden?: boolean;
  }
}
