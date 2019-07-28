class ActorLib{
  constructor(){
    this.lib = [];

    this.actorDataFiles = [
      "actors/heroes"
    ];

    this.populate();
  }

  populate(){
    for(var l in this.actorDataFiles){
      var actorData = kontra.assets.data[this.actorDataFiles[l]];

      for(var i in actorData){
        var object        = {};
        object.actorID    = actorData[i].actorID;

        object.Sprite = {};
        object.Sprite.src        = kontra.assets.images[actorData[i].Sprite.src];
        object.Sprite.sWidth     = actorData[i].Sprite.sWidth;
        object.Sprite.sHeight    = actorData[i].Sprite.sHeight;
        object.Sprite.width      = actorData[i].Sprite.width;
        object.Sprite.height     = actorData[i].Sprite.height;

        object.Sprite.Animations = [];
        for(var j in actorData[i].Sprite.Animations){
          var tFrames = actorData[i].Sprite.Animations[j].frames;
          var frames  = [];
          for(var l in actorData[i].Sprite.Animations[j].frames){
            frames.push(utilities.indexToSheetPos
                       (actorData[i].Sprite.Animations[j].frames[l],
                        object.Sprite.src.width/object.Sprite.sWidth, 1));
          }
          var speed   = actorData[i].Sprite.Animations[j].speed;
          var loop    = actorData[i].Sprite.Animations[j].loop;
          var to      = actorData[i].Sprite.Animations[j].to;
          var from    = actorData[i].Sprite.Animations[j].from;

          object.Sprite.Animations[j] = {frames: frames, speed: speed, loop: loop, to: to, from: from};
        }

        object.Collision = {};
        object.Collision.xOffset = actorData[i].Collision.xOffset;
        object.Collision.yOffset = actorData[i].Collision.yOffset;
        object.Collision.width   = actorData[i].Collision.width;
        object.Collision.height  = actorData[i].Collision.height;

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
