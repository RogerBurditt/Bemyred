class BaseBodyFSM{
  constructor(eid){
    this.eid  = eid;
    this.name = "BaseBodyFSM";

    this.animation = new StateMachine({
      init: 'IDLE_DOWN',
      transitions: [
        { name: 'idleDown',  from: '*', to: 'IDLE_DOWN'  },
        { name: 'idleUp',    from: '*', to: 'IDLE_UP'    },
        { name: 'idleLeft',  from: '*', to: 'IDLE_LEFT'  },
        { name: 'idleRight', from: '*', to: 'IDLE_RIGHT' },

        { name: 'moveDown',  from: '*', to: 'MOVE_DOWN'  },
        { name: 'moveUp',    from: '*', to: 'MOVE_UP'    },
        { name: 'moveLeft',  from: '*', to: 'MOVE_LEFT'  },
        { name: 'moveRight', from: '*', to: 'MOVE_RIGHT' }
      ],
      methods: {
        onIdleDown:  function() { GlobalEvent.swapAnimation(eid, "IDLE_DOWN"); },
        onIdleUp:    function() { GlobalEvent.swapAnimation(eid, "IDLE_UP");    },
        onIdleLeft:  function() { GlobalEvent.swapAnimation(eid, "IDLE_LEFT");  },
        onIdleRight: function() { GlobalEvent.swapAnimation(eid, "IDLE_RIGHT"); },

        onMoveDown:  function() { GlobalEvent.swapAnimation(eid, "MOVE_DOWN");  },
        onMoveUp:    function() { GlobalEvent.swapAnimation(eid, "MOVE_UP");    },
        onMoveLeft:  function() { GlobalEvent.swapAnimation(eid, "MOVE_LEFT");  },
        onMoveRight: function() { GlobalEvent.swapAnimation(eid, "MOVE_RIGHT"); }
      }
    });
  }
}
