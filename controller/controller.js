"use strict";

import Model from "../model/model.js";
import View from "../view/view.js";

export default class Controller {
  constructor() {
    this.gameStarted = false;
  }

  init() {
    this.model = new Model(30, 16, 75, this);
    this.view = new View(this);

    this.view.initEventListenters(this.model.cols);
    this.model.initGrid();
    this.view.displayGrid(this.model.rows, this.model.cols);
    this.view.updateRemainingBombDisplay()
    this.model.resetTimer();
    this.model.stopTimer();
    //this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)

  }
  reset(){
    this.model = new Model(30, 16, 75, this);
    this.view = new View(this);
    this.gameStarted = false;
    //this.view.initEventListenters(this.model.cols);
    this.model.initGrid();
    this.view.displayGrid(this.model.rows, this.model.cols);
    this.model.resetTimer();
    this.view.updateRemainingBombDisplay()
    this.view.resetTimer()
    this.model.stopTimer();
  }
  openTile(row, col) {
    let newGrid = this.model.openTile(row, col);
    this.view.updateGrid(this.model.cols, newGrid);
  }
  flagTile(row, col) {
    let newGrid = this.model.flagTile(row, col);
    this.view.updateGrid(this.model.cols, newGrid);
    this.view.updateRemainingBombDisplay()
    this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)
  }
  handleLeftClick(row, col) {
    if (this.model.grid[row][col].isOpen) {
      //console.log("should try to chord");
      let newGrid = this.model.chord(row, col)

      //update view
      this.view.updateGrid(this.model.cols, newGrid);
      this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)


      
       
        //this.view.updateGrid(this.model.cols, this.model.autoPlay(this.model.grid));
      



    } else {
      this.handleTimer();
      this.openTile(row, col)
      this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)
    }
  }

  updateView(grid){
    this.view.updateGrid(this.model.cols,grid)
  }

  handleTimer() {
    if (!this.gameStarted) {
      this.model.startTimer();
      this.gameStarted = true;
    }
    setInterval(() => {
      this.view.updateTimerDisplay();
    }, 1000);
  }

  getTime() {
    return this.model.timer;
  }
  getRemainingBombs(){
    return this.model.getRemainingBombsBasedOnFlag()
  }

}
