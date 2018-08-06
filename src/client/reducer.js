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
  'status:document': function(existing_state,action){
    return existing_state;
  },

};


function reducer( existing_state={}, action ){
  if( ! action ){
    return existing_state;
  }

  var actions;
  if( action.type === 'click' ){
    existing_state = click(existing_state, action.coor);
    actions = existing_state.shape_action_queue.map( (type)=>({type}) );
    existing_state.shape_action_queue = [];
  } else {
    actions = [action];
  }
  //var clone_state = clone(existing_state);
  return actions.reduce( function(state,action){
    if( action.type === 'init' ){
      return state;
    }
    if( Object.keys(r).indexOf(action.type)+1 ){
      //state = r[action.type](state,action);
      return r[action.type](state,action);
    } else {
      console.log('I do not know how to: ', action);
      return state;
    }
  }, existing_state);

}

export default reducer;
