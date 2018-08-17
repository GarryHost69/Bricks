
var bricks = [];

var b_index = 0;

var lev = {
	x : 300,
	y : 580,
	h : 20,
	w : 100
};

var ball = {
	x :	400,
	y :	300,
	d : 30,
	TopCol : false,
	DownCol : false,
	LeftCol : false,
	RightCol : false
};

function setup() {
	createCanvas(800, 600);
	for (var i = 0; i < 800; i+=50) {
		for (var j = 0; j < 200; j += 20) {
			var b = new brick(i, j);
			bricks[b_index] = b;
			b_index++;
		}
	}

	window.alert("                                                Welcome!!\n\nThe lever on the bottom can be Moved using 'a' key for moving left and 'd' key for moving right\n\n                                                Good Luck");
}

function draw() {
	if (lost()) {
		if (confirm("You've Lost!! Would you like to play again\n\n")) {
			location.reload();
		}
		else {
			window.close();
		}
	}
	background(200, 240, 200);

	for (var i = 0; i < b_index; i++) {
		if (bricks[i] == undefined) {
			continue;
		}
		fill(0, 0, 255);
		rect(bricks[i].x, bricks[i].y, 45, 15);
	}

	fill(255);
	ellipse(ball.x, ball.y, ball.d);

	fill(255, 0, 0);
	rect(lev.x, lev.y, lev.w, lev.h);

	checkCollision();

	switch (key) {
		case 'd':	if (lev.x + lev.w < width) {
						lev.x += 5;
					}
					break;
		case 'a':	if (lev.x - lev.w > -lev.w) {
						lev.x -= 5;
					}
					break;
	}

	moveBall();
}

function moveBall() {
	if (ball.DownCol == true && ball.RightCol == true) {
		ball.x -= 5;
		ball.y -= 5;
	}
	else
	if (ball.TopCol == true && ball.RightCol == true) {
		ball.x -= 5;
		ball.y += 5;
	}
	else
	if (ball.DownCol == true && ball.LeftCol == true) {
		ball.x += 5;
		ball.y -= 5;
	}
	else
	if (ball.TopCol == true && ball.LeftCol == true) {
		ball.x += 5;
		ball.y += 5;
	}
	else
	if (ball.DownCol == true) {
		ball.x += 5;
		ball.y -= 5;
	}
	else
	if (ball.TopCol == true) {
		ball.x += 5;
		ball.y += 5;
	}
	else
	if (ball.DownCol == false && ball.TopCol == false && ball.LeftCol == false && ball.RightCol == false) {
		ball.x += 2;
		ball.y += 2;
	}
}

function lost() {
	if (ball.y - ball.d / 2 > width) {
		return true;
	}
}

function checkCollision() {
	if (levCollision()) {
		ball.DownCol = true;
		ball.TopCol = false;
	}

	if (wallCollision()) {
		ball.TopCol = true;
		ball.DownCol = false;
	}

	if (leftCollision()) {
		ball.LeftCol = true;
		ball.RightCol = false;
	}

	if (rightCollision()) {
		ball.RightCol = true;
		ball.LeftCol = false;
	}
}

function levCollision() {
	var a = false;
	var b = false;
	for (var i = lev.y; i < lev.y + lev.w; i++) {
		if (ball.y + ball.d/2 == i) {
			a = true;
			break;
		}
	}
	for (var i = lev.x; i < lev.x + lev.w; i++) {
		if (ball.x == i) {
			b = true;
			break;
		}
	}
	if (a == true && b == true) {
		if (ball.y > lev.y) {
			return false;
		}
		return true;
	}
}

function wallCollision() {
	for (var i = 0; i < b_index; i++) {
		if (bricks[i] == undefined) {
			continue;
		}
		if (ball.y - ball.d / 2 <= bricks[i].y + 15) {
			if (ball.x + ball.d / 2 <= bricks[i].x + 45) {
				delete bricks[i];
				return true;
			}
		}
	}
}

function leftCollision() {
	if (ball.x - ball.d / 2 <= 0) {
		return true;
	}
}

function rightCollision() {
	if (ball.x + ball.d / 2 >= width) {
		return true;
	}
}

function brick(a, b) {
	this.x  = a;
	this.y = b;
}
