import { ref } from "vue";
import { mockOperators } from "~/data/operators";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: { name: string; href: string }[];
  timestamp: number;
};

const messages = ref<ChatMessage[]>([]);
const isStreaming = ref(false);

// Mock stub — real version goes through Vercel AI SDK + AI Gateway later.
function mockResponse(query: string): ChatMessage {
  const q = query.toLowerCase();
  const matched = mockOperators
    .filter(
      (op) =>
        op.tags.some((t) => q.includes(t)) ||
        op.verticals.some((v) => q.includes(v)),
    )
    .slice(0, 3);

  if (matched.length === 0) {
    return {
      role: "assistant",
      content:
        "I couldn't find an exact match in our database. The full AI concierge ships with the Strapi backend — for now, browse the vertical hubs at /online-casinos, /sports-betting, /poker, /slots, or check our /methodology page for how we score operators.",
      timestamp: Date.now(),
    };
  }

  const lines = matched
    .map(
      (op) =>
        `**${op.name}** — Trust Index ${op.score.toFixed(1)}/10. ${op.tldr.slice(0, 100)}…`,
    )
    .join("\n\n");

  return {
    role: "assistant",
    content: `Based on your query, here are 3 operators worth considering:\n\n${lines}\n\nThis is a stub response. Full retrieval-augmented chat ships with the Strapi backend.`,
    citations: matched.map((op) => ({
      name: op.name,
      href: `/reviews/${op.slug}`,
    })),
    timestamp: Date.now(),
  };
}

export function useChat() {
  const send = async (text: string) => {
    if (!text.trim()) return;
    messages.value.push({ role: "user", content: text, timestamp: Date.now() });
    isStreaming.value = true;

    // simulate streaming latency
    await new Promise((r) => setTimeout(r, 600));

    messages.value.push(mockResponse(text));
    isStreaming.value = false;
  };

  const reset = () => {
    messages.value = [];
  };

  return { messages, isStreaming, send, reset };
}
