import { createRouter, createWebHashHistory } from "vue-router";
import CdvNotFoundPage from "@/components/pages/CdvNotFoundPage.vue";
import CdvDefaultTemplate from "@/components/templates/CdvDefaultTemplate.vue";
import CdvHomePage from "@/components/pages/CdvHomePage.vue";
import CdvAboutPage from "@/components/pages/CdvAboutPage.vue";
import CdvStackPage from "@/components/pages/CdvStackPage.vue";
import CdvProjectsPage from "@/components/pages/CdvProjectsPage.vue";
import CdvContactPage from "@/components/pages/CdvContactPage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          name: "home",
        },
        {
          path: "/about",
          component: CdvAboutPage,
          name: "about",
        },
        {
          path: "/stack",
          component: CdvStackPage,
          name: "stack",
        },
        {
          path: "/projects",
          component: CdvProjectsPage,
          name: "projects",
        },
        {
          path: "/contact",
          component: CdvContactPage,
          name: "contact",
        },
        {
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          component: CdvNotFoundPage,
          meta: {
            hidden: true,
          },
        },
      ],
    },
  ],
});

export default router;

declare module "vue-router" {
  interface RouteMeta {
    hidden?: boolean;
    template?: string;
  }
}
