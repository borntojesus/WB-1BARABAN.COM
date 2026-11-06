import { ref } from "vue";
import { operators, gbStatusLabel, type Operator } from "~/data/operators";

// Static FAQ helper. This is NOT AI: it matches keywords against a fixed list of
// questions and the published operator data. No network calls.
// If this ever becomes real AI it needs Cloudflare Turnstile and rate limiting.

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: { name: string; href: string }[];
  timestamp: number;
};

const messages = ref<ChatMessage[]>([]);
const isStreaming = ref(false);

const FALLBACK =
  "I do not have an answer for that in our fixed list. Browse the operator profiles at /reviews or read how we work at /methodology.";

type Faq = { keys: string[]; answer: string; href?: string; name?: string };

const faqs: Faq[] = [
  {
    keys: ["method", "how do you", "how we", "research", "test"],
    answer:
      "Our profiles are desk research from regulators' public registers and operators' own pages. Each fact has a source and a check date. We have not tested deposits, withdrawals or support, so we publish no scores or rankings.",
    href: "/methodology",
    name: "Methodology",
  },
  {
    keys: ["affiliate", "paid", "commission", "earn", "money"],
    answer:
      "No affiliate agreements are in place today. Links go to official sites without tracking. If that changes, this will be stated on the disclosure page and on every link.",
    href: "/affiliate-disclosure",
    name: "Affiliate disclosure",
  },
  {
    keys: ["help", "addict", "problem", "helpline", "self-exclu", "gamstop"],
    answer:
      "Free, confidential help is listed on our responsible gambling page, including the National Gambling Helpline in Great Britain (0808 8020 133) and GAMSTOP self-exclusion.",
    href: "/responsible-gambling",
    name: "Responsible gambling",
  },
  {
    keys: ["offshore", "curacao", "curaçao", "crypto", "unlicensed", "link"],
    answer:
      "We do not link to operators that are not licensed in Great Britain. Some are profiled for information only, with a notice and no outbound links.",
    href: "/methodology",
    name: "Methodology",
  },
  {
    keys: ["correct", "error", "wrong", "mistake", "contact"],
    answer:
      "Email editorial@1baraban.com with the page and, if possible, a source. We correct confirmed errors and update the check date.",
    href: "/authors/editorial-team",
    name: "Editorial team",
  },
];

function findOp(q: string): Operator | undefined {
  return operators.find(
    (o) =>
      q.includes(o.name.toLowerCase()) ||
      q.includes(o.slug.replace(/-/g, " ")) ||
      q.includes(o.slug),
  );
}

function operatorAnswer(op: Operator, q: string): ChatMessage {
  const href = `/reviews/${op.slug}`;
  const lic = op.licences[0];
  let text: string;

  if (/licen|legal|uk|gb|britain|regulat|safe/.test(q)) {
    text = `${op.name}: ${gbStatusLabel[op.gbStatus]}.`;
    if (lic) {
      const end = (t: string) => t.replace(/\.+$/, "");
      const num = lic.number ? `, ${lic.regulator === "UK Gambling Commission" ? "account" : "licence"} ${lic.number}` : "";
      text += ` ${lic.regulator}${num}${lic.holder ? `, held by ${end(lic.holder)}` : ""}. Status: ${end(lic.status)}. Source: ${lic.source.label}.`;
    }
    text += ` Checked ${op.lastChecked}.`;
  } else if (/own/.test(q)) {
    text = op.owner.value
      ? `${op.name}: owner ${op.owner.value}. Checked ${op.owner.checked}.`
      : `Owner of ${op.name} is not verified.`;
  } else if (/launch|found|since|year|old/.test(q)) {
    text = op.launchYear.value
      ? `${op.name}: launch year ${op.launchYear.value}. ${op.launchYear.note ?? ""} Checked ${op.launchYear.checked}.`
      : `Launch year of ${op.name} is not verified.`;
  } else if (/pay|deposit|withdraw|method/.test(q)) {
    text = op.paymentMethods.value
      ? `${op.name} payment methods: ${op.paymentMethods.value.join(", ")}. Checked ${op.paymentMethods.checked}.`
      : `Payment methods for ${op.name} are not verified. We have not tested deposits or withdrawals.`;
  } else if (/bonus|offer|promo/.test(q)) {
    text = op.welcomeBonus.value
      ? `${op.name} welcome offer as published: ${op.welcomeBonus.value}. Checked ${op.welcomeBonus.checked}. Check the operator's terms.`
      : `We do not publish a verified offer for ${op.name}.`;
  } else {
    text = `${op.name}: ${gbStatusLabel[op.gbStatus]}. ${op.summary} Checked ${op.lastChecked}.`;
  }

  return {
    role: "assistant",
    content: `${text}\n\nSee the full profile for sources.`,
    citations: [{ name: `${op.name} profile`, href }],
    timestamp: Date.now(),
  };
}

function answer(query: string): ChatMessage {
  const q = query.toLowerCase();
  const op = findOp(q);
  if (op) return operatorAnswer(op, q);

  const faq = faqs.find((f) => f.keys.some((k) => q.includes(k)));
  if (faq) {
    return {
      role: "assistant",
      content: faq.answer,
      citations: faq.href ? [{ name: faq.name ?? faq.href, href: faq.href }] : undefined,
      timestamp: Date.now(),
    };
  }
  return {
    role: "assistant",
    content: FALLBACK,
    citations: [
      { name: "Reviews", href: "/reviews" },
      { name: "Methodology", href: "/methodology" },
    ],
    timestamp: Date.now(),
  };
}

export function useChat() {
  const send = async (text: string) => {
    if (!text.trim()) return;
    messages.value.push({ role: "user", content: text, timestamp: Date.now() });
    messages.value.push(answer(text));
  };

  const reset = () => {
    messages.value = [];
  };

  return { messages, isStreaming, send, reset };
}
