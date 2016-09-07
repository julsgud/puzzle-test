this.position = createVector(location.x, location.y);
this.target = createVector(0, 0);
this.direction = createVector(0, 0);
this.velocity = createVector(0, 0);
this.initVector = createVector(0, 0);


update(to) {
	let dest = createVector(to.x, to.y);
	this.target = dest;

	// calculcate direction by subracting position from target
	let direction = this.target.sub(this.position);

	// find separation based ont the magnitud of the distance vector
	let separation = direction.mag();
	let distance = separation;

	// normalize vector and multiply by speed to get accel
	direction.normalize();
	direction.mult(0.5);

	let acceleration = direction;

	// velocity and limit speed
	this.velocity.add(acceleration);
	this.velocity.limit(2);

	// finally
	this.position.add(this.velocity);

	if(this.position.equals(target)) {
		this.position = target;
		this.target = initVector;
		this.direction = initVector;
		this.velocity = initVector;
	}
}