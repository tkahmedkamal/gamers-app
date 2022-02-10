<template>
  <div class="spinner">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  @include flex-box();
  @include justify-content(center);
  @include align-items();
  width: 100%;
  padding: 56px;

  .lds-roller {
    @include relative();
    width: 80px;
    height: 80px;
    display: inline-block;

    div {
      animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      @include prefix(transform-origin, 40px 40px, webkit moz o ms);

      &:after {
        content: " ";
        @include absolute();
        width: 7px;
        height: 7px;
        display: block;
        margin: -4px 0 0 -4px;
        border-radius: 50%;
        background-color: $primary-color;
      }

      &:nth-child(1) {
        @include prefix(animation-delay, -0.036s, webkit moz o ms);
      }

      &:nth-child(1):after {
        top: 63px;
        left: 63px;
      }

      &:nth-child(2) {
        @include prefix(animation-delay, -0.072s, webkit moz o ms);
        &:after {
          top: 68px;
          left: 56px;
        }
      }

      &:nth-child(3) {
        @include prefix(animation-delay, -0.108s, webkit moz o ms);
        &:after {
          top: 71px;
          left: 48px;
        }
      }

      &:nth-child(4) {
        @include prefix(animation-delay, -0.144s, webkit moz o ms);
        &:after {
          top: 72px;
          left: 40px;
        }
      }

      &:nth-child(5) {
        @include prefix(animation-delay, -0.18s, webkit moz o ms);
        &:after {
          top: 71px;
          left: 32px;
        }
      }

      &:nth-child(6) {
        @include prefix(animation-delay, -0.216s, webkit moz o ms);
        &:after {
          top: 68px;
          left: 24px;
        }
      }

      &:nth-child(7) {
        @include prefix(animation-delay, -0.252s, webkit moz o ms);
        &:after {
          top: 63px;
          left: 17px;
        }
      }

      &:nth-child(8) {
        @include prefix(animation-delay, -0.288s, webkit moz o ms);
        &:after {
          top: 56px;
          left: 12px;
        }
      }
    }
  }
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>