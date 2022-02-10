export default {
  requests(state) {
    return state.requests;
  },
  hasRequests(_, getters, _2, rootGetters) {
    const requests = getters.requests;
    const userId = rootGetters.userId;

    const isUSerRequests = requests.some((req) => req.userId === userId);

    return requests && requests.length > 0 && isUSerRequests;
  },
  gamerRequests(_, getters, _2, rootGetters) {
    const userId = rootGetters.userId;
    const requests = getters.requests;
    return requests.filter((request) => request.userId === userId);
  },
};
