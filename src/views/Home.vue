<template>
  <HeroSection />
  <NewGameButton
    :new-player="newPlayer"
    @start-new-game="startNewGame"
  />
  <GameBoard
    :card-list="cardList"
    :status="status"
    @flip-card="flipCard"
  />
</template>

<script>
// @ is an alias to /src
import { ref, watch} from "vue";
import {launchConfetti} from "@/util/confetti";
import createDeck from "@/features/createDeck";
import createGame from "@/features/createGame"
import halloweenDeck from "@/data/halloweenDeck.json"
import HeroSection from "@/views/partials/HeroSection";
import NewGameButton from "@/components/NewGameButton";
import GameBoard from "@/components/GameBoard";

export default {
  name: "Home",
  components: {
    GameBoard,
    NewGameButton,
    HeroSection,
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

</style>
