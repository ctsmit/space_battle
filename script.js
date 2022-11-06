let player = {}
let alienShips = []
let currentAlienShip = 0
let alive = true

const start = document.getElementById("start")
const playername = document.querySelector(".nameBox")
const enemyshipbox = document.querySelector(".enemyNameBox")
const remaining = document.querySelector("h1")
const playerHull = document.querySelector(".playerHull")
const enemyHull = document.querySelector(".enemyHull")
const enemyFirepower = document.querySelector(".enemyFirepower")
const enemyAccuracy = document.querySelector(".enemyAccuracy")
const playerText = document.querySelector(".playerText")
const enemyText = document.querySelector(".enemyText")

const enemyImage = document.querySelector(".enemyImage")
const enemyPic = document.createElement("img")
enemyPic.src = "images/enemy.gif"
const deadPic = document.createElement("img")
deadPic.src = "images/alien.png"

const playerImage = document.querySelector(".playerImage")

const buttonContainer = document.querySelector(".buttonContainer")
const buttonFire = document.createElement("button")
const buttonNext = document.createElement("button")

buttonFire.innerText = "Fire"
buttonFire.classList.add("button", "buttonFire")
buttonNext.innerText = "Next Battle"
buttonNext.classList.add("buttonNext", "button")

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class HumanShip {
   constructor(playerName) {
      this.name = playerName
      this.hull = 20
      this.firepower = 5
      this.accuracy = 0.7
      player = this
   }
   attack(target) {
      if (Math.random() <= 0.7) {
         let hp = alienShips[currentAlienShip].hull - this.firepower
         alienShips[currentAlienShip].hull -= this.firepower
         setTimeout(() => {
            enemyHull.innerText = `HP: ${hp}`
            game.shake(enemyImage)
         }, 500)
         setTimeout(() => {
            playerText.innerText = `${player.name}: direct hit!!`
            enemyText.innerText = `${alienShips[currentAlienShip].name}: argh!`
         }, 1500)
      } else {
         setTimeout(() => {
            playerText.innerText = `${player.name}: we missed!!!`
         }, 1500)
      }
   }
}

class alienDestroyers {
   constructor(shipname) {
      this.name = shipname
      this.hull = this.randomHull()
      this.firepower = this.randomFirepower()
      this.accuracy = this.randomAccuracy()
      alienShips.push(this)
   }

   attack() {
      if (Math.random() <= this.accuracy) {
         let hp = player.hull - this.firepower
         player.hull -= this.firepower

         setTimeout(() => {
            playerHull.innerText = `HP: ${hp}`
            enemyText.innerText = `${alienShips[currentAlienShip].name}: yed dyufe ui!!`
            game.shake(playerImage)
         }, 1500)
         setTimeout(() => {
            playerText.innerText = `${player.name}: That hurt.`
         }, 2500)
         setTimeout(() => {
            remaining.innerText = `You took ${alienShips[currentAlienShip].firepower} damage! Fire Again!`
            document.activeElement.blur()
         }, 2500)
      } else {
         setTimeout(() => {
            playerText.innerText = `${player.name}: The Bastards missed!!!`
         }, 2500)
         setTimeout(() => {
            enemyText.innerText = `${alienShips[currentAlienShip].name}: dit!`
         }, 2500)
         setTimeout(() => {
            remaining.innerText = "they are still alive. shoot em again!"
            document.activeElement.blur()
         }, 2500)
      }
   }

   randomHull() {
      return Math.floor(Math.random() * 4) + 5
   }

   randomFirepower() {
      return Math.floor(Math.random() * 3) + 2
   }

