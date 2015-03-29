
    var view = {
        height: 600,
        width: 800
    };

    var screenCenter = {
        x: view.width/2,
        y: view.height/2
    };

    var renderer = new PIXI.WebGLRenderer(view.width, view.height);



    var cpuObjects = {};

    var sessionID = guid(); // session ID for generating CPU objects


    $(".canvasArea").append(renderer.view);

    var stage = new PIXI.Stage(0xFFFFFF);

    var playerTexture = PIXI.Texture.fromImage("images/player.png");
    var player = new PIXI.Sprite(playerTexture);

    player.position = screenCenter;

    player.scale.x = 0.05;
    player.scale.y = 0.05;

    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    stage.addChild(player);

    requestAnimationFrame(animate);

    var timeElapsed = 0;

    // create the CPU-generated objects to avoid
    // createCPUObjects(100);
    // createCPUObjects(1);

    function animate() {




        // add game logic and movement for cpu objects
        for (var keys in cpuObjects) {

            collisionHandle(player, cpuObjects[keys].sprite);

            var tmpSprite = cpuObjects[keys].sprite;

            
            tmpSprite.position.x += cpuObjects[keys].dx;
            tmpSprite.position.y += cpuObjects[keys].dy;




            tmpSprite.rotation += 0.1;


            // bounce off the walls
            if (tmpSprite.position.x < 0) {
                cpuObjects[keys].dx *= -1; 

            } else if (tmpSprite.position.x > view.width) {
                cpuObjects[keys].dx *= -1;
       
            } else if (tmpSprite.position.y < 0) {
                cpuObjects[keys].dy *= -1;

            } else if (tmpSprite.position.y > view.height) {
                cpuObjects[keys].dy *= -1;
            }

        }



        renderer.render(stage);

        requestAnimationFrame(animate);
    }




    // handle mouse movement and other control data
    stage.mousemove = function(mouseData) {
        var localCoordsPosition = mouseData.getLocalPosition(stage);

        player.position = localCoordsPosition;
    }


    function createCPUObjects(n) {
        var numCPU = 0;
        

        for (var keys in cpuObjects) {
            numCPU++;
        }

        for (var i = 0; i < n; i++) {
            var iNum = numCPU + i;
            // console.log(iNum);
            var id = sessionID + iNum.toString();

            var tmpTexture = PIXI.Texture.fromImage("images/cpu.png");
            var tmp = new PIXI.Sprite(tmpTexture);

            // if (numCPU == 0) {
                tmp.position.x = getRandomInt(2, view.width - 2);
                tmp.position.y = getRandomInt(2, view.height - 2);
            // } else {
            //     // console.log(cpuObjects[sessionID + (iNum - 1).toString()].sprite.position);
            //     var tmpPos = cpuObjects[sessionID + (iNum - 1).toString()].sprite.position;
            //     tmp.position = tmpPos;
            // }


           // tmp.position.x = getRandomInt(2, view.width - 2);
           // tmp.position.y = getRandomInt(2, view.height - 2);

            tmp.scale.x = 0.05;
            tmp.scale.y = 0.05;

            tmp.anchor.x = 0.5;
            tmp.anchor.y = 0.5;

            cpuObjects[id] = {
                'sprite': tmp,
                'dx': getRandomInt(1, 6),
                'dy': getRandomInt(1, 6)
            };

            stage.addChild(tmp);
         
        }
    }


    function collisionHandle(sprite1, sprite2) {
        var r1 = (sprite1.height * Math.sqrt(2))/2;
        var r2 = (sprite2.height * Math.sqrt(2))/2;

        var distance = Math.sqrt((sprite2.position.x - sprite1.position.x)*(sprite2.position.x - sprite1.position.x) + (sprite2.position.y - sprite1.position.y)*(sprite2.position.y - sprite1.position.y));

        if (distance < r1 + r2 - 2) {
            // timer.invalidate();
            clearInterval(timer);
            throw e;
        }

    }



    // generate a random unique ID string value
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }


    // generate a random number in between a range
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // watch time ticker
    var timer = setInterval(tick, 9);

    function tick() {
        timeElapsed += 0.01;
        

        $(".playerStats").text(timeElapsed.toFixed(2) +" seconds");
        
        
    }

    // add some difficulty
    setInterval(function() {createCPUObjects(1); }, 1000);



