import { defineRule, configure } from "vee-validate";
import { useNavigatorLanguage } from "@vueuse/core";
import { localize, setLocale } from "@vee-validate/i18n";
import AllRules from "@vee-validate/rules";
import en from "@vee-validate/i18n/dist/locale/en.json";
import pt from "@vee-validate/i18n/dist/locale/pt_BR.json";
import { useLocale } from "./composables/useLocale";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    en,
    pt,
  }),
});

const { locale } = useLocale();
setLocale(locale.value);
