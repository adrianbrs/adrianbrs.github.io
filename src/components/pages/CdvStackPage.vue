<script lang="ts" setup>
import CdvStackList, {
  type CdvStackListProps,
} from "@/components/molecules/CdvStackList.vue";
import { ref } from "vue";
import { useShowAnim } from "@/composables/useShowAnim.js";
import techIcons from "@/lib/tech-icons";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const stack: CdvStackListProps[] = [
  {
    title: "frontend",
    items: [
      { ...techIcons.html5Icon },
      { ...techIcons.css3Icon },
      { ...techIcons.jsIcon },
      { ...techIcons.typescriptIcon },
      { ...techIcons.sassIcon },
      { ...techIcons.vueIcon },
      { ...techIcons.vuetifyIcon },
      { ...techIcons.nuxtjsIcon },
    ],
  },
  {
    title: "backend",
    items: [
      { ...techIcons.nodejsIcon },
      { ...techIcons.nestjsIcon },
      { ...techIcons.expressIcon },
      { ...techIcons.socketIoIcon },
      { ...techIcons.phpIcon },
      { ...techIcons.javaIcon },
      { ...techIcons.goIcon },
    ],
  },
  {
    title: "database",
    items: [
      { ...techIcons.postgreSqlIcon },
      { ...techIcons.mongodbIcon },
      { ...techIcons.redisIcon },
    ],
  },
];

const page = ref<HTMLElement>();
const show = useShowAnim(page);
</script>

<template>
  <div class="cdv-page cdv-stack flex items-center justify-center">
    <div class="cdv-h-scroll flex items-start gap-[120px]" v-if="show">
      <CdvStackList
        v-for="tec in stack"
        :key="tec.title"
        :title="t(tec.title)"
        :items="tec.items"
        class="cdv-scroll-item"
      ></CdvStackList>
    </div>

    <div class="cdv-page-ref" ref="page"></div>
  </div>
</template>

<style lang="scss">
.cdv-stack {
  padding-left: 0 !important;
  padding-right: 0 !important;

  > .cdv-h-scroll {
    padding-left: var(--app-spacing);
    padding-right: var(--app-spacing);
  }
}
</style>

<i18n lang="yaml">
en:
  frontend: Frontend
  backend: Backend
  database: Database
  mobile: Mobile
pt_BR:
  frontend: Frontend
  backend: Backend
  database: Banco de Dados
  mobile: Mobile
</i18n>
