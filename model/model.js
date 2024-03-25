class TileType {
    constructor() {
        this.BOMB = false
        this.FLAG = false //skal flag ligge her?
        this.ZERO = false
        this.ONE = false
        this.TWO = false
        this.THREE = false
        this.FOUR = false
        this.FIVE = false
        this.SIX = false
        this.SEVEN = false
        this.EIGHT = false
    }
}

export default class Model {

    constructor(cols, rows, amountOfBombs) {
        this.cols = cols
        this.rows = rows
        this.amountOfBombs = amountOfBombs
        this.grid = [];
        //bombList?
    }

    initGrid() {
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = []
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = { tileType: new TileType, isOpen: false } //add isFlagged?

            }

        }
        this.generateBombs();
        console.table(this.grid);
    }

    generateBombs() {
        let bombsLeft = this.amountOfBombs;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {

                if (Math.random() < 0.15) {
                    console.log('B');
                    this.grid[row][col].tileType.BOMB = true;
                    bombsLeft--;
                }

            }

        }
    }
    openTile(row, col) {
        this.grid[row][col].isOpen = true
    }


}