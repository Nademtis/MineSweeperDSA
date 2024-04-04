"use strict";

import Model from "../model/model.js";
import View from "../view/view.js";

export default class Controller {
  constructor() {
    this.model = new Model(30, 16, 99);
    this.view = new View(this);
    this.gameStarted = false;
  }

  init() {
    this.view.initEventListenters(this.model.cols);
    this.model.initGrid();
    this.view.displayGrid(this.model.rows, this.model.cols);
    //this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)

  }
  openTile(row, col) {
    let newGrid = this.model.openTile(row, col);
    this.view.updateGrid(this.model.cols, newGrid);
  }
  flagTile(row, col) {
    let newGrid = this.model.flagTile(row, col);
    this.view.updateGrid(this.model.cols, newGrid);
    this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)
  }
  handleLeftClick(row, col) {
    if (this.model.grid[row][col].isOpen) {
      //console.log("should try to chord");
      let newGrid = this.model.chord(row, col)

      //update view
      this.view.updateGrid(this.model.cols, newGrid);
      this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)

      for (let index = 0; index < 100; index++) {
        this.model.autoPlay();
        
      }

    } else {
      this.handleTimer();
      this.openTile(row, col)
      this.view.showProbabilities(this.model.calcProbabilities(), this.model.cols)
    }
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

}
