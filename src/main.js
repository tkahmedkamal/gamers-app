import { createApp, defineAsyncComponent } from "vue";

import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";
import BaseButton from "./UI/BaseButton.vue";
import BaseCard from "./UI/BaseCard.vue";
import BaseBadge from "./UI/BaseBadge.vue";

const BaseDialog = defineAsyncComponent(() => import("./UI/BaseDialog.vue"));
const BaseSpinner = defineAsyncComponent(() => import("./UI/BaseSpinner.vue"));

const app = createApp(App);

app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-badge", BaseBadge);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);

app.use(router).use(store).mount("#app");
