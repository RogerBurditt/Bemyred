class Forge{
  constructor(){

  }

  camera(x, y, name="camera"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Camera(game.c));

    return ecs.getEntityByID(e);
  }

  map(x, y, mapObj, name="map"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Render());
    ecs.addComponent(e, new Transform(x, y));
    ecs.addComponent(e, new MapData(mapObj));
    ecs.addComponent(e, new MapBody(x, y, mapObj));

    return ecs.getEntityByID(e);
  }

  player(x, y, actorObj, optionalComponents=[], name="Hero"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Render());
    ecs.addComponent(e, new Transform(x, y));
    ecs.addComponent(e, new Sprite(actorObj));
    ecs.addComponent(e, new ActorBody(x, y, actorObj));
    ecs.addComponent(e, new BaseBodyFSM(e));

    return ecs.getEntityByID(e);
  }

  actor(x, y, actorObj, optionalComponents=[], name="actor"){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Render());
    ecs.addComponent(e, new Transform(x, y));
    ecs.addComponent(e, new Sprite(actorObj));
    ecs.addComponent(e, new ActorBody(x, y, actorObj, true));

    for(var i in optionalComponents){
      ecs.addComponent(e, optionalComponents[i]);
    }

    // Always last
    ecs.addComponent(e, new BaseBodyFSM(e));

    return ecs.getEntityByID(e);
  }

  portal(portalObj){
    var e = ecs.newEntity(name);
    ecs.addComponent(e, new Portal(portalObj));

    return ecs.getEntityByID(e);
  }

  staticWall(x, y, w, h){
    var wall = Matter.Bodies.rectangle(x+w/2, y+h/2, w, h, { isStatic: true });
    Matter.World.add(game.physics.world, wall);

    return wall;
  }
}
