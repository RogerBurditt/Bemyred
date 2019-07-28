class InputManager{
  constructor(){
    this.isSleeping = false;
  }

  loop(){
    if(GlobalObjects.hero){
      // DOWN
      if(keyboard.keys[40]){
        GlobalObjects.hero.BaseBodyFSM.animation.idleDown();

        Matter.Body.applyForce(GlobalObjects.hero.ActorBody.sprite,
          {x: GlobalObjects.hero.ActorBody.sprite.position.x,
           y: GlobalObjects.hero.ActorBody.sprite.position.y},
          {x: 0, y: 0.005});
      }

      // UP
      if(keyboard.keys[38]){
        GlobalObjects.hero.BaseBodyFSM.animation.idleUp();

        Matter.Body.applyForce(GlobalObjects.hero.ActorBody.sprite,
          {x: GlobalObjects.hero.ActorBody.sprite.position.x,
           y: GlobalObjects.hero.ActorBody.sprite.position.y},
          {x: 0, y: -0.005});
      }

      // LEFT
      if(keyboard.keys[37]){
        GlobalObjects.hero.BaseBodyFSM.animation.idleLeft();

        Matter.Body.applyForce(GlobalObjects.hero.ActorBody.sprite,
          {x: GlobalObjects.hero.ActorBody.sprite.position.x,
           y: GlobalObjects.hero.ActorBody.sprite.position.y},
          {x: -0.005, y: 0});
      }

      // RIGHT
      if(keyboard.keys[39]){
        GlobalObjects.hero.BaseBodyFSM.animation.idleRight();

        Matter.Body.applyForce(GlobalObjects.hero.ActorBody.sprite,
          {x: GlobalObjects.hero.ActorBody.sprite.position.x,
           y: GlobalObjects.hero.ActorBody.sprite.position.y},
          {x: 0.005, y: 0});
      }
    }

    // W
    if(keyboard.keys[87]){
      
    }

    // A
    if(keyboard.keys[65]){

    }

    // S
    if(keyboard.keys[83]){

    }

    // D
    if(keyboard.keys[68]){

    }
  }
}
