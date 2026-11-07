import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { operators } from "./data/operators";

// Google Tag Manager. GA4 (G-THSBBY8Y7C) loads only through this container, never by a
// direct gtag.js tag, so it is not counted twice.
const GTM_ID = "GTM-KW7J287K";

// Consent Mode v2 defaults, before the GTM loader: denied in the EEA, UK and Switzerland
// until the visitor chooses in the banner (public/scripts/consent.js), granted elsewhere,
// then a stored choice is replayed.
const CONSENT_KEY = "1baraban-consent";
const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'],wait_for_update:500});gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if(c&&c.v===1){var s=c.analytics?'granted':'denied';gtag('consent','update',{ad_storage:s,ad_user_data:s,ad_personalization:s,analytics_storage:s});}}catch(e){}`;

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
      script: [
        {
          key: "consent-default",
          tagPriority: "critical",
          innerHTML: consentDefault,
        },
        {
          key: "gtm",
          tagPriority: "critical",
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        },
        { key: "consent-banner", src: "/scripts/consent.js", defer: true },
      ],
      noscript: [
        {
          key: "gtm-noscript",
          tagPosition: "bodyOpen",
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
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
