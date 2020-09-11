
export class Player {
    constructor(name, playerPicture, playerNumber, health, weapon) {
        this.name = name;
        this.playerPicture = playerPicture;
        this.playerNumber = playerNumber;
        this.health = health;
        this.weapon = weapon;
        this.cell = null;
        this.movement = 3;
        this.defend = false;
    }
}


