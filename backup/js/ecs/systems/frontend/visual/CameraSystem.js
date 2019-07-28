class CameraSystem{
  constructor(){
    this.isSleeping = false;


    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));
    window.addEventListener("swapMap",          function(e){this.map=e.detail.map;}.bind(this));
    window.addEventListener("swapCamera",       function(e){this.camera=e.detail.camera;}.bind(this));
    window.addEventListener("swapCameraFocus",
           function(e){if(this.camera)this.camera.Camera.focus=e.detail.entity.ActorBody.sprite.position;}.bind(this));

    this.cameras = [];
    this.map     = null;
    this.camera  = null;
  }

  loop(){
    if(this.camera){
      if(this.camera.Camera.focus)this.setCamera();
    }
  }

  setCamera(){
    var posX = utilities.clamp(-this.camera.Camera.focus.x + this.camera.Camera.width/2,
                         -(this.map.MapData.pWidth - this.camera.Camera.width), 0);

    var posY = utilities.clamp(-this.camera.Camera.focus.y + this.camera.Camera.height/2,
                          -(this.map.MapData.pHeight - this.camera.Camera.height), 0);

    if(this.camera.Camera.position.x != posX){
      this.camera.Camera.position.x = utilities.lerp(this.camera.Camera.position.x, posX, 0.15);
    }

    if(this.camera.Camera.position.y != posY){
      this.camera.Camera.position.y = utilities.lerp(this.camera.Camera.position.y, posY, 0.15);
    }
  }

  filterAdd(e){
    ecs.addEntityToArray(this.cameras, ["Camera"], e.detail.eid);
  }

  filterRemove(e){
    ecs.removeEntityFromArray(this.cameras, ["Camera"], e.detail.eid);
  }
}
