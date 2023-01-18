<script lang="ts" setup>
import { linkedinIcon, githubAltIcon } from "@/assets/svg";
import CdvSocialBtn from "@/components/atoms/CdvSocialBtn.vue";
</script>

<template>
  <div class="cdv-home">
    <section></section>
    <section class="cdv-home-mid">
      <div class="cdv-home-heading">
        <h1>Adrian Cerbaro</h1>
        <h2>Full-Stack Sotfware Engineer</h2>
      </div>

      <div class="cdv-home-social">
        <CdvSocialBtn
          :icon="linkedinIcon"
          href="https://linkedin.com/in/adrian-cerbaro"
        ></CdvSocialBtn>

        <CdvSocialBtn
          :icon="githubAltIcon"
          href="https://github.com/adrianbrs"
        ></CdvSocialBtn>
      </div>
    </section>
    <section></section>
  </div>
</template>

<style scoped lang="scss">
.cdv-home {
  width: 100%;
  min-height: var(--app-content-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--cdv-c-white);

  &-mid {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    align-items: center;

    .cdv-home-social {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &-heading {
    max-width: 335px;
    text-align: center;
    line-height: 1;
    display: block;

    > h1 {
      font-weight: bolder;
      font-size: 5.5rem;
      color: var(--cdv-c-white);
      white-space: break-spaces;
    }

    > h2 {
      font-size: 1.4rem;
      font-weight: normal;
      margin-top: 8px;
      color: var(--cdv-c-white-soft);
    }
  }
}
</style>
