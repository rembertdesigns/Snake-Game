
// ADD time?

var snakeTable = document.querySelector(".snakeTable");
var boxes = document.getElementsByClassName("box");
var modul = document.querySelector(".modul");
var start = document.querySelector(".start");

var table = {
  rowsCols: 21,
  boxes: 21*21
};

var snake = {
  direction: "right",
  position: [[6,10], [7,10], [8,10], [9,10], [10,10]],
  interval: 200,
  food: 0,
  score: 0,
  final: 0,
  time: 0,
  canTurn: 0,
  init: function() {
    snake.direction = "right";
    snake.position = [[6,10], [7,10], [8,10], [9,10], [10,10]];
    snake.interval = 200;
    snake.food = 0;
    snake.score = 0;
    snake.time = 0;
    snake.canTurn = 0;
    snakeTable.innerHTML = "";
    tableCreation();
  }
};

// init game
snake.init();

start.addEventListener("click", startSnake);

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 13 && snake.time === 0) {
    startSnake();
  }
});

// start game
function startSnake() {
    modul.classList.add("hidden");
    // clearInterval(checkPageInterval);
    snake.time = 1;
    renderSnake();
    randomFood();
    // interval, heart of the game
    setInt = setInterval(function() {
      move();
    }, snake.interval);
  }
  
  // end of game
  function stopp() {
    clearInterval(setInt);
    snake.final = snake.score;
    start.querySelector("span").innerHTML = snake.final + " Points !";
    setTimeout(function() {
      start.querySelector("span").innerHTML = "Play Snake";
    }, 1500);
    snake.init();
    modul.classList.remove("hidden");
  }
  
  // move the snake function
  function move() {
    // check if move allowed & then eat food
    hitFood();
    hitBorder();
    hitSnake();
    // actually move the snake
    updatePositions();
    renderSnake();
    document.addEventListener("keydown", turn);
    snake.canTurn = 1;
  }
  
  function updatePositions() {
    // remove last snake part (first snake pos)
    boxes[snake.position[0][0] + snake.position[0][1] * table.rowsCols].classList.remove("snake");
    snake.position.shift();
    // add new snake part
    var head = snake.position[snake.position.length - 1];
    switch (snake.direction) {
      case "left":
        snake.position.push([head[0] - 1, head[1]]);
        break;
      case "up":
        snake.position.push([head[0], head[1] - 1]);
        break;
      case "right":
        snake.position.push([head[0] + 1, head[1]]);
        break;
      case "down":
        snake.position.push([head[0], head[1] + 1]);
        break;
      default:
        console.log("no direction !");
    }
  }