class AnimateSystem{
  constructor(){
    this.isSleeping = false;

    window.addEventListener("swapAnimation",    this.swapAnimation.bind(this));
    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));

    this.sprites = [];

    this.tick = 0;
    this.tickCount = 8;
  }

  loop(){
    for(var i in this.sprites){
      this.animateSprite(this.sprites[i]);
    }
  }

  animateSprite(entity){
     entity.Sprite.sx =
     entity.Sprite.Animations
    [entity.Sprite.animName].frames
    [entity.Sprite.animFrame].x;

     entity.Sprite.sy =
     entity.Sprite.Animations
    [entity.Sprite.animName].frames
    [entity.Sprite.animFrame].y;

    if(this.tick == 0){
      if(entity.Sprite.Animations
        [entity.Sprite.animName].frames.length > 1 &&
         entity.Sprite.animFrame <
         entity.Sprite.Animations
        [entity.Sprite.animName].frames.length-1){
         entity.Sprite.animFrame ++;
      }
      else{
        entity.Sprite.animFrame = 0;
      }
    }

    // to do: Add loop amount
    if(this.tick < entity.Sprite.Animations[entity.Sprite.animName].speed){
      this.tick ++;
    }
    else{
      this.tick = 0;
    }
  }

  swapAnimation(e){
    var eIndex = this.sprites.map(function(e){return e.id;}).indexOf(e.detail.eid);
    var entity = this.sprites[eIndex];
    var anim = e.detail.animName;

    if(entity){
      entity.Sprite.animFrame = 0;
      entity.Sprite.animName  = anim;
    }
  }

  filterAdd(e){
    ecs.addEntityToArray(this.sprites, ["Sprite", "BaseBodyFSM"], e.detail.eid);
  }

  filterRemove(e){
    ecs.removeEntityFromArray(this.sprites, ["Sprite", "BaseBodyFSM"], e.detail.eid);
  }
}
