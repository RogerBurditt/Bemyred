class Camera{
  constructor(canvas, focus=null, x=0, y=0){
    this.name = "Camera";

    this.width  = canvas.width;
    this.height = canvas.height;

    this.focus = focus;
    this.position = {x:x, y:y};
  }
}
