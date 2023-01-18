<script lang="tsx" setup>
import CdvIcon from "./CdvIcon.vue";

defineProps({
  href: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: "_blank",
  },
  rel: {
    type: String,
    default: "noopener noreferrer",
  },
  icon: String,
});
</script>

<template>
  <a class="cdv-nolink cdv-social-btn" :href="href" :target="target" :rel="rel">
    <slot>
      <CdvIcon v-if="icon" :icon="icon" :size="24"></CdvIcon>
    </slot>
  </a>
</template>

<style lang="scss">
.cdv-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 8px;
  border: 1px solid currentColor;
  cursor: pointer;
  background: none;
  transition: all 0.15s ease-in-out;
  margin: 0.25rem;
  color: currentColor;

  &:hover {
    background: var(--cdv-c-white);
    border-color: var(--cdv-c-white);
    color: var(--cdv-c-black-soft);
  }
}
</style>
