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
import mk_page from './mk_page';
import db from './db';
import load_components from './load_components';
import pixi from './pixi';
import mksystem from './mksystem';
import mkowner from './mkowner';


var global = window || global;

var save = sessionStorage.getItem('save');
if( save ){
  save = JSON.parse(save);
} else {
  save = {};
}

// var display_pixi = pixi();
// document.body.appendChild(display_pixi.view);
db.components = load_components(db.components);

var init_state = {
  db,
  save,
  system: mksystem(db),
  owner: mkowner(),
  // display_pixi
};

var actions = mkwebsite(init_state, reducers, update);

var selected_page_id = 'default';
mk_page(actions, selected_page_id);

window.setInterval(function(){
  actions.tick();
}, 3000);
