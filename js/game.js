
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000);

// create a renderer instance
var stageProperties = {
	width: 640,
	height: 480
}

var renderer = PIXI.autoDetectRenderer(stageProperties.width, stageProperties.height);



// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var arrowKeys = {
	left: false,
	right: false,
	up: false,
	down: false,
	w: false,
	a: false,
	s: false,
	d: false
};

var specialKeys = {
	space: false,
	q: false
};


var playerPhysicalProps = {
	jumping: false,
	velX: 0,
	velY: 0
};


requestAnimFrame( animate );


// create a texture from an image path
var playerTexture = PIXI.Texture.fromImage("img/player0.png");
// create a new Sprite using the texture
var player = new PIXI.Sprite(playerTexture);

// var walkAnimation = PIXI.MovieClip.fromImages(["img/Platformer-Pixel266.png", "img/Platformer-Pixel255.png"]);
// var walkAnimTexture = walkAnimation.generateTexture(10, 1, renderer);

// stage.addChild(walkAnimation);

// var player = new PIXI.Sprite(walkAnimTexture);

// center the sprites anchor point
player.anchor.x = 0.5;
player.anchor.y = 0.5;


player.position.x = stageProperties.width/2;
player.position.y = stageProperties.height/2;

player.scale.x = 0.5;
player.scale.y = 0.5;

stage.addChild(player);





// Update function
function animate() {

    requestAnimFrame( animate );


    var gravity = 5;
    var friction = 0.8;

    

    if (player.y >= stageProperties.height - player.height/2) {

    } else {
    	player.y += gravity;
    }



    var speed = 3;
   

    if (arrowKeys.left == true || arrowKeys.a == true) {
   		if (playerPhysicalProps.velX > -speed) {
 			playerPhysicalProps.velX--;
 		}

    }

    if (arrowKeys.right == true || arrowKeys.d == true) {
 		// player.x += speed;
 		if (playerPhysicalProps.velX < speed) {
 			playerPhysicalProps.velX++;
 		}

    }

    if (arrowKeys.up == true || arrowKeys.w == true) {

    	if(!playerPhysicalProps.jumping){
			   playerPhysicalProps.jumping = true;
			   player.y = stageProperties.height - player.height*2;
		}

		

    	


    	// player.y -= speed;


    }

    if (arrowKeys.down == true || arrowKeys.s == true) {
    	// player.y += speed;

    }


    player.velX *= friction;

    player.x += playerPhysicalProps.velX;
	player.y += playerPhysicalProps.velY;




    // jumping conditional
    if(player.y >= stageProperties.height-player.height/2){
		    player.y = stageProperties.height - player.height;
		    playerPhysicalProps.jumping = false;
	}
 


    // render the stage   
    renderer.render(stage);
    // console.log(player.position);
}



Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};




function generatePointByAngle(angle, distance, startPoint) {

	// console.log(angle);

    angle = angle * (Math.PI/180)
    // console.log(angle);



    var addedX = Math.cos(angle) * distance;
    var addedY = Math.sin(angle) * distance;

    var point = {
    	x: startPoint.x + addedX,
    	y: startPoint.y + addedY
    }

    return point;
}




function normalizeRotation(rotationVal) {
	rotationVal = rotationVal * (180/Math.PI);

	if (rotationVal > 360) {
		rotationVal -= 360;
	}

	if (rotationVal < 0) {
		rotationVal += 360;
	}

	return rotationVal;
}

function ccpAdd(point1, point2) {
	var addedPointX = point1.x + point2.x;
	var addedPointY = point1.y + point2.y;

	var addedPoint = {
		x: addedPointX,
		y: addedPointY
	}

	return addedPoint;
}



// Keyboard control event handlers
$(document).keydown(function (evt) {
	if (evt.which == 37) {
		arrowKeys.left = true;
		// console.log("Left key pressed.");

	}

	if (evt.which == 39) {
		arrowKeys.right = true;
		// console.log("Right key pressed.");

	}

	if (evt.which == 38) {
		arrowKeys.up = true;
		// console.log("Up key pressed.");

	}

	if (evt.which == 40) {
		arrowKeys.down = true;
		// console.log("Down key pressed.");

	}


	if (evt.which == 87) {
		arrowKeys.w = true;
		// console.log("Left key pressed.");

	}

	if (evt.which == 65) {
		arrowKeys.a = true;
		// console.log("Right key pressed.");

	}

	if (evt.which == 83) {
		arrowKeys.s = true;
		// console.log("Up key pressed.");

	}

	if (evt.which == 68) {
		arrowKeys.d = true;
		// console.log("Down key pressed.");

	}

	// SPACE BAR
	if (evt.which == 32) {
		specialKeys.space = true;

	}

	if (evt.which == 81) {
		specialKeys.q = true;

	}

});



$(document).keyup(function (evt) {
	if (evt.which == 37) {
		arrowKeys.left = false;
		// console.log("Left key unpressed.");

	}

	if (evt.which == 39) {
		arrowKeys.right = false;
		// console.log("Right key unpressed.");

	}

	if (evt.which == 38) {
		arrowKeys.up = false;
		// console.log("Up key unpressed.");

	}

	if (evt.which == 40) {
		arrowKeys.down = false;
		// console.log("Down key unpressed.");

	}

	if (evt.which == 87) {
		arrowKeys.w = false;
		// console.log("Left key pressed.");

	}

	if (evt.which == 65) {
		arrowKeys.a = false;
		// console.log("Right key pressed.");

	}

	if (evt.which == 83) {
		arrowKeys.s = false;
		// console.log("Up key pressed.");

	}

	if (evt.which == 68) {
		arrowKeys.d = false;
		// console.log("Down key pressed.");

	}

		// SPACE BAR
	if (evt.which == 32) {
		specialKeys.space = false;

	}

	if (evt.which == 81) {
		specialKeys.q = false;

	}

});



// $(window).resize(function () {
// 	stageProperties = {
// 		width: $(window).width(),
// 		height: $(window).height()
// 	}

// 	renderer = PIXI.autoDetectRenderer(stageProperties.width, stageProperties.height);

// 	document.getElementsByTagName("canvas").width = $(window).width();

	
// });

