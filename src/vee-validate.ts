import { defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import AllRules from "@vee-validate/rules";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    en: {},
  }),
});

const loadedLocales = new Set(["en"]);

export async function loadLocaleMessages(locale: string) {
  if (!loadedLocales.has(locale)) {
    const messages = await import(
      `../node_modules/@vee-validate/i18n/dist/locale/${locale}.json`
    ).then((m) => m.default);
    localize({ [locale]: messages });
    loadedLocales.add(locale);
  }
}
