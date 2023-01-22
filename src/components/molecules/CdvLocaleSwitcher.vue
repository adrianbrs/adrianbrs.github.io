<script lang="ts" setup>
import { useLocale } from "@/composables/useLocale";

const { locale, availableLocales } = useLocale();
</script>

<template>
  <div
    class="cdv-locale-switcher flex items-center whitespace-nowrap gap-[8px]"
  >
    <a
      v-for="code in availableLocales"
      :key="code"
      :class="{
        'cdv-link-alt': locale !== code,
      }"
      :disabled="locale === code ? 'disabled' : null"
      href="#"
      @click.prevent="locale = code"
      >{{ $t(`locale.${code}.name`) }}</a
    >
  </div>
</template>
