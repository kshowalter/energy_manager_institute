import mk_system_data from './mk_system_data';
import f from 'functions';

export default {

  init: function(state,action){
    console.log('reducer: init');
    state.specs = action.arguments[0];
    return state;
  },

  update_inputs: function(state,action){
    console.log('reducer: update_inputs');
    var id = action.arguments[0];
    var value = action.arguments[1];
    // state.inputs = {};
    value = f.str_to_num(value);
    if(value==='') value = undefined;
    state.inputs[id] = value;

    console.log(state.inputs);
    if( id==='component_category_selection' ){
      state.inputs.component_selection = undefined;
    }

    state = mk_system_data(state);
    return state;

  },
  clear_inputs: function(state,action){
    state.inputs = {};
    state = mk_system_data(state);
    return state;
  },

  add_component: function(state,action){
    var db_id = action.arguments[0];
    state.system.components.push(state.db.components.docs[db_id]);
    return state;
  },

  tick: function(state,action){
    state.system.time++;
    // console.log(state.system.time);
    return state;
  }


};
