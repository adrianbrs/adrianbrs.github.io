import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./vee-validate";
import particles from "vue3-particles";

import "uno.css";
import "./sass/main.scss";

const app = createApp(App);

app.use(router);
app.use(particles);
app.mount("#app");
