class Sprite{
  constructor(actorObj){
    this.name = "Sprite";

    this.src     = actorObj.Sprite.src;
    this.sWidth  = actorObj.Sprite.sWidth;
    this.sHeight = actorObj.Sprite.sHeight;
    this.width   = actorObj.Sprite.width;
    this.height  = actorObj.Sprite.height;

    this.Animations = actorObj.Sprite.Animations;
    this.animName   = "Default";
    this.animFrame  = 0;

    this.sx = this.Animations[this.animName].frames[this.animFrame].x; // <- current animation frame x
    this.sy = this.Animations[this.animName].frames[this.animFrame].y; // <- current animation frame y
  }
}
