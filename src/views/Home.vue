<template>
  <h1 class="sr-only">Peek -a- Vue</h1>
  <img class="title" src="/images/peek-a-vue-title.png" alt="Peek-a-Vue">
  <section class="description">
    <p>Welcome to Peek-a-Vue</p>
    <p>A card matching game powered by Vue.js 3</p>
  </section>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="(card) in cardList"
      :key="`${card.value}-${card.variant}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </transition-group>
  <h2 class="status">{{ status }}</h2>
  <button v-if="newPlayer" class="button" @click="startGame">
    <img src="/images/play.svg" alt="start icon"/>
    Start Game
  </button>
  <button v-else class="button" @click="restartGame">
    <img src="/images/restart.svg" alt="restart icon"/>
    Restart Game
  </button>
</template>

<script>
// @ is an alias to /src
import _ from "lodash";
import {computed, ref, watch} from "vue";
import {launchConfetti} from "@/util/confetti";
import createDeck from "@/features/createDeck";
import Card from "@/components/Card";

export default {
  name: "Home",
  components: {
    Card
  },
  setup() {
    //Data
    const {cardList} = createDeck();
    const userSelection = ref([]);
    const newPlayer = ref(true);

    //Computed
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(card => card.matched === false).length;
      return remainingCards / 2;
    })

    const status = computed(() => {
      if (remainingPairs.value === 0) {
        return "Player Win!"
      } else {
        return `Remaining Pairs ${remainingPairs.value}`
      }
    });

    //Methods
    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if ((payload.position !== userSelection.value[0].position)
          && (payload.value !== userSelection.value[0].faceValue)) {
          userSelection.value[1] = payload;
        }
      } else {
        userSelection.value[0] = payload;
      }
    }

    const restartGame = () => {
      cardList.value = _.shuffle(cardList.value);
      cardList.value = cardList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          position: index,
          visible: false,
        }
      })
    }

    const startGame = () => {
      newPlayer.value = false;
      restartGame();
    }

    //Watchers
    watch(userSelection, (currentValue) => {
      if (currentValue.length === 2) {
        // console.log(currentValue[0]);
        const cardOne = currentValue[0];
        const cardTwo = currentValue[1];

        if (cardOne.faceValue === cardTwo.faceValue) {
          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
        } else {
          setTimeout(() => {
            cardList.value[cardOne.position].visible = false;
            cardList.value[cardTwo.position].visible = false;
          }, 2000)
        }

        userSelection.value.length = 0;
      }
    }, {deep: true})

    watch(remainingPairs, (currentValue) => {
      if (currentValue === 0){
        launchConfetti();
      }
    })
    return {
      cardList,
      userSelection,
      status,
      remainingPairs,
      newPlayer,
      flipCard,
      startGame,
      restartGame
    };
  }
};
</script>

<style>
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-gap: 24px;
  justify-content: center;
}

.button{
  font-family: 'Titillium Web', sans-serif;
  background: orange;
  color: white;
  padding: .75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  border: 0;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 2px 10px #353432,0 -2px 10px #6e6e56;
}
.button:hover{
  box-shadow: 0 2px 10px #9d7616,0 -2px 10px #a97e14;
}
.button img {
  margin-right: 5px;
}
.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

.title{
  padding-bottom: 30px;
}

.shuffle-card-move{
  transition: transfrom 0.8s ease-in;
}
.description, .status{
  font-family: 'Titillium Web', sans-serif;
}
.description p{
  margin: 0;
  font-size: 1.2rem;
}
.description p:last-child{
  margin-bottom: 30px;
}


</style>
