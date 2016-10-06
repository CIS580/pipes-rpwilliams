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

  startPipe = pipes.push(new Pipe("vertical", {x:0, y:0} ));
  endPipe = pipes.push(new Pipe("end", {x :800, y:400} ));

  filledCell[0][0] = true;
  filledCell[3][5] = true;

  // console.log("(" + 3 + "," + 5 + ") " + filledCell[2][5]);
}
init();


canvas.onclick = function(event) {
  event.preventDefault();

  var mouseX = event.clientX;
  var mouseY = event.clientY;

  // TODO: Place or rotate pipe tile
  console.log("X" + mouseX);
  console.log("Y" + mouseY);
  var random = randomType(Math.floor(Math.random() * 6) + 1);
  console.log(random);

  // Tile 2
  if(mouseX <= 265 && mouseY <= 130)
  {
    pipes.push(new Pipe(random, {x: 131, y: .5}));
    filledCell[0][1] = true;
  }
  // Tile 3
  else if(mouseX <= 535 && mouseY <= 130)
  {
    pipes.push(new Pipe(random, {x: 266, y: .5}));
  }
}

// function getCursorPosition(ctx, event) {
//     var rect = canvas.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     console.log("x: " + x + " y: " + y);
// }

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
  
  var iPos = 0;
  var jPos = 0;
  for(var i = 0; i < MAX_ROWS; i++)
  {
    for(var j = 0; j < MAX_COLUMNS; j++)
    {
      jPos += CELL_SIZE;
      if(filledCell[i][j])
      {
        ctx.fillRect(iPos, jPos, CELL_SIZE - 1, CELL_SIZE - 1);
      }
      console.log("(" + i + "," + j + ") :" + filledCell[i][j]);
      console.log("iPos: " + iPos);
      console.log("jPos: " + iPos);
    }
    iPos += CELL_SIZE;
  }

  createGrid(1024, 600, CELL_SIZE, ctx);
}

function createGrid(maxX, maxY, cellSize, ctx)
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


