import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import router from "./pages";
import i18n from "./lang";

createApp(App).use(router).use(i18n).mount("#app");
