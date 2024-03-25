"use strict";

import Model from "../model/model.js";
import View from "../view/view.js";

export default class Controller {
  constructor() {
    this.model = new Model(30, 16, 99);
    this.view = new View(this);
  }

  init() {
    this.model.initGrid();
    const grid = this.model.grid;
    this.view.displayGrid(this.model.rows,this.model.cols);
  }
  openTile(row, col){
    this.model.openTile(row, col)
    let newGrid = this.model.grid
    this.view.updateGrid(this.model.cols, newGrid)
  }
}
