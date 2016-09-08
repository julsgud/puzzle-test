import Piece from './Piece';

export default class GhostPiece extends Piece {
	constructor(i, realIndex, size, location) {
		super(i, realIndex, size, location);
		this.index = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = '#3366cc';
		this.position = p5.createVector(location.x, location.y);

		// use index to load image and sound to piece
	}
}