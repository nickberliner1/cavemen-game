import { Map } from "./map.js";
import { Player } from "./players.js";
import { Weapon } from "./weapons.js";


class App {
    constructor(players){
        this.map = new Map(10, 10);
        // give them default weapons
        this.players = players;

        this.weapons = [new Weapon("Fire", "fire", 20),
                        new Weapon("Stick", "stick", 30),
                        new Weapon("Spear", "spear", 40),
                        new Weapon("Mammoth", "mammoth", 50)];
    }

    start(){
        this.map.generate(this.players, this.weapons);
        this.map.displayPlayerMoves(this.players[0], this.players[1]);
        
    }

}

export const playerOne = new Player("Red Caveman", "cavemanRed", 1, 100, new Weapon("Rock", "rock", 10));
export const playerTwo = new Player("Blue Caveman", "cavemanBlue", 2, 100, new Weapon("Rock", "rock", 10));
      
let app = new App([playerOne, playerTwo]);
app.start();

export const players = {
    activePlayer: playerOne,
    listOfPlayers: [playerOne, playerTwo],

    changeActivePlayers() {
        const inactivePlayer = this.listOfPlayers.pop();
        this.listOfPlayers.unshift(inactivePlayer);

        // Highlights border of active player
        $(`#${this.activePlayer.playerPicture}Controller`).removeClass(`${this.activePlayer.playerPicture}BoardColor`);
        $(`#${inactivePlayer.playerPicture}Controller`).addClass(`${inactivePlayer.playerPicture}BoardColor`);

        // Changes board color to active player's color
        $('#board').removeClass(`${this.activePlayer.playerPicture}BoardColor`);
        $('#board').addClass(`${inactivePlayer.playerPicture}BoardColor`);
        
        this.activePlayer = inactivePlayer;
    },

    showHealth() {
        $('#playerOneHealth').html('Health: ' + Math.max(playerOne.health, 0));
        $('#playerTwoHealth').html('Health: ' + Math.max(playerTwo.health, 0));

        // Checks if a player is dead
        if ( playerOne.health <= 0 ) {
            if ( confirm('Blue Caveman wins. Do you want to play again?') ) {
                location.reload();
            }            
        }
        if ( playerTwo.health <= 0 ) {
            if ( confirm('Red Caveman wins. Do you want to play again?') ) {
                location.reload();
            }
        }
    }
    
}




// Function that changes players urn after clicking either attack or defend
$('button').on("click", () => {
    players.changeActivePlayers();
    showActivePlayerButtons();
})

// attacking and defending buttons
$('.cavemanRedAttack').on("click", () => {
    attack(playerOne);
});

$('.cavemanRedDefend').on("click", () => {
    defend(playerOne);
});

$('.cavemanBlueAttack').on("click", () => {
    attack(playerTwo);
});

$('.cavemanBlueDefend').on("click", () => {
    defend(playerTwo);
});

// Hides and shows attack and defend buttons for active player
export function showActivePlayerButtons() {
    $('#cavemanRedAttackAndDefendContainer').css('visibility', 'hidden');
    $('#cavemanBlueAttackAndDefendContainer').css('visibility', 'hidden');
    $(`#${players.activePlayer.playerPicture}AttackAndDefendContainer`).css('visibility', 'visible');
}

function attack(player) {
    player.action = "attack";
    calculateDamage();
}

function defend(player) {
    player.action = "defend";
    calculateDamage();
}

function calculateDamage() {
    if ( playerOne.action && playerTwo.action ) {
        if ( playerOne.action == "attack" ) {
            if ( playerTwo.action == "attack" ) {
                // if both players chose attack
                playerOne.health -= playerTwo.weapon.damage;
                playerTwo.health -= playerOne.weapon.damage;
            } else {
                // if player 2 chose defend
                playerTwo.health -= playerOne.weapon.damage / 2;
            }
        } else {
            //if player 1 chose defend
            if ( playerTwo.action == "attack" ) {
                playerOne.health -= playerTwo.weapon.damage / 2;
            }
        }
        
        players.showHealth();
        // reset actions
        playerOne.action = null;
        playerTwo.action = null;
    }
}

window.app = app;
