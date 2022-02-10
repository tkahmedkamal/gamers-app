export default {
  gamers(state) {
    return state.gamers;
  },
  hasGamers(state) {
    return state.gamers.length > 0;
  },
  isGamer(_, getters, _2, rootGetters) {
    const userId = rootGetters.userId;
    const gamers = getters.gamers;

    return gamers.some((gamer) => gamer.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      return true;
    }
    const currentTime = new Date().getTime();

    return (currentTime - lastFetch) / 1000 > 60;
  },
};
