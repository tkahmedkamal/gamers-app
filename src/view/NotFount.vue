<template>
  <section class="notFount">
    <div class="container">
      <h2 class="notFount-msg">Sorry, the page was not found</h2>
      <base-button mode="main" link to="/">go to home</base-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.notFount {
  margin-top: $large-space;
  text-align: center;
}

.notFount-msg {
  @include fonts(24px, 600);
  margin-bottom: $main-space;
}
</style>