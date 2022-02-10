<template>
  <div :class="['badge', badgeMode]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },
  computed: {
    badgeMode() {
      return this.mode.toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  width: 120px;
  padding: 10px;
  text-align: center;
  margin-right: $between-space;
  border-radius: 3px;
  text-transform: capitalize;
  @include fonts(18px, 600);

  @media (max-width: 480px,) {
    margin-bottom: $between-space;
  }

  &.fifa22 {
    color: $primary-color;
    background-color: hsla(29, 70%, 76%, 0.15);
  }
  &.pubg {
    color: #02dac5;
    background-color: hsla(174, 98%, 43%, 0.15);
  }
  &.batman {
    color: #da0292;
    background-color: hsla(320, 98%, 43%, 0.15);
  }
  &.tekken7 {
    color: #6cceac;
    background-color: hsla(159, 50%, 62%, 0.15);
  }
}
</style>