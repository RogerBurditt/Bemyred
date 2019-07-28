class MapData{
  constructor(mapObj){
    this.name = "MapData";
    
    this.active     = false;
    this.mapID      = mapObj.mapID;
    this.tileWidth  = mapObj.tileWidth;
    this.tileHeight = mapObj.tileHeight;
    this.layers     = mapObj.layers;
    this.columns    = mapObj.width;
    this.rows       = mapObj.height;
    this.pWidth     = this.columns * this.tileWidth;
    this.pHeight    = this.rows * this.tileHeight;
  }
}
