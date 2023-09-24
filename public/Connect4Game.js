import { Connect4 } from "./Connect4.js";


export class Connect4Game {

    constructor(connect4, winnerBox, resetBox, chipBox) {
        this.connect4 = connect4;
        this.winnerBox = winnerBox;
        this.resetBox = resetBox;
        this.chipBox = chipBox;
        this.winner = null;
        this.player = 1;
        this.gameOngoing = true;
        this.printTurn(this.player);
        this.connect4.focus.addEventListener("click", (e) => {
            this.performAction(e);
        })
        this.resetBox.addEventListener("click", () => {this.reset()});
    }

    switchPlayer(player) {
        if (player == undefined) {
            this.player = this.player == 0 ? 1 : 0
        }
        else {
            this.player = player;
        }
    }

    reset() {
        this.connect4.clearBoard();
        this.player = 1;
        this.printTurn(this.player);
        this.winner = null;
        this.gameOngoing = true;
    }

    async performAction(e) {
        if (!this.gameOngoing) {
            return;
        }
        let colIndex = parseInt(e.offsetX*7/this.connect4.focus.clientWidth);
        let location = await this.connect4.dropChip(this.player == 1 ? "yellow" : "red", colIndex);
        if (location == null) {
            return null;
        }
        if (this.checkForWinner(location)) {
            this.winner = this.player;
            console.log("winner:", this.player);
            this.printWinner(this.player);
            this.gameOngoing = false;
        }          
        else {
            this.switchPlayer();
            this.printTurn(this.player);
        }
    }

    printTurn(player) {
        this.chipBox.children[this.player].classList.add("selected");
        this.chipBox.children[this.player == 0 ? 1 : 0].classList.remove("selected");
        this.winnerBox.innerHTML = `${this.player == 0 ? "<span style='color: red'>red's</span>" : "<span style='color: yellow'>yellow's</span>"} turn`;
    }

    printWinner(player) {
        this.winnerBox.innerHTML = `winner: ${
            this.player == 0 ? "<span style='color: red'>red</span>" : "<span style='color: yellow'>yellow</span>"
        }`;
    }

    checkForWinner(location) {
        console.log(location);
        let chip = this.connect4.chipGrid[location.col][location.row];
        let chipColor = chip.classList.contains("chip-r") ? "r" : "y"
        let directions = [
            [1,1], //top right and bottom left
            [1,0], //right and left
            [1,-1], //bottom right and top left
            [0,-1] //bottom and top
        ]

        let self = this.connect4;
        function countChips(dir) {
            let counter = 0;
            for (let j = 1; j < 4; j++) {
                let targetCoord = {
                    col: location.col + dir[0]*j,
                    row: location.row + dir[1]*j, 
                }
                let targetChip = self.chipGrid[targetCoord.col]?.[targetCoord.row];
                if (targetChip) { //able to pull a chip, now check if colors match
                    let targetColor = targetChip.classList.contains("chip-r") ? "r" : "y";
                    if (chipColor == targetColor) { //chip colors match
                        counter++;
                    } 
                    else { //detected different color, skipped
                        break;
                    }
                }
                else { //detected undefined, skipped
                    break;
                }
            }
            return counter;
        }

        for (let i = 0; i < directions.length; i++) {
            let dir = directions[i];
            let oppDir = [dir[0]*-1, dir[1]*-1];
            let totalCount = countChips(dir) + countChips(oppDir);
            if (totalCount >= 3) {
                return true;
            }
        }
        return false;
    }
}