class RenderSystem{
  constructor(){
    this.isSleeping = false;

    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));
    window.addEventListener("swapMap",          function(e){this.map=e.detail.map;}.bind(this));
    window.addEventListener("swapCamera",       function(e){this.camera=e.detail.camera;}.bind(this));

    this.sprites = [];
    this.map    = null;
    this.camera = null;
  }

  loop(){
    game.canvas.setTransform(1,0,0,1,0,0);
    game.canvas.clearRect(0, 0, game.c.width, game.c.height);

    if(this.camera){
      game.canvas.translate(Math.round(this.camera.Camera.position.x), Math.round(this.camera.Camera.position.y) );
    }

    if(this.map){
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
    if(this.camera){
      if(utilities.checkPointInRect(
         x, y,
        -this.camera.Camera.position.x - width  * 2,
        -this.camera.Camera.position.y - height * 2,
         this.camera.Camera.width      + width  * 2,
         this.camera.Camera.height     + height * 2)){
          game.canvas.drawImage(src, sx, sy, sWidth, sHeight, x, y, width, height);
      }
    }
  }

  renderMap(){
    for(var j = 0; j < this.map.MapData.layers[0].tiles.length; j++){
      for(var k = 0; k < this.map.MapData.layers[0].tiles[j].length; k++){
        // Culling
        if(utilities.checkPointInRect(
            k * this.map.MapData.tileWidth + this.map.Transform.position.x,
            j * this.map.MapData.tileWidth + this.map.Transform.position.y,
           -this.camera.Camera.position.x - this.map.MapData.tileWidth  * 2,
           -this.camera.Camera.position.y - this.map.MapData.tileHeight * 2,
            this.camera.Camera.width      + this.map.MapData.tileWidth  * 2,
            this.camera.Camera.height     + this.map.MapData.tileHeight * 2)){
          game.canvas.drawImage(
             this.map.MapData.layers[0].tileset,
             this.map.MapData.layers[0].tiles[j][k].x,
             this.map.MapData.layers[0].tiles[j][k].y,
             this.map.MapData.tileWidth,
             this.map.MapData.tileWidth,
             k * this.map.MapData.tileWidth + this.map.Transform.position.x,
             j * this.map.MapData.tileWidth + this.map.Transform.position.y,
             this.map.MapData.tileWidth,
             this.map.MapData.tileWidth);
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

  setMap(e){
    this.map = e.detail.map;
  }

  setCamera(e){
    this.camera = e.detail.camera;
  }
}
