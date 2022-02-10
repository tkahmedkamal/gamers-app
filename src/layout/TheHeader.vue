<template>
  <header class="header">
    <div class="container">
      <div class="flex">
        <div class="header__brand">
          <router-link to="/">
            <img src="../assets/images/app-logo.png" alt="logo" />
          </router-link>
        </div>
        <nav class="header__nav">
          <ul class="header__links">
            <li class="header__link">
              <router-link to="/gamers" class="header__anchor"
                >Gamers</router-link
              >
            </li>
            <li class="header__link" v-if="isAuth">
              <router-link to="/requests" class="header__anchor"
                >Requests</router-link
              >
            </li>
          </ul>
          <base-button mode="main" v-if="isAuth" @click="logout">
            Logout
          </base-button>
          <base-button link mode="main" to="/user" v-else>Register</base-button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 24px 0;
  .flex {
    @include flex-box();
    @include justify-content(space-between);
    @include align-items();
    .header__nav {
      @include flex-box();
      @include align-items();
      .header__link {
        display: inline-block;
        padding-right: 48px;
        .header__anchor {
          color: $gray-color;
          @include fonts(16px, 600);
          @include prefix(transition, color 0.4s ease-in-out, webkit moz o ms);
          &.router-link-active {
            color: $primary-color;
          }
          &:hover {
            color: $primary-color;
          }
        }
      }
    }
  }
}
</style>