import { createStore } from "vuex";
import gamersModule from "./modules/gamers/index";
import requestModule from "./modules/requests/index";
import authModule from "./modules/auth/index";

const store = createStore({
  modules: {
    gamers: gamersModule,
    requests: requestModule,
    auth: authModule,
  },
});

export default store;
