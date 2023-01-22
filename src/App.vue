<script lang="ts" setup>
import { inject, watch } from "vue";
import { useLocale } from "./composables/useLocale";
import { setI18nLocale } from "./i18n";
import type { I18n } from "vue-i18n";

const i18n = inject<I18n>("i18n")!;
const { locale } = useLocale();

watch(
  locale,
  (newLocale) => {
    setI18nLocale(i18n, newLocale!);
  },
  { immediate: true }
);
</script>

<template>
  <RouterView />
</template>
