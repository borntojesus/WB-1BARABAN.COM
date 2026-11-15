import { ref, watch } from "vue";

type Theme = "dark" | "light" | "system";

const theme = ref<Theme>("dark");
const resolved = ref<"dark" | "light">("dark");

function applyTheme(t: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = t;
}

function resolveTheme(t: Theme): "dark" | "light" {
  if (t !== "system") return t;
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function useTheme() {
  const initTheme = () => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("1b-theme") as Theme | null) ?? "dark";
    theme.value = saved;
    resolved.value = resolveTheme(saved);
    applyTheme(resolved.value);

    if (saved === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: light)");
      mq.addEventListener("change", () => {
        if (theme.value === "system") {
          resolved.value = resolveTheme("system");
          applyTheme(resolved.value);
        }
      });
    }
  };

  const setTheme = (t: Theme) => {
    theme.value = t;
    resolved.value = resolveTheme(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("1b-theme", t);
      applyTheme(resolved.value);
    }
  };

  const toggle = () => {
    const next: Theme = resolved.value === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return { theme, resolved, initTheme, setTheme, toggle };
}
