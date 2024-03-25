class TileType {
  constructor() {
    this.BOMB = false;
    this.FLAG = false; //skal flag ligge her?
    this.ZERO = false;
    this.ONE = false;
    this.TWO = false;
    this.THREE = false;
    this.FOUR = false;
    this.FIVE = false;
    this.SIX = false;
    this.SEVEN = false;
    this.EIGHT = false;
  }
}

export default class Model {
  constructor(cols, rows, amountOfBombs) {
    this.cols = cols;
    this.rows = rows;
    this.amountOfBombs = amountOfBombs;
    this.grid = [];
    //bombList?
  }

  initGrid() {
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = { tileType: new TileType(), isOpen: false }; //add isFlagged?
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
          console.log("B");
          this.grid[row][col].tileType.BOMB = true;
          bombsLeft--;
        }
      }
    }
    this.setTileValues();
  }

  openTile(row, col) {
    this.grid[row][col].isOpen = true;
    if (this.grid[row][col].tileType.ZERO) {
        
            this.cascadeEmpties(row, col)
            this.openNeighbours(row, col)
            
        }
    return this.grid;
  }

    openNeighbours(r, c){
       
        
        if(c + 1 < this.cols ) this.grid[r][c + 1].isOpen = true
        if (c - 1 >= 0)this.grid[r][c - 1].isOpen = true
        if (r + 1 < this.rows)this.grid[r + 1][c].isOpen = true
        if (r - 1 >= 0 )this.grid[r - 1][c].isOpen = true
        if (r + 1 < this.rows && c + 1 < this.cols)this.grid[r + 1][c + 1].isOpen = true
        if (r - 1 >= 0 && c - 1 >= 0 )this.grid[r - 1][c - 1].isOpen = true
        if (r + 1 < this.rows && c - 1 >= 0 )this.grid[r + 1][c - 1].isOpen = true
        if (r - 1 >= 0 && c + 1 < this.cols )this.grid[r - 1][c + 1].isOpen = true

        // if (this.grid[r][c + 1].tileType.ZERO) {
        //     this.cascadeEmpties(r, c + 1)
        // }
        // if (this.grid[r][c - 1].tileType.ZERO) {
        //     this.cascadeEmpties(r, c - 1)
        // }
    }

  setTileValues() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col].tileType.BOMB == false) {
          const count = this.countNeighborBombs(row, col);
          switch (count) {
            case 0: this.grid[row][col].tileType.ZERO = true; break;
            case 1: this.grid[row][col].tileType.ONE = true; break;
            case 2: this.grid[row][col].tileType.TWO = true; break;
            case 3: this.grid[row][col].tileType.THREE = true; break;
            case 4: this.grid[row][col].tileType.FOUR = true; break;
            case 5: this.grid[row][col].tileType.FIVE = true; break;
            case 6: this.grid[row][col].tileType.SIX = true; break;
            case 7: this.grid[row][col].tileType.SEVEN = true; break;
            case 8: this.grid[row][col].tileType.EIGHT = true; break;
          }
        }
      }
    }
  }

    cascadeEmpties(r, c) {
        
        if (c + 1 < this.cols && this.grid[r][c + 1].tileType.ZERO && !this.grid[r][c + 1].isOpen) this.openTile(r, c + 1); // right
        if (c - 1 >= 0 && this.grid[r][c - 1].tileType.ZERO && !this.grid[r][c - 1].isOpen) this.openTile(r, c - 1); // left
        if (r + 1 < this.rows && this.grid[r + 1][c].tileType.ZERO && !this.grid[r + 1][c].isOpen) this.openTile(r + 1, c); // under
        if (r - 1 >= 0 && this.grid[r - 1][c].tileType.ZERO && !this.grid[r - 1][c].isOpen) this.openTile(r - 1, c); //over
        if (r + 1 < this.rows && c + 1 < this.cols && this.grid[r + 1][c + 1].tileType.ZERO && !this.grid[r +1][c+1].isOpen) this.openTile(r +1, c+1); // downRight
        if (r - 1 >= 0 && c - 1 >= 0 && this.grid[r - 1][c - 1].tileType.ZERO && !this.grid[r-1][c-1].isOpen) this.openTile(r-1, c-1); //  up left
        if (r + 1 < this.rows && c - 1 >= 0 && this.grid[r + 1][c - 1].tileType.ZERO && !this.grid[r+1][c-1].isOpen) this.openTile(r+1, c-1); //  down left
        if (r - 1 >= 0 && c + 1 < this.cols && this.grid[r - 1][c + 1].tileType.ZERO && !this.grid[r-1][c+1].isOpen) this.openTile(r-1, c+1); //  up right
    
}

  countNeighborBombs(r, c) {
    let count = 0;

    if (c + 1 < this.cols && this.grid[r][c + 1].tileType.BOMB) count++; // right
    if (c - 1 >= 0 && this.grid[r][c - 1].tileType.BOMB) count++; // left
    if (r + 1 < this.rows && this.grid[r + 1][c].tileType.BOMB) count++; // under
    if (r - 1 >= 0 && this.grid[r - 1][c].tileType.BOMB) count++; //over
    if (r + 1 < this.rows && c + 1 < this.cols && this.grid[r + 1][c + 1].tileType.BOMB) count++; // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && this.grid[r - 1][c - 1].tileType.BOMB) count++; //  up left
    if (r + 1 < this.rows && c - 1 >= 0 && this.grid[r + 1][c - 1].tileType.BOMB) count++; //  down left
    if (r - 1 >= 0 && c + 1 < this.cols && this.grid[r - 1][c + 1].tileType.BOMB) count++; //  up right

    console.log(count);
    return count;
  }
}
