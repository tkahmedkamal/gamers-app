<template>
  <teleport to="body">
    <div class="overlay" v-if="show" @click="close"></div>
    <transition name="dialog">
      <dialog open class="dialog" v-if="show">
        <h2 class="dialog__title">something is wrong</h2>
        <div class="dialog__body">
          <div class="dialog__content">
            <p class="dialog__msg main--para">
              <slot></slot>
            </p>
          </div>
          <div class="dialog__footer">
            <base-button mode="outline" @click="close">close</base-button>
          </div>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: ["close:dialog"],
  props: {
    show: {
      type: String,
      required: false,
    },
  },
  methods: {
    close() {
      this.$emit("close:dialog");
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  @include fixed($top: 0, $left: 0);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.582);
  cursor: pointer;
}

.dialog {
  @include fixed($top: 20vh);
  width: 500px;
  padding: 0;
  background-color: $bg-color;
}

.dialog__title {
  padding: 20px;
  color: $error-color;
  background-color: rgb(218 2 83 / 25%);
  text-transform: capitalize;
}

.dialog__body {
  padding: 20px;
}

.dialog__footer {
  margin-top: $main-space + 10;
  @include flex-box();
  @include justify-content(end);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  @include prefix(transform, scale(0.5), webkit moz o ms);
}

.dialog-enter-active {
  @include prefix(
    transition,
    (transform 0.4s ease-out, opacity 0.4s ease-out),
    webkit moz o ms
  );
}

.dialog-leave-active {
  @include prefix(
    transition,
    (transform 0.4s ease-in, opacity 0.4s ease-out),
    webkit moz o ms
  );
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  @include prefix(transform, scale(1), webkit moz o ms);
}
</style>