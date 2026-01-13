<template>
  <div class="container">
    <h1 v-if="showIntro" class="title">Tic Tac Toe</h1>
    <GameBoard ref="gameRef" @game-started="showIntro = false" @game-ended="showIntro = true" />
    <div v-if="showIntro" class="reset-container">
      <button @click="onReset" class="reset-btn">Reset</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import GameBoard from "@/components/GameBoard.vue"

const gameRef = ref(null)
const showIntro = ref(true);

function onReset() {
  gameRef.value.resetGame();
  gameRef.value.resetPhase();
  gameRef.value.resetRound();
  showIntro.value = true;
}

</script>

<style lang="css" >
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: black;
  color: #fff;
  min-height: 100vh;
  padding: 100px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.title {
  font-size: 32px;
  color: greenyellow;
  position: relative;
  z-index: 5;
}

.reset-btn {
  background-color: greenyellow;
  color: #000;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  position: relative;
  z-index: 5;
}

.reset-btn:hover {
  background-color: #80c813;
  /* color: #fff; */
}
</style>
