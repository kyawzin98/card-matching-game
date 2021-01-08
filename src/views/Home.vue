<template>
  <HeroSection />
  <NewGameButton
    :new-player="newPlayer"
    @start-new-game="startNewGame"
  />
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
</template>

<script>
// @ is an alias to /src
import { ref, watch} from "vue";
import {launchConfetti} from "@/util/confetti";
import createDeck from "@/features/createDeck";
import createGame from "@/features/createGame"
import Card from "@/components/Card";
import halloweenDeck from "@/data/halloweenDeck.json"
import HeroSection from "@/views/partials/HeroSection";
import NewGameButton from "@/components/NewGameButton";

export default {
  name: "Home",
  components: {
    NewGameButton,
    HeroSection,
    Card
  },
  setup() {
    //Data
    const {cardList} = createDeck(halloweenDeck);
    const userSelection = ref([]);
    const {
      newPlayer,
      startGame,
      restartGame,
      remainingPairs,
      status
    } = createGame(cardList)

    //Methods
    const startNewGame = () => {
      if (newPlayer){
        startGame()
      }else {
        restartGame()
      }
    }

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
      if (currentValue === 0) {
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
      startNewGame
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

.status {
  font-family: 'Titillium Web', sans-serif;
}

</style>
