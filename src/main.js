import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SearchBar from "./components/SearchBar.vue";
import UserProfile from "./components/UserProfile.vue";
import Profile from "./components/Profile.vue";

const app = createApp(App)
  .use(store)
  .use(router);

app.component("search-bar", SearchBar);
app.component("user-profile", UserProfile);
app.component("profile-view", Profile);
app.mount("#app");
