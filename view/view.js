"use strict";
export default class View {
  constructor(controller) {
    this.controller = controller;
  }

  displayGrid(rows, cols, grid) {
    const board = document.querySelector("#boardContainer");

    board.style.setProperty("--GRID_WIDTH", cols);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const tile = document.createElement("div");

        this.addImageToDiv(tile, "view/img/tileClosed.png");

        tile.classList.add("tile");
        board.appendChild(tile);
      }
    }
  }

  addImageToDiv(div, imagePath) {
    div.style.backgroundImage = `url(${imagePath})`;
  }
}
