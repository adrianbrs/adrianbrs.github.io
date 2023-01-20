<script lang="ts" setup>
export interface CdvBackdropProps {
  show?: boolean;
}

withDefaults(defineProps<CdvBackdropProps>(), {
  show: false,
});
</script>

<template>
  <Teleport to="body">
    <Transition name="cdv-fade">
      <div class="cdv-backdrop" v-if="show"></div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.cdv-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--cdv-c-black-soft);
  opacity: 0.96;
  z-index: 950;
}
</style>
