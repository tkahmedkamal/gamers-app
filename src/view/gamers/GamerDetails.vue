<template>
  <div class="profile">
    <div class="container">
      <div class="app--flex">
        <div class="profile__avatar">
          <img
            src="../../assets/images/male.png"
            alt="avatar"
            class="profile__img"
            v-if="gamer.gender === 'male'"
          />
          <img
            src="../../assets/images/female.png"
            alt="avatar"
            class="profile__img"
            v-else
          />
        </div>
        <div class="profile__info">
          <h2 class="profile__name main--title">{{ fullName }}</h2>
          <div class="profile__badges">
            <ul class="profile__list">
              <li class="profile__item" v-for="game in gamer.games" :key="game">
                <base-badge :mode="game">
                  {{ game }}
                </base-badge>
              </li>
            </ul>
          </div>
          <p class="profile__bio alt--para">{{ gamer.bio }}</p>
          <base-button link mode="main" :to="contactLink">
            contact us
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["gamerId"],
  data() {
    return {
      gamer: null,
    };
  },
  computed: {
    fullName() {
      return `${this.gamer.firstName} ${this.gamer.lastName}`;
    },
    contactLink() {
      return `${this.$route.params.gamerId}/contact/`;
    },
  },

  created() {
    this.gamer =
      this.$store.getters["gamers/gamers"].find(
        (gamer) => gamer.id === this.gamerId
      ) ||
      JSON.parse(localStorage.getItem("allGamers")).find(
        (gamer) => gamer.id === this.gamerId
      );
  },
};
</script>

<style lang="scss" scoped>
.profile {
  padding: $large-space 0;
  text-align: center;
}

.profile__avatar {
  width: 203px;
  height: 203px;
  border-radius: 50%;
  overflow: hidden;
}

.profile__name {
  margin-top: $main-space;
}

.profile__img {
  max-width: 100%;
  height: 100%;
}

.profile__badges {
  margin: $main-space 0 $main-space 0;
}

.profile__item {
  display: inline-block;
}

.profile__bio {
  width: 750px;
  margin-bottom: $main-space;

  @media (max-width: 767px) {
    width: 100%;
  }
}
</style>