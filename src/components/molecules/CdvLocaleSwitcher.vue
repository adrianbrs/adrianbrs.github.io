<script lang="ts" setup>
import { useLocale } from "@/composables/useLocale";
import { useI18n } from "vue-i18n";
import { mdiTranslate } from "@mdi/js";
import { getLang } from "@/i18n";
import CdvIcon from "../atoms/CdvIcon.vue";

const { t } = useI18n();

const { locale, availableLocales } = useLocale();
</script>

<template>
  <div
    class="cdv-locale-switcher flex items-center whitespace-nowrap gap-[8px]"
    role="list"
    :aria-label="t('aria_label')"
  >
    <CdvIcon :icon="mdiTranslate" class="mr-[4px]" />

    <a
      v-for="code in availableLocales"
      :key="code"
      :class="{
        'cdv-link-alt': locale !== code,
      }"
      :disabled="locale === code ? 'disabled' : null"
      href="#"
      role="listitem"
      :lang="getLang(code)"
      :hreflang="getLang(code)"
      @click.prevent="locale = code"
      >{{ $t(`locale.${code}.name`) }}</a
    >
  </div>
</template>

<i18n lang="yaml">
en:
  aria_label: Change language
pt_BR:
  aria_label: Alterar idioma
</i18n>
