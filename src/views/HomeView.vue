<script lang="ts" setup>
import {
  linkedinIcon,
  githubAltIcon,
  typescriptIcon,
  jsIcon,
  html5Icon,
  css3Icon,
  goIcon,
  phpIcon,
  cppIcon,
  javaIcon,
  vueIcon,
  angularIcon,
  nestjsIcon,
  nodejsIcon,
  sassIcon,
  postgreSqlIcon,
  mongodbIcon,
} from "@/assets/svg";
import CdvIcon from "@/components/atoms/CdvIcon.vue";
import CdvSocialBtn from "@/components/atoms/CdvSocialBtn.vue";
import CdvTechIcon from "@/components/molecules/CdvTechIcon.vue";
import techIcons from "@/lib/tech-icons";

const leftIcons = [
  techIcons.typescriptIcon,
  techIcons.jsIcon,
  techIcons.html5Icon,
  techIcons.css3Icon,
  techIcons.goIcon,
  techIcons.phpIcon,
  techIcons.cppIcon,
  techIcons.javaIcon,
];

const rightIcons = [
  techIcons.vueIcon,
  techIcons.angularIcon,
  techIcons.nestjsIcon,
  techIcons.nodejsIcon,
  techIcons.sassIcon,
  techIcons.postgreSqlIcon,
  techIcons.mongodbIcon,
];
</script>

<template>
  <div class="cdv-home">
    <section class="cdv-home-logos cdv-home-left">
      <CdvTechIcon
        v-for="options in leftIcons"
        :options="options"
        :key="options.label"
      ></CdvTechIcon>
    </section>

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

    <section class="cdv-home-logos cdv-home-right">
      <CdvTechIcon
        v-for="options in rightIcons"
        :options="options"
        :key="options.label"
      ></CdvTechIcon>
    </section>
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

  &-left {
    margin-left: calc((var(--app-spacing) / 2) * -1);
  }

  &-right {
    margin-right: calc((var(--app-spacing) / 2) * -1);
  }

  &-mid {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    align-items: center;
    justify-content: center;
    flex: 1 0 auto;

    .cdv-home-social {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &-heading {
    max-width: 330px;
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

  &-logos {
    display: flex;
    flex-direction: column;
    gap: 42px;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    flex: 0 1 auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    scroll-snap-type: x mandatory;
    scroll-padding: 50%;
    scroll-snap-stop: normal;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }

    > .cdv-icon {
      scroll-snap-align: start;
    }
  }
}

@media screen and (max-width: 768px) {
  .cdv-home {
    flex-direction: column;
    padding: 32px 0;

    &-heading {
      > h1 {
        font-size: 4.2rem;
      }

      > h2 {
        font-size: 1.2rem;
      }
    }

    &-logos {
      flex-direction: row;
    }
  }
}
</style>
