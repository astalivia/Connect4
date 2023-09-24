import { Connect4 } from "./Connect4.js";
import { Connect4Game } from "./Connect4Game.js";



let c4 = new Connect4(`focus-${1}`);
let winnerBox = document.getElementsByClassName("winner-box")[0]
let resetBox = document.getElementsByClassName("reset-box")[0]
let chipBox = document.getElementsByClassName("chip-box")[0]
let c4Game = new Connect4Game(c4, winnerBox, resetBox, chipBox)

