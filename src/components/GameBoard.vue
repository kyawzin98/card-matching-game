<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="(card) in cardList"
      :key="`${card.value}-${card.variant}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @select-card="selectCard"
    />
  </transition-group>
  <h2 class="status">{{ status }}</h2>
</template>

<script>
import Card from "@/components/Card";
export default {
  name: "GameBoard",
  props: {
    cardList: {
      type: Array,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  components: {Card},
  setup(props, context){
    const selectCard = (payload) => {
      context.emit('flip-card', payload)
    }

    return {
      selectCard
    }
  }
}
</script>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-gap: 24px;
  justify-content: center;
}

.status {
  font-family: 'Titillium Web', sans-serif;
}
</style>
