var GlobalEvent = function(){}

GlobalEvent.createEvent = function(name = "notset", args = {}){
  var event = new CustomEvent(name, args);
  window.dispatchEvent(event);
}

GlobalEvent.swapMap = function(entity){
  GlobalObjects.map = entity;
  GlobalEvent.createEvent("swapMap");
}

GlobalEvent.swapCamera = function(entity){
  GlobalObjects.camera = entity;
}

GlobalEvent.swapHero = function(entity){
  GlobalObjects.hero = entity;
}

GlobalEvent.swapAnimation = function(eid, animName){
  GlobalEvent.createEvent("swapAnimation", {detail: {eid:eid, animName:animName}});
}

GlobalEvent.loadScript = function(script, startLine){
  GlobalEvent.createEvent("loadDialogue", {detail: {script:script, startLine:startLine}});
}
