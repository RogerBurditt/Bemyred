class PortalSystem{
  constructor(){
    this.isSleeping = false;

    window.addEventListener("componentAdded",   this.filterAdd.bind(this));
    window.addEventListener("componentRemoved", this.filterRemove.bind(this));

    this.portals = [];
  }

  loop(){
    for(var i in this.portals){

    }
  }

  filterAdd(e){
    ecs.addEntityToArray(this.portals, ["Portal"], e.detail.eid);
  }

  filterRemove(e){
    ecs.removeEntityFromArray(this.portals, ["Portal"], e.detail.eid);
  }
}
