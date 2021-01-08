import {ref, computed} from "vue"
import _ from "lodash";

export default function createGame(deck) {

  const newPlayer = ref(true);

  //Computed
  const remainingPairs = computed(() => {
    const remainingCards = deck.value.filter(card => card.matched === false).length;
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
  const restartGame = () => {
    deck.value = _.shuffle(deck.value);
    deck.value = deck.value.map((card, index) => {
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

  return {
    newPlayer,
    remainingPairs,
    status,
    startGame,
    restartGame,
  }
}
