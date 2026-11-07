// Cookie banner for Consent Mode v2. The defaults are set inline in <head> before GTM
// (nuxt.config.ts). Shows until a choice is stored; any [data-consent-open] reopens it.
(function () {
  var KEY = "1baraban-consent";
  var T = {
    text: "We use Google Analytics cookies to count visits, only if you agree.",
    policy: "Privacy notice",
    accept: "Accept",
    reject: "Reject",
    label: "Cookie choice",
  };

  function save(all) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics: all, at: new Date().toISOString() }));
    } catch (e) {}
    var s = all ? "granted" : "denied";
    if (typeof gtag === "function")
      gtag("consent", "update", {
        ad_storage: s,
        ad_user_data: s,
        ad_personalization: s,
        analytics_storage: s,
      });
  }

  function close() {
    var el = document.getElementById("bb-consent");
    if (el) el.remove();
  }

  function open() {
    if (document.getElementById("bb-consent")) return;
    var box = document.createElement("div");
    box.id = "bb-consent";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", T.label);
    box.innerHTML =
      '<p class="bbc__text"><span></span> <a class="bbc__policy" href="/privacy#cookies"></a></p>' +
      '<div class="bbc__btns"><button type="button" class="bbc__btn" data-bbc="reject"></button>' +
      '<button type="button" class="bbc__btn" data-bbc="accept"></button></div>';
    box.querySelector(".bbc__text span").textContent = T.text;
    box.querySelector(".bbc__policy").textContent = T.policy;
    box.querySelector('[data-bbc="accept"]').textContent = T.accept;
    box.querySelector('[data-bbc="reject"]').textContent = T.reject;
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-bbc]");
      if (!b) return;
      save(b.getAttribute("data-bbc") === "accept");
      close();
    });
    var css = document.createElement("style");
    css.textContent =
      "#bb-consent{position:fixed;left:16px;right:16px;bottom:calc(var(--bottom-nav-height,64px) + env(safe-area-inset-bottom) + 12px);z-index:90;box-sizing:border-box;padding:var(--space-4,16px);background:var(--bg-secondary,#fff);color:var(--text-primary,#0a0a0b);border:1px solid var(--border-strong,#c5c5c0);border-radius:var(--radius-sm,2px);box-shadow:0 4px 12px rgb(0 0 0/.08);font:14px/1.5 Geist,Inter,system-ui,sans-serif}" +
      "@media (min-width:768px){#bb-consent{right:auto;bottom:16px;max-width:380px}}" +
      "#bb-consent .bbc__text{margin:0 0 var(--space-3,12px);color:var(--text-secondary,#52525b)}" +
      "#bb-consent .bbc__policy{color:var(--accent-primary,#7c5cff);text-decoration:underline;text-underline-offset:.2em}" +
      "#bb-consent .bbc__btns{display:flex;gap:var(--space-2,8px)}" +
      "#bb-consent .bbc__btn{flex:1 1 0;padding:8px 12px;border:1px solid var(--text-primary,#0a0a0b);border-radius:var(--radius-sm,2px);background:var(--bg-secondary,#fff);color:var(--text-primary,#0a0a0b);font:inherit;font-weight:500;cursor:pointer}" +
      "#bb-consent .bbc__btn:hover{background:var(--bg-tertiary,#f2f2ee)}#bb-consent .bbc__btn:focus-visible{outline:2px solid var(--accent-primary,#7c5cff);outline-offset:2px}";
    box.appendChild(css);
    document.body.appendChild(box);
  }

  document.addEventListener("click", function (e) {
    var l = e.target.closest && e.target.closest("[data-consent-open]");
    if (!l) return;
    e.preventDefault();
    open();
  });

  var stored = null;
  try {
    stored = JSON.parse(localStorage.getItem(KEY) || "null");
  } catch (e) {}
  if (!stored || stored.v !== 1) {
    if (document.body) open();
    else document.addEventListener("DOMContentLoaded", open);
  }
})();
