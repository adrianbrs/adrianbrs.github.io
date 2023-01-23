import { createApp } from "vue";
import { i18n } from "./i18n";
import { head } from "./head";
import App from "./App.vue";
import router from "./router";
import particles from "vue3-particles";

import "./vee-validate";

import "uno.css";
import "./sass/main.scss";

const app = createApp(App);

app.provide("i18n", i18n);

app.use(i18n);
app.use(head);
app.use(router);
app.use(particles);
app.mount("#app");
