export default class Piece {
		constructor(i, size, location) {
			this.index = i;
			this.size = size;
			this.color = p5.random(0, 200);
			this.position = p5.createVector(location.x, location.y);

			// use index to load image and sound to piece
		}

		display(pieceLocations) {
			p5.fill(this.color);
			p5.rect(this.position.x, this.position.y, this.size, this.size);
		}

		move() {
			// let destination = p5.createVector(to.x, to.y);
			// check if there is an adjacent empty space
			
			// move by adding vectors
		}

		click() {
			this.color = p5.random(0, 200);
		}

		isClicked(x, y) {
			if(x >= this.position.x && x <= this.position.x + this.size && y >= this.position.y && y <= this.position.y + this.size) {
				this.color = p5.random(0, 200);
			}
		}
	}