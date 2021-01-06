<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
   <div class="card-face is-front">
     <img :src="`/images/${value}.png`" :alt="value"/>
     <img v-if="matched" src="images/checkmark.svg" class="icon-checkmark"/>
   </div>
    <div class="card-face is-back">
   </div>
  </div>
</template>

<script>
import {computed} from "vue";
export default {
  name: "Card",
  props: {
    matched: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context){
    //Computed
    const flippedStyles = computed(()=>{
      if (props.visible){
        return 'is-flipped'
      }
    })

    //Methods
    const selectCard = () => {
      context.emit('select-card',{
        position: props.position,
        faceValue: props.value
      })
    }

    return {
      flippedStyles,
      selectCard,
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
  transition: transform 0.5s ease-in;
  transform-style: preserve-3d;
}
.card.is-flipped{
  transform: rotateY(180deg);
}
.card-face{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
}
.card-face.is-front{
  background: url("/images/card-bg.png");
  color: white;
  transform: rotateY(180deg);
}

.card-face.is-back{
  background: url("/images/card-bg-empty.png");
  color: white;
}
.icon-checkmark{
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
