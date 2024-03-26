"use strict";
export default class View {
    constructor(controller) {
        this.controller = controller;
    }

    displayGrid(rows, cols) {
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
        this.handleClick(cols)
        this.handleRightClick(cols)
    }
    updateGrid(cols, grid) {
        const tiles = document.querySelectorAll(".tile")
        for (let i = 0; i < tiles.length; i++) {
            const tileData = grid[Math.floor(i / cols)][i % cols]
            if (tileData.isOpen) {
                if (tileData.tileType.BOMB) {
                    this.addImageToDiv(tiles[i], "view/img/bombExplode.png");
                } else if (tileData.tileType.ZERO) {
                    this.addImageToDiv(tiles[i], "view/img/tileOpen.png");
                } else if (tileData.tileType.ONE) {
                    this.addImageToDiv(tiles[i], "view/img/1.png");
                } else if (tileData.tileType.TWO) {
                    this.addImageToDiv(tiles[i], "view/img/2.png");
                } else if (tileData.tileType.THREE) {
                    this.addImageToDiv(tiles[i], "view/img/3.png");
                } else if (tileData.tileType.FOUR) {
                    this.addImageToDiv(tiles[i], "view/img/4.png");
                } else if (tileData.tileType.FIVE) {
                    this.addImageToDiv(tiles[i], "view/img/5.png");
                } else if (tileData.tileType.SIX) {
                    this.addImageToDiv(tiles[i], "view/img/6.png");
                } else if (tileData.tileType.SEVEN) {
                    this.addImageToDiv(tiles[i], "view/img/7.png");
                } else if (tileData.tileType.EIGHT) {
                    this.addImageToDiv(tiles[i], "view/img/8.png");
                }

                // if tile is open show tileData
                // else tile is closed show closedTile
            } else if (!tileData.isOpen) {
                if (tileData.tileType.FLAG) {
                    this.addImageToDiv(tiles[i], "view/img/flag.png");
                } else if (!tileData.tileType.FLAG) {
                    this.addImageToDiv(tiles[i], "view/img/tileClosed.png");
                }
            }
        }
    }

    handleClick(cols) {
        //if tile is open dont send request to controller
        document.querySelector("#boardContainer").addEventListener("click", (event) => {
            let tile = event.target
            let tiles = document.querySelectorAll("#boardContainer .tile")

            let index = Array.from(tiles).indexOf(tile)
            let row = Math.floor(index / cols)
            let col = Math.floor(index % cols)

            if (row >= 0 && col >= 0) {
                this.controller.handleLeftClick(row, col)
            }
        })
    }

    handleRightClick(cols) {
        //if tile is open dont send request to controller

        document.querySelector("#boardContainer").addEventListener("contextmenu", (event) => {
            event.preventDefault();
            let tile = event.target
            let tiles = document.querySelectorAll("#boardContainer .tile")

            let index = Array.from(tiles).indexOf(tile)
            let row = Math.floor(index / cols)
            let col = Math.floor(index % cols)

            if (row >= 0 && col >= 0) {
                this.controller.flagTile(row, col)
            }
        })
    }
    addImageToDiv(div, imagePath) {
        div.style.backgroundImage = `url(${imagePath})`;
    }
}
