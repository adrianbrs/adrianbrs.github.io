<script lang="ts" setup>
import { useFocus } from "@vueuse/core";
import { computed, ref, toRefs, watch } from "vue";
import { useField, type RuleExpression } from "vee-validate";

export interface CdvTextInputProps {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  floatLabel?: "always" | "auto";
  modelValue?: any;
  required?: boolean;
  multiline?: boolean;
  rules?: RuleExpression<any>;
}

const props = withDefaults(defineProps<CdvTextInputProps>(), {
  type: "text",
  multiline: false,
  modelValue: null,
});
const propsRef = toRefs(props);

const emit = defineEmits(["input", "update:modelValue"]);

const fieldName = computed(
  () => propsRef.name?.value || propsRef.label?.value || ""
);
const { errorMessage, value } = useField(fieldName, propsRef.rules, {
  initialValue: propsRef.modelValue,
});

watch(propsRef.modelValue, (newValue) => {
  value.value = newValue;
});

watch(value, (newValue) => {
  emit("input", newValue);
  emit("update:modelValue", value);
});

const input = ref<HTMLInputElement>();
const { focused } = useFocus(input);

const isDirty = computed(() => !!value.value);

const isLabelFloating = computed(
  () =>
    focused.value || isDirty.value || propsRef.floatLabel?.value === "always"
);

const errMessageRef = ref<HTMLElement>();
const errHeight = computed(() => errMessageRef?.value?.offsetHeight ?? 0);
</script>

<template>
  <div
    :class="[
      'cdv-input',
      {
        'cdv-input--dirty': isDirty,
        'cdv-input--focused': focused,
        'cdv-input--error': !!errorMessage,
      },
    ]"
    :style="{
      marginBottom: `${errHeight}px`,
    }"
  >
    <div class="cdv-input-wrapper">
      <label
        :class="{
          'cdv-input-label': true,
          'cdv-input-label--floating': isLabelFloating,
        }"
        :for="id"
        v-if="!!label"
        >{{ label
        }}<span class="cdv-input-required-mark" v-if="required">*</span></label
      >
      <textarea
        v-if="multiline"
        class="cdv-input-element cdv-input-textarea"
        ref="input"
        rows="1"
        :id="id"
        :type="type"
        :required="required"
        :placeholder="isLabelFloating ? placeholder : undefined"
        v-model="value"
      ></textarea>
      <input
        v-else
        class="cdv-input-element cdv-input-text"
        ref="input"
        :id="id"
        :type="type"
        :required="required"
        :placeholder="isLabelFloating ? placeholder : undefined"
        v-model="value"
      />
    </div>

    <div
      class="cdv-input-error"
      v-if="errorMessage"
      :key="errorMessage"
      ref="errMessageRef"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss">
.cdv-input {
  display: inline-flex;
  flex-direction: column;
  color: var(--cdv-c-text-dark-2);
  position: relative;
  font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.76, 0, 0.24, 1);

  &--focused {
    border-bottom-color: var(--cdv-c-primary);

    .cdv-input-label {
      color: var(--cdv-c-primary);
    }
  }

  &--error {
    .cdv-input {
      &-wrapper {
        border-bottom-color: var(--cdv-c-red);
      }
      &-label {
        color: var(--cdv-c-red);
      }
    }
  }

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--cdv-c-text-dark-2);
    padding-bottom: 4px;
    transition: all 0.2s cubic-bezier(0.76, 0, 0.24, 1);
  }

  &-element {
    border: none;
    padding: 0;
    line-height: 1.5;
    color: inherit;
    width: 100%;
    font-size: inherit;
    color: var(--cdv-c-text-dark-1);
    transition: height 0.3s cubic-bezier(0.45, 0, 0.55, 1);
  }

  &-textarea {
    height: 24px;
    resize: none;

    &:focus,
    .cdv-input--dirty & {
      height: calc(1.9em * 5);
    }
  }

  &-label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: inherit;
    transition: all 0.2s cubic-bezier(0.45, 0, 0.55, 1);
    line-height: 1.5;
    pointer-events: none;

    &--floating {
      top: -1.4em;
      font-size: 0.86em;
    }
  }

  &-required-mark {
    color: var(--cdv-c-accent);
    font-size: 0.9em;
    margin-left: 2px;
  }

  &-error {
    position: absolute;
    top: 100%;
    left: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
    line-height: 1.75em;
    color: var(--cdv-c-red);
  }
}
</style>
