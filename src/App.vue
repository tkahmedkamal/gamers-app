<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./layout/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  computed: {
    autoLogout() {
      return this.$store.getters.redirectRoute;
    },
  },
  watch: {
    autoLogout(currVal, oldVal) {
      if (currVal && currVal !== oldVal) {
        this.$router.replace("/");
      }
    },
  },
  created() {
    return this.$store.dispatch("autoLogin");
  },
};
</script>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  @include prefix(transform, translateY(-30px), webkit moz o ms);
}
.route-leave-to {
  opacity: 0;
  @include prefix(transform, translateY(30px), webkit moz o ms);
}
.route-enter-active {
  @include prefix(
    transition,
    (opacity 0.4s ease-out, transform 0.4s ease-out),
    webkit moz o ms
  );
}
.route-leave-active {
  @include prefix(
    transition,
    (opacity 0.4s ease-in, transform 0.4s ease-out),
    webkit moz o ms
  );
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  @include prefix(transform, translateY(0), webkit moz o ms);
}
</style>