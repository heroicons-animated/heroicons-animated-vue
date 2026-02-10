import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const ignoredMessages = [
    "<Suspense> is an experimental feature and its API will likely change.",
  ];

  const previous = nuxtApp.vueApp.config.warnHandler;

  nuxtApp.vueApp.config.warnHandler = (msg, instance, trace) => {
    if (ignoredMessages.some((text) => msg.includes(text))) {
      return;
    }

    if (typeof previous === "function") {
      previous(msg, instance, trace);
      return;
    }

    const message = trace ? `${msg}\n${trace}` : msg;
    console.warn(message);
  };
});
