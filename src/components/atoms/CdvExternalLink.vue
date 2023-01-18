<script lang="ts" setup>
import { mdiOpenInNew } from "@mdi/js";
import CdvIcon from "./CdvIcon.vue";

defineProps({
  href: String,
});
</script>

<template>
  <div class="cdv-external-link flex items-center gap-[4px]">
    <a
      class="cdv-link-alt cursor-pointer"
      :href="href"
      :disabled="href ? null : true"
      target="_blank"
    >
      <slot></slot>

      <CdvIcon :icon="mdiOpenInNew" :size="16" class="ml-1"></CdvIcon>
    </a>
  </div>
</template>
