<template>
  <button :class="mode" v-if="!link">
    <slot></slot>
  </button>
  <router-link :class="mode" v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @extend .buttonGroup;
  color: $black-color;
  background-color: $primary-color;
  &:hover {
    background-color: $alt-color;
  }
}

.outline {
  @extend .buttonGroup;
  color: $primary-color;
  background-color: transparent;
  border: 1px solid $primary-color;
  &:hover {
    color: $black-color;
    background-color: $primary-color;
  }
}

.buttonGroup {
  min-width: 120px;
  padding: 9px;
  display: inline-block;
  text-transform: capitalize;
  text-align: center;
  @include fonts(18px, 600);
  @include prefix(
    transition,
    (background-color 0.4s ease-in-out, color 0.4s ease-in-out),
    webkit moz o ms
  );
}
</style>