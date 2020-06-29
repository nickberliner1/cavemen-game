import { Map } from "./map.js";
import { Player } from "./players.js";
import { Weapon } from "./weapons.js";


class App {
    constructor(){
        this.map = new Map(8, 8);
        this.players = [new Player("Red Caveman", "cavemanRed", 1, 100, null), 
                        new Player("Blue Caveman", "cavemanBlue", 2, 100, null)];
        
        this.weapons = [new Weapon("Rock", "rock", 10),
                        new Weapon("Stick", "stick", 20),
                        new Weapon("Spear", "spear", 30),
                        new Weapon("Mammoth", "mammoth", 40)];
    }

    start(){
        this.map.generate(this.players, this.weapons);
    }
}


let app = new App();
app.start();
