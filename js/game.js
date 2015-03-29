
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

    var playerDX = 5;
    var playerDY = 5;

    function animate() {

        // player.position.x += playerDX;
        // player.position.y += playerDY;



        player.rotation += 0.05;


        // bounce off the walls
        if (player.position.x < 0) {
            playerDX *= -1; 

        } else if (player.position.x > view.width) {
            playerDX *= -1;
   
        } else if (player.position.y < 0) {
            playerDY *= -1;

        } else if (player.position.y > view.height) {
            playerDY *= -1;
        }

        renderer.render(stage);

        requestAnimationFrame(animate);
    }



    // handle mouse movement and other control data
    stage.mousemove = function(mouseData) {
        var localCoordsPosition = mouseData.getLocalPosition(stage);

        player.position = localCoordsPosition;
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

