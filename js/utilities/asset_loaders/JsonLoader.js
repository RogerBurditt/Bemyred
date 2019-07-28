class JsonLoader{
  constructor(){
    this.successCount = 0;
    this.failCount   = 0;

    this.jsons = [];

    this.firstLoad =
    [
      { src: "../bemyred5/assets/backend/json/actors/heroes.json", id: 0 },
      { src: "../bemyred5/assets/backend/json/maps/ExpanseMap.json", id: 1 }
    ];
  }

  load(queue, id){
    for(var i = 0; i < queue.length; i++){
      var that  = this;
      var queue = queue;

      $.ajax({
        url: queue[i].src,
        dataType: 'json',
        type: 'get',
        cache: false,
        beforeSend: function (data) {
          if (data && data.overrideMimeType) {
            data.overrideMimeType('application/json;charset=utf-8');
          }
        },
        success: function(data){
          $(data).each(function(index, value){
            that.jsons.push(this);
            that.successCount += 1;
          });
          if(that.successCount + that.failCount >= queue.length){
            that.jsonLoaded(id);
          }
        },
        error: function(){
          console.log("!!ERROR loading JSON file: </br>" + this.url);
          that.failCount += 1;

          if(that.successCount + that.failCount >= that.jsons.length){
            console.log("Json load failed.");
          }
        }
      });
    }
  }

  getJson(id){
    for(var i in this.jsons){
      if(id == this.jsons[i].jsonID){
        return this.jsons[i];
      }
    }
  }

  jsonLoaded(id){
    window.dispatchEvent(new CustomEvent("jsonLoaded", {detail: { id:id }}));
  }
}
