class CellType  {
    constructor(){
    this.BOMB= false
    this.FLAG= false
    this.ZERO= false
    this.ONE= false
    this.TWO= false
    this.THREE= false
    this.FOUR= false
    this.FIVE= false
    this.SIX= false
    this.SEVEN= false
    this.EIGHT= false
    }
}

export default class Model {

    constructor(width, height, amountOfBombs) {
        this.width = width
        this.height = height
        this.amountOfBombs = amountOfBombs
        this.grid = [];
        //bombList?
    }

    initGrid() {
        for (let row = 0; row < this.height; row++) {
            this.grid[row] = []
            for (let col = 0; col < this.width; col++) {
                this.grid[row][col] = { cellType: new CellType, isOpen: false }

            }

        }
        this.generateBombs();
        console.table(this.grid);
    }

    generateBombs(){
        let bombsLeft = this.amountOfBombs;
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {

                if(Math.random() < 0.15){
                    console.log('B');
                    this.grid[row][col].cellType.BOMB=true;
                    bombsLeft--;
                }
                
            }
            
        }
    }


}