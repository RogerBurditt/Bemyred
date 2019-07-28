var game = function(){}

game.start = function(){
  game.c = document.getElementById("World");
  game.canvas = game.c.getContext("2d");
  game.canvas.scale(1, 1);

  game.p = document.getElementById("Physics");
  game.pCanvas = game.p.getContext("2d");
  game.pCanvas.scale(1, 1);

  game.d = document.getElementById("Debug");
  game.dCanvas = game.d.getContext("2d");
  game.dCanvas.scale(1, 1);

  game.preload();
}

game.preload = function(){
  kontra.assets.dataPath  = '/bemyred5/assets/backend/json/';
  kontra.assets.imagePath = '/bemyred5/assets/frontend/images/';

  kontra.assets.load("base_dev/ACTORID-0.png",
                     "base_dev/floor_set.png",
                     "actors/heroes.json",
                     "maps/Village/Village0000.json",
                     "maps/Village/Village0001.json",
                     "maps/Village/Village0002.json",
                     "maps/Village/Village0003.json",
                     "maps/Village/Village0004.json")
                .then(game.onPreloadDone);
}

game.onPreloadDone = function(){
  // ECS
  game.forge = new Forge();
  ecs.start();


  // Physics
  game.physics = game.makePhysics(game.p);
  Matter.Engine.run(game.physics.engine);
  Matter.Render.run(game.physics.render);

  // Libraries
  game.actorLib = new ActorLib();
  game.mapLib   = new MapLib();


  // Frontend Systems
  game.animate = new AnimateSystem();
  game.camera  = new CameraSystem();
  game.render  = new RenderSystem();

  // Backend Systems
  game.interact = new InteractSystem();
  game.portal   = new PortalSystem();

  // Managers
  game.mapManager    = new MapManager();
  game.dialogManager = new DialogManager();
  game.inputManager  = new InputManager();

  // Utilities
  mouse.start();
  keyboard.start();

  // Load Complete
  game.setStage();
}

game.loop = function(){
  if(game.dialogManager.isSleeping){
    game.mapManager.loop();
    game.inputManager.loop();
    game.animate .loop();
    game.camera  .loop();
    game.interact.loop();
    game.portal.loop();
    Matter.Engine.enabled = false;
  }
  else{
    Matter.Engine.enabled = true;
  }

  game.render.loop();
  game.dialogManager.loop();
}

game.setStage = function(){
  setInterval(game.loop, 30);
}

game.makePhysics = function(canvas){
  var physics = {};
  physics.engine = Matter.Engine.create();
  physics.world = physics.engine.world;
  physics.render = Matter.Render.create({
    canvas: canvas,
    engine: physics.engine,
    options: {
      width: canvas.width,
      height: canvas.height,
      background: 'Transparent',
      wireframes: false,
      showAngleIndicator: false
    }
  });

  physics.world.gravity.x = 0;
  physics.world.gravity.y = 0;

  return physics;
}
