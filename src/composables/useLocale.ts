import { useNavigatorLanguage } from "@vueuse/core";
import { ref } from "vue";

const selectedLocale = ref<string>("");

export function useLocale() {
  const setLocale = (locale?: string | null) =>
    (selectedLocale.value = (locale ?? "en").split("-")[0]);

  if (!selectedLocale.value) {
    const { language } = useNavigatorLanguage();
    setLocale(language.value);
  }

  return { locale: selectedLocale, setLocale };
}
