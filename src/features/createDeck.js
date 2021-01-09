import { ref } from "vue";
// import halloweenDeck from "@/data/halloweenDeck.json"
const cardList = ref([]);

// const cardItems = halloweenDeck;

const initDeck = deckData => {
  deckData.forEach(item => {
    cardList.value.push({
      value: item,
      visible: false,
      variant: 1,
      position: null,
      matched: false
    });
    cardList.value.push({
      value: item,
      visible: true,
      variant: 2,
      position: null,
      matched: false
    });
  });
};

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, index) => {
    return {
      ...card,
      position: index
    };
  });
};

// for (let i = 0; i < 16; i++) {
//   cardList.value.push({
//     // My equation for same value = 8 ? 0 : i > 7 ? i - 8 : i
//     value: i === 8,
//     visible: false,
//     position: i,
//     matched: false
//   });
// }

export default function createDeck(deckData) {
  initDeck(deckData);
  updateCardPosition();

  return {
    cardList
  };
}
