<template>
  <button v-if="newPlayer" class="button" @click="startNewGame">
    <img src="/card-matching-game/images/play.svg" alt="start icon" />
    Start Game
  </button>
  <button v-else class="button" @click="startNewGame">
    <img src="/card-matching-game/images/restart.svg" alt="restart icon" />
    Restart Game
  </button>
</template>

<script>
export default {
  name: "NewGameButton",
  props: {
    newPlayer: {
      type: Boolean,
      default: true
    }
    // startGame: {
    //   type:Function
    // },
    // restartGame: {
    //   type:Function
    // }
  },
  setup(props, context) {
    const startNewGame = () => {
      context.emit("start-new-game");
    };

    return {
      startNewGame
    };
  }
};
</script>

<style scoped>
.button {
  font-family: "Titillium Web", sans-serif;
  background: orange;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  font-weight: bold;
  border: 0;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 2px 10px #353432, 0 -2px 10px #6e6e56;
}

.button:hover {
  box-shadow: 0 2px 10px #9d7616, 0 -2px 10px #a97e14;
}

.button img {
  margin-right: 5px;
}
</style>
