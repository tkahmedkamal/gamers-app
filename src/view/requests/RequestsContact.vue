<template>
  <section class="contact">
    <base-dialog :show="isError" @close:dialog="closeDialog">
      {{ isError }}
    </base-dialog>
    <div class="container">
      <div class="contact__box">
        <div class="contact__data">
          <h2 class="contact__title main--title">Connect With The Gamer</h2>
          <form class="contact__form app--form" @submit.prevent="formSubmit">
            <div class="app--form-control">
              <input
                type="text"
                :class="['app--input', emailHasValue]"
                v-model.trim="email.val"
                @input="emailValidation"
              />
              <label class="app--label">email</label>
              <p class="app--error main--error" v-if="!email.isValid">
                Invalid email
              </p>
            </div>
            <div class="app--form-control">
              <textarea
                :class="['app--input', msgHasValue]"
                rows="3"
                v-model.trim="msg.val"
                @input="msgValidation"
              ></textarea>
              <label class="app--label">message</label>
              <p class="app--error main--error" v-if="!msg.isValid">
                The message must be greater than two letters.
              </p>
            </div>
            <base-button class="contact__btn" mode="main">send</base-button>
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
      msg: {
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
    msgHasValue() {
      return { "input--value": this.msg.hasValue };
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
    msgValidation() {
      this.msg.isValid = true;

      if (this.msg.val.length < 3) {
        this.msg.isValid = false;
      }

      this.msg.val !== ""
        ? (this.msg.hasValue = true)
        : (this.msg.hasValue = false);
    },
    async formSubmit() {
      try {
        this.emailValidation();
        this.msgValidation();

        const { val: emailVal, isValid: emailIsValid } = this.email;
        const { val: msgVal, isValid: msgIsValid } = this.msg;

        if (!emailIsValid || !msgIsValid) {
          return;
        }

        const requestData = {
          email: emailVal,
          message: msgVal,
          userId: this.$route.params.id,
        };

        await this.$store.dispatch("requests/requests", requestData);
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
.contact {
  margin-top: $large-space;
}

.contact__box {
  max-width: 450px;
  margin: auto;
  text-align: center;

  @media (max-width: 767px) {
    max-width: 100%;
  }
}

.contact__form {
  margin-top: $main-space;
}

.contact__btn {
  width: 100%;
}
</style>