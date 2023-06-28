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
    title: "eBrainz",
    image: {
      src: "/img/projects/ebrainz.png",
      width: 1200,
      height: 630,
    },
    description:
      "Website of a company that connects brands to their target communities using the universe of games as a tool.",
    href: "https://ebrainz.com.br",
  },
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
    description:
      "Website of an automotive upholstery company in southern Brazil",
    href: "https://cerbaroestof.com.br",
  },
]);

export function useProjects() {
  return projects;
}
