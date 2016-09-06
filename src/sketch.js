import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import Board from './components/Board';
import Piece from './components/Piece';

const sketch = (p5) => {
	// make library globally available
	window.p5 = p5;

	// palette
	let boardColor, pieceColor;

	// state
	let solved;

	// board parts
	let board;
	let boardX, boardY;
	let columns = 3, rows = 3;
	let pieceCount = 8;
	let pieces = new Array(pieceCount);
	let boardSize, pieceSize;
	
	// layout
	let frameX, frameY;
	let pieceLocations = new Array(9);

	// interactivity
	let click = {};

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		boardColor = p5.color(255);
		pieceColor = p5.color(155);

		// determine sizes and layout based on window w and h
		// todo: draw small square for desktop views
		if (p5.width <= p5.height) {
			// when window is portrait or square...
			frameX = 0;
			frameY = (p5.height - p5.width)/2;
			boardSize = p5.width;
			boardX = 0;
			boardY = frameY;
			pieceSize = boardSize/columns;

			// generate piece locations
			let index = 0;
			for(var gridY = 0; gridY < columns; gridY++) {
				for(var gridX = 0; gridX < rows; gridX++) {

					let x = boardSize/columns * gridX + frameX;
					let y = boardSize/rows * gridY + frameY;

					pieceLocations[index] = new Object;
					pieceLocations[index].x = x;
					pieceLocations[index].y = y;
					// console.log("location " + index + " x: " + pieceLocations[index].x + " y: " + pieceLocations[index].y);
					index++;
				}
			}
		} else {
			// landscape
			boardSize = p5.height;
		}

		// init objects
		board = new Board(boardX, boardY, boardSize, boardColor);
		for(var i = 0; i < pieces.length; i++) {
			pieces[i] = new Piece(i, pieceSize, pieceLocations[i]);
		}
	}

	p5.draw = () => {
		p5.background(p5.color(252, 182, 157), 35);
		board.display();

		pieces.forEach(function(p) {
			p.display(pieceLocations);
		});
	}

	p5.mouseReleased = () => {
		clickCheck(p5.mouseX, p5.mouseY);
	}


	function clickCheck(x, y) {
		// check if mouse/touch is inside piece
		pieces.forEach(p => p.isClicked(x, y));
	}
}

new p5(sketch);