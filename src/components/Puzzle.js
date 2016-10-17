import Piece from './Piece'
import GhostPiece from './GhostPiece';
import Helpers from './Helpers';
import Clock from './Clock';

export default class Puzzle {

	constructor(layout, bpm, fps, backColor, frontColor, sounds, images) {
		this.x = layout.x;
		this.y = layout.y;
		this.size = layout.puzzleSize;
		this.color = backColor;

		this.pieceLocations = layout.pieceLocations;
		this.pieces = this.createPieces(this.pieceLocations, layout.pieceSize, backColor, frontColor, sounds, images);
		this.arranging = true;
		this.pieceToArrange = 0;

		// sequencer
		this.clock = new Clock(bpm, fps);
	}

	display(started, transition) {
		if (started && !transition) {
			this.clock.run(this.pieces, GhostPiece);
			this.displayBoard();
			if (this.arranging) {
				if (this.pieces[this.pieceToArrange].playCount === 1 && !this.pieces[this.pieceToArrange].isPlaying()) {
					this.arrange(this.pieceToArrange);
					this.pieceToArrange++;
				}
			}
			this.pieces.forEach(p => p.update());
			this.pieces.forEach(p => p.display());
		}
	}

	displayBoard() {
		p5.fill(255);
		p5.noStroke();
		p5.rect(this.x, this.y, this.size, this.size);
	}
	
	createPieces(pieceLocations, pieceSize, backColor, frontColor, sounds, images) {
		let pieces = new Array(pieceLocations.length);
		let randomIndices = Helpers.generateRandomIndices(pieceLocations.length);
		let polarity = Helpers.countInversions(randomIndices);

		// make sure puzzle is solvable, see Helpers.js for more info
		while (!Helpers.isEven(polarity)) {
			randomIndices = Helpers.generateRandomIndices(pieceLocations.length);
			polarity = Helpers.countInversions(randomIndices);
			// console.log(polarity);
			// console.log(Helpers.isEven(polarity));
		}

		// for (var i = 0; i < pieceLocations.length; i++) {
		// 	if (randomIndices[i] === 8) {
		// 		pieces[i] = new GhostPiece(i, pieces.length-1, pieceSize, pieceLocations[i], backColor, frontColor, sounds, images);
		// 	} else {
		// 		pieces[i] = new Piece(i, randomIndices[i], pieceSize, pieceLocations[i], backColor, frontColor, sounds, images);
		// 	}
		// }

		
		for (var i = 0; i < pieceLocations.length; i++) {
			if (i < pieceLocations.length-1) {
				pieces[i] = new Piece(i, randomIndices[i], pieceSize, pieceLocations[i], pieceLocations[randomIndices[i]], backColor, frontColor, sounds, images);
			} else { 
				pieces[i] = new GhostPiece(i, pieces.length-1, pieceSize, pieceLocations[i], pieceLocations[randomIndices[i]], backColor, frontColor, sounds, images);
			}
		}

		return pieces;
	}

	movePiece(x, y) {
		let solved = false;

		// 1. get index of clicked piece
		let indexOfClickedPiece = Helpers.getIndexOfClickedPiece(this.pieces, x, y);
		// console.log(indexOfClickedPiece);

		// 2. get index of ghost piece
		let indexOfGhostPiece = Helpers.getIndexOfGhostPiece(this.pieces, GhostPiece);
		// console.log(indexOfGhostPiece);

		// 3. if piece is not ghost piece, check if it can move
		let canMove = Helpers.canPieceMove(this.pieces, indexOfClickedPiece, indexOfGhostPiece);
		// console.log(canMove);
		

		if (canMove) {
			// this.pieces.forEach(p => console.log(p));
			// 4. move
			this.pieces[indexOfClickedPiece].prepMovement(this.pieces[indexOfGhostPiece].getPosition());
			this.pieces[indexOfGhostPiece].prepMovement(this.pieces[indexOfClickedPiece].getPosition());
			// 5. swap in array
			this.pieces = Helpers.swapPiecesInArray(this.pieces, indexOfClickedPiece, indexOfGhostPiece);
			// this.pieces.forEach(p => console.log(p));
		} 

		//6. Check if puzzle is solved
		solved = this.isSolved();

		if (solved) {
			return true;
		} else {
			return false;
		}
	}

	arrange(pieceIndex) {
		console.log(this.pieceLocations[this.pieces[pieceIndex].randomIndex]);
		this.pieces[pieceIndex].prepArrangement(this.pieceLocations[this.pieces[pieceIndex].randomIndex]);
	}

	playIntro() {
		this.clock.play(this.pieces[this.pieces.length-2]);
	}

	measureLengthInMs() {
		console.log(this.clock.measure);
		return this.clock.measure;
	}

	getX() {
		return this.x + this.size/2;
	}

	getY() {	
		return this.y + this.size/2;
	}

	getSize() {
		return this.size/2;
	}

	isSolved() {
		let i = 0, inCorrectSpot = 0, bool = false;

		while (i < this.pieces.length) {
			bool = this.pieces[i].isInPlace(i);
			if (bool) inCorrectSpot++;
			i++;
		}

		if (inCorrectSpot === this.pieces.length) {
			bool = true;
		} else {
			bool = false;
		}

		console.log('solved: ' + bool + " inSpot: " + inCorrectSpot);

		return bool;
	}
}