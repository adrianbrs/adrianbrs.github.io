<script lang="ts" setup>
import { useFocus } from "@vueuse/core";
import { nanoid } from "nanoid";
import { computed, ref } from "vue";

export interface CdvTextInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  floatLabel?: "always" | "auto";
  modelValue?: any;
  required?: boolean;
}

const props = withDefaults(defineProps<CdvTextInputProps>(), {
  type: "text",
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const input = ref<HTMLInputElement>();
const { focused } = useFocus(input);

const isDirty = computed(() => !!value.value);

const isLabelFloating = computed(
  () => focused.value || isDirty.value || props.floatLabel === "always"
);
</script>

<template>
  <div class="cdv-input cdv-text-input">
    <label
      :class="{
        'cdv-text-input-label': true,
        'cdv-text-input-label--floating': isLabelFloating,
      }"
      :for="id"
      v-if="!!label"
      >{{ label
      }}<span class="cdv-text-input-required-mark" v-if="required"
        >*</span
      ></label
    >
    <input
      class="cdv-text-input-input"
      ref="input"
      :id="id"
      :type="type"
      :required="required"
      :placeholder="isLabelFloating ? placeholder : undefined"
      v-model="value"
    />
  </div>
</template>

<style lang="scss">
.cdv-text-input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--cdv-c-text-dark-2);
  border-bottom: 1px solid var(--cdv-c-text-dark-2);
  position: relative;
  font-size: 1rem;
  padding: 4px 0;

  &-input {
    border: none;
    padding: 0;
    line-height: 1.5;
    color: inherit;
    width: 100%;
    font-size: inherit;
    color: var(--cdv-c-text-dark-1);
  }

  &-label {
    position: absolute;
    left: 0;
    bottom: 4px;
    font-size: inherit;
    transition: all 0.2s ease-in-out;
    line-height: 1.5;
    pointer-events: none;

    &--floating {
      bottom: 2em;
      font-size: 0.86em;
    }
  }

  &-required-mark {
    color: var(--cdv-c-accent);
    font-size: 0.9em;
    margin-left: 2px;
  }
}
</style>
