export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuth(state) {
    return !!state.token; // !!null = false / !!'text' = true
  },
  redirectRoute(state) {
    return state.routeRedirect;
  },
};
