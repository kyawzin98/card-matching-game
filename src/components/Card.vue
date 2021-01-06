<template>
  <div class="card" @click="selectCard">
   <div v-if="visible" class="card-face is-front">
     {{value}} - {{position}} - {{matched}}
   </div>
    <div v-else class="card-face is-back">
     Back
   </div>
  </div>
</template>

<script>
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
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context){
    const selectCard = () => {
      context.emit('select-card',{
        position: props.position,
        faceValue: props.value
      })
    }

    return {
      selectCard
    }
  }
};
</script>

<style scoped>
.card {
  border: 5px solid #ccc;
  position: relative;
}
.card-face{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.card-face.is-front{
  background: crimson;
  color: white;
}

.card-face.is-back{
  background: dodgerblue;
  color: white;
}
</style>
