class InteractSystem{
  constructor(){
    this.isSleeping = false;

    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));

    this.sprites = [];
  }

  loop(){
    if(GlobalObjects.hero){
      // Space
      if(keyboard.keys[32]){
        for(var i in this.sprites){
          if(Matter.SAT.collides(GlobalObjects.hero.ActorBody.sprite, this.sprites[i].ActorBody.sprite).collided){
            GlobalEvent.loadScript(this.sprites[i].DialogScript.script, 0);
          }
        }
      }
    }
  }

  filterAdd(e){
    ecs.addEntityToArray(this.sprites, ["Render", "Transform", "Sprite", "DialogScript"], e.detail.eid);
  }

  filterRemove(e){
    ecs.removeEntityFromArray(this.sprites, ["Render", "Transform", "Sprite", "DialogScript"], e.detail.eid);
  }
}
