import Piece from './Piece'
import GhostPiece from './GhostPiece';
import Helpers from './Helpers';
import Clock from './Clock';

export default class Puzzle {

	constructor(layout, bpm, fps, backColor, frontColor, sounds) {
		this.x = layout.x;
		this.y = layout.y;
		this.size = layout.puzzleSize;
		this.color = backColor;

		this.pieceLocations = layout.pieceLocations;
		this.pieces = this.createPieces(this.pieceLocations, layout.pieceSize, backColor, frontColor, sounds);
		this.moving = false;

		// sequencer
		this.clock = new Clock(bpm, fps);
	}

	display(amp) {
		this.clock.run(this.pieces, GhostPiece);
		this.displayBoard();
		this.pieces.forEach(p => p.update());
		this.pieces.forEach(p => p.display(amp));
	}

	displayBoard() {
		p5.fill(255);
		p5.noStroke();
		p5.rect(this.x, this.y, this.size, this.size);
	}
	
	createPieces(pieceLocations, pieceSize, backColor, frontColor, sounds) {
		let pieces = new Array(pieceLocations.length);
		let randomIndices = Helpers.generateRandomIndices(pieceLocations.length);
		// console.log(randomIndices);

		for (var i = 0; i < pieceLocations.length; i++) {
			if (randomIndices[i] === 8) {
				pieces[i] = new GhostPiece(i, pieces.length-1, pieceSize, pieceLocations[i], backColor, frontColor);
			} else {
				pieces[i] = new Piece(i, randomIndices[i], pieceSize, pieceLocations[i], backColor, frontColor, sounds);
			}
		}

		return pieces;
	}

	movePiece(x, y, moving) {
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

		} else {
			// try again
		}
	}
}