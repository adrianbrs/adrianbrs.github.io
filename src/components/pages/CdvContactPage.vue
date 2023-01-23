<script lang="ts" setup>
import { ref } from "vue";
import { useIsMobile } from "@/composables/useIsMobile";
import { useShowAnim } from "@/composables/useShowAnim";
import { useContacts } from "@/composables/useContacts";
import { Form } from "vee-validate";
import CdvPanel from "@/components/molecules/CdvPanel.vue";
import CdvIcon from "@/components/atoms/CdvIcon.vue";
import CdvDivider from "@/components/atoms/CdvDivider.vue";
import CdvContactForm from "@/components/organisms/CdvContactForm.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isMobile = useIsMobile();

const page = ref<HTMLElement>();
const show = useShowAnim(page);
const contacts = useContacts();

const onSubmit = (values: any) => {
  console.log(values);
};
</script>

<template>
  <div class="cdv-page cdv-contact flex relative">
    <template v-if="show">
      <section
        class="cdv-contact-panel flex-1 flex items-center justify-center"
      >
        <CdvPanel height="auto">
          <div class="cdv-contact-panel-content">
            <div class="cdv-contact-panel-heading">
              <h2>{{ t("form.title") }}</h2>
            </div>

            <Form @submit="onSubmit">
              <CdvContactForm />
            </Form>

            <div class="flex w-[100%] justify-center">
              <CdvDivider
                color="var(--cdv-c-white-mute)"
                size="max(30%, 120px)"
                thickness="1"
                class="my-[24px]"
              />
            </div>

            <div class="cdv-contact-panel-heading mb-0">
              <h2>{{ t("form.contact_details") }}</h2>
            </div>

            <div class="flex flex-col gap-[16px] w-[100%]">
              <div
                v-for="contact in contacts"
                :key="contact.label"
                class="flex items-center gap-[16px]"
              >
                <CdvIcon :icon="contact.icon" />
                <a
                  v-if="contact.href"
                  class="cdv-link-alt"
                  :href="contact.href"
                  :title="contact.title || contact.href"
                  target="_blank"
                  >{{ contact.label }}</a
                >
                <span v-else :title="contact.title">{{ contact.label }}</span>
              </div>
            </div>
          </div>
        </CdvPanel>
      </section>

      <section
        class="cdv-contact-side flex-1 flex flex-col items-center justify-center gap-[40px]"
      >
        <Transition name="cdv-fade" appear>
          <div
            class="cdv-contact-heading"
            :style="{ '--cdv-list-delay': '0.1s' }"
          >
            <TransitionGroup
              :name="`cdv-list-fade-in-${isMobile ? 'left' : 'up'}`"
              appear
            >
              <h1 key="touch" :style="{ '--cdv-list-i': 0 }">
                {{ t("heading.title") }}
              </h1>
              <p key="touch-desc" :style="{ '--cdv-list-i': 1 }">
                <template v-if="isMobile">{{
                  t("heading.description.mobile")
                }}</template>
                <template v-else>{{
                  t("heading.description.desktop")
                }}</template>
              </p>
            </TransitionGroup>
          </div>
        </Transition>

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
    max-width: 480px;
    z-index: 2;

    > h1 {
      font-size: 3rem;
      color: var(--cdv-c-white);
    }
  }

  &-panel {
    align-items: stretch;

    &-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
      padding: 32px;
      flex: 1;
      height: 100%;
    }

    &-heading {
      margin-bottom: 24px;

      > h2 {
        font-weight: 500;
        font-size: 1.5rem;
        color: var(--cdv-c-white);
      }
    }
  }

  &-side {
    position: relative;
  }

  &-artwork {
    max-height: 100%;
    overflow: hidden;
    z-index: 1;
    filter: drop-shadow(2px 4px 4px rgba(#0c1118, 0.8))
      drop-shadow(12px 16px 20px rgba(#0c1118, 0.4));

    > img {
      height: 500px;
      width: auto;
    }
  }
}

@media screen and (max-width: 890px) {
  .cdv-contact {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    &-panel {
      width: 100%;

      &-content {
        padding: 16px;
      }

      &-heading {
        font-size: 1.26rem;
      }
    }

    &-side {
      flex: 0 1 auto !important;
    }

    &-heading {
      max-width: none;
      width: 100%;
      text-align: left;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 75%
      );
      padding: 16px;
      border-radius: 8px;
      text-shadow: 0 1px 4px rgba(#000, 0.5);

      > h1 {
        font-size: 2rem;
      }

      > p {
        color: var(--cdv-c-white-mute);
      }
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
      right: var(--app-spacing);
      overflow: visible;

      > img {
        height: 500px;
      }
    }
  }
}
</style>

<i18n lang="yaml">
en:
  heading:
    title: Get In Touch
    description:
      desktop: Use the form on the side to drop me an email. I will respond as soon as possible.
      mobile: Use the form below to drop me an email. I will respond as soon as possible.
  form:
    title: Send me a Message
    contact_details: Contact Details
pt_BR:
  heading:
    title: Entrar em Contato
    description:
      desktop: Use o formulário ao lado para me enviar um e-mail. Eu responderei assim que possível.
      mobile: Use o formulário abaixo para me enviar um e-mail. Eu responderei assim que possível.
  form:
    title: Mande uma Mensagem
    contact_details: Detalhes de Contato
</i18n>
