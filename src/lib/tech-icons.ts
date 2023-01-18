import {
  angularIcon,
  cppIcon,
  css3Icon,
  goIcon,
  html5Icon,
  javaIcon,
  jsIcon,
  mongodbIcon,
  nestjsIcon,
  nodejsIcon,
  phpIcon,
  postgreSqlIcon,
  sassIcon,
  typescriptIcon,
  vueIcon,
} from "@/assets/svg";

export interface CdvTechIconOptions {
  icon: string;
  label: string;
  score?: number;
}

const techIcons = {
  typescriptIcon: { icon: typescriptIcon, label: "TypeScript" },
  jsIcon: { icon: jsIcon, label: "JavaScript" },
  html5Icon: { icon: html5Icon, label: "HTML5" },
  css3Icon: { icon: css3Icon, label: "CSS3" },
  goIcon: { icon: goIcon, label: "Go" },
  phpIcon: { icon: phpIcon, label: "PHP" },
  cppIcon: { icon: cppIcon, label: "C++" },
  javaIcon: { icon: javaIcon, label: "Java" },
  vueIcon: { icon: vueIcon, label: "Vue" },
  angularIcon: { icon: angularIcon, label: "Angular" },
  nestjsIcon: { icon: nestjsIcon, label: "NestJS" },
  nodejsIcon: { icon: nodejsIcon, label: "NodeJS" },
  sassIcon: { icon: sassIcon, label: "Sass" },
  postgreSqlIcon: { icon: postgreSqlIcon, label: "PostgreSQL" },
  mongodbIcon: { icon: mongodbIcon, label: "MongoDB" },
} as const;

export default techIcons;
