class ActorBody{
  constructor(x, y, actorObj, collisionGroup=0x0001){
    this.name = "ActorBody";

    this.sprite = Matter.Bodies.rectangle(x, y, actorObj.Sprite.width, actorObj.Sprite.height, {
      label: "sprite",
      isSensor: true,
      friction: 0.01,
      frictionAir: 0.1,
      restitution: 0.08,
      mass: 1,
      inertia: Infinity,
      collisionFilter: {
        category: collisionGroup
      },
      render: {
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 1
      }
    });

    this.collision = Matter.Bodies.rectangle(x + actorObj.Collision.xOffset,
                                             y + actorObj.Collision.yOffset,
                                                 actorObj.Collision.width,
                                                 actorObj.Collision.height, {
      label: "collision",
      isSensor: false,
      friction: 0.01,
      frictionAir: 0.001,
      restitution: 0.08,
      mass: 1,
      inertia: Infinity,
      collisionFilter: {
        category: collisionGroup
      },
      render: {
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 1
      }
    });

    this.cConstraint = Matter.Constraint.create({
      bodyA: this.sprite,
      bodyB: this.collision,
      pointA: {x: 0, y: 0},
      pointB: {x: -actorObj.Collision.xOffset, y: -actorObj.Collision.yOffset}
    });

    this.body = Matter.Composite.create();
    Matter.Composite.add(this.body, [this.sprite, this.collision, this.cConstraint]);
    Matter.World.add(game.physics.world, this.body);
  }
}
