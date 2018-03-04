import click from '../lib/click';

var internal_actions = {
  add_item: function(existing_state, action){
    console.log(action);
    return existing_state;
  },

};



var r = {
  update: function(existing_state,action){
    console.log('I am still okay.');
    return existing_state;
  },
  center: function(existing_state,action){
    return {
      center: action.coor,
    };
  },
  click: function(existing_state,action){
    existing_state = click(existing_state, action.coor);
    existing_state.shape_action_queue.forEach(function(name){
      console.log('do:',name);
    });
    existing_state.shape_action_queue = [];
    return existing_state;
  },

};


function reducer( existing_state={}, action ){
  if( ! action ){
    return existing_state;
  }

  //var clone_state = clone(existing_state);

  if( action.type === 'init' ){
    return existing_state;
  }
  if( Object.keys(r).indexOf(action.type)+1 ){
    //state = r[action.type](state,action);
    return r[action.type](existing_state,action);
  } else {
    console.log('I do not know how to: ', action);
    return existing_state;
  }

}

export default reducer;
