export default {
  async requests(context, payload) {
    const userId = payload.userId;

    const { email, message } = payload;
    const reqData = {
      email,
      message,
    };

    const response = await fetch(
      `https://gamer-vue-default-rtdb.firebaseio.com/requests/${userId}.json`,
      {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData),
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
      userId,
      ...reqData,
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
