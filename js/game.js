
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


    $(".canvasArea").append(renderer.view);

    var stage = new PIXI.Stage(0xFFFFFF);

    var playerTexture = PIXI.Texture.fromImage("images/bunny.png");
    var player = new PIXI.Sprite(playerTexture);


    player.position = screenCenter;

    player.scale.x = 1;
    player.scale.y = 1;

    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    stage.addChild(player);

    requestAnimationFrame(animate);



    // create the CPU-generated objects to avoid
    createCPUObjects(20);

    function animate() {

        for (var keys in cpuObjects) {


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
        for (var i = 0; i < n; i++) {
            var id = guid();

            var tmpTexture = PIXI.Texture.fromImage("images/bunny.png");
            var tmp = new PIXI.Sprite(tmpTexture);



            tmp.position.x = getRandomInt(2, view.width - 2);
            tmp.position.y = getRandomInt(2, view.height - 2);

            tmp.scale.x = 1;
            tmp.scale.y = 1;

            tmp.anchor.x = 0.5;
            tmp.anchor.y = 0.5;

            cpuObjects[id] = {
                'sprite': tmp,
                'dx': getRandomInt(1, 10),
                'dy': getRandomInt(1, 10)
            };

            stage.addChild(tmp);
         
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
