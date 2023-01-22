import { parseLocale } from "@/i18n";
import { useLocalStorage, useNavigatorLanguage } from "@vueuse/core";
import { computed } from "vue";

const selectedLocale = useLocalStorage<string | null>("locale", null);

export function useLocale() {
  const { language } = useNavigatorLanguage();
  const locale = computed(() =>
    parseLocale(selectedLocale.value || language.value)
  );

  return computed({
    get() {
      return locale.value;
    },
    set(locale: string | null) {
      selectedLocale.value = locale;
    },
  });
}
