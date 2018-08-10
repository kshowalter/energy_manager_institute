import mk_system_data from './mk_system_data';
import f from 'functions';

export default {

  init: function(state,action){
    console.log('reducer: init');
    return state;
  },

  update_inputs: function(state,action){
    console.log('reducer: update_inputs');
    var inputs = {};
    var inputs_elements = document.getElementsByClassName('input');
    for (var i = 0; i < inputs_elements.length; i++) {
      var input = inputs_elements[i];
      var section,name;
      [section,name] =  input.id.split('.');
      inputs[section] = inputs[section] || {};
      var value = f.str_to_num(input.value);
      if(value==='') value = undefined;
      inputs[section][name] = value;
    }
    sessionStorage.setItem('inputs', JSON.stringify(inputs));

    state.inputs = inputs;
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
