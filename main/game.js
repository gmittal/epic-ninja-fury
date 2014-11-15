// var db = new Firebase('https://realtime-experiment0.firebaseio.com/');


// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x2c3e50);

// create a renderer instance
var stageProperties = {
	width: 1024,
	height: 768
}

var renderer = PIXI.autoDetectRenderer(stageProperties.width, stageProperties.height);

// add the renderer view element to the DOM
$("#gameContent").append(renderer.view);

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


// console.log(arrowKeys.left);

requestAnimFrame( animate );

var otherPlayers = {};


var bgTexture = PIXI.Texture.fromImage("media/bg/shrooms-04@4x.png");
var bg = new PIXI.Sprite(bgTexture);
bg.anchor.x = 0.5;
bg.anchor.y = 0.5;

bg.scale = {
	x: 0.5,
	y:0.5
};

bg.position.x = stageProperties.width/2;
bg.position.y = stageProperties.height/2;

stage.addChild(bg);

// create a texture from an image path
var bunnyTexture = PIXI.Texture.fromImage("media/character-pixel-platform/Platformer-Pixel159.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(bunnyTexture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

bunny.scale = {
	x: 0.6,
	y: 0.6
};

// bunny.scale = 0.2;
// ;
// move the sprite t the center of the screen
bunny.position.x = stageProperties.width/2;
bunny.position.y = stageProperties.height/2;

stage.addChild(bunny);

// bunny.scale = 0.5;

// create a texture from an image path
// var gloveTexture = PIXI.Texture.fromImage("glove.png");
// // create a new Sprite using the texture
// var glove = new PIXI.Sprite(gloveTexture);
// glove.scale.x = 0.4;
// glove.scale.y = -0.4;

// // center the sprites anchor point
// glove.anchor.x = 0.5;
// glove.anchor.y = 0.5;

// glove.rotation = 270*(Math.PI/180);

// // move the sprite t the center of the screen
// glove.position.x = bunny.width/2 + 20;
// glove.position.y = bunny.height/2;

// bunny.addChild(glove);

// setInterval(handleMineDrop, 10);


// var timeSinceLastMine = 0;


// Update function
function animate() {

    requestAnimFrame( animate );

    // bunny.rotation = 0.785398163;

    var speed = 5;


    var rotationSpeed = 0.1;

    if (arrowKeys.left == true || arrowKeys.a == true) {
    	bunny.position.x -= speed;
    	// bunny.rotation -= rotationSpeed;

    	// bunny.rotation += 0.785398163; 

    	// bunny.position.y > stageProperties.height
    }

    if (arrowKeys.right == true || arrowKeys.d == true) {
    	bunny.position.x += speed;
    	walkingAnimation();
    	// bunny.rotation += rotationSpeed;
    	// bunny.rotation += 0.785398163; 
    }

    if (arrowKeys.up == true || arrowKeys.w == true) {

    	bunny.position.y -= speed;

    	// var returnedPoint = generatePointByAngle(normalizeRotation(bunny.rotation)+270, speed, bunny.position);
    	// console.log(returnedPoint);

    	// bunny.position.x = returnedPoint.x;
    	// bunny.position.y = returnedPoint.y;


    }

    if (arrowKeys.down == true || arrowKeys.s == true) {
    	bunny.position.y += speed;


     //    var returnedPoint = generatePointByAngle(normalizeRotation(bunny.rotation)+270, speed*(-1), bunny.position);
    	// // console.log(returnedPoint);

    	// bunny.position.x = returnedPoint.x;
    	// bunny.position.y = returnedPoint.y;
    }





    // make sure the sprite doesn't go off screen

    if (bunny.position.x < 0) {
    	bunny.position.x = stageProperties.width;

    } else if (bunny.position.x > stageProperties.width) {
    	bunny.position.x = 0;

	} else if (bunny.position.y < 0) {
    	bunny.position.y = stageProperties.height;

    } else if (bunny.position.y > stageProperties.height) {
    	bunny.position.y = 0;
    }



	// var yourPlayerData = {
	// 	'id': connectionID,
	// 	'position': bunny.position
	// };

 //    db.child(connectionValues.key()).set(yourPlayerData);


 //    for (key in otherPlayers) {
 //    	var tmp = otherPlayers[key];
 //    	db.child(key).on('value', function (snapshot) {
 //    		tmp.position = snapshot.val().position;
 //    		console.log(snapshot.val().position);
 //    	});
 //    }


    // render the stage   
    renderer.render(stage);




    
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


function walkingAnimation() {
	var w1 = PIXI.Texture.fromImage("media/character-pixel-platform/Platformer-Pixel170.png");
	var w2 = PIXI.Texture.fromImage("media/character-pixel-platform/Platformer-Pixel266.png");
	var w3 = PIXI.Texture.fromImage("media/character-pixel-platform/Platformer-Pixel255.png")
	
	setTimeout(function() {
		bunny.setTexture(w1);
		setTimeout(function() {
			bunny.setTexture(w2);

			setTimeout(function() {
				bunny.setTexture(w3);
			}, 500);
		}, 500);
	}, 500);

	
	
}

// function walkingRightAnimation() {

// }


// function numberOfPlayers() {

// }


// backend server-side communications

// var connectionID = 0;
// var connectionValues = {};

// var disconnectDB = {};


// db.once('value', function (snapshot) {
// 	var numPlayers = 0;
// 	snapshot.forEach(function (data) {
// 		// console.log(data.key());
// 		numPlayers++;



// 	});

// 	console.log('Number of players before you entered: ' + numPlayers);

// 	connectionID = numPlayers;

// 	var newPlayer = {
// 		'id': numPlayers,
// 		'position': bunny.position
// 	};

// 	connectionValues = db.push(newPlayer)
// 	// db.push.name();
// 	disconnectDB = new Firebase('https://realtime-experiment0.firebaseio.com/' + connectionValues.key());

// 	// delete player if they leave the game...
// 	disconnectDB.onDisconnect().remove();


// 	snapshot.forEach(function (data) {
// 		if (data.key() != connectionValues.key()) {
// 			console.log('Yo, I am new to this area.');
// 			console.log(data.key());


// 			var bunnyTexture = PIXI.Texture.fromImage("media/character-pixel-platform/Platformer-Pixel159.png");
// 		// create a new Sprite using the texture
// 			var bunnyTmp = new PIXI.Sprite(bunnyTexture);

// 			// center the sprites anchor point
// 			bunnyTmp.anchor.x = 0.5;
// 			bunnyTmp.anchor.y = 0.5;

// 			bunnyTmp.scale = {
// 				x: 0.6,
// 				y: 0.6
// 			};

// 			// bunny.scale = 0.2;
// 			// ;
// 			// move the sprite t the center of the screen
// 			bunnyTmp.position.x = data.val().position.x;
// 			bunnyTmp.position.y = data.val().position.y;

// 			otherPlayers[data.key()] = bunnyTmp;
// 			stage.addChild(bunnyTmp);

// 		}
// 	});



// });


// db.on('child_added', function (snapshot) {
// 	if (snapshot.key() != connectionValues.key()) {
// 			console.log('Yo, I am new to this area.');
// 			console.log(snapshot.key());


// 			var bunnyTexture = PIXI.Texture.fromImage("media/character-pixel-platform/Platformer-Pixel159.png");
// 		// create a new Sprite using the texture
// 			var bunnyTmp = new PIXI.Sprite(bunnyTexture);

// 			// center the sprites anchor point
// 			bunnyTmp.anchor.x = 0.5;
// 			bunnyTmp.anchor.y = 0.5;

// 			bunnyTmp.scale = {
// 				x: 0.6,
// 				y: 0.6
// 			};

// 			// bunny.scale = 0.2;
// 			// ;
// 			// move the sprite t the center of the screen
// 			bunnyTmp.position.x = snapshot.val().position.x;
// 			bunnyTmp.position.y = snapshot.val().position.y;

// 			otherPlayers[snapshot.key()] = bunnyTmp;
// 			stage.addChild(bunnyTmp);

// 	}


// });

// db.on('child_removed', function (snapshot) {
// 	console.log("Someone disconnected!!!");
// 	for (var key in otherPlayers) {
// 		var tmp = otherPlayers[key];
// 		if (snapshot.key() == key) {
// 			delete otherPlayers[key];
// 			// otherPlayers[key] = null;
// 			stage.removeChild(tmp);
// 		}
// 	}

// });












