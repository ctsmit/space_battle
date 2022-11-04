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

const buttonContainer = document.querySelector(".buttonContainer")
const buttonFire = document.createElement("button")
const buttonNext = document.createElement("button")
buttonFire.innerText = "Fire"
buttonFire.classList.add("button")
buttonNext.innerText = "Next Battle"
buttonNext.classList.add("button")

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
         alienShips[currentAlienShip].hull -= this.firepower
         enemyHull.innerText = `HP: ${alienShips[currentAlienShip].hull}`
         setTimeout(() => {
         playerText.innerText = `${player.name}: direct hit!!`
         enemyText.innerText = `${alienShips[currentAlienShip].name}: argh!` 
         }, 1000);
      } else {
         setTimeout(() => {
         playerText.innerText = `${player.name}: we missed!!!`
            
         }, 1500);
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
         player.hull -= this.firepower
         playerHull.innerText = `HP: ${player.hull}`
         setTimeout(() => {
         enemyText.innerText = `${alienShips[currentAlienShip].name}: yed dyufe ui!!`
            
         }, 3000);
         setTimeout(() => {
            playerText.innerText = `${player.name}: That hurt.`
               
            }, 5000);
        setTimeout(() => {
             remaining.innerText = `You took ${alienShips[currentAlienShip].firepower} damage! Fire Again!`
     
        }, 4000);
      } else {
         setTimeout(() => {
         playerText.innerText = `${player.name}: The Bastards missed!!!`
            
         }, 4000);
         setTimeout(() => {
          enemyText.innerText = `${alienShips[currentAlienShip].name}: dit!`
           
         }, 5000);
         setTimeout(() => {
         remaining.innerText = "they are still alive. shoot em again!"
            
         }, 4000);
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
         currentAlienShip++
         alive = false
         setTimeout(() => {
         enemyText.innerText = `${alienShips[currentAlienShip].name}: dfjasdkhfiufh!!!!`
            
         }, 3000);
         

         if (currentAlienShip + 1 > alienShips.length) {
            remaining.innerText = "YOU WIN"
            buttonContainer.removeChild(buttonNext)
            buttonContainer.removeChild(buttonFire)
            alive = false
            return
         }
         setTimeout(() => {
         remaining.innerText = `enemy down, onto the next!!!!!!!!!!!!!`
         buttonContainer.appendChild(buttonNext)   
         }, 5000);
      } else if (player.hull <= 0) {
         setTimeout(() => {
         playerText.innerText = "SNAKEEEEEEEEEEEEEEEEEE!"
         remaining.innerText = "YOU ARE DEAD"
            
         }, 5000);

         buttonContainer.removeChild(buttonFire)
         alive = false
         return
      }
   },

   initalizeGame: (enemyShips = 6, playerName = "player1") => {
      alienShips = []

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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

start.addEventListener("click", function () {
   alive = true
   let playerOne = window.prompt("playername", "USS Assembly")
   let enemys = window.prompt("number of enemyships", 6)
   currentAlienShip = 0

   game.initalizeGame(enemys, playerOne)
   remaining.innerText = "they're here!!"

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

buttonNext.addEventListener("click", function () {
   if (alive === true) return
   alive = true
   remaining.innerText = `Enemy's Remaining: ${alienShips.length - currentAlienShip}`
   playerText.innerText = ""
   enemyText.innerText = ""
   enemyshipbox.innerText = alienShips[currentAlienShip].name
   enemyHull.innerText = `HP: ${alienShips[currentAlienShip].hull}`
   enemyFirepower.innerText = `Atk: ${alienShips[currentAlienShip].firepower}`
   enemyAccuracy.innerText = `Acc : ${alienShips[currentAlienShip].accuracy}`

   buttonContainer.removeChild(buttonNext)
   document.querySelector(".bodyContainer").style.background = game.getRandomColor()
})
