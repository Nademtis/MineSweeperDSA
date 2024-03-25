const CellType = {
    BOMB: "bomb",
    ZERO: false,
    ONE: false,
    //make the rest and fix initGrid
};

export default class Model {

    constructor(width, height, amountOfBombs) {
        this.width = width
        this.height = height
        this.amountOfBombs = amountOfBombs
        this.grid = this.initGrid()
        //bombList?
    }

    initGrid() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.grid[r][c] = [{ cellType: CellType, isOpen: false }]

            }

        }
    }
//test

}