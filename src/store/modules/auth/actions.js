import { setTimeout } from "core-js";

const API_KEY = "AIzaSyD1jy4qMJOLIWtQcu9OmhRUJQHzD_iJ-FA";
let timer;

export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url;

    if (mode === "login") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}
      `;
    } else if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}
      `;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      let msg;
      if (payload.mode === "login") {
        if (data.error.errors[0].message === "EMAIL_NOT_FOUND") {
          msg = "Sorry, this email is not registered.";
        } else if (data.error.errors[0].message === "INVALID_PASSWORD") {
          msg = "Sorry, this password is incorrect.";
        }
      } else if (payload.mode === "signup") {
        if (data.error.errors[0].message === "EMAIL_EXISTS") {
          msg = "Sorry, this email already exists.";
        }
      }
      const error = new Error(msg);
      throw error;
    }
    const expiresIn = +data.expiresIn * 1000;
    const currentTime = new Date().getTime() + expiresIn;

    localStorage.setItem("userId", data.localId);
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("tokenExpiration", currentTime);

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      userId: data.localId,
      token: data.idToken,
    });
  },

  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  autoLogin(context) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      userId,
      token,
    });
  },

  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },

  autoLogout(context) {
    context.dispatch("logout");
    context.commit("routeRedirect");
  },
};
