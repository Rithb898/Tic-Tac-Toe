let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector("main");
let tur = document.querySelector(".turn")

let turnO = true;
let count = 0;
const changeTurn = () => {
  if(turnO){
    tur.innerText = "Turn Of O"
  } else{
    tur.innerText = "Turn Of X"
  }
};
changeTurn();
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  msg.classList.add("hide")
  changeTurn();
  enableBoxes();
};

const newGame = () => {
  newGameBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
  resetGame();
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    changeTurn();

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.classList.remove("hide")
  msg.innerText = `Game was a Draw.`;
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.removeProperty("background-color");
  }
};

const showWinner = (winner) => {
  msg.classList.remove("hide")
  msg.innerText = `Congratulations, Winner is ${winner}`;
  newGameBtn.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
};

const checkWinner = () => {
  let i = 0;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]];
    let pos2Val = boxes[pattern[1]];
    let pos3Val = boxes[pattern[2]];

    let pos1v = pos1Val.innerText;
    let pos2v = pos2Val.innerText;
    let pos3v = pos3Val.innerText;

    if (pos1v != "" && pos2v != "" && pos3v != "") {
      if (pos1v === pos2v && pos2v === pos3v) {
        showWinner(pos1v);
        pos1Val.style.backgroundColor = "#778da9";
        pos2Val.style.backgroundColor = "#778da9";
        pos3Val.style.backgroundColor = "#778da9";
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);
