var mouse = function(){}

mouse.start = function(){
  mouse.locked = false;

  mouse.reqComponents = ["Position"];
  mouse.elements = [];

  window.addEventListener("click", mouse.logMouse);
}

mouse.addEntity = function(entity){
  if(entity instanceof Entity){
    if(engine.dataBucket.checkComponentRequirements(entity, this.reqComponents)){
      if(entity.getAllComponentsOfClass(Sprite) != []){
        mouse.elements.push(entity);
      }
    }
  }
}

mouse.logMouse = function(e){
  for(var i = 0; i < mouse.elements.length; i++){

  }
}