   randomAccuracy() {
      return (Math.floor(Math.random() * 3) + 6) / 10
   }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const game = {
   startRound: () => {
      if (alive === true) {
      } else if (alienShips[currentAlienShip - 1].hull <= 0) {
         return
      }

      remaining.innerText = "Missile Away!"
      playerText.innerText = ""
      enemyText.innerText = ""
      document.querySelector(".bodyContainer").style.background = game.getRandomColor()

      player.attack(alienShips[currentAlienShip])

      if (alienShips[currentAlienShip].hull > 0) {
         alienShips[currentAlienShip].attack()
      }
      game.checkDestroy(currentAlienShip)
   },

   checkDestroy: (target) => {
      if (alienShips[target].hull <= 0) {
         alive = false

         setTimeout(() => {
            enemyText.innerText = `${alienShips[currentAlienShip].name}: dfjasdkhfiufh!!!!`
            enemyImage.removeChild(enemyPic)
            enemyImage.appendChild(deadPic)
         }, 2300)

         currentAlienShip++

         if (currentAlienShip + 1 > alienShips.length) {
            setTimeout(() => {
               remaining.innerText = "YOU WIN"

               buttonContainer.removeChild(buttonFire)
               buttonContainer.appendChild(start)
            }, 2500)
            alive = false
            return
         }
         setTimeout(() => {
            remaining.innerText = `enemy down, onto the next!!!!!!!!!!!!!`
            buttonContainer.appendChild(buttonNext)
            buttonContainer.removeChild(buttonFire)
         }, 3000)
      } else if (player.hull <= 0) {
         setTimeout(() => {
            playerText.innerText = "SNAKEEEEEEEEEEEEEEEEEE!"
            remaining.innerText = "YOU ARE DEAD"
            buttonContainer.appendChild(start)
         }, 3000)

         buttonContainer.removeChild(buttonFire)
         alive = false
         return
      }
   },

   initalizeGame: (enemyShips, playerName) => {
      alienShips = []
      buttonContainer.removeChild(start)
      document.querySelector(".bodyContainer").style.animation = "none"

      enemyImage.appendChild(enemyPic)

      for (let ships = 1; ships <= enemyShips; ships++) {
         let alienDestroyer = new alienDestroyers(`Destroyer${ships}`)
      }
      let UssAssembly = new HumanShip(playerName)
      console.log(player, alienShips)
   },
   getRandomColor: () => {
      var letters = "0123456789ABC"
      var color = "#"
      for (var i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 13)]
      }
      return color
   },
   shake: (target) => {
      target.style.animation = "shake .75s"
      setTimeout(() => {
         target.style.animation = "none"
      }, 750)
   },
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

start.addEventListener("click", () => {
   if (currentAlienShip != 0) {
      enemyImage.removeChild(enemyImage.firstChild)
   }

   alive = true
   let playerOne = window.prompt("playername", "USS Assembly")
   let enemys = window.prompt("number of enemyships", 2)
   currentAlienShip = 0

   game.initalizeGame(enemys, playerOne)
   remaining.innerText = "they're here!!"
   enemyText.innerText = ""
   playerText.innerText = ""

   playerHull.innerText = `HP: 20`
   start.innerText = "RESTART"
   enemyshipbox.innerText = alienShips[currentAlienShip].name
   playername.innerText = playerOne
   document.querySelector(".bodyContainer").style.background = "black"
   buttonContainer.appendChild(buttonFire)

   enemyHull.innerText = `HP: ${alienShips[currentAlienShip].hull}`
   enemyFirepower.innerText = `Atk: ${alienShips[currentAlienShip].firepower}`
   enemyAccuracy.innerText = `Acc: ${alienShips[currentAlienShip].accuracy}`
})

buttonFire.addEventListener("click", game.startRound)

buttonNext.addEventListener("click", () => {
   if (alive === true) return
   alive = true
   remaining.innerText = `Enemy's Remaining: ${alienShips.length - currentAlienShip}`
   playerText.innerText = ""
   enemyText.innerText = ""
   enemyshipbox.innerText = alienShips[currentAlienShip].name
   enemyHull.innerText = `HP: ${alienShips[currentAlienShip].hull}`
   enemyFirepower.innerText = `Atk: ${alienShips[currentAlienShip].firepower}`
   enemyAccuracy.innerText = `Acc : ${alienShips[currentAlienShip].accuracy}`

   enemyImage.removeChild(deadPic)
   enemyImage.appendChild(enemyPic)
   buttonContainer.removeChild(buttonNext)
   buttonContainer.appendChild(buttonFire)
   document.querySelector(".bodyContainer").style.background = game.getRandomColor()
})
