<template>
  <h1 class="sr-only">Peek -a- Vue</h1>
  <img class="title" src="/images/peek-a-vue-title.png" alt="Peek-a-Vue">
  <section class="description">
    <p>Welcome to Peek-a-Vue</p>
    <p>A card matching game powered by Vue.js 3</p>
  </section>
</template>

<script>
export default {
name: "HeroSection"
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.title {
  padding-bottom: 30px;
}

.shuffle-card-move {
  transition: transfrom 0.8s ease-in;
}

.description, .status {
  font-family: 'Titillium Web', sans-serif;
}

.description p {
  margin: 0;
  font-size: 1.2rem;
}

.description p:last-child {
  margin-bottom: 30px;
}
</style>
