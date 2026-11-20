// Google Tag Manager. GA4 (G-THSBBY8Y7C) loads only through this container, never by a
// direct gtag.js tag, so it is not counted twice.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { mockOperators } from "./data/operators";

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
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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
      "Independent iGaming review platform — casinos, sportsbooks, poker, slots. Public methodology, AI concierge.",
    defaultLocale: "en",
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  nitro: {
    compressPublicAssets: true,
    preset: "netlify_static",
    prerender: {
      failOnError: false,
      crawlLinks: true,
      // /go/* are Netlify 302 redirects written into dist/_redirects, not pages
      ignore: ["/go/"],
      routes: ["/compare", "/authors/anna-k", "/authors/marek-s"],
    },
  },

  hooks: {
    // Write /go/<slug> -> affiliate URL redirects from data/operators.ts into
    // dist/_redirects, ahead of the preset's own rules (first match wins).
    // Also keeps dist valid on both Netlify and Cloudflare Pages: Pages rejects the
    // preset's `/* /404.html 404` rule (404.html at the root is served for misses
    // automatically on both hosts), and the SEO module's `X-Robots-Tag: noindex` on
    // /_nuxt is dropped (fleet rule: no noindex anywhere).
    "nitro:init"(nitro) {
      const body =
        mockOperators.map((o) => `/go/${o.slug}  ${o.affiliateUrl}  302`).join("\n") + "\n";
      nitro.hooks.hook("compiled", () => {
        const out = nitro.options.output.publicDir;
        mkdirSync(out, { recursive: true });
        let existing = "";
        try {
          existing = readFileSync(`${out}/_redirects`, "utf8");
        } catch {}
        existing = existing
          .split("\n")
          .filter((l) => !/^\/\*\s+\/404\.html\s+404\s*$/.test(l.trim()))
          .join("\n");
        writeFileSync(`${out}/_redirects`, body + existing);
        try {
          const h = readFileSync(`${out}/_headers`, "utf8")
            .split("\n")
            .filter((l) => !/^\s*x-robots-tag\s*:/i.test(l))
            .join("\n")
            .replace(/^\/_nuxt\n(?=\/)/m, "");
          writeFileSync(`${out}/_headers`, h);
        } catch {}
        // Error pages: the HTTP status alone says 404, no noindex meta (fleet rule).
        for (const f of ["404.html", "200.html"]) {
          try {
            const t = readFileSync(`${out}/${f}`, "utf8");
            writeFileSync(
              `${out}/${f}`,
              t.replace(/<meta name="robots" content="noindex, nofollow"\s*\/?>/g, ""),
            );
          } catch {}
        }
      });
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
    "/methodology": { prerender: true },
    "/affiliate-disclosure": { prerender: true },
    "/responsible-gambling": { prerender: true },
    "/compare": { prerender: true },
    "/authors/**": { prerender: true },
    "/online-casinos/**": { isr: 600 },
    "/sports-betting/**": { isr: 600 },
    "/poker/**": { isr: 600 },
    "/slots/**": { isr: 600 },
    "/reviews/**": { isr: 3600 },
    "/ask": { ssr: true },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  experimental: {
    payloadExtraction: true,
  },
});
