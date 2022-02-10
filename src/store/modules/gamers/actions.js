export default {
  async registerGamer(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://gamer-vue-default-rtdb.firebaseio.com/gamers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = new Error(
        "There is a bug we are working on, please try again later."
      );
      throw error;
    }

    context.commit("registerGamer", {
      id: userId,
      ...payload,
    });
  },

  async fetchGamer(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://gamer-vue-default-rtdb.firebaseio.com/gamers.json`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        "There is a bug we are working on, please try again later."
      );
      throw error;
    }

    const gamerData = [];

    for (let key in data) {
      const gamer = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        gender: data[key].gender,
        bio: data[key].bio,
        games: data[key].games,
      };

      gamerData.push(gamer);
    }

    context.commit("fetchGamer", gamerData);
    context.commit("lastFetch");
  },
};
