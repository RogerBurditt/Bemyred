class MapLib{
  constructor(){
    this.lib = [];
  }

  getMap(id){
    for(var i in this.lib){
      if(id == this.lib[i].id){
        return this.lib[i];
      }
    }
  }

  loadRegion(jsonArray){
    for(var i in jsonArray){
      this.lib.push(this.parseJson(jsonArray[i]));
    }
  }

  parseJson(mapJson){
    // // EXAMPLE
    //var mapJson = kontra.assets.data['maps/Village/Village0000'];

    for(var i in mapJson.properties){
      if(mapJson.properties[i].name == "id"){
        var id = mapJson.properties[i].value;
      }
    }

    var width  = mapJson.width;
    var height = mapJson.height;
    var tileWidth  = mapJson.tilewidth;
    var tileHeight = mapJson.tileheight;
    var floor   = {};
    var actors  = [];
    var walls   = [];
    var portals = [];

    var mapLayers = mapJson.layers;
    for(var j in mapLayers){
      if(mapLayers[j].name == "Floor"){
        floor = this.parseFloor(mapLayers[j], width, height, tileWidth, tileHeight);
      }

      if(mapLayers[j].name == "Actors"){
        actors = this.parseActors(mapLayers[j]);
      }

      if(mapLayers[j].name == "Walls"){
        walls = this.parseWalls(mapLayers[j]);
      }

      if(mapLayers[j].name == "Portals"){
        portals = this.parsePortals(mapLayers[j]);
      }
    }

    return {
      id:         id,
      width:      width,
      height:     height,
      tileWidth:  tileWidth,
      tileHeight: tileHeight,
      floor:      floor,
      actors:     actors,
      walls:      walls,
      portals:    portals
    };
  }

  parseFloor(layer, width, height, tileWidth, tileHeight){
    var floor   = {};
    floor.name  = layer.name;
    floor.tiles = [];

    // Added property in Tiled
    for(var props in layer.properties){
      if(layer.properties[props].name == "tileset"){
        floor.tileset = kontra.assets.images[layer.properties[props].value];
      }
      if(layer.properties[props].name == "firstgid"){
        floor.firstgid = layer.properties[props].value;
      }
    }
    // Create a temporary array to store the converted values.
    var arr = [];
    for(var j in layer.data){
      var value = layer.data[j] - floor.firstgid;
      var index = (utilities.indexToSheetPos(
                   value, floor.tileset.width/tileWidth, tileWidth));
      arr.push(index);
    }
    // Slice the temporary array into rows and store them in the final array.
    for(var k = 0; k < arr.length -1; k += width){
      floor.tiles.push(arr.slice(k, k + width));
    }
    return floor;
  }

  parseActors(layer){
    var objects = layer.objects;
    var actors = [];
    for(var i in objects){
      if(objects[i].type == "actor_spawn"){
        var actor = {};
        actor.name   = objects[i].name;
        actor.coords = {x: objects[i].x, y: objects[i].y}
        actor.properties = objects[i].properties;
        actors.push(actor);
      }
    }
    return actors;
  }

  parseWalls(layer){
    var objects = layer.objects;
    var walls = [];
    for(var i in objects){
      var wall = {};
      wall.position = {x:objects[i].x, y:objects[i].y};
      wall.width    = objects[i].width;
      wall.height   = objects[i].height;
      walls.push(wall);
    }
    return walls;
  }

  parsePortals(layer){
    var objects = layer.objects;
    var portals = [];
    for(var i in objects){
      var portal    = {};
      portal.name   = objects[i].name;
      portal.x      = objects[i].x;
      portal.y      = objects[i].y;
      portal.width  = objects[i].width;
      portal.height = objects[i].height;
      portal.center = {x:portal.width/2, y:portal.height/2};
      portal.to     = "0000_A";
      for(var j in objects[i].properties){
        if(objects[i].properties[j].name == "to"){
          portal.to = objects[i].properties[j].value;
        }
      }
      portals.push(portal);
    }
    return portals;
  }
}
