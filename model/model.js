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
  constructor(cols, rows, amountOfBombs, controller) {
    this.cols = cols;
    this.rows = rows;
    this.amountOfBombs = amountOfBombs;
    this.grid = [];
    this.controller = controller;
  }


  startTimer() {
    this.timer = 0;
    this.timerInterval = setInterval(() => {
      this.timer++;
      if (this.timer == 999) {
        this.stopTimer();
      }
    }, 1000)
  }
  stopTimer() {
    clearInterval(this.timerInterval);
  }
  resetTimer() {
    this.timer = 0;
  }

  initGrid() {
    this.grid = [];
    for (let row = 0; row < this.rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this.grid[row][col] = { tileType: new TileType(), isOpen: false, row: row, col: col }; //add isFlagged?
      }
    }
    this.generateBombs();
  }

  generateBombs() {//CAN BE OPTIMIZED***
    let bombsLeft = this.amountOfBombs;
    //let cnt =0;
    while (bombsLeft >= 0) {
      let randomRowIndex = Math.floor(Math.random() * this.rows)
      let randomColIndex = Math.floor(Math.random() * this.cols)
      if (!this.grid[randomRowIndex][randomColIndex].tileType.BOMB) {
        this.grid[randomRowIndex][randomColIndex].tileType.BOMB = true;
        bombsLeft--
      }
      //cnt++;
    }
    this.setTileValues();
    //console.log("times bombs placed"+cnt);
  }



  openTile(row, col) {

    if (this.grid[row][col].tileType.BOMB) {
      this.grid[row][col].tileType.CLICKED_BOMB = true;
      this.controller.killSmiley()
      this.showBombs();
      this.stopTimer();
    }

    if (!this.grid[row][col].tileType.FLAG) {
      this.grid[row][col].isOpen = true;
      if (this.grid[row][col].tileType.ZERO) {

        this.cascadeEmpties(row, col)
        this.openNeighbours(row, col)

      }
    }
    return this.grid;

  }

  flagTile(row, col) {
    if (!this.grid[row][col].isOpen && !this.grid[row][col].tileType.FLAG) {
      this.grid[row][col].tileType.FLAG = true
    } else if (!this.grid[row][col].isOpen && this.grid[row][col].tileType.FLAG) {
      this.grid[row][col].tileType.FLAG = false
    }
    return this.grid;
  }

  chord(row, col) {
    let tileType = this.grid[row][col].tileType
    console.log(tileType);

    const tileValue = this.getIntValue(tileType)
    const flagAmount = this.countNeighborFlags(row, col)
    if (tileValue == flagAmount) {
      this.openNeighbours(row, col)
    }

    return this.grid;
    //console.log("value for this chord is " + tileValue);

  }

  getIntValue(tileType) {
    if (tileType.BOMB) return -1; // or whatever value represents a bomb
    if (tileType.FLAG) return -2; // or whatever value represents a flag
    if (tileType.ZERO) return 0;
    if (tileType.ONE) return 1;
    if (tileType.TWO) return 2;
    if (tileType.THREE) return 3;
    if (tileType.FOUR) return 4;
    if (tileType.FIVE) return 5;
    if (tileType.SIX) return 6;
    if (tileType.SEVEN) return 7;
    if (tileType.EIGHT) return 8;
  }




  openNeighbours(r, c) {

    if (c + 1 < this.cols && !this.grid[r][c + 1].tileType.FLAG && !this.grid[r][c + 1].isOpen) this.openTile(r, c + 1); // right
    if (c - 1 >= 0 && !this.grid[r][c - 1].tileType.FLAG && !this.grid[r][c - 1].isOpen) this.openTile(r, c - 1); // left
    if (r + 1 < this.rows && !this.grid[r + 1][c].tileType.FLAG && !this.grid[r + 1][c].isOpen) this.openTile(r + 1, c); // under
    if (r - 1 >= 0 && !this.grid[r - 1][c].tileType.FLAG && !this.grid[r - 1][c].isOpen) this.openTile(r - 1, c); //over
    if (r + 1 < this.rows && c + 1 < this.cols && !this.grid[r + 1][c + 1].tileType.FLAG && !this.grid[r + 1][c + 1].isOpen) this.openTile(r + 1, c + 1); // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && !this.grid[r - 1][c - 1].tileType.FLAG && !this.grid[r - 1][c - 1].isOpen) this.openTile(r - 1, c - 1); //  up left
    if (r + 1 < this.rows && c - 1 >= 0 && !this.grid[r + 1][c - 1].tileType.FLAG && !this.grid[r + 1][c - 1].isOpen) this.openTile(r + 1, c - 1); //  down left
    if (r - 1 >= 0 && c + 1 < this.cols && !this.grid[r - 1][c + 1].tileType.FLAG && !this.grid[r - 1][c + 1].isOpen) this.openTile(r - 1, c + 1); //  up right

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
    if (r + 1 < this.rows && c + 1 < this.cols && this.grid[r + 1][c + 1].tileType.ZERO && !this.grid[r + 1][c + 1].isOpen) this.openTile(r + 1, c + 1); // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && this.grid[r - 1][c - 1].tileType.ZERO && !this.grid[r - 1][c - 1].isOpen) this.openTile(r - 1, c - 1); //  up left
    if (r + 1 < this.rows && c - 1 >= 0 && this.grid[r + 1][c - 1].tileType.ZERO && !this.grid[r + 1][c - 1].isOpen) this.openTile(r + 1, c - 1); //  down left
    if (r - 1 >= 0 && c + 1 < this.cols && this.grid[r - 1][c + 1].tileType.ZERO && !this.grid[r - 1][c + 1].isOpen) this.openTile(r - 1, c + 1); //  up right

  }

  countNeighborFlags(r, c) {
    let count = 0;

    if (c + 1 < this.cols && this.grid[r][c + 1].tileType.FLAG) count++; // right
    if (c - 1 >= 0 && this.grid[r][c - 1].tileType.FLAG) count++; // left
    if (r + 1 < this.rows && this.grid[r + 1][c].tileType.FLAG) count++; // under
    if (r - 1 >= 0 && this.grid[r - 1][c].tileType.FLAG) count++; //over
    if (r + 1 < this.rows && c + 1 < this.cols && this.grid[r + 1][c + 1].tileType.FLAG) count++; // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && this.grid[r - 1][c - 1].tileType.FLAG) count++; //  up left
    if (r + 1 < this.rows && c - 1 >= 0 && this.grid[r + 1][c - 1].tileType.FLAG) count++; //  down left
    if (r - 1 >= 0 && c + 1 < this.cols && this.grid[r - 1][c + 1].tileType.FLAG) count++; //  up right

    console.log(count);
    return count;
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

    return count;
  }



  getNeighborTiles(r, c, tileType) {
    let matchingCells = [];

    if (c + 1 < this.cols && this.grid[r][c + 1].tileType === tileType) matchingCells.push(this.grid[r][c + 1]); // right
    if (c - 1 >= 0 && this.grid[r][c - 1].tileType === tileType) matchingCells.push(this.grid[r][c - 1]); // left
    if (r + 1 < this.rows && this.grid[r + 1][c].tileType === tileType) matchingCells.push(this.grid[r + 1][c]); // under
    if (r - 1 >= 0 && this.grid[r - 1][c].tileType === tileType) matchingCells.push(this.grid[r - 1][c]); // over
    if (r + 1 < this.rows && c + 1 < this.cols && this.grid[r + 1][c + 1].tileType === tileType) matchingCells.push(this.grid[r + 1][c + 1]); // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && this.grid[r - 1][c - 1].tileType === tileType) matchingCells.push(this.grid[r - 1][c - 1]); // upLeft
    if (r + 1 < this.rows && c - 1 >= 0 && this.grid[r + 1][c - 1].tileType === tileType) matchingCells.push(this.grid[r + 1][c - 1]); // downLeft
    if (r - 1 >= 0 && c + 1 < this.cols && this.grid[r - 1][c + 1].tileType === tileType) matchingCells.push(this.grid[r - 1][c + 1]); // upRight

    console.log(matchingCells);
    return matchingCells;
  }


  getClosedNeighbors(r, c) {
    let closedNeighbors = [];

    if (c + 1 < this.cols && !this.grid[r][c + 1].isOpen) closedNeighbors.push(this.grid[r][c + 1]); // right
    if (c - 1 >= 0 && !this.grid[r][c - 1].isOpen) closedNeighbors.push(this.grid[r][c - 1]); // left
    if (r + 1 < this.rows && !this.grid[r + 1][c].isOpen) closedNeighbors.push(this.grid[r + 1][c]); // under
    if (r - 1 >= 0 && !this.grid[r - 1][c].isOpen) closedNeighbors.push(this.grid[r - 1][c]); // over
    if (r + 1 < this.rows && c + 1 < this.cols && !this.grid[r + 1][c + 1].isOpen) closedNeighbors.push(this.grid[r + 1][c + 1]); // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && !this.grid[r - 1][c - 1].isOpen) closedNeighbors.push(this.grid[r - 1][c - 1]); // upLeft
    if (r + 1 < this.rows && c - 1 >= 0 && !this.grid[r + 1][c - 1].isOpen) closedNeighbors.push(this.grid[r + 1][c - 1]); // downLeft
    if (r - 1 >= 0 && c + 1 < this.cols && !this.grid[r - 1][c + 1].isOpen) closedNeighbors.push(this.grid[r - 1][c + 1]); // upRight

    return closedNeighbors;
  }
  getOpenNeigbhors(r, c) {
    let openNeighbors = [];

    if (c + 1 < this.cols && this.grid[r][c + 1].isOpen) openNeighbors.push(this.grid[r][c + 1]); // right
    if (c - 1 >= 0 && this.grid[r][c - 1].isOpen) openNeighbors.push(this.grid[r][c - 1]); // left
    if (r + 1 < this.rows && this.grid[r + 1][c].isOpen) openNeighbors.push(this.grid[r + 1][c]); // under
    if (r - 1 >= 0 && this.grid[r - 1][c].isOpen) openNeighbors.push(this.grid[r - 1][c]); // over
    if (r + 1 < this.rows && c + 1 < this.cols && this.grid[r + 1][c + 1].isOpen) openNeighbors.push(this.grid[r + 1][c + 1]); // downRight
    if (r - 1 >= 0 && c - 1 >= 0 && this.grid[r - 1][c - 1].isOpen) openNeighbors.push(this.grid[r - 1][c - 1]); // upLeft
    if (r + 1 < this.rows && c - 1 >= 0 && this.grid[r + 1][c - 1].isOpen) openNeighbors.push(this.grid[r + 1][c - 1]); // downLeft
    if (r - 1 >= 0 && c + 1 < this.cols && this.grid[r - 1][c + 1].isOpen) openNeighbors.push(this.grid[r - 1][c + 1]); // upRight

    return openNeighbors;
  }




  showBombs() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col].tileType.BOMB) {
          this.grid[row][col].isOpen = true;
        }
        if (!this.grid[row][col].tileType.BOMB && this.grid[row][col].tileType.FLAG) {
          this.grid[row][col].isOpen = true;
          this.grid[row][col].tileType.WRONG_FLAG = true;
        }
      }
    }
    this.controller.gameEnded = true
  }
  getRemainingBombsBasedOnFlag() {
    let flagAmount = 0
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col].tileType.FLAG) {
          flagAmount++
        }
      }
    }
    //amountOfBombs - amountOfFlag
    return this.amountOfBombs - flagAmount
  }

  calcProbabilities() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const tile = this.grid[row][col];
        if (tile.isOpen) {
          // STEP 1 : Check if all closed neighbors are bombs
          let closedNeighbors = this.getClosedNeighbors(row, col);
          if (closedNeighbors.length === this.getIntValue(tile.tileType)) {
            closedNeighbors.forEach(neighbor => {
              neighbor.tileType.bombProbability = 100;
            });
          }
          // STEP 2: Check if all closed neighbors are safe
          let potentialBombNeighbors = this.getClosedNeighbors(row, col);
          let confirmedBombTiles = potentialBombNeighbors.filter(neighbor => neighbor.tileType.bombProbability === 100);
          if (confirmedBombTiles.length === this.getIntValue(tile.tileType)) {
            potentialBombNeighbors.forEach(neighbor => {
              if (!confirmedBombTiles.includes(neighbor)) {
                neighbor.tileType.bombProbability = 0;
              }
            });
          }
          // STEP 3: electric boogaloo
          let closedNeigbors = this.getClosedNeighbors(row, col);
          let bombTiles = [];
          let safeTiles = [];
          let unkTiles = [];
          //get lists of different types of neighbors
          closedNeigbors.forEach(tile => {
            if (tile.tileType.bombProbability == 100) {
              bombTiles.push(tile)
            } else if (tile.tileType.bombProbability == 0) {
              safeTiles.push(tile)
            } else if (tile.tileType.bombProbability == undefined) {
              unkTiles.push(tile)
            }
          })
          //Only save unknown neigbors if len = 2 and 1 bomb ie. 50-50
          if (unkTiles.length == 2 && this.getIntValue(this.grid[row][col].tileType) - bombTiles.length == 1) {
            this.grid[row][col].tileType.unkTiles = unkTiles;
          }
          if (unkTiles.length == 3) {
            let openNeighbors = this.getOpenNeigbhors(row, col);
            openNeighbors.forEach(tile => {
              if (tile.tileType.unkTiles && tile.tileType.unkTiles.length == 2) {
                // Check if the two unkTiles in the tile are also in the list of 3 unkTiles
                let matchCount = 0;
                for (let i = 0; i < 2; i++) {
                  if (unkTiles.includes(tile.tileType.unkTiles[i])) {
                    matchCount++;
                  }
                }
                if (matchCount == 2) {
                  let thirdUnkTile = unkTiles.find(unkTile => !tile.tileType.unkTiles.includes(unkTile));
                  if (this.grid[row][col].tileType.TWO && bombTiles.length == 0) {
                    thirdUnkTile.tileType.bombProbability = 100;
                    console.log('101');
                  } else if (this.grid[row][col].tileType.ONE) {
                    thirdUnkTile.tileType.bombProbability = 0;
                    console.log('102');
                  }
                }
              }
            });
          }
        }
      }
    }
    return this.grid;
  }


  autoPlay() {
    let didSomth = false
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col].tileType.bombProbability == 0 && !this.grid[row][col].isOpen) {
          this.openTile(row, col)
          didSomth = true
          
        } else if (this.grid[row][col].tileType.bombProbability == 100 && !this.grid[row][col].isOpen) {
          this.grid[row][col].tileType.FLAG = true;
          didSomth = true
      

        } else if (this.grid[row][col].tileType.bombProbability == 101 && !this.grid[row][col].isOpen) {
          this.grid[row][col].tileType.FLAG = true;
          didSomth = true
           

        } else if (this.grid[row][col].tileType.bombProbability == 102 && !this.grid[row][col].isOpen) {
          this.openTile(row, col)
          didSomth = true
        }
      }
    }

    if (!didSomth) {
        // If no action was taken, terminate the recursion
        console.log("No action taken, stopping autoplay");
       return false;
      } else {
        // If an action was taken, continue autoplay after a delay of 1 second
        return this.grid;
        
      }
    }
}