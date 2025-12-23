import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiSymfony,
  SiMysql,
  SiJest,
  SiVitest,
  SiCypress,
  SiGit,
  SiVercel,
  SiSentry,
  SiDatadog,
  SiIonic,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { CursorIcon, PlaywrightIcon } from "./icons";

// Tech data con iconos de react-icons
export const techStack = [
  // Lenguajes & fundamentos (core)
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiHtml5, name: "HTML5" },
  { Icon: SiCss3, name: "CSS3" },
  { Icon: CursorIcon, name: "Cursor" },

  // Frameworks & librerías actuales
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTailwindcss, name: "Tailwind" },

  // Testing - TDD es tu marca
  { Icon: SiVitest, name: "Vitest" },
  { Icon: SiJest, name: "Jest" },
  { Icon: PlaywrightIcon, name: "Playwright" },
  { Icon: SiCypress, name: "Cypress" },

  // DevOps & CI/CD
  { Icon: SiGit, name: "Git" },
  { Icon: VscAzureDevops, name: "Azure DevOps" },
  { Icon: SiVercel, name: "Vercel" },

  // Observabilidad
  { Icon: SiSentry, name: "Sentry" },
  { Icon: SiDatadog, name: "Datadog" },

  // Experiencia previa
  { Icon: SiAngular, name: "Angular" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiPhp, name: "PHP" },
  { Icon: SiSymfony, name: "Symfony" },
  { Icon: SiMysql, name: "MySQL" },
  { Icon: SiIonic, name: "Ionic" },
];

