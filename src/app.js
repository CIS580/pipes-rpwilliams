"use strict";

/* Classes */
const Game = require('./game');
const Pipe = require('./pipe.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);

var pipes = [];
var startPipe;
var endPipe;
//var pipe = new Pipe({x: 0, y: 0});

function init() {
 
  startPipe = pipes.push(new Pipe("corner_top_left", {x:0, y:0} ));
  endPipe = pipes.push(new Pipe("end", {x :800, y:400} ));
}
init();


canvas.onclick = function(event) {
  event.preventDefault();
  // TODO: Place or rotate pipe tile
  console.log(event.clientX);
  console.log(event.clientY);
  var random = randomType(Math.floor(Math.random() * 6) + 1);
  console.log(random);
  pipes.push(new Pipe(random, {x: event.clientX, y: event.clientY}));
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
  
  createGrid(1024, 600, 130, ctx);
}

function createGrid(maxX, maxY, squareSize, ctx)
{
  for (var x = 0.5; x < maxX; x += squareSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, maxY);
  }
  for (var y = 0.5; y < maxY; y += squareSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(maxX, y);
  }

  ctx.strokeStyle = "#ddd";
  ctx.stroke();
}


