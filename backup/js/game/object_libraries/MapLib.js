class MapLib{
  constructor(){
    this.lib = [];

    this.populate();
  }

  populate(){
    var mapJson = game.jsonLoader.getJson(1);

    var obj        = {};
    obj.mapID      = mapJson.mapID;
    obj.tileWidth  = mapJson.tilewidth;
    obj.tileHeight = mapJson.tileheight;
    obj.layers     = mapJson.layers;
    obj.width      = mapJson.width;
    obj.height     = mapJson.height;

    for(var layer in obj.layers){
      obj.layers[layer].tileset = game.imageLoader.getImage(mapJson.layers[layer].sheetID);
      obj.layers[layer].name    = obj.layers[layer].name;
      obj.layers[layer].tiles   = [];
      for(var i = 0; i < obj.layers[layer].data.length -1; i += obj.width){
        obj.layers[layer].tiles.push(obj.layers[layer].data.slice(i, i + obj.width));
      }
      delete obj.layers[layer].data;
    }

    for(var layer in obj.layers){
      for(var row in obj.layers[layer].tiles){
        for(var tile in obj.layers[layer].tiles[row]){
          obj.layers[layer].tiles[row][tile] =
          (utilities.indexToSheetPos(obj.layers[layer].tiles[row][tile],
                                     obj.layers[layer].tileset.width/obj.tileWidth,
                                     obj.tileWidth));
        }
      }
    }

    this.lib.push(obj);
  }

  getMap(id){
    for(var i in this.lib){
      if(id == this.lib[i].mapID){
        console.log(this.lib[i]);
        return this.lib[i];
      }
    }
  }
}
