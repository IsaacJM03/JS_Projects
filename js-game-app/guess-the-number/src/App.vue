<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <div id="app">
    <GameView />
  </div>
</template>

<script>
import GameView from '@/components/GameView.vue'

export default {
  components: {
    GameView
  }
}
</script>

<style>

</style>
