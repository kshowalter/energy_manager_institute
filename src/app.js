/**
* this is the app
* @file_overview this the starting point for the application.
* @author keith showalter {@link https://github.com/kshowalter}
* @version 0.1.0
*/
console.log('/\\');

import 'normalize.css';

import mkwebsite from 'mkwebsite';
import update from './update';
import reducers from './reducers';
import db from './db';
import load_components from './load_components';
import pixi from './pixi';
import mksystem from './mksystem';
import mkowner from './mkowner';


var global = window || global;

var inputs = sessionStorage.getItem('inputs');
if( inputs ){
  inputs = JSON.parse(inputs);
} else {
  inputs = {};
}

// var display_pixi = pixi();
// document.body.appendChild(display_pixi.view);
db.components = load_components(db.components);

var init_state = {
  db,
  options: {},
  inputs,
  system: mksystem(db),
  owner: mkowner(),
  specs: {},
  // display_pixi
};

var actions = mkwebsite(init_state, reducers, update);
actions.add_component(1);
actions.add_component(2);
actions.add_component(3);

window.setInterval(function(){
  // console.log('TICK');
  // actions.tick();
}, 3000);
