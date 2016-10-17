export default class Clock {
	constructor(bpm, fps) {
		this.bpm = bpm;
		this.quarterNote = 60000/this.bpm;
		this.measure = Math.floor(this.quarterNote*4);
		this.currentPiece = 0;
		this.lastTime = 0;
	}

	run(pieces, GhostPiece) {

		/* on run, play next piece if a full measure
		has elapsed since last event*/
		if (p5.millis() - this.lastTime >= this.measure) {

			/* if ghostpiece is next, skip*/
			if (pieces[this.currentPiece] instanceof GhostPiece) {
				this.currentPiece++;
				// wrap piece index when ghost piece is in last spot
				if(this.currentPiece > pieces.length-1) this.currentPiece %= pieces.length;
			} else {
				
				
			}
			pieces[this.currentPiece].play();
			this.currentPiece++;
			this.currentPiece %= pieces.length;
			this.lastTime = p5.millis();
		} 


		// if (this.ms < this.margin && ) {
		// 	// console.log('bang' + ' ' + this.currentPiece + ' ' + this.ms);
		// 	if (pieces[this.currentPiece] instanceof GhostPiece) {
		// 		this.currentPiece++;
		// 		pieces[this.currentPiece].play();
		// 		this.currentPiece++;
		// 	} else {
		// 		pieces[this.currentPiece].play(); 
		// 		this.currentPiece++;
		// 	}
		// 	this.currentPiece %= pieces.length;
		// } else if (this.ms < this.margin*1.3) {
		// 	console.log(this.ms);
		// }
	}

	play(piece) {
		piece.play();
	}
}
