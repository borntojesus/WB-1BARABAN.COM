import { ref } from "vue";

const verified = ref(false);
const initialized = ref(false);

export function useAgeGate() {
  const init = () => {
    if (typeof window === "undefined" || initialized.value) return;
    verified.value = localStorage.getItem("1b-age-verified") === "1";
    initialized.value = true;
  };

  const confirm = () => {
    verified.value = true;
    if (typeof window !== "undefined") {
      localStorage.setItem("1b-age-verified", "1");
    }
  };

  return { verified, init, confirm };
}
