var ecs = function(){}

ecs.start = function(){
  ecs.entityCount    = 0;
  ecs.componentCount = 0;

  ecs.db = ecs.newDB();
}

ecs.newDB = function(){
  return new Array();
}

// Generates a new entity, adds it to the db, return its eid.
ecs.newEntity = function(name=null){
  var eid = "E-" + ecs.entityCount;
  if(name) ecs.db.push({"id":eid,"name":name});
  else     ecs.db.push({"id":eid});
  ecs.entityCount++;
  return eid;
}

ecs.addComponent = function(eid, component){
  var index = ecs.db.map(function(e){return e.id;}).indexOf(eid);
  if(ecs.db[index]){
    ecs.db[index][component.name] = component;
    ecs.componentAdded(eid);
    ecs.componentCount++;
  }
}

ecs.removeComponent = function(eid, name="notset"){
  var eIndex = ecs.db.map(function(e){return e.id;}).indexOf(eid);
  if(name != "notset"){
    if(ecs.db[eIndex]){
      if(ecs.db[eIndex][name]){
        ecs.componentRemoved(eid);
        delete ecs.db[eIndex][name];
      }
    }
  }
}

ecs.getEntityByID = function(id){
  var eIndex = ecs.db.map(function(e){return e.id;}).indexOf(id);
  if(ecs.db[eIndex]) return ecs.db[eIndex];
  return null;
}

ecs.getEntityByName = function(array, name){
  var eIndex = ecs.db.map(function(e){return e.name;}).indexOf(name);
  return ecs.db[eIndex];
}

ecs.getFamily = function(name){
  return ecs.db.filter(function(e){return e.name === name;});
}

ecs.checkEntity = function(eid, array){
  var eIndex = ecs.db.map(function(e){return e.id;}).indexOf(eid);
  var result = false;
  if(array.length>0){
      var total  = array.length;
      var count  = 0;
      for(var j in array){
        if(typeof ecs.db[eIndex] != "undefined"){
          if(typeof ecs.db[eIndex][array[j]] != "undefined"){ count++; } }
        }
      if(count >= total){ result = true; }
  }
  return result;
}

ecs.addEntityToArray = function(array, requirements, eid){
  var eIndex = ecs.db.map(function(e){return e.id;}).indexOf(eid);
  if(ecs.checkEntity(eid, requirements))array.push(ecs.db[eIndex]);
}

// events
ecs.createEvent = function(name = "notset", args = {}){
  var event = new CustomEvent(name, args);
  window.dispatchEvent(event);
}

ecs.componentAdded = function(eid){
  ecs.createEvent("componentAdded", {detail: { eid:eid }});
}

ecs.componentRemoved = function(eid){
  ecs.createEvent("componentRemoved", {detail: { eid:eid }});
}
