class Forge{
  constructor(){

  }

  camera(x, y, name="camera"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Camera(game.c));
  }

  map(x, y, mapObj, name="map"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Render());
    ecs.addComponent(e, new Transform(x, y));
    ecs.addComponent(e, new MapData(mapObj));
    ecs.addComponent(e, new MapBody(x, y, mapObj));
  }

  player(x, y, actorObj, name="player"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Render());
    ecs.addComponent(e, new Transform(x, y));
    ecs.addComponent(e, new Sprite(actorObj));
    ecs.addComponent(e, new ActorBody(x, y, actorObj));
    ecs.addComponent(e, new BaseBodyFSM(e));
  }

  actor(x, y, actorObj, name="actor"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Render());
    ecs.addComponent(e, new DialogScript(["This is the first line.", "This is the second line."]));
    ecs.addComponent(e, new Transform(x, y));
    ecs.addComponent(e, new Sprite(actorObj));
    ecs.addComponent(e, new ActorBody(x, y, actorObj));
    ecs.addComponent(e, new BaseBodyFSM(e));
  }
}
