<template>
  <section class="gamers">
    <base-dialog :show="isError" @close:dialog="closeDialog">
      {{ isError }}
    </base-dialog>
    <div class="container">
      <gamer-filter @change:filter="gamersFilter"></gamer-filter>
      <section class="gamers__browseGamers">
        <h2 class="main--title">Browse Gamers</h2>
        <p class="gamers__para main-para" v-if="hasGamers">
          Browse all the gamers and see what they are playing and you can also
          communicate with them.
        </p>
        <p class="gamers__para main-para" v-else>
          There are no players currently registered.
        </p>
        <div class="gamers__buttons">
          <base-button
            mode="outline"
            class="gamer__refresh gamers__btn"
            @click="fetchGamers(true)"
            >Refresh</base-button
          >
          <base-button
            class="gamers__btn"
            link
            to="/login?redirect=register"
            mode="main"
            v-if="!isAuth"
            >login to register a gamer</base-button
          >
          <base-button
            class="gamers__btn"
            link
            mode="main"
            to="/register"
            v-if="!isGamer && !isLoading && isAuth"
            >Register As Gamer</base-button
          >
        </div>
        <div class="gamers__spinner" v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul class="gamers__list" v-else>
          <gamer-list-item
            v-for="gamer in gamers"
            :key="gamer.id"
            :id="gamer.id"
            :firstName="gamer.firstName"
            :lastName="gamer.lastName"
            :gender="gamer.gender"
            :bio="gamer.bio"
            :games="gamer.games"
          ></gamer-list-item>
        </ul>
      </section>
    </div>
  </section>
</template>

<script>
import GamerFilter from "../../components/gamers/GamerFilter.vue";
import BaseButton from "../../UI/BaseButton.vue";
import GamerListItem from "../../components/gamers/GamerListItem.vue";

export default {
  components: {
    GamerFilter,
    BaseButton,
    GamerListItem,
  },
  data() {
    return {
      isError: "",
      isLoading: false,
      filters: {
        fifa22: true,
        pubg: true,
        batman: true,
        tekken7: true,
      },
    };
  },
  computed: {
    gamers() {
      const gamers = this.$store.getters["gamers/gamers"];
      return gamers.filter((gamer) => {
        if (this.filters.fifa22 && gamer.games.includes("fifa22")) {
          return true;
        }
        if (this.filters.pubg && gamer.games.includes("pubg")) {
          return true;
        }
        if (this.filters.batman && gamer.games.includes("batman")) {
          return true;
        }
        if (this.filters.tekken7 && gamer.games.includes("tekken7")) {
          return true;
        }
        return false;
      });
    },
    hasGamers() {
      return this.$store.getters["gamers/hasGamers"];
    },
    isGamer() {
      return this.$store.getters["gamers/isGamer"];
    },
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  async created() {
    this.fetchGamers();
  },
  methods: {
    async fetchGamers(refresh = false) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("gamers/fetchGamer", {
          forceRefresh: refresh,
        });

        localStorage.setItem(
          "allGamers",
          JSON.stringify(this.$store.getters["gamers/gamers"])
        );

        this.isLoading = false;
      } catch (error) {
        this.isError = error.message;
      }
    },
    closeDialog(data) {
      this.isError = data;
    },
    gamersFilter(data) {
      this.filters = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.gamers {
  margin-bottom: $main-space;
}

.gamers__browseGamers {
  margin-top: $large-space;
}

.gamers__btn {
  margin-bottom: $between-space;
}

.gamers__para {
  margin-top: 8px;
}

.gamers__buttons {
  margin-top: $main-space;
  .gamer__refresh {
    margin-right: $between-space;
  }
}

.gamers__list {
  margin-top: $large-space;
  @include grid(grid);
  @include grid-columns(repeat(auto-fill, minmax(570px, 1fr)));
  gap: $main-space + 6;

  @media (max-width: 1199px) {
    @include grid-columns(repeat(auto-fill, minmax(455px, 1fr)));
  }

  @media (max-width: 575px,) {
    @include grid-columns(repeat(auto-fill, minmax(100%, 1fr)));
  }
}
</style>