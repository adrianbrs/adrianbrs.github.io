import { SUPPORT_LOCALES, parseLocale } from "@/i18n";
import { useLocalStorage, useNavigatorLanguage } from "@vueuse/core";
import { computed } from "vue";

const selectedLocale = useLocalStorage<string | null>("locale", null);

export function useLocale() {
  const { language } = useNavigatorLanguage();
  const currentLocale = computed(() =>
    parseLocale(selectedLocale.value || language.value)
  );

  const locale = computed({
    get() {
      return currentLocale.value;
    },
    set(locale: string | null) {
      selectedLocale.value = locale;
    },
  });

  return { locale, availableLocales: SUPPORT_LOCALES };
}
