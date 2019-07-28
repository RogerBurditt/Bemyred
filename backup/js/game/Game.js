var game = function(){}

game.start = function(){
  game.c = document.getElementById("World");
  game.canvas = game.c.getContext("2d");
  game.canvas.scale(1, 1);

  game.p = document.getElementById("Physics");
  game.pCanvas = game.p.getContext("2d");
  game.pCanvas.scale(1, 1);

  game.preload();

  // variables

  game.imgReady  = false;
  game.jsonReady = false;

  // System hierarchy
  game.systems   = [];
  game.overworld = [];
  game.theater   = [];
}

game.preload = function(){
  game.imageLoader = new ImageLoader();
  game.jsonLoader  = new JsonLoader();
  game.imagesReady = false;
  game.jsonsReady  = false;

  game.imageLoader.load(this.imageLoader.firstLoad, 0);
  game.jsonLoader .load(this.jsonLoader.firstLoad,  0);

  window.addEventListener("imageLoaded", game.preloadTrigger);
  window.addEventListener("jsonLoaded",  game.preloadTrigger);
}

game.preloadTrigger = function(e){
  switch(e.type){
    case "imageLoaded":
      window.removeEventListener("imageLoaded", game.preloadTrigger);
      game.imgReady = true;
      if(game.imgReady && game.jsonReady){ game.onPreloadDone(); }
    break;

    case "jsonLoaded":
      window.removeEventListener("jsonLoaded", game.preloadTrigger);
      game.jsonReady = true;
      if(game.jsonReady && game.imgReady){ game.onPreloadDone(); }
    break;
  }
}

game.onPreloadDone = function(){
  // ECS
  game.forge = new Forge();
  ecs.start();

  // Frontend Systems
  game.animate = new AnimateSystem();
  game.camera  = new CameraSystem();
  game.render  = new RenderSystem();
  game.dialog  = new DialogSystem();

  // Backend Systems
  game.input = new InputSystem();

  // Libraries
  game.actorLib = new ActorLib();
  game.mapLib   = new MapLib();

  // Physics
  game.physics = game.makePhysics(game.p);
  Matter.Engine.run(game.physics.engine);
  Matter.Render.run(game.physics.render);

  // Utilities
  mouse.start();
  keyboard.start();

  // Load Complete
  game.setStage();
}

game.loop = function(){
  if(game.dialog.isSleeping){
    game.animate .loop();
    game.camera  .loop();
    game.input   .loop();
    Matter.Engine.enabled = false;
  }
  else{
    Matter.Engine.enabled = true;
  }

  game.render  .loop();
  game.dialog  .loop();
}

game.setStage = function(){
  setInterval(game.loop, 30);

  game.forge.actor(200, 200, game.actorLib.lib[0]);

  game.forge.camera(0, 0);
  game.forge.map(0, 0, game.mapLib.lib[0]);
  game.forge.actor(14, 16, game.actorLib.lib[0], "hero");

  GlobalEvent.swapCamera     (ecs.getEntityByName(ecs.db, "camera"));
  GlobalEvent.swapMap        (ecs.getEntityByName(ecs.db, "map"));
  GlobalEvent.swapCameraFocus(ecs.getEntityByName(ecs.db, "hero"));
/*
  GlobalEvent.loadScript([
    "Biggs:     There's the town...",
    "Wedge:     Hard to believe an Esper's been found intact there, 1000 years after the War of the Magi...",
    "Biggs:     Think it's still alive?",
    "Wedge:     Probably... judging from the urgency of our orders.",
    "Biggs:     And this woman, this... sorceress, why's she here? I heard she fried 50 of our Magitek Armoured soldiers in under 3 minutes!",
    "Wedge:     Not to worry. The Slave Crown on her head robs her of all conscious thought. She'll follow orders.",
    "Biggs:     We'll approach from the east. Move out!",
    "Wedge:     Let's put her on point. No sense in taking any risks. Forward!",
    "Guard:     Imperial Magitek armour? Not even Narshe's safe anymore!",
    "Guard:     Narshe's freedom depends on us!",
    "Guard:     We've got 'em trapped, now!",
    "Guard:     We must defend the mines!"
  ], 0);*/
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
