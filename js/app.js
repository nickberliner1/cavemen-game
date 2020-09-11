import { Map } from "./map.js";
import { Player } from "./players.js";
import { Weapon } from "./weapons.js";


class App {
    constructor(players){
        this.map = new Map(10, 10);
        // give them default weapons
        this.players = players;

        this.weapons = [
                        new Weapon("Fire", "fire", 20),
                        new Weapon("Stick", "stick", 30),
                        new Weapon("Spear", "spear", 40),
                        new Weapon("Mammoth", "mammoth", 50)];
    }

    start(){
        this.map.generate(this.players, this.weapons);
        this.map.displayPlayerMoves(this.players[0], this.players[1]);
        
    }
}

const playerOne = new Player("Red Caveman", "cavemanRed", 1, 100, new Weapon("Rock", "rock", 10));
const playerTwo = new Player("Blue Caveman", "cavemanBlue", 2, 100, new Weapon("Rock", "rock", 10));
        

let app = new App([playerOne, playerTwo]);
app.start();


$('cavemanRedDefend').on("click", () => {
    playerOne.defend = true;
})

$('cavemanBlueDefend').on("click", () => {
    playerTwo.defend = true;
})

window.app = app;

