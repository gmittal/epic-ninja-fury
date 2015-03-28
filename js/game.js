    // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
    var view = {
        height: 600,
        width: 800
    };

    var screenCenter = {
        x: view.width/2,
        y: view.height/2
    };

    var renderer = new PIXI.WebGLRenderer(view.width, view.height);




    $(".canvasArea").append(renderer.view);

    var stage = new PIXI.Stage(0xFFFFFF);

    var playerTexture = PIXI.Texture.fromImage("images/bunny.png");
    var player = new PIXI.Sprite(playerTexture);

 //   player.position.x = view.width/2;
 //   player.position.y = view.height/2;

    player.position = screenCenter;

    player.scale.x = 1;
    player.scale.y = 1;

    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    stage.addChild(player);

    requestAnimationFrame(animate);

    function animate() {
        player.rotation += 0.05;

        renderer.render(stage);

        requestAnimationFrame(animate);
    }