class MapData{
  constructor(obj){
    this.name = "MapData";

    this.active = false;
    
    this.id = obj.id;

    this.width  = obj.width;
    this.height = obj.height;
    this.tileWidth  = obj.tileWidth;
    this.tileHeight = obj.tileHeight;

    this.floor   = obj.floor;
    this.actors  = obj.actors;
    this.walls   = obj.walls;
    this.portals = obj.portals;
  }
}
