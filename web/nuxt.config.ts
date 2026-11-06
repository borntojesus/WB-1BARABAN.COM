import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { operators } from "./data/operators";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
  ],

  css: ["~/assets/css/tokens.css", "~/assets/css/main.css"],

  app: {
    pageTransition: false,
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://1baraban.com" },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "theme-color", content: "#FAFAF7" },
        { name: "color-scheme", content: "light" },
      ],
    },
  },

  site: {
    url: "https://1baraban.com",
    name: "1baraban",
    description:
      "Independent gambling operator fact profiles, GB first. Every fact sourced and dated. No paid rankings.",
    defaultLocale: "en",
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  linkChecker: {
    excludeLinks: ["/go/**"],
  },

  nitro: {
    compressPublicAssets: true,
    preset: "netlify_static",
    prerender: {
      failOnError: false,
      crawlLinks: true,
      // /go/* are Netlify 302 redirects written into dist/_redirects, not pages
      ignore: ["/go/"],
      routes: [
        "/",
        "/reviews",
        "/compare",
        "/online-casinos",
        "/sports-betting",
        "/poker",
        "/slots",
        ...operators.map((o) => `/reviews/${o.slug}`),
      ],
    },
  },

  hooks: {
    // Write /go/<slug> redirects (licensed operators only) from data.
    "nitro:init"(nitro: any) {
      const lines = operators
        .filter((o) => o.gbStatus === "licensed" && o.goTarget)
        .map((o) => `/go/${o.slug}  ${o.goTarget}  302`);
      const body = lines.join("\n") + "\n";
      nitro.hooks.hook("compiled", () => {
        const out = nitro.options.output.publicDir;
        mkdirSync(out, { recursive: true });
        let existing = "";
        try {
          existing = require("node:fs").readFileSync(`${out}/_redirects`, "utf8");
        } catch {}
        writeFileSync(`${out}/_redirects`, body + existing);
      });
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/methodology": { prerender: true },
    "/affiliate-disclosure": { prerender: true },
    "/responsible-gambling": { prerender: true },
    "/reviews/**": { prerender: true },
    "/compare": { prerender: true },
    "/online-casinos": { prerender: true },
    "/sports-betting": { prerender: true },
    "/poker": { prerender: true },
    "/slots": { prerender: true },
    "/ask": { ssr: true, headers: { "X-Robots-Tag": "noindex" } },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  experimental: {
    payloadExtraction: true,
  },
});
