export default {
  setUser(state, payload) {
    const { userId, token, expiresIn } = payload;

    state.userId = userId;
    state.token = token;
    state.expiresIn = expiresIn;
    state.routeRedirect = false;
  },
  routeRedirect(state) {
    state.routeRedirect = true;
  },
};
