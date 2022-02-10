<template>
  <li class="gamers__item">
    <base-card>
      <div class="gamers__avatar">
        <img src="../../assets/images/male.png" alt="male" v-if="genderType" />
        <img src="../../assets/images/female.png" alt="female" v-else />
      </div>
      <div class="gamers__body">
        <h3 class="gamers__fullName alt--title">{{ fullName }}</h3>
        <p class="gamers__bio alt--para">{{ bio }}</p>
        <div class="flex">
          <ul class="gamers__badges">
            <li class="gamers__badge" v-for="game in games" :key="game">
              <base-badge :mode="game">{{ game }}</base-badge>
            </li>
          </ul>
          <base-button class="gamers__btn" link mode="outline" :to="profileLink"
            >Profile</base-button
          >
        </div>
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
      default: "Male",
    },
    bio: {
      type: String,
      required: false,
    },
    games: {
      type: Object,
      required: true,
    },
  },

  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    profileLink() {
      return `/gamers/${this.id}`;
    },
    genderType() {
      return this.gender.toLowerCase() === "male";
    },
  },
};
</script>

<style lang="scss" scoped>
.gamers__avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.gamers__fullName {
  margin-top: $main-space - 4;
}

.gamers__bio {
  margin-top: $main-space - 14;
}

.flex {
  margin-top: $main-space;
  @include flex-box();
  @include justify-content(space-between);
  @include align-items();

  @media (max-width: 480px) {
    display: block;
  }
}

.gamers__badge {
  display: inline-block;
}

.gamers__btn {
  @media (max-width: 480px) {
    margin-top: $between-space;
  }
}
</style>