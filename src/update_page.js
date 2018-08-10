import {div, span, p, a, ul, li, br, h1, h2, h3, input, select, option} from 'specdom_helper';
import $ from 'simpledom';
import f from 'functions';

export default function(state,actions){
  var system = state.system;

  var components_specs = $('#components_specs').clear();

  var types = [''].concat( Object.keys(state.db.components.tree) );

  //components_specs.clear();
  system.components.forEach(component=>{
    components_specs.append(div([
      span({class:'label'},component.label!==undefined? component.label : '-'),
      span({class:'label label_neg'},component.load!==undefined? component.load : ''),
      span({class:'label label_pos'},component.supply!==undefined? component.supply : ''),
    ]));
  });




  var value = $('#component_category_selection').attr('value');
  var component_selection_sd = $('#component_selection').attr('disabled',null).clear();
  component_selection_sd.append($(option('')));
  var components = state.db.components.tree[value];
  system.components.forEach(component=>{
    component_selection_sd.append(option(component.label,{value:component.db_id}));
  });



  // */


  $('#time').clear().append(system.time);

  $('#init_energy_loads').clear().append(system.energy_loads);
  $('#init_energy_supply').clear().append(system.energy_supply);
  $('#init_energy_balance').clear().append(system.energy_balance);

  $('#grid.load').clear().append(system.grid.load);
  $('#grid.supply').clear().append(system.grid.supply);

  $('#energy_loads').clear().append(system.energy_loads);
  $('#energy_supply').clear().append(system.energy_supply);
  $('#energy_balance').clear().append(system.energy_balance);


}
