import { Cell } from "./cell.js";
import { players, showActivePlayerButtons } from "./app.js";

export class Map {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.board = [];
        this.numberOfWalls = 20;
    }
    
    generate(players, weapons) {
        this.buildMap();
        this.placeObjects(players, weapons, this.numberOfWalls);
    }
    
    
    // Creates the board by generating instance of a cell, then appending them to the DOM 
    
    buildMap() {
        
        for (let i = 0; i < this.rows; i++) {
            
            // Creates a <div> node as a row 
            let div1 = $(`<div style="height: ${100 / this.rows}%;"></div>`);
            
            let line = [];
            
            for (let j = 0; j < this.columns; j++) {
                
                let div = $(`<div class="cell" style="width: ${100 / this.columns}%;"></div>`);
                
                // Attaches each cell one by one to the row
                div1.append(div);
                
                // Pushes actual Cell class into "line" array
                line.push(new Cell(j, i, div));  
            }
            // Attaches each row one by one to the board container
            $('#board').append(div1);
            
            // Takes entire line full of divs (cells) and pushes it into entire board
            this.board.push(line);
        }     
          
    }
    
    getEmptyCells(numberOfEmptyCellsNeeded) {
        
        // Flattens both line and board arrays, in order to pull cells
        const turnAllCellsIntoOneArray = this.board.flat();
        
        let result = [];
        
        for (let i = 0; i < numberOfEmptyCellsNeeded; i++){
            
            // Finds a random empty cell
            const randomIndex = Math.floor(Math.random() * turnAllCellsIntoOneArray.length);
            
            // Stores 
            const randomEmptyCell = turnAllCellsIntoOneArray[randomIndex];
            
            // Removes cell from the flat array so it can't be picked again
            turnAllCellsIntoOneArray.splice(randomIndex, 1);
            
            result.push(randomEmptyCell);
            
        }
        // Returns the array with as many cells as requested in the method's argument
        return result;
    }
    
    getNonAdjacentCells(cells) {
        let result = [];
        result.push(cells[0]);
        cells.splice(0, 1);
        
        // Only pushes cells into empty array if they're not next to each other
        for (let i = 0; i < cells.length; i++) {
            if ( !cells[i].isNextTo(result[0]) ) {
                result.push(cells[i]);
                cells.splice(i, 1);
                break;
            }
        }
        return result;
    }
    
    placeObjects(players, weapons, numberOfWalls) {
        
        const emptyCells = this.getEmptyCells(numberOfWalls + players.length + weapons.length);
        const playerCells = this.getNonAdjacentCells(emptyCells);
        const weaponCells = emptyCells.splice(0, weapons.length);
        const wallCells = emptyCells.splice(0, numberOfWalls);   
        
        this.placePlayers(playerCells, players);
        this.placeWeapons(weaponCells, weapons);
        this.placeWalls(wallCells);        
    }
    
    placePlayers(cells, players) {
        for (let i = 0; i < players.length; i++) {
            cells[i].div.addClass(players[i].playerPicture);
            cells[i].player = players[i];
            players[i].cell = cells[i];
        }
    }
    
    placeWeapons(cells, weapons) {
        for (let i = 0; i < weapons.length; i++) {
            cells[i].div.addClass(weapons[i].weaponPicture);
            cells[i].weapon = weapons[i];
        }
    }
    
    placeWalls(cells) {
        for (let cell of cells) {
            cell.div.addClass('wall');
            cell.wall = true;
        }
    }
    
    checkIfCoordinatesAreValid(x, y) {
        return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
    }
    
    possiblePlayerMovesInDirection(vectorX, vectorY, result, player) {
        for (let i = 1; i <= player.movement; i++) {
            // This displays moves based on vectors, eliminating the need for 4 different for loops
            let x = player.cell.x + vectorX * i;
            let y = player.cell.y + vectorY * i;
            // Checks if coordinates exist, and if they have a wall or a player on them
            if (this.checkIfCoordinatesAreValid(x, y)) {
                let cell = this.board[y][x];
                if (!cell.wall && cell.player == null) {
                    result.push(cell);
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }
    
    possiblePlayerMoves(player) {
        let result = [];
        
        // The arguments each work with the vectors to display however many possible moves we want
        
        // Right
        this.possiblePlayerMovesInDirection(1, 0, result, player);
        // Left
        this.possiblePlayerMovesInDirection(-1, 0, result, player);
        // Up
        this.possiblePlayerMovesInDirection(0, -1, result, player);
        // Down
        this.possiblePlayerMovesInDirection(0, 1, result, player);
        
        return result;
    }
    
    displayPlayerMoves(player, nextPlayer) {
        const playerMoves = this.possiblePlayerMoves(player);
        for (let cell of playerMoves) {
            cell.div.addClass('possibleMove');
            cell.div.on("click", () => {
                $('.possibleMove').removeClass('possibleMove').off("click");
                this.movePlayer(player, cell);

                players.changeActivePlayers();

                if ( player.cell.isNextTo(nextPlayer.cell) ) {
                    this.startFight();
                } else {
                    this.displayPlayerMoves(nextPlayer, player);
                }
            })
        }
    }

    movePlayer(player, cell) {
        
        let oldPlayerCell = player.cell;
        let newPlayerCell = cell;
        
        oldPlayerCell.div.removeClass(player.playerPicture);
        newPlayerCell.div.addClass(player.playerPicture);
        newPlayerCell.player = player;
        oldPlayerCell.player = null;
        player.cell = newPlayerCell;
        
        if ( cell.weapon ) {
            this.pickupWeapon(player, cell);
        }
    }

    pickupWeapon(player, cell) {
        let oldPlayerWeapon = player.weapon;
        let newPlayerWeapon = cell.weapon;

        cell.div.removeClass(newPlayerWeapon.weaponPicture);
        cell.div.addClass(oldPlayerWeapon.weaponPicture);
        cell.weapon = oldPlayerWeapon;
        player.weapon = newPlayerWeapon;

        $(`#${player.playerPicture}Weapon`).removeClass(oldPlayerWeapon.weaponPicture);
        $(`#${player.playerPicture}Weapon`).addClass(newPlayerWeapon.weaponPicture).css("float: left;");
    
    }
    
    startFight() {
        
        alert("Start Fight!");
        players.showHealth();
        showActivePlayerButtons();
    }    
}
