<script lang="ts" setup>
import { ref } from "vue";
import { useIsMobile } from "@/composables/useIsMobile";
import { useShowAnim } from "@/composables/useShowAnim.js";
import CdvPanel from "@/components/molecules/CdvPanel.vue";

const isMobile = useIsMobile();

const page = ref<HTMLElement>();
const show = useShowAnim(page);
</script>

<template>
  <div class="cdv-page cdv-contact flex relative">
    <template v-if="show">
      <section class="cdv-contact-form flex-1 flex items-center justify-center">
        <CdvPanel class="flex-1" height="auto">
          <div class="flex-1 flex h-[100%] items-center justify-center">
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              pariatur nostrum, possimus magnam vero quaerat.
            </span>
          </div>
        </CdvPanel>
      </section>

      <section
        class="cdv-contact-side flex-1 flex flex-col items-center justify-center gap-[40px]"
      >
        <div
          class="cdv-contact-heading max-w-[480px]"
          :style="{ '--cdv-list-delay': '0.1s' }"
        >
          <TransitionGroup
            :name="`cdv-list-fade-in-${isMobile ? 'left' : 'up'}`"
            appear
          >
            <h1 key="touch" :style="{ '--cdv-list-i': 0 }">Get In Touch</h1>
            <p key="touch-desc" :style="{ '--cdv-list-i': 1 }">
              Use the form on the side to drop me an email. I will respond as
              soon as possible.
            </p>
          </TransitionGroup>
        </div>

        <Transition
          name="cdv-fade-in-up"
          appear
          class="!transition-delay-[0.2s]"
        >
          <div class="cdv-contact-artwork">
            <img src="@/assets/img/phone.png" alt="Get In Touch" />
          </div>
        </Transition>
      </section>
    </template>

    <div class="cdv-page-ref" ref="page"></div>
  </div>
</template>

<style lang="scss">
.cdv-contact {
  gap: 16px;

  &-heading {
    text-align: center;

    > h1 {
      font-size: 3rem;
      color: var(--cdv-c-white);
    }
  }

  &-form {
    align-items: stretch !important;
  }

  &-side {
    position: relative;
  }

  &-artwork {
    max-height: 100%;
    overflow: hidden;

    > img {
      height: 500px;
      width: auto;
    }
  }
}

@media screen and (max-width: 768px) {
  .cdv-contact {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    &-side {
      flex: 0 1 auto !important;
    }

    &-heading {
      text-align: left;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 75%
      );
      padding: 16px;
      border-radius: 8px;
      text-shadow: 0 1px 4px rgba(#000, 0.5);
    }

    &-side {
      flex-direction: row !important;
      justify-content: flex-start !important;
      align-items: flex-end !important;
      width: 100%;
      overflow: hidden;
      height: 200px;
    }

    &-artwork {
      height: 100%;
      position: absolute;
      z-index: -1;
      right: var(--app-spacing);
      overflow: visible;

      > img {
        height: 500px;
      }
    }
  }
}
</style>
