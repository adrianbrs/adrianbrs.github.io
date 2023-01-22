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
      { ...techIcons.html5Icon, percentage: 98 },
      { ...techIcons.css3Icon, percentage: 98 },
      { ...techIcons.jsIcon, percentage: 98 },
      { ...techIcons.typescriptIcon, percentage: 98 },
      { ...techIcons.sassIcon, percentage: 98 },
      { ...techIcons.vueIcon, percentage: 98 },
      { ...techIcons.vuetifyIcon, percentage: 98 },
      { ...techIcons.nuxtjsIcon, percentage: 98 },
    ],
  },
  {
    title: "backend",
    items: [
      { ...techIcons.nodejsIcon, percentage: 98 },
      { ...techIcons.nestjsIcon, percentage: 98 },
      { ...techIcons.expressIcon, percentage: 98 },
      { ...techIcons.socketIoIcon, percentage: 98 },
      { ...techIcons.phpIcon, percentage: 98 },
      { ...techIcons.javaIcon, percentage: 98 },
      { ...techIcons.goIcon, percentage: 98 },
      { ...techIcons.cppIcon, percentage: 98 },
    ],
  },
  {
    title: "database",
    items: [
      { ...techIcons.postgreSqlIcon, percentage: 98 },
      { ...techIcons.mongodbIcon, percentage: 98 },
    ],
  },
  {
    title: "mobile",
    items: [
      { ...techIcons.reactNativeIcon, percentage: 98 },
      { ...techIcons.flutterIcon, percentage: 98 },
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
