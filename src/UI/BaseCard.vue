<template>
  <div :class="['base-card', padding, theWidth]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      required: false,
      default: "small",
    },
    theWidth: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.base-card {
  background-color: $bg-color;
  box-shadow: 0 8px 5px rgb(18 18 18 / 42%);
  border-radius: 3px;
  &.large {
    padding: 32px;
  }
  &.small {
    padding: 24px;
  }
  &.inline-block {
    display: inline-block;
  }
}
</style>