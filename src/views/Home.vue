<template>
  <h1>Peek a Vue</h1>
  <section class="game-board">
    <Card
        v-for="(card, index) in cardList"
        :key="`card-${index}`"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
    />
  </section>
</template>

<script>
// @ is an alias to /src
import {ref} from "vue"
import Card from "@/components/Card";
export default {
  name: "Home",
  components: {
    Card
  },
  setup() {
    const cardList = ref([]);

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i,
        visible: false,
        position: i
      });
    }

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;
    }

    return {
      cardList,
      flipCard
    };
  }
};
</script>

<style>
.game-board {
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-gap: 30px;
  justify-content: center;
}
</style>
