export default {
  async requests(context, payload) {
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://gamer-vue-default-rtdb.firebaseio.com/requests/${userId}.json`,
      {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        "There is a bug we are working on, please try again later."
      );
      throw error;
    }

    context.commit("requests", {
      id: data.name,
      userId: userId,
      ...payload,
    });
  },

  async fetchRequests(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://gamer-vue-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        "There is a bug we are working on, please try again later."
      );
      throw error;
    }

    const requestsData = [];

    for (let key in data) {
      const request = {
        id: key,
        userId: userId,
        email: data[key].email,
        message: data[key].message,
      };

      requestsData.push(request);
    }

    context.commit("fetchRequests", requestsData);
  },
};
