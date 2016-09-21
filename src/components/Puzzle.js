import Piece from './Piece'
import GhostPiece from './GhostPiece';
import Helpers from './Helpers';

export default class Puzzle {

	constructor(layout) {
		this.x = layout.x;
		this.y = layout.y;
		this.size = layout.puzzleSize;
		this.pieceLocations = layout.pieceLocations;
		this.pieces = this.createPieces(this.pieceLocations, layout.pieceSize);
	}

	display() {
		this.displayBoard();
		this.pieces.forEach(p => p.display());
	}

	displayBoard() {
		p5.fill(255);
		p5.noStroke();
		p5.rect(this.x, this.y, this.size, this.size);
	}
	
	createPieces(pieceLocations, pieceSize) {
		let pieces = new Array(pieceLocations.length);
		let randomIndices = Helpers.generateRandomIndices(pieceLocations.length);
		// console.log(randomIndices);

		for (var i = 0; i < pieceLocations.length; i++) {
			if (randomIndices[i] === 8) {
				pieces[i] = new GhostPiece(i, pieces.length-1, pieceSize, pieceLocations[i]);
			} else {
				pieces[i] = new Piece(i, randomIndices[i], pieceSize, pieceLocations[i]);
			}
		}

		return pieces;
	}

	movePiece(x, y) {
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
			// 4. swap locations
			this.pieces[indexOfClickedPiece].move(this.pieces[indexOfGhostPiece].getPosition());
			// this.pieces[indexOfGhostPiece].move(this.pieces[indexOfClickedPiece].getPosition());
			// 5. swap position in array
		} else {
			// try again
		}
	}
}