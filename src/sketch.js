import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

const sketch = (p5) => {
	// make library globally available
	window.p5 = p5;

	// palette
	let boardColor, pieceColor;

	// state
	let solved;

	// puzzle parts
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
			pieceSize = boardSize/pieceCount;

			// generate piece locations
			for(var gridY = 0; gridY < columns; gridY++) {
				for(var gridX = 0; gridX < rows; gridX++) {

					let x = boardSize/pieceCount * gridX + frameX;
					let y = boardSize/pieceCount * gridY + frameY;

					let currentLocation = (gridX+1) * (gridY+1);

					pieceLocations[currentLocation] = new Object;
					pieceLocations[currentLocation].x = x;
					pieceLocations[currentLocation].y = y;
					console.log("location " + currentLocation + " x: " + pieceLocations[currentLocation].x + " y: " + pieceLocations[currentLocation].y);

				}
			}
		} else {
			// landscape
			boardSize = p5.height;
		}

		board = new Board(boardX, boardY, boardSize, boardColor);
	}

	p5.draw = () => {
		p5.background(p5.color(252, 182, 157), 35);
		board.display();
	}

	p5.mousePressed = () => {
		click.x = p5.mouseX;
		click.y = p5.mouseY;
	}

	class Piece {
		constructor(i, size, color) {
			this.index = i;
			this.size = size;
			this.color = color;
			this.currentLocation = pieceLocations[this.index];

			// use index to load image and sound to piece
		}

		display() {
			p5.fill(this.color);
			p5.rect(this.x, this.y, this.size, this.size);
		}

		move(from, to) {

		}
	}

	class Board {
		constructor(x, y, size, color) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.color = color;
		}

		display() {
			p5.noStroke();
			p5.fill(255);
			p5.rect(this.x, this.y, this.size, this.size);
		}
	}
}

new p5(sketch);