// import base64url from 'base64-url';
import update_page  from './update_page';
// import get_drawing  from './get_drawing';
// import db from './db';
// import $ from 'simpledom';

export default function update(state,actions){
  var system = state.system;

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

  update_page(state,actions);
}
