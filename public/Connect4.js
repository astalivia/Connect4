export class Connect4 {
    

    constructor(focus) {
        this.numRows = 6;
        this.numCols = 7;
        this.chipGrid = [[],[],[],[],[],[],[]];
        this.player = 0;
        this.focus = document.getElementById(focus);
    }

    async dropChip(color, column) {
        if (this.chipGrid[column].length < this.numRows) {
            var row = this.chipGrid[column].length;
        }
        else return null;
        
        let chip = document.createElement("div");
        this.chipGrid[column].push(chip);
        chip.setAttribute("class", `chip chip-${color=="yellow" ? "y" : "r"} c-c-${column+1}`);
        this.focus.appendChild(chip);
        await this.delayMS(100);
        chip.classList.add(`c-r-${this.numRows-row}`);
        let location = {
            col: column,
            row
        }
        return location
    }

    async delayMS(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    async fillBoard() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let chip = await this.dropChip(parseInt(Math.random()*2) == 1 ? "yellow" : "red", j);
            }
        }
    }

    clearBoard() {
        this.chipGrid = [[],[],[],[],[],[],[]];
        this.focus.innerHTML = "";
    }
}