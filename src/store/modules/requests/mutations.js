export default {
  requests(state, payload) {
    state.requests.unshift(payload);
  },
  fetchRequests(state, payload) {
    state.requests = [...payload].reverse();
  },
};
