<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  ref,
  type AsyncComponentLoader,
} from "vue";
import { useIsMobile } from "@/composables/useIsMobile";
import { useShowAnim } from "@/composables/useShowAnim.js";
import { useI18n } from "vue-i18n";
import CdvPanel from "@/components/molecules/CdvPanel.vue";

const { t, locale } = useI18n();

const isMobile = useIsMobile();

const page = ref<HTMLElement>();
const show = useShowAnim(page);

const contents = Object.fromEntries(
  Object.entries(
    import.meta.glob("./about.*.md", {
      import: "default",
    })
  ).map(([path, componentLoader]) => {
    const locale = path.match(/\.\/about\.(.+)\.md$/)?.[1];
    return [
      locale,
      defineAsyncComponent(componentLoader as AsyncComponentLoader),
    ];
  })
);

const content = computed(() => contents[locale.value] || contents["en"]);
</script>

<template>
  <div class="cdv-page cdv-about flex relative">
    <template v-if="show">
      <section class="cdv-about-name flex-1 flex items-center justify-center">
        <div class="cdv-about-heading" :style="{ '--cdv-list-delay': '0.1s' }">
          <TransitionGroup
            :name="`cdv-list-fade-in-${isMobile ? 'left' : 'up'}`"
            appear
          >
            <h2 key="hello" :style="{ '--cdv-list-i': 0 }">
              {{ t("hello") }}
            </h2>
            <h1 key="name" :style="{ '--cdv-list-i': 1 }">
              {{ $t("general.name") }}
            </h1>
          </TransitionGroup>
        </div>
      </section>
      <section class="cdv-about-bio flex-1 flex items-center justify-center">
        <CdvPanel class="flex-1" height="auto">
          <div
            class="flex-1 flex h-[100%] items-center justify-center cdv-prose text-justify"
          >
            <component :is="content" />
          </div>
        </CdvPanel>
      </section>
    </template>

    <div class="cdv-page-ref" ref="page"></div>
  </div>
</template>

<style lang="scss">
.cdv-about {
  gap: 16px;

  &-heading {
    > h2 {
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.1;
    }

    > h1 {
      font-size: 2.5rem;
      color: var(--cdv-c-white);
    }
  }
}

@media screen and (max-width: 768px) {
  .cdv-about {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &-name,
    &-bio {
      flex: 0 1 auto !important;
    }

    &-name {
      margin-top: var(--app-spacing);
    }
  }
}
</style>

<i18n lang="yaml">
en:
  hello: Hello, my name is
pt_BR:
  hello: Olá, meu nome é
</i18n>
