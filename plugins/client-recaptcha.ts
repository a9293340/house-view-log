import VueClientRecaptcha from "vue-client-recaptcha";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component("VueClientRecaptcha", VueClientRecaptcha);
});
