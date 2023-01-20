import { reactive } from "vue";

export interface CdvProjectItem {
  title: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt?: string;
  };
  description: string;
  href?: string;
}

const projects = reactive<CdvProjectItem[]>([
  {
    title: "Pubby.club",
    image: {
      src: "/img/projects/pubby_club.svg",
      width: 1280,
      height: 1280,
    },
    description:
      "Collaborative watch party platform with multiple rooms, play modes, chat and more...",
    href: "https://pubby.club",
  },
  {
    title: "Cerbaro Estofamentos",
    image: {
      src: "/img/projects/cerbaroestof.png",
      width: 479,
      height: 250,
    },
    description: "Automotive upholstery company in southern Brazil",
    href: "https://cerbaroestof.com.br",
  },
]);

export function useProjects() {
  return projects;
}
