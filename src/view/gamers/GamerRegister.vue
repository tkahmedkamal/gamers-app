<template>
  <section class="register">
    <base-dialog :show="isError" @close:dialog="closeDialog">
      {{ isError }}
    </base-dialog>
    <div class="container">
      <div class="register__box">
        <div class="register__data">
          <h2 class="register__title main--title">register as gamer</h2>
          <form class="register__form app--form" @submit.prevent="formSubmit">
            <div class="app--form-control">
              <input
                type="text"
                :class="['app--input', firstNameHasValue]"
                v-model.trim="firstName.val"
                @input="firstNameValidate"
              />
              <label class="app--label">first name</label>
              <p class="app--error main--error" v-if="!firstName.isValid">
                First name must be greater than two letters
              </p>
            </div>

            <div class="app--form-control">
              <input
                type="text"
                :class="['app--input', lastNameHasValue]"
                v-model.trim="lastName.val"
                @input="lastNameValidate"
              />
              <label class="app--label">last name</label>
              <p class="app--error main--error" v-if="!lastName.isValid">
                Last name must be greater than two letters
              </p>
            </div>

            <div class="app--form-control">
              <textarea
                :class="['app--input', bioHasValue]"
                rows="2"
                v-model.trim="bio.val"
                @input="bioValidate"
              ></textarea>
              <label class="app--label">bio</label>
              <p class="app--error main--error" v-if="!bio.isValid">
                Bio must be greater than 4 letters
              </p>
            </div>

            <div class="app--form-control">
              <div class="register__flex">
                <label for="male" class="register__label">
                  <input
                    type="radio"
                    id="male"
                    class="register__checkInput"
                    value="male"
                    v-model="gender.val"
                    @change="genderValidate"
                  />
                  <span class="register__checkbox">male</span>
                </label>
                <label for="female" class="register__label">
                  <input
                    type="radio"
                    id="female"
                    class="register__checkInput"
                    value="female"
                    v-model="gender.val"
                    @change="genderValidate"
                  />
                  <span class="register__checkbox">female</span>
                </label>
              </div>
              <p class="app--error main--error" v-if="!gender.isValid">
                Gender must be selected
              </p>
            </div>

            <div class="app--form-control">
              <label class="register__main-label alt--para"
                >choose the gamers to play</label
              >
              <div class="register__flex">
                <label for="fifa22" class="register__label">
                  <input
                    type="checkbox"
                    id="fifa22"
                    class="register__checkInput"
                    value="fifa22"
                    v-model="games.val"
                    @change="gamesValidate"
                  />
                  <span class="register__checkbox">fifa22</span>
                </label>
                <label for="pubg" class="register__label">
                  <input
                    type="checkbox"
                    id="pubg"
                    class="register__checkInput"
                    value="pubg"
                    v-model="games.val"
                    @change="gamesValidate"
                  />
                  <span class="register__checkbox">pubg</span>
                </label>
                <label for="batman" class="register__label">
                  <input
                    type="checkbox"
                    id="batman"
                    class="register__checkInput"
                    value="batman"
                    v-model="games.val"
                    @change="gamesValidate"
                  />
                  <span class="register__checkbox">batman</span>
                </label>
                <label for="tekken7" class="register__label">
                  <input
                    type="checkbox"
                    id="tekken7"
                    class="register__checkInput"
                    value="tekken7"
                    v-model="games.val"
                    @change="gamesValidate"
                  />
                  <span class="register__checkbox">tekken7</span>
                </label>
              </div>
              <p class="app--error main--error" v-if="!games.isValid">
                At least one game must be selected
              </p>
            </div>

            <base-button class="register__btn" mode="main">send</base-button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
        hasValue: false,
      },
      lastName: {
        val: "",
        isValid: true,
        hasValue: false,
      },
      bio: {
        val: "",
        isValid: true,
        hasValue: false,
      },
      gender: {
        val: "",
        isValid: true,
      },
      games: {
        val: [],
        isValid: true,
      },
      isError: "",
    };
  },
  computed: {
    firstNameHasValue() {
      return { "input--value": this.firstName.hasValue };
    },
    lastNameHasValue() {
      return { "input--value": this.lastName.hasValue };
    },
    bioHasValue() {
      return { "input--value": this.bio.hasValue };
    },
  },
  methods: {
    firstNameValidate() {
      this.firstName.isValid = true;

      if (this.firstName.val.length < 3) {
        this.firstName.isValid = false;
      }

      this.firstName.val !== ""
        ? (this.firstName.hasValue = true)
        : (this.firstName.hasValue = false);
    },
    lastNameValidate() {
      this.lastName.isValid = true;

      if (this.lastName.val.length < 3) {
        this.lastName.isValid = false;
      }

      this.lastName.val !== ""
        ? (this.lastName.hasValue = true)
        : (this.lastName.hasValue = false);
    },
    bioValidate() {
      this.bio.isValid = true;

      if (this.bio.val.length < 5) {
        this.bio.isValid = false;
      }

      this.bio.val !== ""
        ? (this.bio.hasValue = true)
        : (this.bio.hasValue = false);
    },
    genderValidate() {
      this.gender.isValid = true;

      if (this.gender.val === "") {
        this.gender.isValid = false;
      }
    },
    gamesValidate() {
      this.games.isValid = true;

      if (this.games.val.length === 0) {
        this.games.isValid = false;
      }
    },
    async formSubmit() {
      try {
        this.firstNameValidate();
        this.lastNameValidate();
        this.bioValidate();
        this.genderValidate();
        this.gamesValidate();

        if (
          !this.firstName.isValid ||
          !this.lastName.isValid ||
          !this.bio.isValid ||
          !this.gender.isValid ||
          !this.games.isValid
        ) {
          return;
        }

        const gamerData = {
          firstName: this.firstName.val,
          lastName: this.lastName.val,
          gender: this.gender.val,
          bio: this.bio.val,
          games: this.games.val,
        };

        await this.$store.dispatch("gamers/registerGamer", gamerData);

        this.$router.replace("/");
      } catch (error) {
        this.isError = error.message;
      }
    },
    closeDialog(data) {
      this.isError = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  margin-top: $large-space;
}

.register__box {
  max-width: 450px;
  margin: auto;
  text-align: center;

  @media (max-width: 767px) {
    max-width: 100%;
  }
}

.register__form {
  margin-top: $main-space;
}

.register__flex {
  @include flex-box();
  @include justify-content(space-between);
  @include flex-wrap(wrap);
}

.register__main-label {
  display: block;
  margin-bottom: $between-space;
  text-align: left;
  text-transform: capitalize;
}

.register__label {
  display: block;
  margin-bottom: $between-space;
  @include flex-basis(48%);
}

.register__checkInput {
  display: none;
}

.register__checkInput:checked {
  ~ .register__checkbox {
    background-color: hsla(29, 70%, 76%, 0.15);
    border-bottom: 2px solid $primary-color;
  }
}

.register__checkbox {
  display: block;
  padding: 19px;
  background-color: $bg-color;
  border-bottom: 2px solid $gray-color;
  text-transform: capitalize;
  @include prefix(
    transition,
    (background-color 0.4s ease-in-out, border-bottom 0.4s ease-in-out),
    webkit moz o ms
  );
}

.register__btn {
  width: 100%;
}
</style>