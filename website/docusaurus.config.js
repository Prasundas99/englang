// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

const config = {
  title: "Englang",
  tagline: "Write it like English. Run it like code.",
  favicon: "img/favicon.ico",
  url: "https://englang.pephub.tech",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "docs",
          sidebarPath: path.resolve(currentDirectoryPath, "./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: path.resolve(currentDirectoryPath, "./src/css/custom.css"),
        },
      },
    ],
  ],
  scripts: ["/cdn/englang.min.js"],
  customFields: {
    languageMetadata: {
      whatIsEnglang:
        "Englang is a tiny English-like programming language made for beginners who understand logic but do not want to fight syntax on day one.",
      fullName: "English, but it accidentally became a programming language.",
      shortSlogan: "Pseudocode that actually runs.",
      repositoryDescription:
        "A beginner-first language that starts readable and slowly moves toward symbolic and curly-brace syntax.",
      warningLabel: "Warning: May cause sudden understanding of loops.",
      projectVibe: "Englang is what happens when pseudocode gets tired of being theoretical.",
      originStory: "Write logic in near-English first, then grow into mainstream syntax.",
      versionNicknames: {
        v1: "Noob Friendly",
        v2: "Almost Coding",
        v3: "Now You Are Dangerous",
      },
      taglines: [
        "Pseudocode that actually runs.",
        "Write it like English. Run it like code.",
        "Learn programming without getting punched by syntax.",
        "A no-semicolon zone for beginners.",
      ],
      featureNicknames: {
        start: "The lights on keyword",
        print: "Say it out loud",
        set: "Put this thing in that box",
        ask: "Annoy the user politely",
        if: "The decision uncle",
        else: "The backup plan",
        repeat: "Do it again, but respectfully",
        while: "Keep doing it until something changes",
        forEach: "Everyone gets a turn",
        divisibleBy: "FizzBuzz mode unlocked",
        even: "No remainder gang",
        odd: "Suspicious number detector",
        end: "Okay, stop now",
      },
    },
  },
  themeConfig: {
    announcementBar: undefined,
    navbar: {
      title: "Englang",
      items: [
        { to: "/", label: "Home", position: "left" },
        { to: "/docs/introduction", label: "Docs", position: "left" },
        { to: "/docs/thinking", label: "Thinking", position: "left" },
        { to: "/docs/how-to-use", label: "How To Use", position: "left" },
        { to: "/docs/cdn-usage", label: "CDN", position: "left" },
        { href: "https://github.com/Prasundas99/englang", label: "Star", position: "right" },
        { href: "https://github.com/Prasundas99/englang/fork", label: "Fork", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Author",
          items: [
            {
              label: "Prasun Das on GitHub",
              href: "https://github.com/Prasundas99",
            },
            {
              label: "Prasun Das on LinkedIn",
              href: "https://www.linkedin.com/in/prasun--das/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Star Englang",
              href: "https://github.com/Prasundas99/englang",
            },
            {
              label: "Fork Englang",
              href: "https://github.com/Prasundas99/englang/fork",
            },
          ],
        },
        {
          title: "Live Counts",
          items: [
            {
              label: "GitHub Followers (live)",
              href: "https://github.com/Prasundas99?tab=followers",
            },
            {
              label: "Repository Stars (live)",
              href: "https://github.com/Prasundas99/englang/stargazers",
            },
          ],
        },
      ],
      copyright:
        'Built by <a href="https://github.com/Prasundas99" target="_blank" rel="noopener noreferrer">Prasun Das</a>. Follow on <a href="https://github.com/Prasundas99?tab=followers" target="_blank" rel="noopener noreferrer">GitHub</a> and <a href="https://www.linkedin.com/in/prasun--das/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.',
    },
  },
};

export default config;
