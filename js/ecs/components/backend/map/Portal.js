class Portal{
  constructor(obj){
    this.name = "Portal";

    this.position = {x:obj.x, y:obj.y};
    this.width    = obj.width;
    this.height   = obj.height;
    this.center   = obj.center;
    this.to       = obj.to;
  }
}
