export class Cell {
    constructor(x, y, div) {
        this.x = x;
        this.y = y;
        this.div = div;
        this.wall = false;
        this.weapon = null;
        this.player = null;
    }
    
    isNextTo(other) {
        // Checks if 2 cells are next to each other by seeing if they have the same x but different y by one, or vice versa
        return (this.x == other.x && Math.abs(other.y - this.y) == 1) || 
        (this.y == other.y && Math.abs(other.x - this.x) == 1);
    }
}


