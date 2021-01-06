<template>
  <h1>Peek a Vue</h1>
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      :matched="card.matched"
      @select-card="flipCard"
    />
  </section>
  <h2>{{ status }}</h2>
  <button @click="shuffleCards">Shuffle Cards</button>
</template>

<script>
// @ is an alias to /src
import _ from "lodash";
import {computed, ref, watch} from "vue";
import Card from "@/components/Card";

export default {
  name: "Home",
  components: {
    Card
  },
  setup() {
    //Data
    const cardList = ref([]);
    const userSelection = ref([]);

    for (let i = 0; i < 16; i++) {
      cardList.value.push({
        value: i === 8 ? 0 : i > 7 ? i - 8 : i,
        visible: true,
        position: i,
        matched: false
      });
    }

    //Computed
    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(card => card.matched === false).length;
      return remainingCards / 2;
    })

    const status = computed(()=>{
      if (remainingPairs.value === 0){
        return "Player Win!"
      }else {
        return `Remaining Pairs ${remainingPairs.value}`
      }
    });

    //Methods
    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        userSelection.value[1] = payload;
      } else {
        userSelection.value[0] = payload;
      }
    }

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value);
    }

    //Watchers
    watch(userSelection, (currentValue) => {
      if (currentValue.length === 2){
        // console.log(currentValue[0]);
        const cardOne = currentValue[0];
        const cardTwo = currentValue[1];

        if (cardOne.faceValue === cardTwo.faceValue){
          status.value = 'Matched!';
          cardList.value[cardOne.position].matched = true;
          cardList.value[cardTwo.position].matched = true;
        }else {
          status.value = 'Mismatched!';
          cardList.value[cardOne.position].visible = false;
          cardList.value[cardTwo.position].visible = false;
        }

        userSelection.value.length = 0;
      }
    }, { deep: true})

    return {
      cardList,
      userSelection,
      status,
      remainingPairs,
      flipCard,
      shuffleCards
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
