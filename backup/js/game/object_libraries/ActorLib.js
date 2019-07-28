class ActorLib{
  constructor(){
    this.lib = [];

    this.populate();
  }

  populate(){
    var objects = game.jsonLoader.getJson(0);

    for(var i in objects){
      if(i != "jsonID"){
        var object        = {};
        object.actorID    = objects[i].actorID;

        object.Sprite = {};
        object.Sprite.src        = game.imageLoader.getImage(objects[i].Sprite.sheetID);
        object.Sprite.sWidth     = objects[i].Sprite.sWidth;
        object.Sprite.sHeight    = objects[i].Sprite.sHeight;
        object.Sprite.width      = objects[i].Sprite.width;
        object.Sprite.height     = objects[i].Sprite.height;
        object.Sprite.animations = [];
        for(var j in objects[i].Sprite.Animations){
          object.Sprite.animations[j] = [];
          for(var k in objects[i].Sprite.Animations[j]){
            object.Sprite.animations[j].push(utilities.indexToSheetPos
            (objects[i].Sprite.Animations[j][k], object.Sprite.src.width/object.Sprite.sWidth, 1));
          }
        }

        object.Collision = {};
        object.Collision.xOffset = objects[i].Collision.xOffset;
        object.Collision.yOffset = objects[i].Collision.yOffset;
        object.Collision.width   = objects[i].Collision.width;
        object.Collision.height  = objects[i].Collision.height;

        object.Physics = {};

        this.lib.push(object);
      }
    }
  }

  getActor(id){
    for(var i in this.lib){
      if(id == this.lib[i].actorID){
        return this.lib[i];
      }
    }
  }
}
