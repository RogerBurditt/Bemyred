class InputSystem{
  constructor(){
    this.isSleeping = false;
  }

  loop(){
    // DOWN
    if(keyboard.keys[40]){
      ecs.getEntityByName(ecs.db, "hero").BaseBodyFSM.animation.idleDown();

      Matter.Body.applyForce(ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite,
        {x: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.x,
         y: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.y},
        {x: 0, y: 0.005});
    }

    // UP
    if(keyboard.keys[38]){
      ecs.getEntityByName(ecs.db, "hero").BaseBodyFSM.animation.idleUp();

      Matter.Body.applyForce(ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite,
        {x: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.x,
         y: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.y},
        {x: 0, y: -0.005});
    }

    // LEFT
    if(keyboard.keys[37]){
      ecs.getEntityByName(ecs.db, "hero").BaseBodyFSM.animation.idleLeft();

      Matter.Body.applyForce(ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite,
        {x: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.x,
         y: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.y},
        {x: -0.005, y: 0});
    }

    // RIGHT
    if(keyboard.keys[39]){
      ecs.getEntityByName(ecs.db, "hero").BaseBodyFSM.animation.idleRight();

      Matter.Body.applyForce(ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite,
        {x: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.x,
         y: ecs.getEntityByName(ecs.db, "hero").ActorBody.sprite.position.y},
        {x: 0.005, y: 0});
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
