(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



},{"./game":2,"./pipe.js":3}],2:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],3:[function(require,module,exports){
"use strict";

// var image = new Image();
// image.src = 'assets/pipes.png';

/**
 * @module exports the pipe class
 */
 module.exports = exports = Pipe;
 var get_type;

/**
 * @constructor Pipe
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
 function Pipe(type, position) {
 	this.x = position.x;
  	this.y = position.y;
  	this.frame = 0;
  	this.timer = 0;
  	this.width  = 64;
	this.height = 64;
  	this.spritesheet  = new Image();

  	/* 
  		Direction of the pipe 

  		The following images were created by Naarshakta and
  		are used under the creative commons license.
  		Source: http://opengameart.org/content/puzze-pipe-set
  	*/
  	switch(type) {
  		case "horizontal":
  			this.spritesheet.src = encodeURI('assets/pipe_horizontal.png');
  			break;
  		case "vertical":
  			this.spritesheet.src = encodeURI('assets/pipe_vertical.png');
  			break;
  		case "corner_top_left":
  			this.spritesheet.src = encodeURI('assets/pipe_corner_top_left.png');
  			break;
  		case "corner_top_right":
  			this.spritesheet.src = encodeURI('assets/pipe_corner_top_right.png');
  			break;
  		case "corner_bottom_left":
  			this.spritesheet.src = encodeURI('assets/pipe_corner_bottom_left.png');
  			break;
  		case "corner_bottom_right":			
  			this.spritesheet.src = encodeURI('assets/pipe_corner_bottom_right.png');
  			break;
  		case "start":			
  			this.spritesheet.src = encodeURI('assets/spr_c2_start.png');
  			break;
  		case "end":			
  			this.spritesheet.src = encodeURI('assets/pipe_end.png');
  			break;
  	}
  	
 }

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Pipe.prototype.update = function(time) {
  
}


/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Pipe.prototype.render = function(time, ctx) {
	ctx.drawImage(
    // image
    this.spritesheet,
    // source rectangle
    0, 0, this.width*2, this.height*2,
    // destination rectangle
    this.x, this.y, this.width*2, this.height*2
  );
}
},{}]},{},[1]);
