<script lang="ts" setup>
import CdvSocialBtnGroup from "@/components/molecules/CdvSocialBtnGroup.vue";
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
  <div class="cdv-page cdv-home">
    <section class="cdv-home-logos cdv-home-left">
      <TransitionGroup name="cdv-icon-list-left" appear>
        <CdvTechIcon
          v-for="(options, i) in leftIcons"
          :options="options"
          :key="options.label"
          position="left"
          :style="{
            '--cdv-icon-list-i': i,
          }"
        ></CdvTechIcon>
      </TransitionGroup>
    </section>

    <section class="cdv-home-mid">
      <Transition
        class="!transition-delay-[1.5s] !transition-duration-[0.8s]"
        name="cdv-scale-in"
        appear
      >
        <div class="cdv-home-heading">
          <h1>Adrian Cerbaro</h1>

          <Transition
            class="!transition-delay-[2s] !transition-duration-[0.6s]"
            name="cdv-fade-in-up"
            appear
          >
            <h2>Full-Stack Software Engineer</h2>
          </Transition>
        </div>
      </Transition>

      <Transition
        class="!transition-delay-[2.4s] !transition-duration-[1.5s]"
        name="cdv-fade-in-up"
        appear
      >
        <CdvSocialBtnGroup></CdvSocialBtnGroup>
      </Transition>
    </section>

    <section class="cdv-home-logos cdv-home-right">
      <TransitionGroup name="cdv-icon-list-right" appear d>
        <CdvTechIcon
          v-for="(options, i) in rightIcons"
          :options="options"
          :key="options.label"
          position="right"
          :style="{
            '--cdv-icon-list-i': i,
          }"
        ></CdvTechIcon>
      </TransitionGroup>
    </section>
  </div>
</template>

<style scoped lang="scss">
.cdv-home {
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
    padding: 4px;

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

    &-mid {
      margin: 32px 0;
    }

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
