"use strict";
export default class View {
    constructor(controller) {
        this.controller = controller;
    }

    initEventListenters(cols) {
        const smileyBtn = document.querySelector("#smileyBtn");
        const boardContainer = document.querySelector("#boardContainer")

        smileyBtn.addEventListener("click", () => this.resetGame())
        boardContainer.addEventListener("click", (event) => this.handleClick(cols, event));
        boardContainer.addEventListener("contextmenu", (event) => this.handleRightClick(cols, event));


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

    }
    updateGrid(cols, grid) {
        const tiles = document.querySelectorAll(".tile")
        for (let i = 0; i < tiles.length; i++) {
            const tileData = grid[Math.floor(i / cols)][i % cols]
            if (tileData.isOpen) {
                if (tileData.tileType.WRONG_FLAG) {
                    this.addImageToDiv(tiles[i], "view/img/bombRedCross.png")
                } else if (tileData.tileType.BOMB && !tileData.tileType.CLICKED_BOMB && !tileData.tileType.FLAG) {
                    this.addImageToDiv(tiles[i], "view/img/bomb.png");
                } else if (tileData.tileType.CLICKED_BOMB) {
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

    handleClick(cols, event) {
        //if tile is open dont send request to controller

        let tile = event.target
        let tiles = document.querySelectorAll("#boardContainer .tile")

        let index = Array.from(tiles).indexOf(tile)
        let row = Math.floor(index / cols)
        let col = Math.floor(index % cols)

        if (row >= 0 && col >= 0) {
            this.controller.handleLeftClick(row, col)
        }

    }

    handleRightClick(cols, event) {
        //if tile is open dont send request to controller
        event.preventDefault();
        let tile = event.target
        let tiles = document.querySelectorAll("#boardContainer .tile")

        let index = Array.from(tiles).indexOf(tile)
        let row = Math.floor(index / cols)
        let col = Math.floor(index % cols)

        if (row >= 0 && col >= 0) {
            this.controller.flagTile(row, col)
        }

    }

    resetGame() {
        //const boardContainer = document.querySelector("#boardContainer");
        const smileyBtn = document.querySelector("#smileyBtn");
        this.addImageToDiv(smileyBtn, "view/img/faceHappy.png");

        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(function (element) {
            element.remove();
        })
        this.controller.reset();
    }
    killSmiley() {
        const smileyBtn = document.querySelector("#smileyBtn");
        this.addImageToDiv(smileyBtn, "view/img/faceDead.png");
    }


    addImageToDiv(div, imagePath) {
        div.style.backgroundImage = `url(${imagePath})`;
    }

    updateTimerDisplay() {
        let time = this.controller.getTime()
        let oneNum = document.querySelector("#timer1Num")
        let tenNum = document.querySelector("#timer10Num")
        let hundredNum = document.querySelector("#timer100Num")

        let timeString = time.toString()

        if (time < 10) {//update one
            this.addImageToDiv(oneNum, "view/img/topbarNum" + timeString.charAt(0) + ".png");
        } else if (time >= 10 && time < 100) {//update oneNum & tenNum
            this.addImageToDiv(oneNum, "view/img/topbarNum" + timeString.charAt(1) + ".png");
            this.addImageToDiv(tenNum, "view/img/topbarNum" + timeString.charAt(0) + ".png");
        } else if (time >= 100) {//update oneNum & tenNum & hundredNum
            this.addImageToDiv(oneNum, "view/img/topbarNum" + timeString.charAt(2) + ".png");
            this.addImageToDiv(tenNum, "view/img/topbarNum" + timeString.charAt(1) + ".png");
            this.addImageToDiv(hundredNum, "view/img/topbarNum" + timeString.charAt(0) + ".png");
        }
    }
    updateRemainingBombDisplay() {
        let remainingBombAmount = this.controller.getRemainingBombs()
        let oneNum = document.querySelector("#bombLeft1Num")
        let tenNum = document.querySelector("#bombLeft10Num")

        let bombAmountString = remainingBombAmount.toString()

        if (remainingBombAmount < 10) {
            this.addImageToDiv(oneNum, "view/img/topbarNum" + bombAmountString.charAt(0) + ".png");
        } else if (remainingBombAmount >= 10) {
            this.addImageToDiv(oneNum, "view/img/topbarNum" + bombAmountString.charAt(1) + ".png");
            this.addImageToDiv(tenNum, "view/img/topbarNum" + bombAmountString.charAt(0) + ".png");
        }

    }
    resetTimer() {
        let oneNum = document.querySelector("#timer1Num")
        let tenNum = document.querySelector("#timer10Num")
        let hundredNum = document.querySelector("#timer100Num")
        this.addImageToDiv(oneNum, "view/img/topbarNum" + 0 + ".png");
        this.addImageToDiv(tenNum, "view/img/topbarNum" + 0 + ".png");
        this.addImageToDiv(hundredNum, "view/img/topbarNum" + 0 + ".png");
    }

    showProbabilities(grid, cols) {
        const tiles = document.querySelectorAll(".tile")

        for (let i = 0; i < tiles.length; i++) {
            const tileData = grid[Math.floor(i / cols)][i % cols]
            tiles[i].textContent = tileData.tileType.bombProbability;

            if (tileData.isOpen) {
                tiles[i].textContent = "";
            }

        }
        this.updateGrid(cols, grid)
    }

    setUpTopBar() {//TODO
        //when click start timer
        //listen on smiley
        //mine counter
    }

    

}
