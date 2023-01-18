<script lang="ts" setup>
import CdvDivider from "../atoms/CdvDivider.vue";
import CdvIcon from "../atoms/CdvIcon.vue";

export interface CdvStackListItem {
  icon: string;
  label: string;
  percentage?: number;
}

export interface CdvStackListProps {
  title: string;
  items: CdvStackListItem[];
}

withDefaults(defineProps<CdvStackListProps>(), {});
</script>

<template>
  <div
    class="cdv-stack-list flex flex-col items-start justify-between gap-[8px]"
  >
    <TransitionGroup name="cdv-list-fade-in-left" appear>
      <h3
        key="heading"
        class="cdv-stack-list-heading"
        :style="{ '--cdv-list-i': 0 }"
      >
        {{ title }}
      </h3>

      <CdvDivider key="divider" :style="{ '--cdv-list-i': 1 }" />
    </TransitionGroup>

    <div
      class="cdv-stack-list-items flex flex-col items-start gap-[8px] pt-[6px]"
    >
      <TransitionGroup name="cdv-list-fade-in-up" appear>
        <div
          v-for="(item, i) in items"
          :key="item.label"
          class="cdv-stack-list-item flex items-center"
          :style="{ '--cdv-list-i': i }"
        >
          <CdvIcon :icon="item.icon" :size="32" />

          <div class="cdv-stack-list-item-text ml-[8px] mr-[4px]">
            <span>{{ item.label }}</span>
          </div>

          <div
            v-if="(item.percentage ?? null) !== null"
            class="cdv-stack-list-item-percentage"
          >
            <span>({{ item.percentage }}%)</span>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.cdv-stack-list {
  padding: 6px;

  &-heading {
    color: var(--cdv-c-white);
    font-size: 1.65rem;
  }

  &-item {
    color: var(--cdv-c-white);

    &-text {
      font-size: 1.4rem;
      line-height: 1;
    }

    &-percentage {
      font-size: 0.8rem;
      color: var(--cdv-c-white-mute);
      opacity: 0.75;
      font-weight: 400;
    }
  }
}
</style>
