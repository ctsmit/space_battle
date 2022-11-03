// class Ship {
//    constructor(shipname, hull, firepower, accuracy) {
//       this.shipname = ''
//       this.hull = hull
//       this.firepower = firepower
//       this.accuracy = accuracy
//    }
//    makeHumanShip(shipname, hull, firepower, accuracy) {
//       const UssAssembly = new HumanShip("USS Assembly", 20, 5, .7)
//    }
//    makeAlienShip(shipname, hull, firepower, accuracy) {
//       const alienShip = new AlienShip("Alien Ship",)
//    }
// }
const alienShips = []

class HumanShip {
   constructor() {
      this.shipname = "USS Assembly"
      this.hull = 20
      this.firepower = 5
      this.accuracy = .7
   }
   attack(target) {
      // console.log(alienShips)
      if (Math.random() <=.7) {
         alienShips[target-1].hull -= this.firepower
         // console.log(alienShips)
      }
   }
}

class AlienShip {
   constructor(shipname) {
      this.shipName = shipname
      this.hull = this.randomHull()
      this.firepower = this.randomFirepower()
      this.accuracy = this.randomAccuracy()
      alienShips.push(this)
   }
   randomHull() {
      return Math.floor(Math.random() * 4)+ 3
   }
   randomFirepower() {
      return Math.floor(Math.random() * 3)+ 2
   }
   randomAccuracy() {
      return (Math.floor(Math.random() * 3) + 6) / 10
   }
   attack() {
      if (Math.random() <= this.accuracy) {
         UssAssembly.hull -= this.firepower
      }
   }
}

let UssAssembly = new HumanShip()

let alienShip1 = new AlienShip("destroyer1")
// let alienShip2 = new AlienShip("destroyer2")
// let alienShip3 = new AlienShip("destroyer3")
// let alienShip4 = new AlienShip("destroyer4")
// let alienShip5 = new AlienShip("destroyer5")
// let alienShip6 = new AlienShip("destroyer6")

// console.log(alienShip1)
// console.log(UssAssembly.hull)
// console.log(alienMothership)
UssAssembly.attack(1)
