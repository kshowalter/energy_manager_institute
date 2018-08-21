// import base64url from 'base64-url';
import update_page  from './update_page';
// import get_drawing  from './get_drawing';
// import db from './db';
// import $ from 'simpledom';
import mk_page from './mk_page';


export default function update(state,actions){
  var start_time = Date.now();

  var system = state.system;
  console.log('state',state);

  system.energy_loads = 0;
  system.energy_supply = 0;
  system.components.forEach(component=>{
    if( component.type !== 'grid' && component.type !== 'battery' ){
      if( component.load ){
        system.energy_loads += component.load;
      }
      if( component.supply ){
        system.energy_supply += component.supply;
      }
    }
  });

  system.energy_balance = system.energy_supply - system.energy_loads;

  if( system.energy_balance > 0 ){
    system.grid.load = system.energy_balance;
  } else if( system.energy_balance < 0 ){
    system.grid.supply = system.energy_balance;
  }

  state.options.component_category_selection = [''].concat( Object.keys(state.db.components.tree) );

  state.options.component_selection = [{label:'',db_id:undefined}];
  if(state.inputs.component_category_selection){
    state.db.components.tree[state.inputs.component_category_selection].forEach(component=>{
      state.options.component_selection.push(component);
    });
  }

  // update_page(state,actions);
  mk_page(state, actions);

  // console.log(state.inputs);
  sessionStorage.setItem('inputs', JSON.stringify(state.inputs));

  console.log( 'Update time:', Date.now() - start_time, 'ms');
}
