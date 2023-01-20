import { mdiEmailOutline, mdiPhoneOutline } from "@mdi/js";
import { reactive } from "vue";

export interface CdvContactItem {
  icon: string;
  label: string;
  href?: string;
  title?: string;
}

const contacts = reactive<CdvContactItem[]>([
  {
    icon: mdiEmailOutline,
    label: "contato@cerbaro.dev",
    href: "mailto:contato@cerbaro.dev",
  },
  {
    icon: mdiPhoneOutline,
    label: "+555 (54) 9 9966-9018",
    href: "tel:+55554999669018",
  },
]);

export function useContacts() {
  return contacts;
}
