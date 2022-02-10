export default {
  registerGamer(state, payload) {
    state.gamers.push(payload);
  },
  fetchGamer(state, payload) {
    state.gamers = payload;
  },
  lastFetch(state) {
    state.lastFetch = new Date().getTime();
  },
};
