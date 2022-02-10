<template>
  <section class="requests">
    <base-dialog :show="isError" @close:dialog="closeDialog">
      {{ isError }}
    </base-dialog>
    <div class="container">
      <div class="requests__box">
        <h2 class="requests__title main--title">Requests Sent From Viewers</h2>
        <p class="requests__listEmpty main--para" v-if="!hasRequests">
          There are no requests at the moment.
        </p>
        <div class="requests__spinner" v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul class="requests__list" v-else>
          <requests-lists-item
            v-for="request in requests"
            :key="request.id"
            :id="request.id"
            :email="request.email"
            :message="request.message"
          ></requests-lists-item>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import RequestsListsItem from "../../components/requests/RequestsListsItem.vue";

export default {
  components: {
    RequestsListsItem,
  },
  data() {
    return {
      isError: "",
      isLoading: false,
    };
  },
  computed: {
    requests() {
      return this.$store.getters["requests/gamerRequests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  async created() {
    try {
      this.isLoading = true;
      await this.$store.dispatch("requests/fetchRequests");
      this.isLoading = false;
    } catch (error) {
      this.isError = error.message;
    }
  },
  methods: {
    closeDialog(data) {
      this.isError = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.requests {
  margin-top: $large-space;
}

.requests__listEmpty {
  margin-top: $between-space;
}

.requests__box {
  max-width: 450px;
  margin: auto;
  text-align: center;

  @media (max-width: 767px) {
    max-width: 100%;
  }
}
</style>