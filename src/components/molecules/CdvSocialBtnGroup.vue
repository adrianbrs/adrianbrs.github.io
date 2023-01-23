<script lang="ts" setup>
import { githubAltIcon, linkedinIcon } from "@/assets/svg";
import { useI18n } from "vue-i18n";
import CdvSocialBtn from "../atoms/CdvSocialBtn.vue";

const { t } = useI18n();
</script>

<template>
  <div class="flex gap-[16px] items-center">
    <CdvSocialBtn
      :icon="linkedinIcon"
      href="https://linkedin.com/in/adrian-cerbaro"
      :title="t('linkedin')"
    ></CdvSocialBtn>

    <CdvSocialBtn
      :icon="githubAltIcon"
      href="https://github.com/adrianbrs"
      :title="t('github')"
    ></CdvSocialBtn>
  </div>
</template>

<i18n lang="yaml">
en:
  linkedin: "My LinkedIn"
  github: "My GitHub"
pt_BR:
  linkedin: "Meu LinkedIn"
  github: "Meu GitHub"
</i18n>
