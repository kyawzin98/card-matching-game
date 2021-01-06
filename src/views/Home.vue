<template>
  <h1>Peek a Vue</h1>
  <section class="game-board">
    <Card v-for="(card, index) in cardList" :key="`card-${index}`" :value="card" />
  </section>
</template>

<script>
// @ is an alias to /src

import Card from "@/components/Card";
export default {
  name: "Home",
  components: {
    Card
  },
  setup() {
    const cardList = [];

    for (let i = 0; i < 16; i++) {
      cardList.push(i);
    }

    return {
      cardList
    };
  }
};
</script>

<style>
.card {
  border: 5px solid #ccc;
}

.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-gap: 30px;
  justify-content: center;
}
</style>
