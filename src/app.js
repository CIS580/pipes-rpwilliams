"use strict";

/* Classes */
const Game = require('./game');
const Pipe = require('./pipe.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);

var pipes = []; // The array of pipes
var startPipe;  // The starting pipe at the top left
var endPipe;    // The ending pipe at the bottom right
var filledCell = []; // 2D array of the cells that have been visited

/* This is dependent on the grid size */
const MAX_ROWS = 4;
const MAX_COLUMNS = 7;
const CELL_SIZE = 130;



function init() {
  // Initialize the 2D array
  for(var i = 0; i < MAX_COLUMNS; i++) { 
    filledCell[i] = [];
  }
  
  // Initialize each index in above 2D array to false
  for(var i = 0; i < MAX_ROWS; i++) { 
    for(var j = 0; j < MAX_COLUMNS; j++) { 
      filledCell[i][j] = false;
    }
  }

  startPipe = pipes.push(new Pipe("horizontal", {x:0, y:0} ));
  endPipe = pipes.push(new Pipe("end", {x :800, y:400} ));

  filledCell[0][0] = true;
  filledCell[3][5] = true;

  /* 
    Audio used under the public domain license by Kevin MacLeod
    https://gamesounds.xyz/?dir=Public%20Domain/Ambient
  */
  var audio = new Audio('assets/Ambient B.mp3');
  audio.play();
  
  // console.log("(" + 3 + "," + 5 + ") " + filledCell[2][5]);
}
init();

canvas.onclick = function(event) {
    event.preventDefault();


    var audio = new Audio('assets/Pickup_Coin.wav');
    audio.play();

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    console.log("X" + mouseX);
    console.log("Y" + mouseY);


    // TODO: Place or rotate pipe tile
    addPipesWhenClicked(mouseX, mouseY);
  }


// canvas.onclick = function(event) {
//   event.preventDefault();

//   var mouseX = event.clientX;
//   var mouseY = event.clientY;

//   console.log("X" + mouseX);
//   console.log("Y" + mouseY);


//   // TODO: Place or rotate pipe tile
//   addPipeWhenClicked(mouseX, mouseY);

//   // // Tile 2
//   // if(mouseX <= 265 && mouseY <= 130)
//   // {
//   //   pipes.push(new Pipe(random, {x: 131, y: .5}));
//   //   filledCell[0][1] = true;
//   // }
//   // // Tile 3
//   // else if(mouseX <= 535 && mouseY <= 130)
//   // {
//   //   pipes.push(new Pipe(random, {x: 266, y: .5}));
//   // }
// }

function addPipesWhenClicked(mouseX, mouseY)
{
  var random = randomType(Math.floor(Math.random() * 6) + 1);
  var columnLength = 0;
  var rowLength = 130;
  for(var i = 0; i < MAX_ROWS; i++)
  {
    for(var j = 0; j < MAX_COLUMNS; j++)
    {
      // if(filledCell[i][j])
      // {
      //   pipes[2].type = random;
      // }

      // Add a pipe where the mouse was clicked
      if(mouseX <= rowLength + CELL_SIZE && mouseX >= rowLength
        && mouseY <= columnLength + CELL_SIZE && mouseY >= columnLength)
      {        
        pipes.push(new Pipe(random, {x: rowLength + 1, y: columnLength + .5}));
        filledCell[i][j] = true;
        console.log("(" + i +  "," + j + ") : " + filledCell[i][j]);
        console.log("rowLength: " + rowLength);
        console.log("columnLength: " + columnLength);
      }
      rowLength += CELL_SIZE;  
    }
    rowLength = 0;  // Reinitialize the row length
    columnLength += CELL_SIZE;
  }
    //console.log("MouseY: " + mouseY);
    //console.log("Column Length: " + columnLength);
}



function randomType(randomNum) {
  switch(randomNum)
  {
    case 1:
      return "horizontal"; 
    case 2:
      return "vertical";
    case 3:
      return "corner_top_left";
    case 4:
      return "corner_top_right"
    case 5:
      return "corner_bottom_left";
    case 6:
      return "corner_bottom_right";
  }
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  for(var i = 0; i < pipes.length; i++)
  {
    pipes[i].update(elapsedTime);
    document.getElementById('score').innerHTML = "Score: " + pipes[i].score;
    document.getElementById('level').innerHTML = "Level: " + pipes[i].level;
  }
  

  // TODO: Advance the fluid
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "#777777";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < pipes.length; i++)
  {
    pipes[i].render(elapsedTime, ctx);
  }

  // // Tile 2
  // if(mouseX <= 265 && mouseY <= 130)
  // {
  //   pipes.push(new Pipe(random, {x: 131, y: .5}));
  //   filledCell[0][1] = true;
  // }
  // // Tile 3
  // else if(mouseX <= 535 && mouseY <= 130)
  // {
  //   pipes.push(new Pipe(random, {x: 266, y: .5}));
  // }

  
  // var iPos = 0;
  // var jPos = 0;
  // for(var i = 0; i < MAX_ROWS; i++)
  // {
  //   for(var j = 0; j < MAX_COLUMNS; j++)
  //   {
  //     jPos += CELL_SIZE;
  //     if(filledCell[i][j])
  //     {
  //       ctx.fillRect(iPos, jPos, CELL_SIZE - 1, CELL_SIZE - 1);
  //     }
  //     // console.log("(" + i + "," + j + ") :" + filledCell[i][j]);
  //     // console.log("iPos: " + iPos);
  //     // console.log("jPos: " + iPos);
  //   }
  // }

  //   iPos += CELL_SIZE;
  

  drawGrid(1024, 600, CELL_SIZE, ctx);
}

function drawGrid(maxX, maxY, cellSize, ctx)
{
  for (var x = 0.5; x < maxX; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, maxY);
  }
  for (var y = 0.5; y < maxY; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(maxX, y);
  }

  ctx.strokeStyle = "#ddd";
  ctx.stroke();
}


