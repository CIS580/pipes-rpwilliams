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
 
  startPipe = pipes.push(new Pipe("vertical", {x:10, y:0} ));
  endPipe = pipes.push(new Pipe("end", {x :800, y:400} ));
}
init();


canvas.onclick = function(event) {
  event.preventDefault();
  // TODO: Place or rotate pipe tile
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
  
}
