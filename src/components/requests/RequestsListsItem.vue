<template>
  <li class="requests__item">
    <base-card>
      <div class="requests__box">
        <div class="requests__icon">
          <img src="../../assets/images/req-icon.png" alt="message icon" />
        </div>
        <div class="requests__data">
          <h4 class="requests__email alt--para" @click="mailTo">{{ email }}</h4>
          <p class="requests__msg alt--para">{{ message }}</p>
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
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    mailTo() {
      window.location.href = `mailto:${this.email}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.requests__item {
  margin: $main-space 0;
  text-align: left;
}

.requests__box {
  @include flex-box();
  @include align-items();
}

.requests__data {
  margin-left: $between-space;
}

.requests__email {
  color: $primary-color;
  cursor: pointer;
}

.requests__msg {
  margin-top: 4px;
}
</style>