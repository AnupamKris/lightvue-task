import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SearchBar from "./components/SearchBar.vue";

const app = createApp(App)
  .use(store)
  .use(router);

app.component("search-bar", SearchBar);
app.mount("#app");
