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
        {
          name: "theme-color",
          content: "#0A0A0B",
          media: "(prefers-color-scheme: dark)",
        },
        {
          name: "theme-color",
          content: "#FAFAF7",
          media: "(prefers-color-scheme: light)",
        },
        { name: "color-scheme", content: "dark light" },
      ],
    },
  },

  site: {
    url: "https://1baraban.com",
    name: "1baraban",
    description:
      "Independent iGaming review platform — casinos, sportsbooks, poker, slots. Public methodology, AI concierge.",
    defaultLocale: "en",
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  nitro: {
    compressPublicAssets: true,
  },

  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/methodology": { prerender: true },
    "/affiliate-disclosure": { prerender: true },
    "/responsible-gambling": { prerender: true },
    "/online-casinos/**": { isr: 600 },
    "/sports-betting/**": { isr: 600 },
    "/poker/**": { isr: 600 },
    "/slots/**": { isr: 600 },
    "/reviews/**": { isr: 3600 },
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
