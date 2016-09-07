import Piece from './Piece'
import GhostPiece from './GhostPiece';
import Helpers from './Helpers';

export default class Puzzle {

	constructor(layout) {
		this.x = layout.x;
		this.y = layout.y;
		this.size = layout.puzzleSize;
		this.pieceLocations = layout.pieceLocations;
		this.ghostPieceIndex = null;
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
				this.ghostPieceIndex = i;
				pieces[i] = new GhostPiece(i, pieces.length-1, pieceSize, pieceLocations[i]);
			} else {
				pieces[i] = new Piece(i, randomIndices[i], pieceSize, pieceLocations[i]);
			}
		}

		return pieces;
	}

	clickCheck(x, y) {
		let ghostPieceLocation;

		// get index of clicked piece
		let p = 0, clickedIndex = null, current = null;
		while(p < this.pieces.length && !current) {
			let current = this.pieces[p].isClicked(x, y);
			if (current) clickedIndex = p; 
			p++;
		}

		// if piece other than ghost piece is clicked, check if it can move
		let canMove = false;
		if (this.pieces[clickedIndex].getRealIndex() < this.pieces.length-1) {
			// TODO: disable click check until move is complete
			// console.log('ghost piece at ' + this.ghostPieceIndex);
			ghostPieceLocation = this.pieces[this.ghostPieceIndex].getPosition();
			canMove = this.pieces[clickedIndex].isAdjacentToGhostPiece(ghostPieceLocation);
		} else {
			// TODO: tell peeps to click on an image
			// console.log('ghost piece');
		}

		// move when true
		if (canMove) { 
			// move
			// let movingPieceLocation = this.pieces[clickedIndex].getPosition();
			// this.pieces[clickedIndex].move(ghostPieceLocation);
			// this.pieces[this.ghostPieceIndex].move(movingPieceLocation);

			// then swap element in array
			console.log(this.pieces.length);
			let movingPiece = this.pieces.splice(clickedIndex, 1);
			console.log(movingPiece + ' ' + this.pieces.length);
			let ghostPiece = this.pieces.splice(this.ghostPieceIndex - 1, 1);
			console.log(ghostPiece);

			console.log('can move');
		} else {

			console.log('cant move');
		}
	}

	isPieceAdjacentToGhostPiece() {

	}
}