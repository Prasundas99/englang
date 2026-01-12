// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

const config = {
  title: "Englang",
  tagline: "English that runs.",
  favicon: "img/favicon.ico",
  url: "https://example.com",
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
        "Englang is a teaching language designed for beginners to focus on logic, algorithms, and program flow with readable syntax.",
      fullName: "English, but it accidentally became a programming language.",
      shortSlogan: "Englang - English that runs.",
      repositoryDescription: "English-like pseudocode that gave up pretending and started running.",
      warningLabel: "Warning: May cause sudden understanding of loops.",
      projectVibe: "A beginner says an algorithm in English. Englang says: cool, I can run that.",
      originStory: "Why are we pretending this cannot run?",
      versionNicknames: {
        v1: "Noob Friendly",
        v2: "Almost Coding",
        v3: "Now You Are Dangerous",
      },
      taglines: [
        "Pseudocode that stopped being lazy.",
        "Write it like English. Run it like code.",
        "Learn programming without getting punched by syntax.",
        "No semicolon jumpscare in V1.",
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
    announcementBar: {
      id: "github-support",
      isCloseable: false,
      content:
        '<div class="englang-announcement"><span class="englang-announcement-text">Enjoying Englang?</span><a class="englang-announcement-link" href="https://github.com/Prasundas99/englang" target="_blank" rel="noopener noreferrer">Star the project</a><a class="englang-announcement-link" href="https://github.com/Prasundas99/englang/fork" target="_blank" rel="noopener noreferrer">Fork on GitHub</a></div>',
    },
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
      copyright:
        'Made by <a href="https://github.com/Prasundas99" target="_blank" rel="noopener noreferrer">Prasun Das</a>',
    },
  },
};

export default config;
