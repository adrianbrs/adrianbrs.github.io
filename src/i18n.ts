import { nextTick, type WritableComputedRef } from "vue";
import { createI18n, type I18nOptions, type I18n } from "vue-i18n";
import { setLocale as setVeeValidateLocale } from "@vee-validate/i18n";
import { loadLocaleMessages as loadVeeValidateLocale } from "./vee-validate";
import en from "./locales/en.json";

export const SUPPORT_LOCALES = ["en", "pt_BR"] as const;
export const FALLBACK_LOCALE = "en" as const;
const SUPPORT_LOCALES_SET = new Set(SUPPORT_LOCALES);

export type CdvLocale = (typeof SUPPORT_LOCALES)[number];
export type CdvI18nOptions = I18nOptions & {
  locale: CdvLocale;
};

export function getSimpleLocale(locale: string): string {
  return locale.split(/[_-]/)[0];
}

// Map of supported locales and their fallbacks
const LOCALE_FALLBACK_MAP = SUPPORT_LOCALES.reduce((map, locale) => {
  if (locale.includes("_")) {
    map.set(getSimpleLocale(locale), locale);
  }
  return map;
}, new Map<string, string>());

export function isLocaleSupported(locale: string): locale is CdvLocale {
  return SUPPORT_LOCALES_SET.has(locale as CdvLocale);
}

export function parseLocale(locale?: string | null): CdvLocale {
  locale = locale?.replace("-", "_");
  if (!locale) {
    return FALLBACK_LOCALE;
  }
  if (!isLocaleSupported(locale)) {
    locale = getSimpleLocale(locale);

    if (!isLocaleSupported(locale)) {
      locale = LOCALE_FALLBACK_MAP.get(locale);
    }
  }
  return locale && isLocaleSupported(locale) ? locale : FALLBACK_LOCALE;
}

export async function setI18nLocale(i18n: I18n, rawLocale: string) {
  const locale = parseLocale(rawLocale);

  await loadI18nLocale(i18n, locale);

  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as WritableComputedRef<string>).value = locale;
  }

  document
    .querySelector("html")!
    .setAttribute("lang", locale.replace("_", "-"));
  setVeeValidateLocale(locale);
}

export async function loadI18nLocale(i18n: I18n, locale: CdvLocale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`./locales/${locale}.json`);
    i18n.global.setLocaleMessage(locale, messages.default);
  }

  await loadVeeValidateLocale(locale);
  return nextTick();
}

function setupI18n(options: CdvI18nOptions) {
  const i18n = createI18n(options);
  setI18nLocale(i18n, options.locale);
  return i18n;
}

export const i18n = setupI18n({
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  messages: {
    en,
  },
});
