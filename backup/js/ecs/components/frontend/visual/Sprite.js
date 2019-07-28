class Sprite{
  constructor(actorObj){
    this.name = "Sprite";

    this.src     = actorObj.Sprite.src;
    this.sWidth  = actorObj.Sprite.sWidth;
    this.sHeight = actorObj.Sprite.sHeight;
    this.width   = actorObj.Sprite.width;
    this.height  = actorObj.Sprite.height;

    this.animations = actorObj.Sprite.animations;
    this.animName   = "Default";
    this.animFrame  = 0;

    this.sx = this.animations[this.animName][this.animFrame].x; // <- current animation frame x
    this.sy = this.animations[this.animName][this.animFrame].y; // <- current animation frame y
  }
}
