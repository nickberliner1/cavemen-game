import { Cell } from "./cell.js";
import { Player } from "./players.js";

export class Map {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.board = [];
        this.numberOfWalls = 15;
    }
    
    generate(players, weapons) {
        this.buildMap();
        this.placeObjects(players, weapons, this.numberOfWalls);
    }
    
    /*
    * Creates the board by generating instance of a cell,  
    * then appending them to the DOM 
    */
    buildMap() {
        
        for (let i = 0; i < this.rows; i++) {
            
            // Creates a <div> node as a row 
            let div1 = document.createElement("div");
            
            // Syles it 
            div1.style.height = 100 / this.rows + '%';
            
            let line = [];
            
            
            for (let j = 0; j < this.columns; j++) {
                
                // Creates another <div> node by column (singling out one cell)
                let div = document.createElement("div");
                // Makes the div have a class called "cell"
                div.classList.add('cell');
                // Styles it
                div.style.width = 100 / this.columns + '%';
                div.style.height = '100%';
                
                // Attaches each cell one by one to the row
                div1.appendChild(div);
                
                // Pushes actual Cell class into "line" array
                line.push(new Cell(j, i, div));  
            }
            // Attaches each row one by one to the container
            document.getElementById('container').appendChild(div1);
            
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
    
    placeObjects(players, weapons, numberOfWalls) {
        
        const emptyCells = this.getEmptyCells(numberOfWalls + players.length + weapons.length);
        const wallCells = emptyCells.splice(0, numberOfWalls);   
        const playerCells = emptyCells.splice(0, players.length);
        const weaponCells = emptyCells.splice(0, weapons.length);

        this.placePlayers(playerCells, players);
        this.placeWeapons(weaponCells, weapons);
        this.placeWalls(wallCells);        
    }
    
    // Place however many walls on cells from getEmptyCells method
    placeWalls(cells) {
        for (let cell of cells) {
            // Adding walls to the DOM
            cell.div.classList.add('wall');
            cell.wall = true;
        }
    }
    
    placePlayers(cells, players) {
        
        for (let i = 0; i < players.length; i++) {
            cells[i].div.classList.add(players[i].playerPicture);
            cells[i].player = players[i];
        }
    }
    
    // Place weapons the same as the walls
    placeWeapons(cells, weapons) {
        
        for (let i = 0; i < weapons.length; i++) {
            cells[i].div.classList.add(weapons[i].weaponPicture);
            cells[i].weapon = weapons[i];
        }
    }
    
    
    
    // Checks if players are generating next to each other
    checkIfPlayersNextToEachOther() {
        // Checks if cell is empty
        if ( this.wall && this.weapon && this.player == false ) {
            // Checks if player is next to them
            if ( this.player.positionX - 1 || this.player.positionX + 1 ) {
                if ( this.player.positionY - 1 || this.player.positionY + 1 ) {
                    return new Player;
                }
            }
        }
    }
}





