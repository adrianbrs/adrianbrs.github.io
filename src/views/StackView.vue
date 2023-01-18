<script lang="ts" setup>
import CdvStackList, {
  type CdvStackListProps,
} from "@/components/molecules/CdvStackList.vue";
import { ref } from "vue";
import { useShowAnim } from "@/composables/useShowAnim.js";
import techIcons from "@/lib/tech-icons";

const stack: CdvStackListProps[] = [
  {
    title: "Frontend",
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
    title: "Backend",
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
    title: "Database",
    items: [
      { ...techIcons.postgreSqlIcon, percentage: 98 },
      { ...techIcons.mongodbIcon, percentage: 98 },
    ],
  },
  {
    title: "Mobile",
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
    <div class="cdv-h-scroll flex items-start gap-[140px]" v-if="show">
      <CdvStackList
        v-for="tec in stack"
        :key="tec.title"
        :title="tec.title"
        :items="tec.items"
        class="cdv-scroll-item"
      ></CdvStackList>
    </div>

    <div class="cdv-page-ref" ref="page"></div>
  </div>
</template>
