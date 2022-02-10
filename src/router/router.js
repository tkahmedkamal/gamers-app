import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import GamersList from "../view/gamers/GamersList.vue";
import NotFound from "../view/NotFount.vue";
import store from "../store/index";

const GamerDetails = defineAsyncComponent(() =>
  import("../view/gamers/GamerDetails.vue")
);
const RequestsContact = defineAsyncComponent(() =>
  import("../view/requests/RequestsContact.vue")
);
const GamerRegister = defineAsyncComponent(() =>
  import("../view/gamers/GamerRegister.vue")
);
const RequestsLists = defineAsyncComponent(() =>
  import("../view/requests/RequestsLists.vue")
);
const UserRegister = defineAsyncComponent(() =>
  import("../view/user/UserRegister.vue")
);
const UserLogin = defineAsyncComponent(() =>
  import("../view/user/UserLogin.vue")
);
const UserSignup = defineAsyncComponent(() =>
  import("../view/user/UserSignup.vue")
);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/gamers",
    },
    {
      path: "/gamers",
      name: "gamers",
      component: GamersList,
    },
    {
      path: "/gamers/:gamerId",
      name: "gamer",
      component: GamerDetails,
      props: true,
    },
    {
      path: "/gamers/:id/contact",
      name: "request-contact",
      component: RequestsContact,
    },
    {
      path: "/register",
      name: "register",
      component: GamerRegister,
      meta: { isAuth: true, isGamer: true },
    },
    {
      path: "/requests",
      name: "requests",
      component: RequestsLists,
      meta: { isAuth: true },
    },
    {
      path: "/user",
      name: "user",
      component: UserRegister,
      meta: { isUnAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: UserLogin,
      meta: { isUnAuth: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: UserSignup,
      meta: { isUnAuth: true },
    },
    {
      path: "/:notFount(.*)*",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.isAuth && !store.getters.isAuth) {
    next({ name: "user" });
  } else if (to.meta.isUnAuth && store.getters.isAuth) {
    next({ name: "gamers" });
  } else if (to.meta.isGamer && store.getters["gamers/isGamer"]) {
    next({ name: "gamers" });
  } else {
    next();
  }
});

export default router;
