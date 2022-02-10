<template>
  <section class="user">
    <div class="container">
      <div class="user__box">
        <div class="user__data">
          <base-card padding="large">
            <h2 class="user__title main--title">Log in to the app</h2>
            <base-button link to="/login" mode="outline">login</base-button>
          </base-card>
        </div>
        <div class="user__data">
          <base-card padding="large">
            <h2 class="user__title main--title">Register a new account</h2>
            <base-button link to="/signup" mode="outline">signup</base-button>
          </base-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: "",
        isValid: true,
        hasValue: false,
      },
      password: {
        val: "",
        isValid: true,
        hasValue: false,
      },
      isError: "",
    };
  },
  computed: {
    emailHasValue() {
      return { "input--value": this.email.hasValue };
    },
    passwordHasValue() {
      return { "input--value": this.password.hasValue };
    },
  },
  methods: {
    emailValidation() {
      this.email.isValid = true;

      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.email.isValid = false;
      }

      this.email.val !== ""
        ? (this.email.hasValue = true)
        : (this.email.hasValue = false);
    },
    passwordValidation() {
      this.password.isValid = true;

      if (this.password.val.length < 3) {
        this.password.isValid = false;
      }

      this.password.val !== ""
        ? (this.password.hasValue = true)
        : (this.password.hasValue = false);
    },
    formSubmit() {
      this.emailValidation();
      this.passwordValidation();

      const { val: emailVal, isValid: emailIsValid } = this.email;
      const { val: passVal, isValid: passIsValid } = this.password;

      if (!emailIsValid || !passIsValid) {
        return;
      }

      const loginData = {
        email: emailVal,
        password: passVal,
      };

      console.log(loginData);
      // this.$router.replace("/");
    },
  },
};
</script>


<style lang="scss" scoped>
.user {
  margin-top: $large-space;
}

.user__box {
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

.user__data {
  @include flex-basis(47%);
  h2 {
    margin: 0;
    text-transform: inherit;
    margin-bottom: $main-space;
  }
}
</style>