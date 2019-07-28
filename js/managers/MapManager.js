/*
  Author: Roger Burditt
  Detail: The map manager falls outside of the ECS and is used as a manager for
          swapping maps, preloading assets, and spawning actors.
*/

class MapManager{
  constructor(){
    window.addEventListener("swapMap", this.loadMap.bind(this));

    this.currentMap = {
      actors : [],
      walls  : [],
      portals: []
    };
    this.mapsReady  = [];

    // // TEMP FIRST LOAD
    game.mapLib.loadRegion([
      kontra.assets.data['maps/Village/Village0000'],
      kontra.assets.data['maps/Village/Village0001'],
      kontra.assets.data['maps/Village/Village0002'],
      kontra.assets.data['maps/Village/Village0003']
    ]);
    this.loadMap("0000");
  }

  loop(){
    // 0
    if(keyboard.keys[48]){
      console.log(game.physics.world);
    }
    // 1
    if(keyboard.keys[49]){
      if(GlobalObjects.map.MapData.id != "0000"){
        this.loadMap("0000");
      }
    }
    // 2
    if(keyboard.keys[50]){
      if(GlobalObjects.map.MapData.id != "0001"){
        this.loadMap("0001");
      }
    }
    // 3
    if(keyboard.keys[51]){
      if(GlobalObjects.map.MapData.id != "0002"){
        this.loadMap("0002");
      }
    }
    // 4
    if(keyboard.keys[52]){
      if(GlobalObjects.map.MapData.id != "0003"){
        this.loadMap("0003");
      }
    }
  }

  loadMap(mapID){
    this.breakMap();

    var newMap = game.forge.map(0, 0, game.mapLib.getMap(mapID));
        GlobalObjects.map = newMap;

    this.spawnActors(GlobalObjects.map.MapData.actors);
    this.buildWalls(GlobalObjects.map.MapData.walls);
    this.buildPortals(GlobalObjects.map.MapData.portals);
  }

  spawnActors(actors){
    for(var i in actors){
      var pos = {x: GlobalObjects.map.MapBody.map.position.x + actors[i].coords.x,
                 y: GlobalObjects.map.MapBody.map.position.y + actors[i].coords.y};
      var actorObj = game.actorLib.lib[0];
      var optionalComponents = [];
      var name = actors[i].name;

      for(var j in actors[i].properties){
        if(actors[i].properties[j].name == "actor_id"){
          actorObj = game.actorLib.lib[actors[i].properties[j].value];
        }

        if(actors[i].properties[j].name == "onInteract"){
          if(actors[i].properties[j].value.includes("loadScript")){
            var string = actors[i].properties[j].value;
            string = string.replace("\n", "");
            string = string.match(/`(.*?)`/g);

            var result = [];
            for(var k in string){
              result.push(string[k].replace(/`/g, ""));
            }

            if(result){
              var dialogScript = new DialogScript(result);
              optionalComponents.push(dialogScript);
            }
          }
        }
      }


      if(actors[i].name == "Hero"){
        game.forge.player(pos.x, pos.y, actorObj, optionalComponents, name);
        GlobalEvent.swapHero(ecs.getEntityByName(ecs.db, "Hero"));

        // // TEMP:
        game.forge.camera(0, 0);
        GlobalEvent.swapCamera(ecs.getEntityByName(ecs.db, "camera"));
        GlobalObjects.camera.Camera.focus = ecs.getEntityByName(ecs.db, "Hero").ActorBody.sprite.position;
      }
      else{
        var actor = game.forge.actor(pos.x, pos.y, actorObj, optionalComponents, name);
        this.currentMap.actors.push(actor);
      }
    }
  }

  buildWalls(walls){
    for(var i in walls){
      var wall = game.forge.staticWall(walls[i].position.x, walls[i].position.y,
                                       walls[i].width, walls[i].height);
      this.currentMap.walls.push(wall);
    }
  }

  buildPortals(portals){
    for(var i in portals){
      var portal = game.forge.portal(portals[i]);
      this.currentMap.portals.push(portal);
    }
  }

  breakMap(){
    for(var i in this.currentMap.actors){
      // ALWAYS be very explicit here with entities, this class falls outside of ECS.
      var actor = this.currentMap.actors[i];
      actor.ActorBody.destroy();
      ecs.breakEntity(actor.id);
      var eIndex = this.currentMap.actors.map(function(e){return e.id;}).indexOf(this.currentMap.actors[i].id);
      this.currentMap.actors.splice(eIndex, 1);
    }

    for(var j in this.currentMap.walls){
      Matter.World.remove(game.physics.world, this.currentMap.walls[j]);
    }

    for(var k in this.currentMap.portals){
      var portal = this.currentMap.portals[k];
      ecs.breakEntity(portal.id);
      var eIndex = this.currentMap.portals.map(function(e){return e.id;}).indexOf(this.currentMap.portals[k].id);
      this.currentMap.portals.splice(eIndex, 1);
    }

    if(GlobalObjects.map){
      ecs.breakEntity(GlobalObjects.map.id);
    }

    this.currentMap = {
      actors : [],
      walls  : [],
      portals: []
    };
  }
}
