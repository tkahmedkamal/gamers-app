<template>
  <div class="gamer__filter">
    <h2 class="gamer__title main--title">Gamers Filter</h2>
    <base-card padding="large" theWidth="inline-block">
      <form class="gamer__form">
        <div class="gamer__box">
          <label class="gamer__label">
            <input
              type="checkbox"
              class="gamer__input"
              value="fifa22"
              checked
              @change="filter"
            />
            <span class="gamer__gameName">fifa22</span>
          </label>
        </div>
        <div class="gamer__box">
          <label class="gamer__label">
            <input
              type="checkbox"
              class="gamer__input"
              value="pubg"
              checked
              @change="filter"
            />
            <span class="gamer__gameName">pubg</span>
          </label>
        </div>
        <div class="gamer__box">
          <label class="gamer__label">
            <input
              type="checkbox"
              class="gamer__input"
              value="batman"
              checked
              @change="filter"
            />
            <span class="gamer__gameName">batman</span>
          </label>
        </div>
        <div class="gamer__box">
          <label class="gamer__label">
            <input
              type="checkbox"
              class="gamer__input"
              value="tekken7"
              checked
              @change="filter"
            />
            <span class="gamer__gameName">tekken7</span>
          </label>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  emits: ["change:filter"],

  data() {
    return {
      filters: {
        fifa22: true,
        pubg: true,
        batman: true,
        tekken7: true,
      },
    };
  },
  methods: {
    filter(event) {
      const input = event.target.value;
      const active = event.target.checked;

      const setFilters = {
        ...this.filters,
        [input]: active,
      };

      this.filters = setFilters;

      this.$emit("change:filter", setFilters);
    },
  },
};
</script>

<style lang="scss" scoped>
.gamer__filter {
  margin-top: $large-space;
}

.gamer__title {
  margin-bottom: $main-space;
}

.gamer__box {
  margin-right: $between-space;
  display: inline-block;

  @media (max-width: 480px) {
    margin-bottom: $between-space;
  }
}

.gamer__gameName {
  width: 120px;
  padding: $main-space - 14;
  display: inline-block;
  color: $bg-color;
  background-color: $gray-color;
  text-align: center;
  text-transform: capitalize;
  border-radius: 3px;
  cursor: pointer;
  @include fonts(18px, 600);
  @include prefix(
    transition,
    (background-color 0.4s ease-in-out, color 0.4s ease-in-out),
    webkit moz o ms
  );
}

.gamer__input {
  display: none;
  &:checked ~ .gamer__gameName {
    color: $black-color;
    background-color: $primary-color;
  }
}
</style>