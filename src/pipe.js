"use strict";

// var image = new Image();
// image.src = 'assets/pipes.png';

/**
 * @module exports the pipe class
*/
module.exports = exports = Pipe;
var score = 0;
var level = 1;

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
  this.type = type;
  this.score = score;
  this.level = level;
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