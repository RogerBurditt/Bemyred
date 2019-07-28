class MapBody{
  constructor(x, y, mapObj){
    this.name = "MapBody";

    this.map = Matter.Bodies.rectangle(x, y, mapObj.width * mapObj.tileWidth, mapObj.height * mapObj.tileHeight, {
      isSensor: true,
      friction: 0.01,
      frictionAir: 0.1,
      restitution: 0.08,
      mass: 1,
      inertia: Infinity,
      collision: {

      },
      render: {
        fillStyle: 'Transparent',
        strokeStyle: 'black',
        lineWidth: 1
      }
    });

    this.body = Matter.Composite.create();
    Matter.Composite.add(this.body, [this.map]);
    Matter.World.add(game.physics.world, this.body);
  }
}
