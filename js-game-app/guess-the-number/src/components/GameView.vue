<template>
  <!-- <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"></head> -->
  <div class="game">
    <div id="particles-js">
      <img src="@/assets/9648.png" alt="Game Image">
      <h1 class="game-title">Guess The Number</h1>
      <br />
      <!-- <span class="timer">You have {{ formatTime(timeRemaining) }} left</span> -->
      <p v-if="message" class="game-message">{{ message }}</p>
      <div class="game-container">
          <p>Level: {{ level }}</p>
          <p>Tries: {{ tries }}/{{ maxTries }}</p>
      </div>
      <form @submit.prevent="checkGuess">
        <input type="number" v-model="guess" required autofocus>
        <button type="submit">Submit</button>
      </form>
      <button @click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script>
import 'particles.js/particles'
const particlesJS = window.particlesJS

export default {
  data () {
    return {
      targetNumber: null,
      guess: null,
      message: null,
      score: 0,
      level: 1,
      tries: 0,
      maxTries: 10 // Adjust the maximum number of tries based on the level      timeLimit: 15, // Set the time limit for each level (in seconds)
    //   timeLimit: 30, // Set the time limit for each level (in seconds)
    //   timeRemaining: this.timeLimit // Initialize timeRemaining with the timeLimit
    }
  },
  mounted () {
    particlesJS.load('particles-js', 'particles-config.json')
    this.startGame()
  },
  methods: {
    startGame () {
      this.targetNumber = Math.floor(Math.random() * 10) + 1
      this.level++ // Increment the level
      this.tries = 0 // Reset the number of tries
    //   this.timeRemaining = this.timeLimit // Reset the time remaining
    //   this.startTimer() // Start the timer for the new level
    },
    checkGuess () {
      this.score++
      if (this.tries >= this.maxTries) {
        this.message = `You have reached the maximum number of tries (${this.maxTries}).`
        return // Exit the method if maximum tries are reached
      }
      if (this.guess === this.targetNumber) {
        this.message = 'Congratulations! That is the right number.'
        this.startGame() // Go to the next level when the guess is correct

        // Save the score to local storage
        const playerScore = {
          player: 'Player Name', // Replace with the actual player name
          score: this.score
        }
        const scores = JSON.parse(localStorage.getItem('scores')) || []
        scores.push(playerScore)
        localStorage.setItem('scores', JSON.stringify(scores))
      } else if (this.guess < this.targetNumber) {
        this.message = 'Too low! Try Again.'
      } else {
        this.message = 'Too high! Try Again.'
      }
      this.tries++ // Increment the number of tries
    },
    // startTimer () {
    //   const timer = setInterval(() => {
    //     this.timeRemaining--
    //     if (this.timeRemaining === 0) {
    //       clearInterval(timer)
    //       this.handleTimeout() // Call a method when time runs out
    //     }
    //   }, 1000)
    // },
    // handleTimeout () {
    //   this.message = 'Time is up! You did not guess in time.'
    //   this.level-- // Go back to the previous level
    //   this.tries = 0 // Reset the number of tries for the current level
    //   this.startGame() // Restart the game when time runs out
    // },
    // formatTime (seconds) {
    //   const minutes = Math.floor(seconds / 60)
    //   const secondsRemain = seconds % 60
    //   return `${minutes.toString().padStart(2, '0')}:${secondsRemain.toString().padStart(2, '0')}`
    // },
    resetGame () {
      const currentLevel = this.level // Store the current level
      this.startGame()
      this.level = currentLevel // Restore the level to the current level
      this.tries = 0 // Reset the number of tries to 0
      this.guess = null
      this.message = null
    }
  }
}
</script>

<style scoped>
.game {
  text-align: center;
  margin-top: 100px;
  background-image: url('@/assets/Untitled.png'); /* Replace 'background-image.jpg' with your actual image file name and extension */
  background-size: cover;
  background-position: center;
}

.game-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.game-message {
  font-size: 20px;
  color: #ff4d4d;
  margin-bottom: 20px;
}

.game img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

</style>
