<script lang="ts" setup>
import { githubAltIcon, linkedinIcon } from "@/assets/svg";
import CdvSocialBtn from "../atoms/CdvSocialBtn.vue";
</script>

<template>
  <div class="flex gap-[16px] items-center">
    <CdvSocialBtn
      :icon="linkedinIcon"
      href="https://linkedin.com/in/adrian-cerbaro"
    ></CdvSocialBtn>

    <CdvSocialBtn
      :icon="githubAltIcon"
      href="https://github.com/adrianbrs"
    ></CdvSocialBtn>
  </div>
</template>
