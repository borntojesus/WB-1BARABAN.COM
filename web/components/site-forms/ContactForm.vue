<!--
  Shared contact form, Vue/Nuxt port of astro/ContactForm.astro (canonical copy in HL-SITE-FORMS/vue/).
  Backend: https://forms.antonyuk.org/contact (HL-AGENTGW). Works without JS (plain POST, ?sent=1 on return).
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{ lang?: 'uk' | 'en' | 'ru'; sitekey: string; endpoint?: string; email?: string; withPhone?: boolean }>(),
  { lang: 'en', endpoint: 'https://forms.antonyuk.org/contact', email: undefined, withPhone: false },
);

const TEXT = {
  uk: { name: "Ім'я", email: 'Email для відповіді', hint: 'необовʼязково, але без нього ми не зможемо відповісти', phone: 'Телефон', message: 'Повідомлення', send: 'Надіслати', sending: 'Надсилаємо…', ok: 'Дякуємо, повідомлення надіслано.', err: 'Не вдалося надіслати. Спробуйте ще раз або напишіть на пошту.', rate: 'Забагато повідомлень за короткий час. Спробуйте пізніше.', captcha: 'Не пройдено перевірку. Оновіть сторінку і спробуйте ще раз.', privacy: 'Надсилаючи форму, ви погоджуєтесь, що ми збережемо ваше повідомлення, щоб відповісти.', mail: 'Або напишіть на' },
  en: { name: 'Name', email: 'Email for a reply', hint: 'optional, but without it we cannot reply', phone: 'Phone', message: 'Message', send: 'Send', sending: 'Sending…', ok: 'Thank you, your message has been sent.', err: 'Could not send. Please try again or write to the email below.', rate: 'Too many messages in a short time. Please try later.', captcha: 'The check did not pass. Reload the page and try again.', privacy: 'By sending the form you agree that we store your message in order to reply.', mail: 'Or write to' },
  ru: { name: 'Имя', email: 'Email для ответа', hint: 'необязательно, но без него мы не сможем ответить', phone: 'Телефон', message: 'Сообщение', send: 'Отправить', sending: 'Отправляем…', ok: 'Спасибо, сообщение отправлено.', err: 'Не удалось отправить. Попробуйте ещё раз или напишите на почту.', rate: 'Слишком много сообщений за короткое время. Попробуйте позже.', captcha: 'Проверка не пройдена. Обновите страницу и попробуйте ещё раз.', privacy: 'Отправляя форму, вы соглашаетесь, что мы сохраним ваше сообщение, чтобы ответить.', mail: 'Или напишите на' },
} as const;
const t = TEXT[props.lang];

const form = ref<HTMLFormElement | null>(null);
const status = ref('');
const busy = ref(false);
const page = ref('');
const started = ref('');

function msgFor(code: string): string {
  return (t as Record<string, string>)[code] ?? t.err;
}

onMounted(() => {
  page.value = location.href.split('#')[0];
  started.value = String(Date.now());
  const sent = new URLSearchParams(location.search).get('sent');
  if (sent) status.value = sent === '1' ? t.ok : msgFor(sent);
  if (!document.querySelector('script[data-sf-turnstile]')) {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    s.dataset.sfTurnstile = '1';
    document.head.appendChild(s);
  }
});

async function submit(): Promise<void> {
  if (!form.value) return;
  busy.value = true;
  status.value = t.sending;
  try {
    const data = Object.fromEntries(new FormData(form.value).entries());
    const r = await fetch(props.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (r.ok && j.ok) {
      status.value = t.ok;
      form.value.reset();
    } else status.value = msgFor(String(j.error ?? 'err'));
  } catch {
    status.value = t.err;
  } finally {
    busy.value = false;
    const w = window as unknown as { turnstile?: { reset: (el: Element | null) => void } };
    w.turnstile?.reset(form.value.querySelector('.cf-turnstile'));
  }
}
</script>

<template>
  <form ref="form" class="sf-form" method="post" :action="endpoint" data-sf @submit.prevent="submit">
    <input type="hidden" name="lang" :value="lang" />
    <input type="hidden" name="page" :value="page" />
    <input type="hidden" name="t" :value="started" />
    <div class="sf-hp" aria-hidden="true">
      <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
    </div>
    <label class="sf-field">
      <span>{{ t.name }}</span>
      <input type="text" name="name" maxlength="120" autocomplete="name" />
    </label>
    <label class="sf-field">
      <span>{{ t.email }} <small>({{ t.hint }})</small></span>
      <input type="email" name="email" maxlength="200" autocomplete="email" />
    </label>
    <label v-if="withPhone" class="sf-field">
      <span>{{ t.phone }}</span>
      <input type="tel" name="phone" maxlength="40" autocomplete="tel" />
    </label>
    <label class="sf-field">
      <span>{{ t.message }}</span>
      <textarea name="message" rows="6" minlength="5" maxlength="5000" required />
    </label>
    <div class="cf-turnstile" :data-sitekey="sitekey" :data-language="lang" />
    <p class="sf-note">{{ t.privacy }}</p>
    <button type="submit" class="sf-btn" :disabled="busy">{{ t.send }}</button>
    <p class="sf-status" role="status" aria-live="polite">{{ status }}</p>
    <p v-if="email" class="sf-mail">
      {{ t.mail }} <a :href="`mailto:${email}`">{{ email }}</a>
    </p>
  </form>
</template>

<style scoped>
.sf-form { display: grid; gap: 14px; max-width: 560px; }
.sf-field { display: grid; gap: 6px; }
.sf-field span { font-weight: 600; }
.sf-field small { font-weight: 400; opacity: 0.7; }
.sf-field input, .sf-field textarea {
  font: inherit; color: inherit; background: var(--sf-field-bg, transparent);
  border: 1px solid var(--sf-border, currentColor); border-radius: 3px; padding: 10px 12px; width: 100%; box-sizing: border-box;
}
.sf-hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
.sf-note, .sf-mail { font-size: 0.875em; opacity: 0.8; margin: 0; }
.sf-btn {
  justify-self: start; font: inherit; font-weight: 600; cursor: pointer;
  padding: 10px 22px; border: 0; border-radius: 3px; color: #fff; background: var(--sf-accent, #1f2937);
}
.sf-btn:disabled { opacity: 0.6; cursor: wait; }
.sf-status { margin: 0; min-height: 1.4em; font-weight: 600; }
</style>
