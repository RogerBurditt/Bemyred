class RenderSystem{
  constructor(){
    this.isSleeping = false;

    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));

    this.sprites = [];
  }

  loop(){
    game.canvas.setTransform(1,0,0,1,0,0);
    game.canvas.clearRect(0, 0, game.c.width, game.c.height);

    if(GlobalObjects.camera){
      game.canvas.translate(Math.round(GlobalObjects.camera.Camera.position.x), Math.round(GlobalObjects.camera.Camera.position.y) );
    }

    if(GlobalObjects.map){
      this.renderMap();
    }

    this.sprites.sort(function(a, b){
      return (a.Transform.position.y + a.Sprite.height) - (b.Transform.position.y + b.Sprite.height);
    });

    for(var i in this.sprites){
      if(!this.sprites[i].Render.isSleeping){
        this.renderSprite(this.sprites[i]);
      }
    }
  }

  renderSprite(entity){
    var src     = entity.Sprite.src;
    var sWidth  = entity.Sprite.sWidth;
    var sHeight = entity.Sprite.sHeight;
    var sx      = entity.Sprite.sx * sWidth;
    var sy      = entity.Sprite.sy * sHeight;

    if(entity.ActorBody){
      entity.Transform.position = entity.ActorBody.sprite.bounds.min;
    }
    var x = entity.Transform.position.x
    var y = entity.Transform.position.y


    var width   = entity.Sprite.width;
    var height  = entity.Sprite.height;

    // Culling
    if(GlobalObjects.camera){
      if(utilities.checkPointInRect(
         x, y,
        -GlobalObjects.camera.Camera.position.x - width  * 2,
        -GlobalObjects.camera.Camera.position.y - height * 2,
         GlobalObjects.camera.Camera.width      + width  * 2,
         GlobalObjects.camera.Camera.height     + height * 2)){
          game.canvas.drawImage(src, sx, sy, sWidth, sHeight, x, y, width, height);
      }
    }
  }

  renderMap(){
    var layer = GlobalObjects.map.MapData.floor;
    for(var j = 0; j < layer.tiles.length; j++){
      for(var k = 0; k < layer.tiles[j].length; k++){
        // Culling
        if(utilities.checkPointInRect(
            k * GlobalObjects.map.MapData.tileWidth + GlobalObjects.map.Transform.position.x,
            j * GlobalObjects.map.MapData.tileWidth + GlobalObjects.map.Transform.position.y,
           -GlobalObjects.camera.Camera.position.x - GlobalObjects.map.MapData.tileWidth  * 2,
           -GlobalObjects.camera.Camera.position.y - GlobalObjects.map.MapData.tileHeight * 2,
            GlobalObjects.camera.Camera.width      + GlobalObjects.map.MapData.tileWidth  * 2,
            GlobalObjects.camera.Camera.height     + GlobalObjects.map.MapData.tileHeight * 2)){
          game.canvas.drawImage(
             layer.tileset,
             layer.tiles[j][k].x,
             layer.tiles[j][k].y,
             GlobalObjects.map.MapData.tileWidth,
             GlobalObjects.map.MapData.tileWidth,
             k * GlobalObjects.map.MapData.tileWidth + GlobalObjects.map.Transform.position.x,
             j * GlobalObjects.map.MapData.tileWidth + GlobalObjects.map.Transform.position.y,
             GlobalObjects.map.MapData.tileWidth,
             GlobalObjects.map.MapData.tileWidth);
        }
      }
    }
  }

  filterAdd(e){
    ecs.addEntityToArray(this.sprites, ["Render", "Transform", "Sprite"], e.detail.eid);
  }

  filterRemove(e){
    ecs.removeEntityFromArray(this.sprites, ["Render", "Transform", "Sprite"], e.detail.eid);
  }
}
