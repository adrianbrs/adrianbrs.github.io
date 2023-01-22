<script lang="ts" setup>
import { useShowAnim } from "@/composables/useShowAnim.js";
import { ref } from "vue";
import { useProjects } from "@/composables/useProjects";
import { useI18n } from "vue-i18n";
import CdvExternalLink from "@/components/atoms/CdvExternalLink.vue";
import CdvCard from "@/components/molecules/CdvCard.vue";

const { t } = useI18n();

const page = ref<HTMLDivElement>();
const show = useShowAnim(page);

const projects = useProjects();
</script>

<template>
  <div class="cdv-page cdv-projects flex items-center justify-start">
    <div
      class="cdv-h-scroll flex items-stretch gap-[64px] h-[500px]"
      v-if="show"
    >
      <TransitionGroup name="cdv-list-fade-in-up" appear>
        <CdvCard
          v-for="(project, i) in projects"
          :key="project.title"
          :style="{ '--cdv-list-i': i }"
          class="cdv-scroll-item flex-grow-0 flex-shrink-1 flex-basis-[0%]"
          :title="project.title"
        >
          <template #image>
            <div class="!h-[290px]">
              <img
                class="w-[auto] h-[100%]"
                :src="project.image.src"
                :width="project.image.width"
                :height="project.image.height"
                :alt="project.image.alt ?? project.title"
              />
            </div>
          </template>

          <p v-html="project.description"></p>

          <template #actions>
            <CdvExternalLink :href="project.href">{{
              t("open_project_label")
            }}</CdvExternalLink>
          </template>
        </CdvCard>
      </TransitionGroup>
    </div>

    <div class="cdv-page-ref" ref="page"></div>
  </div>
</template>

<style lang="scss">
.cdv-projects {
  > .cdv-h-scroll {
    scroll-snap-type: x proximity;
    scroll-padding: 10%;

    > .cdv-scroll-item {
      scroll-snap-align: start;
    }
  }
}
</style>

<i18n lang="yaml">
en:
  open_project_label: Open
pt_BR:
  open_project_label: Abrir
</i18n>
