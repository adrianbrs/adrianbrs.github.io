<script lang="tsx" setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  role: String,
  ariaLabel: String,
  ariaHidden: {
    type: Boolean,
    default: true,
  },
  fill: {
    type: String,
    default: "currentColor",
  },
  width: [Number, String],
  height: [Number, String],
  size: [Number, String],
  viewBox: String,
  xmlns: String,
  icon: {
    type: String,
    required: true,
  },
});

const iconSVG = computed(() => {
  let icon = props.icon.trim();

  if (icon.includes("<svg")) {
    const template = document.createElement("template");
    template.innerHTML = icon;
    const svg = template.content.firstChild as SVGElement;

    const width = props.width ?? props.size;
    const height = props.height ?? props.size;
    const fill = props.fill;
    const xmlns = props.xmlns;
    const viewBox = props.viewBox;

    if (width) {
      svg.setAttribute("width", String(width));
    }
    if (height) {
      svg.setAttribute("height", String(height));
    }
    if (fill) {
      svg.setAttribute("fill", props.fill);
    }
    if (viewBox) {
      svg.setAttribute("viewBox", props.viewBox);
    }
    if (xmlns) {
      svg.setAttribute("xmlns", props.xmlns);
    }

    return template.innerHTML;
  }

  return null;
});
</script>

<template>
  <span
    v-if="!iconSVG"
    class="cdv-icon"
    :role="role"
    :aria-label="ariaLabel"
    :aria-hidden="ariaHidden"
  >
    <svg
      :fill="fill ?? 'currentColor'"
      :width="width ?? size ?? 24"
      :height="height ?? size ?? 24"
      :viewBox="viewBox ?? '0 0 24 24'"
      :xmlns="xmlns ?? 'http://www.w3.org/2000/svg'"
    >
      <title v-if="!!title">{{ title }}</title>
      <path :d="icon"></path>
    </svg>
  </span>

  <span
    v-else
    class="cdv-icon"
    :role="role"
    :aria-label="ariaLabel"
    v-html="iconSVG"
  >
  </span>
</template>

<style lang="scss">
.cdv-icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0;
  user-select: none;

  & > svg {
    vertical-align: middle;
  }
}
</style>
