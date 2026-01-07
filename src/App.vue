<template>
  <div class="container">
    <h1 class="title">Tic Tac Toe</h1>
    <GameBoard />
  </div>
</template>
<script setup>
import GameBoard from "@/components/GameBoard.vue"
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
}
</style>
