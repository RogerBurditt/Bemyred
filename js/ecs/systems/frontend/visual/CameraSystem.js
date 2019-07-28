class CameraSystem{
  constructor(){
    this.isSleeping = false;


    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));

    GlobalObjects.cameras = [];
  }

  loop(){
    if(GlobalObjects.camera && GlobalObjects.map){
      if(GlobalObjects.camera.Camera.focus)this.setCamera();
    }
  }

  setCamera(){
    var posX = utilities.clamp(-GlobalObjects.camera.Camera.focus.x + GlobalObjects.camera.Camera.width/2,
                         -(GlobalObjects.map.MapData.pWidth - GlobalObjects.camera.Camera.width), 0);

    var posY = utilities.clamp(-GlobalObjects.camera.Camera.focus.y + GlobalObjects.camera.Camera.height/2,
                          -(GlobalObjects.map.MapData.pHeight - GlobalObjects.camera.Camera.height), 0);

    if(GlobalObjects.camera.Camera.position.x != posX){
      GlobalObjects.camera.Camera.position.x = utilities.lerp(GlobalObjects.camera.Camera.position.x, posX, 0.15);
    }

    if(GlobalObjects.camera.Camera.position.y != posY){
      GlobalObjects.camera.Camera.position.y = utilities.lerp(GlobalObjects.camera.Camera.position.y, posY, 0.15);
    }
  }

  filterAdd(e){
    ecs.addEntityToArray(GlobalObjects.cameras, ["Camera"], e.detail.eid);
  }

  filterRemove(e){
    ecs.removeEntityFromArray(GlobalObjects.cameras, ["Camera"], e.detail.eid);
  }
}
