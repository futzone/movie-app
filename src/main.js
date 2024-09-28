import { createApp } from "vue";
import App from "@/components/app/App.vue";
import "./index.css";
import uiComponents from "@/widgets";

const app = createApp(App);
uiComponents.map((comp) => {
  app.component(comp.name, comp);
});
app.mount("#app");
