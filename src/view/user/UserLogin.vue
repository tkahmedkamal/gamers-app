<template>
  <section class="login">
    <base-dialog :show="isError" @close:dialog="closeDialog">
      {{ isError }}
    </base-dialog>
    <div class="container">
      <div class="login__box">
        <div class="login__data">
          <h2 class="login__title main--title">Login</h2>
          <div class="signup__spinner" v-if="isLoading">
            <base-spinner></base-spinner>
          </div>
          <form
            class="login__form app--form"
            @submit.prevent="formSubmit"
            v-else-if="showForm"
          >
            <div class="app--form-control">
              <input
                type="email"
                :class="['app--input', emailHasValue]"
                v-model="email.val"
                @input="emailValidation"
              />
              <label class="app--label">email</label>
              <p class="app--error main--error" v-if="!email.isValid">
                The email is invalid or does not exist.
              </p>
            </div>
            <div class="app--form-control">
              <input
                type="password"
                :class="['app--input', passwordHasValue]"
                v-model="password.val"
                @input="passwordValidation"
              />
              <label class="app--label">password</label>
              <p class="app--error main--error" v-if="!password.isValid">
                Enter a valid password
              </p>
            </div>
            <base-button class="login__btn" mode="main">login</base-button>
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
      isLoading: false,
      showForm: true,
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
    async formSubmit() {
      try {
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

        this.isLoading = true;
        this.showForm = false;
        await this.$store.dispatch("login", loginData);
        this.isLoading = false;

        const redirect = this.$route.query.redirect
          ? this.$route.query.redirect
          : "/";
        this.$router.replace(redirect);
      } catch (error) {
        if (error.message === "Failed to fetch") {
          this.isError =
            "There is a bug we are working on, please try again later.";
        } else {
          this.isError = error.message;
        }
        this.showForm = true;
      }
    },
    closeDialog(data) {
      this.isError = data;
      this.isLoading = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.login {
  margin-top: $large-space;
}

.login__box {
  max-width: 450px;
  margin: auto;
  text-align: center;

  @media (max-width: 767px) {
    max-width: 100%;
  }
}

.login__data {
  @include flex-basis(47%);
}

.login__form {
  margin-top: $main-space;
}

.login__btn {
  width: 100%;
}
</style>