export default class Clock {
	constructor(bpm, fps) {
		this.bpm = bpm;
		this.quarterNote = 60000/this.bpm;
		this.measure = Math.floor(this.quarterNote*4);
		this.currentPiece = 0;
		this.lastTime = 0;
	}

	run(pieces, GhostPiece, solved) {
		/* on run, play next piece if a full measure
		has elapsed since last event*/

		if (!solved) {
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
		}
	}

	stopAll(pieces) {
		for (let i = 0; i < pieces.length-1; i++) {
			pieces[i].mute();
		}
	}
}
