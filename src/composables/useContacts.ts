import { mdiEmailOutline, mdiPhoneOutline } from "@mdi/js";
import { computed, type ComputedRef } from "vue";
import { useI18n } from "vue-i18n";

export interface CdvContactItem {
  icon: string;
  label: string;
  href?: string;
  title?: string;
}

export function useContacts(): ComputedRef<CdvContactItem[]> {
  const { t } = useI18n({ useScope: "global" });

  return computed(() => {
    const email = t("contact.email");
    const phone = t("contact.phone");

    return [
      {
        icon: mdiEmailOutline,
        label: email,
        href: `mailto:${email}`,
      },
      {
        icon: mdiPhoneOutline,
        label: phone,
        href: `tel:${phone}`,
      },
    ];
  });
}
